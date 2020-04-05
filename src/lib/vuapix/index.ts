const dataEntryStoreFactory = (ns, entryName, _, options = {}) => ({
  namespaced: true,
  state: {
    key: null,
    querying: false,
    error: null,
    ...(options.overridingState || {}),
  },
  getters: {
    data: (__, ___, ____, rootGetters) => rootGetters[`${ns}/${entryName}`],
    querying: (state) => state.querying,
    error: (state) => state.error,
  },
  actions: {
    async doQuery({ commit, dispatch }, params) {
      let response;
      try {
        commit('startFetching');
        response = await dispatch(`${ns}/doQuery`, {
          entryName,
          params,
        }, { root: true });
        commit('endFetching');
      } catch (error) {
        commit('catchError', { error });
      }
      return response;
    },
  },
  mutations: {
    startFetching(state) {
      state.querying = true;
      state.error = null;
    },
    endFetching(state) {
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
});

const singleDataEntryStoreFactory = dataEntryStoreFactory;
const multipleDataEntryStoreFactory = (ns, entryName, entry) => dataEntryStoreFactory(
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

const dataTypeStoreFactory = (ns, dataType, { api, itemToKey }) => ({
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
    async doQuery(storeCtx, { entryName, params }) {
      const { doQuery, single } = api[entryName];
      const response = await doQuery(params, storeCtx);
      const itemsMap = (single ? [response] : response).reduce((acc, item) => ({
        ...acc,
        ...(item ? { [itemToKey(item)]: item } : {}),
      }), {});
      storeCtx.commit('addItems', { itemsMap });
      const keys = Object.keys(itemsMap);
      storeCtx.commit(`${entryName}/updateKey`, {
        key: single ? keys[0] : keys,
      });
      return response;
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
    [entryName]: (api[entryName].single
      ? singleDataEntryStoreFactory(`${ns}/${dataType}`, entryName, api[entryName])
      : multipleDataEntryStoreFactory(`${ns}/${dataType}`, entryName, api[entryName])
    ),
  }), {}),
});

const apiStoreFactory = (ns, apis) => ({
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

export default (apis, options = {}) => {
  const ns = options.ns || 'vuapix';
  return {
    [ns]: apiStoreFactory(ns, Object.keys(apis).reduce((acc, dataType) => {
      const { apiFactory, itemToKey } = apis[dataType];
      return {
        ...acc,
        [dataType]: {
          api: apiFactory({ dataType, itemToKey }),
          itemToKey,
        },
      };
    }, {})),
  };
};
