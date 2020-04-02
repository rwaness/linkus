import { mapGetters } from 'vuex';

export const dataViewStoreFactory = (ns, name, { single }) => ({
  namespaced: true,
  state: {
    key: single ? null : [],
    querying: false,
    error: null,
  },
  getters: {
    data(state, getters, rootState, rootGetters) {
      return single
        ? rootGetters[`${ns}/item`](state.key) || null
        : state.key.map(rootGetters[`${ns}/item`]);
    },
    querying: (state) => state.querying,
    error: (state) => state.error,
  },
  actions: {
    async doQuery({ commit, dispatch, getters }, params) {
      try {
        commit('startFetching');
        const key = await dispatch(`${ns}/doQuery`, { name, single, params }, { root: true });
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
    $items: {},
  },
  getters: {
    items: (state) => state.$items,
    item: (_, getters) => (key) => getters.items[key],
  },
  actions: {
    async doQuery({ commit }, { name, params }) {
      const data = await api[name].doQuery(params);
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
    [name]: dataViewStoreFactory(`${ns}/${dataType}`, name, api[name]),
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
