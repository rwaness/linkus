<template>
  <div>
    DETAIL
    <pre>{{ group }}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GroupDetail',

  props: {
    id: String,
  },

  computed: {
    ...mapGetters('vuapix/groups', {
      group: 'groupDetail',
    }),
  },
};
</script>
