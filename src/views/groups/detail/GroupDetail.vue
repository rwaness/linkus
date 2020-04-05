<template>
  <div>
    <pre>{{ group }}</pre>
    <br>
    <br>
  </div>
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
