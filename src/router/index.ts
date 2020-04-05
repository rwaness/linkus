import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import MyPreferences from '@/views/MyPreferences.vue';
import GroupsWrapper from '@/views/groups/GroupsWrapper.vue';
import GroupsList from '@/views/groups/GroupsList.vue';
import GroupDetailWrapper from '@/views/groups/GroupDetailWrapper.vue';
import GroupDetail from '@/views/groups/detail/GroupDetail.vue';
import GroupMembers from '@/views/groups/detail/GroupMembers.vue';
import MemberProfile from '@/views/MemberProfile.vue';
import GroupPlugins from '@/views/groups/detail/GroupPlugins.vue';
import GroupSettings from '@/views/groups/detail/GroupSettings.vue';
import NotFound from '@/views/NotFound.vue';

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
  path: '/members/:memberId',
  name: 'MemberProfile',
  component: MemberProfile,
  props: true,
}, {
  path: '/my-preferences',
  name: 'MyPreferences',
  component: MyPreferences,
}, {
  path: '/groups',
  component: GroupsWrapper,
  children: [{
    path: '',
    name: 'GroupsList',
    component: GroupsList,
  }, {
    path: ':groupId',
    component: GroupDetailWrapper,
    props: true,
    children: [{
      path: '',
      name: 'GroupDetail',
      component: GroupDetail,
    }, {
      path: 'members',
      name: 'GroupMembers',
      component: GroupMembers,
    }, {
      path: 'plugins',
      name: 'GroupPlugins',
      component: GroupPlugins,
    }, {
      path: 'settings',
      name: 'GroupSettings',
      component: GroupSettings,
    }],
  }],
}, {
  path: '/about',
  name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
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
