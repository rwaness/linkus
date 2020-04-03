export const dataEntryStoreFactory = (ns, entryName, { single }) => ({
  namespaced: true,
  state: {
    key: single ? null : [],
    querying: false,
    error: null,
  },
  getters: {
    data: (_, __, ___, rootGetters) => rootGetters[`${ns}/${entryName}`],
    querying: (state) => state.querying,
    error: (state) => state.error,
  },
  actions: {
    async doQuery({ commit, dispatch, getters }, params) {
      try {
        commit('startFetching');
        const keys = Object.keys(await dispatch(`${ns}/doQuery`, {
          entryName,
          params,
          returnMap: true,
        }, { root: true }));
        const key = single ? keys[0] : keys;
        commit('endFetching', { key });
      } catch (error) {
        commit('catchError', { error });
      }
      return getters.data;
    },
  },
  mutations: {
    startFetching(state) {
      state.querying = true;
      state.error = null;
    },
    endFetching(state, { key }) {
      state.key = key;
      state.querying = false;
    },
    catchError(state, { error }) {
      state.error = error;
      state.querying = false;
    },
  },
});

export const dataTypeStoreFactory = (ns, dataType, { api, itemToKey }) => ({
  namespaced: true,
  state: {
    items: {},
  },
  getters: {
    $items: (state) => state.items,
    $item: (_, getters) => (key) => getters.$items[key],
    ...(
      Object.keys(api).reduce((acc, entryName) => ({
        ...acc,
        [entryName]: (state, getters) => (api[entryName].single
          ? getters.$item(state[entryName].key) || null
          : state[entryName].key.map(getters.$item)
        ),
      }), {})
    ),
  },
  actions: {
    async doQuery(storeCtx, { entryName, params, returnMap }) {
      const response = await api[entryName].doQuery(params, storeCtx);
      const itemsMap = (api[entryName].single ? [response] : response).reduce((acc, item) => ({
        ...acc,
        [itemToKey(item)]: item,
      }), {});
      storeCtx.commit('addItems', { itemsMap });
      return returnMap ? itemsMap : response;
    },
  },
  mutations: {
    addItems(state, { itemsMap }) {
      state.items = {
        ...state.items,
        ...itemsMap,
      };
    },
  },
  modules: Object.keys(api).reduce((acc, entryName) => ({
    ...acc,
    [entryName]: dataEntryStoreFactory(`${ns}/${dataType}`, entryName, api[entryName]),
  }), {}),
});

export const apiStoreFactory = (ns, apis) => ({
  namespaced: true,
  state: {
  },
  getters: {
  },
  actions: {
  },
  mutations: {
  },
  modules: Object.keys(apis).reduce((acc, dataType) => ({
    ...acc,
    [dataType]: dataTypeStoreFactory(ns, dataType, apis[dataType]),
  }), {}),
});

export default (apis) => ({
  vuapix: apiStoreFactory('vuapix', apis),
});
