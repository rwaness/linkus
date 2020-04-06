<template>
  <default-layout class="groups-wrapper">
    <auth-view
      class="fill-height"
      enable-login
    >
      <router-view></router-view>
    </auth-view>
  </default-layout>
</template>

<script>
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

export default {
  name: 'Groups',

  components: {
    AuthView,
    DefaultLayout,
  },
};
</script>
