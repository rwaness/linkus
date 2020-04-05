import vuapix from '@/lib/vuapix';
import { groupsApiFactory, getGroupId } from '@/apis/stitch/groups';

export default vuapix({
  groups: {
    apiFactory: groupsApiFactory,
    itemToKey: getGroupId,
  },
});
