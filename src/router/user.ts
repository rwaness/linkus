import UserPage from '@/pages/user.vue';
import UserProfilePage from '@/pages/user/profile/index.vue';
import UserAccountPage from '@/pages/user/account/index.vue';
import UserPreferencesPage from '@/pages/user/preferences/index.vue';

export default [{
  path: '/user',
  component: UserPage,
  children: [{
    path: '',
    name: 'UserProfilePage',
    component: UserProfilePage,
  }, {
    path: 'account',
    name: 'UserAccountPage',
    component: UserAccountPage,
  }, {
    path: 'preferences',
    name: 'UserPreferencesPage',
    component: UserPreferencesPage,
  }],
}];
