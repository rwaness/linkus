import AppsList from '@/pages/apps/list/index.vue';
import AppDetail from '@/pages/apps/detail/index.vue';

export default [{
  path: '/apps',
  name: 'AppsList',
  component: AppsList,
}, {
  path: '/apps/:appId',
  name: 'AppDetail',
  component: AppDetail,
  props: true,
}];
