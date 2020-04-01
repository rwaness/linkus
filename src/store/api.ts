import apiStoreFactory from '@/lib/apiStoreFactory';
import mongodbStitch from '@/services/mongodbStitch';
import createApi from '@/api/stitch/groups';

export default (name) => ({
  [name]: apiStoreFactory(name, {
    groups: {
      api: createApi({ mongodbStitch }),
      itemToKey: ({ _id: id }) => `${id}`,
    },
  }),
});