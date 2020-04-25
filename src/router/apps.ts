import AppsListPage from '@/pages/apps/list/index.vue';
import AppDetailPage from '@/pages/apps/detail/index.vue';

export default [{
  path: '/apps',
  name: 'AppsListPage',
  component: AppsListPage,
}, {
  path: '/apps/:appId',
  name: 'AppDetailPage',
  component: AppDetailPage,
  props: true,
}];
