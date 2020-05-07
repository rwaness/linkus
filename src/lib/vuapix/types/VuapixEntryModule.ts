import {
  Module,
  GetterTree,
  ActionTree,
  MutationTree,
} from 'vuex';
import {
  RootStore,
  VuapixApiEntry,
} from './types';

interface VuapixEntryState {
  key: string;
  querying: boolean;
  error: Error;
}

/* eslint-disable no-underscore-dangle */
export default class VuapixEntryModule implements Module<VuapixEntryState, RootStore> {
  private _initialState: VuapixEntryState;

  namespaced = true;

  state: VuapixEntryState | (() => VuapixEntryState);

  getters: GetterTree<VuapixEntryState, RootStore>;

  actions: ActionTree<VuapixEntryState, RootStore>;

  mutations: MutationTree<VuapixEntryState>;

  constructor(ns: string, entryName: string, entry: VuapixApiEntry<any>) {
    this._initialState = {
      key: null,
      querying: false,
      error: null,
      ...(entry.single ? {} : { key: [] }),
    };

    this.state = () => ({ ...this._initialState });

    this.getters = {
      data: (__, ___, ____, rootGetters) => rootGetters[`${ns}/${entryName}`],
      querying: (state) => state.querying,
      error: (state) => state.error,
    };

    this.actions = {
      doQuery: ({ dispatch }, params) => dispatch(`${ns}/${entryName}`, params, { root: true }),
    };

    this.mutations = {
      reset(state) {
        Object.keys(state).forEach((field) => {
          state[field] = this._initialState[field];
        });
      },
      startQuerying(state) {
        state.querying = true;
        state.error = null;
      },
      endQuerying(state) {
        state.querying = false;
      },
      catchError(state, { error }) {
        state.error = error;
        state.querying = false;
      },
      updateKey(state, { key }) {
        state.key = key;
      },
      ...(entry.single ? {} : {
        addKey(state, { key }) {
          state.key = [key, ...state.key];
        },
        removeKey(state, { key }) {
          state.key = state.key.filter((k) => k !== key);
        },
      }),
    };
  }
}
