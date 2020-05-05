import VuapixApi from './VuapixApi.d';
import ApiOptions from './ApiOptions.d';

export default interface Api<T> extends ApiOptions {
  apiFactory: (options: ApiOptions & { dataType: string }) => VuapixApi<T>;
}
