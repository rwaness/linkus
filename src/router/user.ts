import User from '@/pages/user.vue';
import UserProfile from '@/pages/user/profile/index.vue';
import UserAccount from '@/pages/user/account/index.vue';
import UserPreferences from '@/pages/user/preferences/index.vue';

export default [{
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
}];
