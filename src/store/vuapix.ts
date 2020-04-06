import vuapix from '@/lib/vuapix';
import { groupsApiFactory, getGroupId, formatGroup } from '@/apis/stitch/groups';
import { usersApiFactory, getUserId, formatUser } from '@/apis/stitch/users';

export default vuapix({
  groups: {
    apiFactory: groupsApiFactory,
    itemToKey: getGroupId,
    formatItem: formatGroup,
  },
  users: {
    apiFactory: usersApiFactory,
    itemToKey: getUserId,
    formatItem: formatUser,
  },
});
