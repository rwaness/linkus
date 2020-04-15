<template>
  <default-layout class="user-profile">
    <auth-provider enable-login>
      <template v-slot="{ user }">
        <router-view :user="user"></router-view>

        <bottom-nav :nav-items="navItems" />
      </template>
    </auth-provider>
  </default-layout>
</template>

<script>
import AuthProvider from '@/lib/vue-mongodb-stitch/components/AuthProvider.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import BottomNav from '@/components/layout/BottomNav.vue';

export default {
  name: 'User',

  components: {
    AuthProvider,
    DefaultLayout,
    BottomNav,
  },

  data() {
    return {
      navItems: [{
        icon: 'mdi-home-account',
        text: this.$t('pages.user.nav.profile'),
        to: { name: 'UserProfile' },
        exact: true,
      }, {
        icon: 'mdi-account-group',
        text: this.$t('pages.user.nav.groups'),
        to: { name: 'GroupsList' },
      }, {
        icon: 'mdi-account-key',
        text: this.$t('pages.user.nav.account'),
        to: { name: 'UserAccount' },
      }, {
        icon: 'mdi-account-cog',
        text: this.$t('pages.user.nav.preferences'),
        to: { name: 'UserPreferences' },
      }],
    };
  },
};
</script>
