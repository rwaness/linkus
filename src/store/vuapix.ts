import Vuapix from '@/lib/vuapix';
import users from '@/vuapix/users';
import groups from '@/vuapix/groups';
import apps from '@/vuapix/apps';

export default new Vuapix({
  apis: {
    users,
    groups,
    apps,
  },
});
