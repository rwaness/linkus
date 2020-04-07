<template>
  <default-layout class="user-profile">
    <auth-view enable-login>
      <template v-slot="{ user }">
        <hub-page
          v-if="user"
          :breadcrumbs="breadcrumbs"
          :nav-items="navItems"
        >
          <router-view :user="user"></router-view>
        </hub-page>
      </template>
    </auth-view>
  </default-layout>
</template>

<script>
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import HubPage from '@/components/layout/HubPage.vue';

export default {
  name: 'User',

  components: {
    AuthView,
    DefaultLayout,
    HubPage,
  },

  data() {
    return {
      navItems: [{
        icon: 'mdi-home-account',
        text: this.$t('pages.user.nav.profile'),
        to: { name: 'UserProfile' },
        exact: true,
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

  computed: {
    user() {
      return this.$mongodbStitch.user;
    },
    breadcrumbs() {
      return this.user
        ? [{
          text: this.user.customData.profile.name,
          to: { name: 'UserProfile' },
        }]
        : [];
    },
  },
};
</script>
