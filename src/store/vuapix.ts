import vuapix from '@/lib/vuapix';
import users from '@/vuapix/users';
import groups from '@/vuapix/groups';
import apps from '@/vuapix/apps';

export default vuapix({
  users,
  groups,
  apps,
});
