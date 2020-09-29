import { Module } from 'vuex';
import { Store, HashMap, VuapixApi } from './types';
import ApiModule from './ApiModule';

export default class VuapixModule implements Module<{}, Store> {
  namespaced = true;

  state = {};

  getters = {};

  actions = {};

  mutations = {};

  modules: HashMap<ApiModule<any>> = {};

  constructor(ns: string, apis: HashMap<VuapixApi<any>>) {
    Object.keys(apis).forEach((dataType) => {
      this.modules[dataType] = new ApiModule(ns, dataType, apis[dataType]);
    });
  }
}
