import { createNamespacedHelpers, NamespacedMappers } from 'vuex';
// todo use vuex type : https://github.com/vuejs/vuex/blob/9a9672050bcfee198c379069ec0e1b03ca6cb965/types/index.d.ts
import {
  Dictionary,
  Api,
  VuapixApiEntry,
  VuapixOptions,
  VuapixModule,
  VuapixEntryModule,
} from './types.d';

export default class Vuapix {
  private ns = 'vuapix';

  private helpers: NamespacedMappers;

  private store: VuapixModule = {
    namespaced: true,
    state: {},
    getters: {},
    actions: {},
    mutations: {},
    modules: {},
  };

  // TODO pass a type alias (allow multiple signatures)
  constructor({ namespace, apis }: VuapixOptions) {
    if (namespace) {
      this.ns = namespace;
    }

    this.helpers = createNamespacedHelpers(this.ns);

    this.addApiModules(apis);
  }

  public toStore(): Dictionary<VuapixModule> {
    return {
      [this.ns]: this.store,
    };
  }

  public addApiModules(apis: Dictionary<Api<object>>) {
    Object.keys(apis).forEach((dataType) => this.addApiModule(dataType, apis[dataType]));
  }

  public addApiModule(dataType: string, { apiFactory, ...apiOptions }: Api<object>) {
    const { itemToKey } = apiOptions;
    const api = apiFactory({ dataType, ...apiOptions });
    const entries = Object.keys(api);

    this.store.modules[dataType] = {
      namespaced: true,
      state: () => ({ items: {} }),
      getters: {
        $items: (state) => state.items,
        $item: (_, getters) => (key) => getters.$items[key],
        ...(
          entries.reduce((gettersMap, entryName) => ({
            ...gettersMap,
            [entryName]: (state, getters) => (api[entryName].single
              ? getters.$item(state[entryName].key) || null
              : state[entryName].key.map(getters.$item)
            ),
          }), {})
        ),
      },
      actions: entries.reduce((actions, entryName) => ({
        ...actions,
        [entryName]: async (storeCtx, params) => {
          let response;
          try {
            storeCtx.commit(`${entryName}/startQuerying`);

            const { doQuery, single } = api[entryName];
            response = await doQuery(params, storeCtx);

            const itemsMap = (single ? [response] : response).reduce((map, item) => ({
              ...map,
              ...(item ? { [itemToKey(item)]: item } : {}),
            }), {});
            storeCtx.commit('addItems', { itemsMap });

            const keys = Object.keys(itemsMap);
            storeCtx.commit(`${entryName}/updateKey`, {
              key: single ? keys[0] : keys,
            });

            storeCtx.commit(`${entryName}/endQuerying`);
          } catch (error) {
            storeCtx.commit(`${entryName}/catchError`, { error });
          }
          return response;
        },
      }), {}),
      mutations: {
        addItems(state, { itemsMap }) {
          state.items = {
            ...state.items,
            ...itemsMap,
          };
        },
      },
      modules: entries.reduce((
        modules: Dictionary<VuapixEntryModule>,
        entryName: string,
      ) => ({
        ...modules,
        [entryName]: (api[entryName].single
          ? Vuapix.singleDataEntryStoreFactory(`${this.ns}/${dataType}`, entryName, api[entryName])
          : Vuapix.multipleDataEntryStoreFactory(`${this.ns}/${dataType}`, entryName, api[entryName])
        ),
      }), {}),
    };
  }

  // =====

  static dataEntryStoreFactory(
    ns: string,
    entryName: string,
    _,
    options = {},
  ): VuapixEntryModule {
    const intialState = {
      key: null,
      querying: false,
      error: null,
      ...(options.overridingState || {}),
    };
    return {
      namespaced: true,
      state: () => ({ ...intialState }),
      getters: {
        data: (__, ___, ____, rootGetters) => rootGetters[`${ns}/${entryName}`],
        querying: (state) => state.querying,
        error: (state) => state.error,
      },
      actions: {
        doQuery: ({ dispatch }, params) => dispatch(`${ns}/${entryName}`, params, { root: true }),
      },
      mutations: {
        reset(state) {
          Object.keys(state).forEach((field) => {
            state[field] = intialState[field];
          });
        },
        startQuerying(state) {
          state.querying = true;
          state.error = null;
        },
        endQuerying(state) {
          state.querying = false;
        },
        catchError(state, { error }) {
          state.error = error;
          state.querying = false;
        },
        updateKey(state, { key }) {
          state.key = key;
        },
        ...(options.overridingMuations || {}),
      },
    };
  }

  static singleDataEntryStoreFactory(...args) {
    return Vuapix.dataEntryStoreFactory(...args);
  }

  static multipleDataEntryStoreFactory(
    ns: string,
    entryName: string,
    entry: VuapixApiEntry<object>,
  ): VuapixEntryModule {
    return Vuapix.dataEntryStoreFactory(
      ns,
      entryName,
      entry,
      {
        overridingState: { key: [] },
        overridingMuations: {
          addKey(state, { key }) {
            state.key = [key, ...state.key];
          },
          removeKey(state, { key }) {
            state.key = state.key.filter((k) => k !== key);
          },
        },
      },
    );
  }
}
