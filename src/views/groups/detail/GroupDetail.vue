<template>
  <v-container fluid>
    <pre>{{ group }}</pre>
    <br>
    <br>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GroupDetail',

  computed: {
    ...mapGetters('vuapix/groups', {
      group: 'groupDetail',
    }),
  },
};
</script>
