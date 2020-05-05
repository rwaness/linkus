// import Vuex, { createNamespacedHelpers } from 'vuex'

import VuapixOptions from './VuapixOptions.d';
import Dictionnary from './Dictionnary.d';
import Api from './Api.d';
import VuexStore from './VuexStore.d';
// import VuapixApi from './VuapixApi.d';
import VuapixApiEntry from './VuapixApiEntry.d';

// console.log(Vuex);

export default class Vuapix {
  private ns = 'vuapix';

  private store: VuexStore = {
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
    this.addApiModules(apis);
  }

  public toStore(): Dictionnary<VuexStore> {
    return {
      [this.ns]: this.store,
    };
  }

  public addApiModules(apis: Dictionnary<Api<object>>) {
    Object.keys(apis).forEach((dataType) => this.addApiModule(dataType, apis[dataType]));
  }

  public addApiModule(dataType: string, { apiFactory, ...apiOptions }: Api<object>) {
    const api = apiFactory({ dataType, ...apiOptions });
    const { itemToKey } = apiOptions;

    this.store.modules[dataType] = {
      namespaced: true,
      state: () => ({ items: {} }),
      getters: {
        $items: (state) => state.items,
        $item: (_, getters) => (key) => getters.$items[key],
        ...(
          Object.keys(api).reduce((gettersMap, entryName) => ({
            ...gettersMap,
            [entryName]: (state, getters) => (api[entryName].single
              ? getters.$item(state[entryName].key) || null
              : state[entryName].key.map(getters.$item)
            ),
          }), {})
        ),
      },
      actions: Object.keys(api).reduce((actions, entryName) => ({
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
      modules: Object.keys(api).reduce((modules: Dictionnary<VuexStore>, entryName: string) => ({
        ...modules,
        [entryName]: (api[entryName].single
          ? Vuapix.singleDataEntryStoreFactory(`${this.ns}/${dataType}`, entryName, api[entryName])
          : Vuapix.multipleDataEntryStoreFactory(`${this.ns}/${dataType}`, entryName, api[entryName])
        ),
      }), {}),
    };
  }

  // =====

  static dataEntryStoreFactory(ns: string, entryName: string, _, options = {}): VuexStore {
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
  ): VuexStore {
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
