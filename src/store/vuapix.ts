import vuapix from '@/lib/vuapix';
import { groupsApiFactory, getGroupId } from '@/apis/stitch/groups';
import { usersApiFactory, getUserId } from '@/apis/stitch/users';

export default vuapix({
  groups: {
    apiFactory: groupsApiFactory,
    itemToKey: getGroupId,
  },
  users: {
    apiFactory: usersApiFactory,
    itemToKey: getUserId,
  },
});
