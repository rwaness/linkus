import ApiOptions from './ApiOptions.d';
import Dictionnary from './Dictionnary.d';
import VuapixApiEntry from './VuapixApiEntry.d';

export default interface VuapixApi<T> extends ApiOptions {
  api: Dictionnary<VuapixApiEntry<T>>;
}
