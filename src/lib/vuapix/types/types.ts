import { Store, ActionContext } from 'vuex';

/*******************************************************
 * UTILS
 */
export interface Dictionary<T> {
  [key: string]: T;
}

export type RootStore = Store<any>;


/*******************************************************
 * VUAPIX
 */

export interface VuapixApiState<T> {
  items: Dictionary<T>
}


/*******************************************************
 * API
 */

export interface VuapixApiPayload {
  itemToKey: Function;
}

export interface VuapixApi<T> extends VuapixApiPayload {
  entries: Dictionary<VuapixApiEntry<T>>;
}

export interface VuapixApiEntry<T> {
  single: Boolean;
  doQuery: (payload: any, context: VuapixApiEntryCtx<T>) => Promise<T | T[]>;
}

export interface VuapixApiEntryCtx<T> {
  vuapixCtx: VuapixApiPayload;
  storeCtx: ActionContext<VuapixApiState<T>, RootStore>;
}
