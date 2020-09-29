import { ActionContext } from 'vuex';
import { Store, VuapixApiPayload, ApiState } from './types';
import { Result } from './Result';


export type ApiResponse<T> = T | T[] | Result<T> | null;

/**
 * todo :
 *  - rename interface to Entry
 *  - create class VuapixEntry
 */
export interface VuapixEntry<T> {
  cache?: number;
  single?: boolean;
  doQuery: (payload: any, context: VuapixEntryCtx<T>) => Promise<ApiResponse<T>>;
}

export interface VuapixEntryCtx<T> extends VuapixApiPayload {
  $store: ActionContext<ApiState<T>, Store>;
}
