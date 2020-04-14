import GroupsList from '@/pages/groups/list/index.vue';
import Group from '@/pages/groups/_groupId.vue';
import GroupOverview from '@/pages/groups/_groupId/overview/index.vue';
import GroupMembers from '@/pages/groups/_groupId/members/index.vue';
import MemberProfile from '@/pages/groups/_groupId/members/_memberId.vue';
import GroupPlugins from '@/pages/groups/_groupId/plugins/index.vue';
import GroupSettings from '@/pages/groups/_groupId/settings/index.vue';

export default [{
  path: '/groups',
  name: 'GroupsList',
  component: GroupsList,
}, {
  path: '/groups/:groupId',
  component: Group,
  props: true,
  children: [{
    path: '',
    name: 'GroupOverview',
    component: GroupOverview,
  }, {
    path: 'members',
    name: 'GroupMembers',
    component: GroupMembers,
  }, {
    path: 'members/:memberId',
    name: 'MemberProfile',
    component: MemberProfile,
    props: true,
  }, {
    path: 'plugins',
    name: 'GroupPlugins',
    component: GroupPlugins,
  }, {
    path: 'settings',
    name: 'GroupSettings',
    component: GroupSettings,
  }],
}];
