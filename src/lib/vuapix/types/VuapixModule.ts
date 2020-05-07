import { Module } from 'vuex';
import { RootStore, Dictionary, VuapixApi } from './types';
import VuapixApiModule from './VuapixApiModule';

export default class VuapixModule implements Module<{}, RootStore> {
  namespaced = true;

  state = {};

  getters = {};

  actions = {};

  mutations = {};

  modules: Dictionary<VuapixApiModule<any>> = {};

  constructor(ns: string, apis: Dictionary<VuapixApi<any>>) {
    Object.keys(apis).forEach((dataType) => {
      this.modules[dataType] = new VuapixApiModule(ns, dataType, apis[dataType]);
    });
  }
}
