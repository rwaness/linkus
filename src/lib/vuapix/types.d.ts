import { Store, Module, ActionContext } from 'vuex';

/*******************************************************
 * UTILS
 */
export interface Dictionary<T> {
  [key: string]: T;
}

type RootStore = Store<any>;


/*******************************************************
 * VUAPIX
 */
export interface VuapixState {
}

export interface VuapixModule extends Module<VuapixState, RootStore> {
  modules: Dictionary<VuapixApiModule<any>>;
}

export interface VuapixApiState<T> {
  items: Dictionary<T>
}

export interface VuapixApiModule<T> extends Module<VuapixApiState<T>, RootStore> {
  modules: Dictionary<VuapixEntryModule>;
}

export interface VuapixEntryState {
  key: string;
  querying: boolean;
  error: Error;
}

export interface VuapixEntryModule extends Module<VuapixEntryState, RootStore> {
}


/*******************************************************
 * API
 */
export interface ApiOptions {
  itemToKey: Function;
}

export interface VuapixApiEntry<T> {
  single: Boolean;
  doQuery: (arg: ApiOptions, storeCtx: ActionContext<VuapixApiState<T>, RootStore>) => Promise<T | T[]>;
}

export interface VuapixOptions {
  namespace?: string
  apis: Dictionary<Api<object>>
}

export interface Api<T> extends ApiOptions {
  apiFactory: (options: ApiOptions & { dataType: string }) => Dictionary<VuapixApiEntry<T>>;
}
