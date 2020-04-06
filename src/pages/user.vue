<template>
  <default-layout class="user-profile">
    <auth-view enable-login>
      <template v-slot="{ user }">
        <pages-hub
          :breadcrumbs="breadcrumbs"
          :nav-items="navItems"
        >
          <router-view :user="user"></router-view>
        </pages-hub>
      </template>
    </auth-view>
  </default-layout>
</template>

<script>
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import PagesHub from '@/components/layout/PagesHub.vue';

export default {
  name: 'UserProfile',

  components: {
    AuthView,
    DefaultLayout,
    PagesHub,
  },

  data() {
    return {
      breadcrumbs: [{
        text: this.$t('pages.userProfile.title'),
        to: { name: 'UserProfile' },
      }],
      navItems: [{
        icon: 'mdi-account',
        text: this.$t('pages.userProfile.nav.profile'),
        to: { name: 'UserProfile' },
        exact: true,
      }, {
        icon: 'mdi-account',
        text: this.$t('pages.userProfile.nav.account'),
        to: { name: 'UserAccount' },
      }, {
        icon: 'mdi-account-cog',
        text: this.$t('pages.userProfile.nav.preferences'),
        to: { name: 'UserPreferences' },
      }],
    };
  },
};
</script>
