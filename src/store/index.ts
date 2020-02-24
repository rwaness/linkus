import Vue from 'vue';
import Vuex from 'vuex';
import stitch from './stitch';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  getters: {
    user: (state, getters, rootState) => rootState['stitch/user'],
  },
  actions: {
  },
  mutations: {
  },
  modules: {
    stitch,
  },
});
