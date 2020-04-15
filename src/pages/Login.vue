<template>
  <default-layout>
    <auth-provider
      enable-login
      @authenticated="onAuthenticate"
    />
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthProvider from '@/lib/vue-mongodb-stitch/components/AuthProvider.vue';

export default {
  name: 'Login',

  components: {
    AuthProvider,
    DefaultLayout,
  },

  methods: {
    onAuthenticate() {
      this.$router.push({ name: 'GroupsList' });
    },
  },
};
</script>
