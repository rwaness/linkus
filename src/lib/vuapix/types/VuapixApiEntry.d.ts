import { VuexStoreCtx } from './VuexStore.d';
import ApiOptions from './ApiOptions.d';

export default interface VuapixApiEntry<T> {
  single: Boolean;
  doQuery: (arg: ApiOptions, storeCtx: VuexStoreCtx) => Promise<T | T[]>;
}
