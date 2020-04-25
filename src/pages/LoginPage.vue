<template>
  <default-layout>
    <auth-view
      enable-login
      @authenticated="onAuthenticate"
    />
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthView from '@/components/layout/AuthView.vue';

export default {
  name: 'LoginPage',

  components: {
    AuthView,
    DefaultLayout,
  },

  methods: {
    onAuthenticate() {
      this.$router.push({ name: 'GroupsListPage' });
    },
  },
};
</script>
