<template>
  <div>
    <pre>{{ group }}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GroupPlugins',

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
