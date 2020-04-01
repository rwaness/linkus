<template>
  <default-layout class="groups-wrapper">
    <auth-view
      class="fill-height"
      enable-login
    >
      <template v-slot="{ user }">
        <router-view :user="user"></router-view>
      </template>
    </auth-view>
  </default-layout>
</template>

<script>
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

export default {
  name: 'GroupsWrapper',

  components: {
    AuthView,
    DefaultLayout,
  },
};
</script>
