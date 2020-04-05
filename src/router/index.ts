import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import MyPreferences from '@/views/MyPreferences.vue';
import GroupsWrapper from '@/views/groups/GroupsWrapper.vue';
import GroupsList from '@/views/groups/GroupsList.vue';
import GroupDetail from '@/views/groups/GroupDetail.vue';
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
  path: '/my-preferences',
  name: 'MyPreferences',
  component: MyPreferences,
}, {
  path: '/my-groups',
  component: GroupsWrapper,
  children: [{
    path: '',
    name: 'GroupsList',
    component: GroupsList,
  }, {
    path: ':id',
    name: 'GroupDetail',
    component: GroupDetail,
    props: true,
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
