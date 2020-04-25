import GroupsListPage from '@/pages/groups/list/index.vue';
import GroupPage from '@/pages/groups/_groupId.vue';
import GroupOverviewPage from '@/pages/groups/_groupId/overview/index.vue';
import GroupMembersPage from '@/pages/groups/_groupId/members/index.vue';
import MemberProfilePage from '@/pages/groups/_groupId/members/_memberId.vue';
import GroupPluginsPage from '@/pages/groups/_groupId/plugins/index.vue';
import GroupSettingsPage from '@/pages/groups/_groupId/settings/index.vue';

export default [{
  path: '/groups',
  name: 'GroupsListPage',
  component: GroupsListPage,
}, {
  path: '/groups/:groupId',
  component: GroupPage,
  props: true,
  children: [{
    path: '',
    name: 'GroupOverviewPage',
    component: GroupOverviewPage,
  }, {
    path: 'members',
    name: 'GroupMembersPage',
    component: GroupMembersPage,
  }, {
    path: 'members/:memberId',
    name: 'MemberProfilePage',
    component: MemberProfilePage,
    props: true,
  }, {
    path: 'plugins',
    name: 'GroupPluginsPage',
    component: GroupPluginsPage,
  }, {
    path: 'settings',
    name: 'GroupSettingsPage',
    component: GroupSettingsPage,
  }],
}];
