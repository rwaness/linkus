<template>
  <page-content
    class="member-profile"
    :autoload="autoload"
    :loading="querying"
  >
    <div class="error">{{ error }}</div>
    <pre>{{ user }}</pre>
  </page-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PageContent from '@/components/layout/PageContent.vue';

export default {
  name: 'MemberProfile',

  components: {
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
