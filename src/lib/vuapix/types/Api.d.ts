import Dictionnary from './Dictionnary.d';
import VuapixApiEntry from './VuapixApiEntry.d';
import ApiOptions from './ApiOptions.d';

export default interface Api<T> extends ApiOptions {
  apiFactory: (options: ApiOptions & { dataType: string }) => Dictionnary<VuapixApiEntry<T>>;
}
