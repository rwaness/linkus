import Vue from 'vue';
import Vuex from 'vuex';
import vuapixStore from './vuapix';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  actions: {
  },
  mutations: {
  },
  modules: {
    ...vuapixStore,
  },
});
