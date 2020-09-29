import {
  Getter,
  Action,
  Module,
  GetterTree,
  ActionTree,
  MutationTree,
} from 'vuex';
import {
  HashMap,
  Store,
  VuapixApi,
  VuapixEntry,
  ApiState,
  VuapixApiPayload,
  CacheRes,
  Ckey,
  Result,
  resultFactory,
} from './types';
import EntryModule from './EntryModule';
// import {
//   Result,
//   resultFactory,
// } from './Result'

// https://medium.com/js-dojo/a-trick-up-vuexs-sleeve-promises-and-weakmaps-a7629042399b
/* eslint-disable no-underscore-dangle,class-methods-use-this */
export default class VuapixApiModule<T> implements Module<ApiState<T>, Store> {
  _apiPayload: VuapixApiPayload;

  namespaced = true;

  state: ApiState<T>;

  getters: GetterTree<ApiState<T>, Store>;

  actions: ActionTree<ApiState<T>, Store>;

  mutations: MutationTree<ApiState<T>>;

  modules: HashMap<EntryModule>;

  constructor(ns: string, dataType: string, { entries, ...apiPayload }: VuapixApi<T>) {
    this._apiPayload = apiPayload;

    this.state = {
      _ckeys: {},
      _items: {},
    };

    this.getters = {
      _cache: (state) => (cKey: Ckey): CacheRes | null => state._ckeys[cKey] || null,
      _items: (state) => state._items,
      _item: (_, getters) => (uId: string): T => getters._items[uId] || null,
    };

    this.actions = {};

    this.mutations = {
      cache: (state, { cKey, value }) => {
        state._ckeys[cKey] = value;
      },
      addItems: (state, { itemsMap }) => {
        state._items = {
          ...state._items,
          ...itemsMap,
        };
      },
    };

    this.modules = {};

    Object.keys(entries).forEach((entryName) => {
      const entry = entries[entryName];
      this.getters[entryName] = this.getterFactory(entryName, entry);
      this.actions[entryName] = this.actionFactory(entryName, entry);
      this.modules[entryName] = new EntryModule(`${ns}/${dataType}`, entryName, entry);
    });
  }

  private getterFactory(entryName: string, entry: VuapixEntry<T>): Getter<ApiState<T>, Store> {
    return (state, getters) => {
      const { uIds } = state[entryName];
      return (uIds && (entry.single
        ? (uIds && getters._item(uIds))
        : uIds.map(getters._item))) || null;
    };
  }

  private actionFactory(
    entryName: string,
    entry: VuapixEntry<T>,
  ): Action<ApiState<T>, Store> {
    const { single, doQuery } = entry;
    return async (store, params) => {
      const cKey = `${entryName}(${JSON.stringify(params)})`;
      console.log(cKey);

      let result = new Result<T>();
      try {
        store.commit(`${entryName}/startQuerying`);

        // todo handle ttl
        // todo handle partial result
        let cache: CacheRes | null = store.getters._cache(cKey);
        console.log(cache);
        let uIds = cache ? cache.uIds : null;

        if (uIds) {
          result = resultFactory(store.getters._item());
        } else {
          const response = await doQuery(params, { $store: store, ...this._apiPayload });
          result = resultFactory(response);

          const itemsMap = result.toItemsMap(this._apiPayload.itemToUid);
          store.commit('addItems', { itemsMap });

          uIds = Object.keys(itemsMap);
          cache = new CacheRes(uIds);
          store.commit('cache', { cKey, value: cache });
        }

        store.commit(`${entryName}/endQuerying`, { uIds: single ? uIds[0] : uIds });
      } catch (error) {
        store.commit(`${entryName}/catchError`, { error });
      }

      return result;
    };
  }
}
