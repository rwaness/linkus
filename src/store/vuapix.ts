import vuapix from '@/lib/vuapix';
import mongodbStitch from '@/services/mongodbStitch';
import { createApi, itemToKey } from '@/api/stitch/groups';

export default vuapix({
  groups: {
    api: createApi({ mongodbStitch }),
    itemToKey,
  },
});
