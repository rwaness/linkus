import {
  Getter,
  Action,
  Module,
  GetterTree,
  ActionTree,
  MutationTree,
} from 'vuex';
import {
  Dictionary,
  RootStore,
  VuapixApi,
  VuapixApiEntry,
  VuapixApiState,
} from './types';
import VuapixEntryModule from './VuapixEntryModule';

/* eslint-disable no-underscore-dangle */
export default class VuapixApiModule<T> implements Module<VuapixApiState<T>, RootStore> {
  _itemToKey: Function;

  namespaced = true;

  state: () => VuapixApiState<T> = () => ({ items: {} });

  getters: GetterTree<VuapixApiState<T>, RootStore> = {
    $items: (state) => state.items,
    $item: (_, getters) => (key: string): T => getters.$items[key],
  };

  actions: ActionTree<VuapixApiState<T>, RootStore> = {};

  mutations: MutationTree<VuapixApiState<T>> = {
    addItems(state, { itemsMap }) {
      state.items = {
        ...state.items,
        ...itemsMap,
      };
    },
  };

  modules: Dictionary<VuapixEntryModule> = {};

  constructor(
    ns: string,
    dataType: string,
    { entries, ...apiPayload }: VuapixApi<T>,
  ) {
    this._itemToKey = apiPayload.itemToKey;

    Object.keys(entries).forEach((entryName) => {
      const entry = entries[entryName];

      this.getters[entryName] = this.getterFactory(entryName, entry);
      this.actions[entryName] = this.actionFactory(entryName, entry);
      this.modules[entryName] = new VuapixEntryModule(`${ns}/${dataType}`, entryName, entry);
    });
  }

  /* eslint-disable class-methods-use-this */
  private getterFactory(
    entryName: string,
    entry: VuapixApiEntry<T>,
  ): Getter<VuapixApiState<T>, RootStore> {
    return (state, getters) => (entry.single
      ? getters.$item(state[entryName].key) || null
      : state[entryName].key.map(getters.$item)
    );
  }

  private actionFactory(
    entryName: string,
    entry: VuapixApiEntry<T>,
  ): Action<VuapixApiState<T>, RootStore> {
    return async (storeCtx, params) => {
      let response;
      try {
        storeCtx.commit(`${entryName}/startQuerying`);

        // const queryKey =

        console.log(entryName, params);
        const vuapixCtx = { itemToKey: this._itemToKey };
        response = await entry.doQuery(params, { vuapixCtx, storeCtx });

        const itemsMap = (entry.single ? [response] : response).reduce((map, item) => ({
          ...map,
          ...(item ? { [this._itemToKey(item)]: item } : {}),
        }), {});
        storeCtx.commit('addItems', { itemsMap });

        const keys = Object.keys(itemsMap);
        storeCtx.commit(`${entryName}/updateKey`, {
          key: entry.single ? keys[0] : keys,
        });

        storeCtx.commit(`${entryName}/endQuerying`);
      } catch (error) {
        storeCtx.commit(`${entryName}/catchError`, { error });
      }
      return response;
    };
  }
}
