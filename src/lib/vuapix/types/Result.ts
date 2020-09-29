import { HashMap, ItemToUid } from './types';


/** *****************************************************
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
