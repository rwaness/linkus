import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/pages/Home.vue';
import Login from '@/pages/Login.vue';
import User from '@/pages/user.vue';
import UserProfile from '@/pages/user/profile.vue';
import UserAccount from '@/pages/user/account.vue';
import UserPreferences from '@/pages/user/preferences.vue';
import GroupsList from '@/pages/groups/list/index.vue';
import Group from '@/pages/groups/_groupId.vue';
import GroupHome from '@/pages/groups/_groupId/home/index.vue';
import GroupMembers from '@/pages/groups/_groupId/members.vue';
import GroupMembersList from '@/pages/groups/_groupId/members/index.vue';
import MemberProfile from '@/pages/groups/_groupId/members/_memberId.vue';
import GroupPlugins from '@/pages/groups/_groupId/plugins/index.vue';
import GroupSettings from '@/pages/groups/_groupId/settings/index.vue';
import NotFound from '@/pages/NotFound.vue';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
}, {
  path: '/login',
  name: 'Login',
  component: Login,
}, {
  path: '/user',
  component: User,
  children: [{
    path: '',
    name: 'UserProfile',
    component: UserProfile,
  }, {
    path: 'account',
    name: 'UserAccount',
    component: UserAccount,
  }, {
    path: 'preferences',
    name: 'UserPreferences',
    component: UserPreferences,
  }],
}, {
  path: '/groups',
  name: 'GroupsList',
  component: GroupsList,
}, {
  path: '/groups:groupId',
  component: Group,
  props: true,
  children: [{
    path: '',
    name: 'GroupHome',
    component: GroupHome,
  }, {
    path: 'members',
    component: GroupMembers,
    children: [{
      path: '',
      name: 'GroupMembersList',
      component: GroupMembersList,
    }, {
      path: ':memberId',
      name: 'MemberProfile',
      component: MemberProfile,
      props: true,
    }],
  }, {
    path: 'plugins',
    name: 'GroupPlugins',
    component: GroupPlugins,
  }, {
    path: 'settings',
    name: 'GroupSettings',
    component: GroupSettings,
  }],
}, {
  path: '/about',
  name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '@/pages/About.vue'),
}, {
  path: '*',
  name: 'NotFound',
  component: NotFound,
}];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
