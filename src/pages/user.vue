<template>
  <default-layout class="user-profile">
    <auth-view enable-login>
      <template v-slot="{ user }">
        <router-view :user="user"></router-view>

        <bottom-nav :nav-items="navItems" />
      </template>
    </auth-view>
  </default-layout>
</template>

<script>
import AuthView from '@/components/layout/AuthView.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import BottomNav from '@/components/layout/BottomNav.vue';

export default {
  name: 'UserPage',

  components: {
    AuthView,
    DefaultLayout,
    BottomNav,
  },

  data() {
    return {
      navItems: [{
        icon: 'mdi-home-account',
        text: this.$t('pages.user.nav.profile'),
        to: { name: 'UserProfilePage' },
        exact: true,
      }, {
        icon: 'mdi-account-key',
        text: this.$t('pages.user.nav.account'),
        to: { name: 'UserAccountPage' },
      }, {
        icon: 'mdi-account-cog',
        text: this.$t('pages.user.nav.preferences'),
        to: { name: 'UserPreferencesPage' },
      }],
    };
  },
};
</script>
