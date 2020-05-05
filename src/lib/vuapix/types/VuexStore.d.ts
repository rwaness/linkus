import Dictionnary from './Dictionnary';

type VuexState = Dictionnary<any>;
type VuexGetters = Dictionnary<any>;

export interface VuexStoreCtx {
  state: VuexState;
  rootState: VuexState;
  commit: (mutationName: string, payload: any) => void;
  dispatch: (actionName: string, payload: any, { root: boolean }) => Promise<any>;
  getters: VuexGetters;
  rootGetters: VuexGetters;
}

export default interface VuexStore {
  namespaced: Boolean;
  state: VuexState | (() => VuexState);
  getters: Dictionnary<(
    state: VuexState,
    getters: VuexGetters,
    rootState: VuexState,
    rootGetters: VuexGetters,
  ) => any>;
  actions: Dictionnary<(
    storeCtx: VuexStoreCtx,
    payload: any,
  ) => any>
  mutations: Dictionnary<(
    state: VuexState,
    payload: any,
  ) => void>;
  modules?: Dictionnary<VuexStore>;
}
