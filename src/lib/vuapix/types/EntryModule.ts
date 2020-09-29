import {
  Module,
  GetterTree,
  ActionTree,
  MutationTree,
} from 'vuex';
import {
  Store,
  VuapixEntry,
  EntryState,
} from './types';


/* eslint-disable no-underscore-dangle */
export default class EntryModule implements Module<EntryState, Store> {
  private _initialState: EntryState;

  namespaced = true;

  state: EntryState;

  getters: GetterTree<EntryState, Store>;

  actions: ActionTree<EntryState, Store>;

  mutations: MutationTree<EntryState>;

  constructor(ns: string, entryName: string, entry: VuapixEntry<any>) {
    this._initialState = {
      uIds: null,
      querying: false,
      error: null,
    };

    this.state = { ...this._initialState };

    this.getters = {
      data: (__, ___, ____, rootGetters) => rootGetters[`${ns}/${entryName}`],
      querying: (state) => state.querying,
      error: (state) => state.error,
    };

    this.actions = {
      doQuery: ({ dispatch }, params) => dispatch(`${ns}/${entryName}`, params, { root: true }),
    };

    this.mutations = {
      reset: (state) => {
        Object.keys(state).forEach((field) => {
          state[field] = this._initialState[field];
        });
      },
      startQuerying: (state) => {
        state.querying = true;
        state.error = null;
      },
      endQuerying: (state, { uIds }) => {
        state.uIds = uIds;
        state.querying = false;
      },
      catchError: (state, { error }) => {
        state.error = error;
        state.querying = false;
      },
      ...(entry.single ? {} : {
        addUid: (state, { uId }) => {
          state.uIds = [uId, ...state.uIds];
        },
        removeUid: (state, { uId }) => {
          state.uIds = state.uIds.filter((k) => k !== uId);
        },
      }),
    };
  }
}
