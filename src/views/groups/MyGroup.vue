<template>
  <!-- TODO 404 -->
  <div v-if="group" class="my-group fill-height" >
    <breadcrumbs :items="breadcrumbs" />

    <pre>{{ group }}</pre>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue';

export default {
  name: 'MyGroup',

  components: {
    Breadcrumbs,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters('vuapix/groups/myGroup', {
      group: 'data',
      fetching: 'fetching',
      error: 'error',
    }),
    breadcrumbs() {
      return [{
        text: this.$t('pages.myGroups.title'),
        to: { name: 'MyGroups' },
      }, {
        text: this.group.name,
      }];
    },
  },

  created() {
    this.fetch({ _id: this.id });
  },

  methods: {
    ...mapActions('vuapix/groups/myGroup', [
      'fetch',
    ]),
  },
};
</script>
