import { Module, createNamespacedHelpers, NamespacedMappers } from 'vuex';
import {
  Dictionary,
  VuapixApi,
} from './types';
import VuapixModule from './VuapixModule';

interface VuapixPayload {
  namespace?: string;
  apis: Dictionary<VuapixApi<object>>;
}

/* eslint-disable no-underscore-dangle */
export default class Vuapix {
  private _ns = 'vuapix';

  private _helpers: NamespacedMappers;

  private _module: VuapixModule;

  // TODO pass a type alias (allow multiple signatures)
  constructor({ namespace, apis }: VuapixPayload) {
    if (namespace) {
      this._ns = namespace;
    }

    this._helpers = createNamespacedHelpers(this._ns);

    this._module = new VuapixModule(this._ns, apis);
  }

  public toStore(): Dictionary<VuapixModule> {
    return {
      [this._ns]: this._module,
    };
  }
}
