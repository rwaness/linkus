<template>
  <default-layout class="groups-wrapper">
    <auth-view
      class="fill-height"
      enable-login
    >
      <page-content
        class="member-profile"
        :autoload="autoload"
        :loading="querying"
      >
        <div class="error">{{ error }}</div>
        <pre>{{ user }}</pre>
      </page-content>
    </auth-view>
  </default-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import PageContent from '@/components/wrapper/PageContent.vue';

export default {
  name: 'MemberProfile',

  components: {
    AuthView,
    DefaultLayout,
    PageContent,
  },

  props: {
    memberId: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters('vuapix/users/userDetail', {
      user: 'data',
      querying: 'querying',
      error: 'error',
    }),
  },

  methods: {
    ...mapActions('vuapix/users/userDetail', {
      autoload: 'doQuery',
    }),
  },
};
</script>
