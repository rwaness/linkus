import Vue from 'vue';
import Vuex from 'vuex';
import vuapix from './vuapix';

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
    ...vuapix.toStore(),
  },
});
