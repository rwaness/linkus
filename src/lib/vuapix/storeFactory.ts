const dataEntryStoreFactory = (ns, entryName, _, options = {}) => {
  const intialState = {
    key: null,
    querying: false,
    error: null,
    ...(options.overridingState || {}),
  };
  return {
    namespaced: true,
    state: intialState,
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
};

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
        console.error(error);
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
  modules: Object.keys(api).reduce((modules, entryName) => ({
    ...modules,
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
  modules: Object.keys(apis).reduce((modules, dataType) => ({
    ...modules,
    [dataType]: dataTypeStoreFactory(ns, dataType, apis[dataType]),
  }), {}),
});

export default (apis, options = {}) => {
  const ns = options.ns || 'vuapix';
  return {
    [ns]: apiStoreFactory(ns, Object.keys(apis).reduce((stores, dataType) => {
      const { apiFactory, ...apiSettings } = apis[dataType];
      return {
        ...stores,
        [dataType]: {
          ...apiSettings,
          api: apiFactory({ dataType, ...apiSettings }),
        },
      };
    }, {})),
  };
};
