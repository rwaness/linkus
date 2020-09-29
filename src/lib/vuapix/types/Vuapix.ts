// import { createNamespacedHelpers, NamespacedMappers } from 'vuex';
import { HashMap, VuapixPayload } from './types';
import VuapixModule from './VuapixModule';

/* eslint-disable no-underscore-dangle */
export default class Vuapix {
  private _ns = 'vuapix';

  // private _helpers: NamespacedMappers;

  private _module: VuapixModule;

  // TODO pass a type alias (allow multiple signatures)
  constructor({ namespace, apis }: VuapixPayload) {
    if (namespace) {
      this._ns = namespace;
    }

    // this._helpers = createNamespacedHelpers(this._ns);

    this._module = new VuapixModule(this._ns, apis);
  }

  public toStore(): HashMap<VuapixModule> {
    return {
      [this._ns]: this._module,
    };
  }
}
