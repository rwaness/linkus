<template>
  <page-content
    class="my-group"
    :autoload="autoload"
    :loading="querying"
  >
    <no-results
      v-if="!group"
      class="fill-height"
      icon="mdi-account-group"
      :label="$t('pages.myGroup.noResults.label')"
      :message="$t('pages.myGroup.noResults.message')"
      :action-label="$t('pages.myGroup.noResults.action')"
      @action:click="$router.push({ name: 'MyGroups' })"
    />

    <template v-else>
      <breadcrumbs :items="breadcrumbs" />

      <pre>{{ group }}</pre>
    </template>
  </page-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PageContent from '@/components/wrapper/PageContent.vue';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue';
import NoResults from '@/components/util/NoResults.vue';

export default {
  name: 'MyGroup',

  components: {
    PageContent,
    Breadcrumbs,
    NoResults,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters('vuapix/groups/myGroup', {
      group: 'data',
      querying: 'querying',
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

  methods: {
    ...mapActions('vuapix/groups/myGroup', {
      fetch: 'doQuery',
    }),
    autoload() {
      return this.fetch({ id: this.id });
    },
  },
};
</script>
