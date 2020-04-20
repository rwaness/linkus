import ApiOptions from './ApiOptions.d';

export default interface VuapixApiEntry<T> {
  single: Boolean;
  doQuery: (arg: ApiOptions) => T | T[];
}
