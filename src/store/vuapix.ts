import vuapix from '@/lib/vuapix';
import { groupsApi, groupIdToString } from '@/apis/stitch/groups';

export default vuapix({
  groups: {
    api: groupsApi,
    itemToKey: groupIdToString,
  },
});
