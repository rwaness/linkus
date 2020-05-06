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
export interface VuapixPayload {
  namespace?: string
  apis: Dictionary<VuapixApi<object>>
}

export interface VuapixApi<T> extends VuapixApiPayload {
  apiFactory: VuapixApiFactory<T>;
}

export interface VuapixApiPayload {
  itemToKey: Function;
}

export type VuapixApiFactory<T> = (payload: VuapixApiPayload & { dataType: string }) => Dictionary<VuapixApiEntry<T>>;


export interface VuapixApiEntry<T> {
  single: Boolean;
  doQuery: (payload: any, storeCtx: ActionContext<VuapixApiState<T>, RootStore>) => Promise<T | T[]>;
}
