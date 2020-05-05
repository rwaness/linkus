import Dictionnary from './Dictionnary.d';
import Api from './Api.d';

export default interface VuapixOptions {
  namespace?: string
  apis: Dictionnary<Api<object>>
}
