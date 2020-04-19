import { getId as itemToKey } from '@/services/mongodbStitchService';
import { formatUser as formatItem } from '@/apis/stitch/users/formatters';
import apiFactory from './factory';

export default {
  apiFactory,
  itemToKey,
  formatItem,
};
