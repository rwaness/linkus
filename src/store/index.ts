import Vue from 'vue';
import Vuex from 'vuex';
import apiStoreFactory from './api';

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
    ...apiStoreFactory('api'),
  },
});
