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
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';

export default {
  name: 'Login',

  components: {
    AuthView,
    DefaultLayout,
  },

  methods: {
    onAuthenticate() {
      this.$router.push({ name: 'GroupsList' });
    },
  },
};
</script>
