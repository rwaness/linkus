import Dictionnary from './Dictionnary';

export default class VuexStore {
  namespaced: Boolean;

  state: object;

  getters: object;

  actions: object;

  mutations: object;

  modules: Dictionnary<VuexStore>;

  constructor({
    namespaced = true,
    state = () => ({}),
    getters = {},
    actions = {},
    mutations = {},
    modules = {},
  } = {}) {
    this.namespaced = namespaced;
    this.state = state;
    this.getters = getters;
    this.actions = actions;
    this.mutations = mutations;
    this.modules = modules;
  }
}
