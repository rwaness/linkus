import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import userRouter from './user';
import groupsRouter from './groups';
import appsRouter from './apps';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'HomePage',
  component: HomePage,
}, {
  path: '/login',
  name: 'LoginPage',
  component: LoginPage,
},
...userRouter,
...groupsRouter,
...appsRouter,
{
  path: '*',
  name: 'NotFoundPage',
  component: NotFoundPage,
}];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
