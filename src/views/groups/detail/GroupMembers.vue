<template>
  <div>
    <pre>{{ group }}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GroupMembers',

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
