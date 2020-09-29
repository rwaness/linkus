import { Store as VuexStore, ActionContext } from 'vuex';

/* eslint max-classes-per-file: ["error", 5] */
/* eslint-disable no-underscore-dangle,class-methods-use-this */


/**
 * ***********************************************************************************************
 * ***********************************************************************************************
 * API (external)
 */
export interface VuapixPayload {
  namespace?: string;
  apis: HashMap<VuapixApi<any>>;
}

// todo rename
export interface VuapixApiPayload {
  itemToUid: ItemToUid;
}

export interface VuapixApi<T> extends VuapixApiPayload {
  entries: HashMap<VuapixEntry<T>>;
}

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


/**
 * ***********************************************************************************************
 * ***********************************************************************************************
 * STORE (internal)
 */
export interface ApiState<T> extends HashMap<any> {
  _ckeys: HashMap<CacheRes>;
  _items: HashMap<T>;
}

export interface EntryState {
  uIds: Uid | Uid[] | null;
  querying: boolean;
  error: Error | null;
}

export class CacheRes {
  uIds: Uid[];

  // ttl: Date;

  constructor(uIds: Uid[]) {
    this.uIds = uIds;
  }
}


/**
 * ***********************************************************************************************
 * ***********************************************************************************************
 * UTILS
 */
export interface HashMap<T> {
  [key: string]: T;
}

export type Store = VuexStore<any>;

export type Uid = string;
export type Ckey = string;

export type ItemToUid = (item: any) => Uid;

export type ApiResponse<T> = T | T[] | Result<T> | null;


/**
 * ***********************************************************************************************
 * ***********************************************************************************************
 * RESULT
 */
export class Result<T> {
  data: T | T[] | null;

  constructor(data: T | T[] | null = null) {
    this.data = data;
  }

  toItemsMap(itemToUid: ItemToUid): HashMap<T> {
    return {};
  }
}

export class VuapixSingleResult<T> extends Result<T> {
  data: T;

  constructor(data: T) {
    super(data);
    this.data = data;
  }

  public toItemsMap(itemToUid: ItemToUid): HashMap<T> {
    return { [itemToUid(this.data)]: this.data };
  }
}

export class VuapixMultipleResult<T> extends Result<T> {
  data: T[];

  constructor(data: T[]) {
    super(data);
    this.data = data;
  }

  public toItemsMap(itemToUid: ItemToUid): HashMap<T> {
    return this.data.reduce((map, item) => ({
      ...map,
      ...(item ? { [itemToUid(item)]: item } : {}),
    }), {});
  }
}

export function resultFactory<T>(response: ApiResponse<T>): Result<T> {
  // if (!isResult(response)) {
  if (!(response instanceof Result)) {
    if (Array.isArray(response)) {
      return new VuapixMultipleResult(response);
    }
    if (response !== null) {
      return new VuapixSingleResult(response);
    }
    return new Result();
  }
  return response;
}
