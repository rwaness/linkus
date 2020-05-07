import { Module, createNamespacedHelpers, NamespacedMappers } from 'vuex';
import {
  Dictionary,
  RootStore,
  VuapixApi,
} from './types';
import VuapixApiModule from './VuapixApiModule';

interface VuapixPayload {
  namespace?: string;
  apis: Dictionary<VuapixApi<object>>;
}

interface VuapixModule extends Module<{}, RootStore> {
  modules: Dictionary<VuapixApiModule<any>>;
}

/* eslint-disable no-underscore-dangle */
export default class Vuapix {
  private _ns = 'vuapix';

  private _helpers: NamespacedMappers;

  private _store: VuapixModule = {
    namespaced: true,
    state: {},
    getters: {},
    actions: {},
    mutations: {},
    modules: {},
  };

  // TODO pass a type alias (allow multiple signatures)
  constructor({ namespace, apis }: VuapixPayload) {
    if (namespace) {
      this._ns = namespace;
    }

    this._helpers = createNamespacedHelpers(this._ns);

    this.addApis(apis);
  }

  get ns(): string {
    return this._ns;
  }

  public addApis(apis: Dictionary<VuapixApi<any>>): void {
    Object.keys(apis).forEach((dataType) => this.addApi<any>(dataType, apis[dataType]));
  }

  public addApi<T>(dataType: string, api: VuapixApi<T>): void {
    this._store.modules[dataType] = new VuapixApiModule(this._ns, dataType, api);
  }

  public toStore(): Dictionary<VuapixModule> {
    return {
      [this._ns]: this._store,
    };
  }
}
