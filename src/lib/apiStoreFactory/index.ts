/**
 * TODO:
 * - lock while updating $items
 * - limit $items
 * - check existing data before query
 */

export const createDataViewStore = (ns, name, { single }) => ({
  namespaced: true,
  state: {
    key: single ? null : [],
    fetching: false,
    error: null,
  },
  getters: {
    data(state, getters, rootState, rootGetters) {
      return single
        ? rootGetters[`${ns}/item`](state.key) || null
        : state.key.map(rootGetters[`${ns}/item`]);
    },
    fetching: (state) => state.fetching,
    error: (state) => state.error,
  },
  actions: {
    async fetch({ commit, dispatch }, params) {
      try {
        commit('startFetching');
        const key = await dispatch(`${ns}/fetch`, { name, single, params }, { root: true });
        commit('endFetching', { key });
      } catch (error) {
        commit('catchError', { error });
      }
    },
  },
  mutations: {
    startFetching(state) {
      state.fetching = true;
      state.error = null;
    },
    endFetching(state, { key }) {
      state.key = key;
      state.fetching = false;
    },
    catchError(state, { error }) {
      state.error = error;
      state.fetching = false;
    },
  },
});

export const createDataTypeStore = (ns, dataType, { api, itemToKey }) => ({
  namespaced: true,
  state: {
    $items: {},
  },
  getters: {
    items: (state) => state.$items,
    item: (_, getters) => (key) => getters.items[key],
  },
  actions: {
    async fetch({ commit }, { name, params }) {
      const data = await api[name].fetch(params);
      const items = api[name].single ? [data] : data;
      const itemsByKey = Object.fromEntries(items.map((item) => ([itemToKey(item), item])));
      commit('addItems', { itemsByKey });
      const keys = Object.keys(itemsByKey);
      return api[name].single ? keys[0] : keys;
    },
  },
  mutations: {
    addItems(state, { itemsByKey }) {
      state.$items = {
        ...state.$items,
        ...itemsByKey,
      };
    },
  },
  modules: Object.keys(api).reduce((acc, name) => ({
    ...acc,
    [name]: createDataViewStore(`${ns}/${dataType}`, name, api[name]),
  }), {}),
});

export const createApiStore = (ns, apis) => ({
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
    [dataType]: createDataTypeStore(ns, dataType, apis[dataType]),
  }), {}),
});

export default createApiStore;
