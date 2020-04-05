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
      :label="$t('pages.groupDetail.noResults.label')"
      :message="$t('pages.groupDetail.noResults.message')"
      :action-label="$t('pages.groupDetail.noResults.action')"
      @action:click="$router.push({ name: 'GroupsList' })"
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
  name: 'GroupDetail',

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
    ...mapGetters('vuapix/groups/groupDetail', {
      group: 'data',
      querying: 'querying',
      error: 'error',
    }),
    breadcrumbs() {
      return [{
        text: this.$t('pages.groupsList.title'),
        to: { name: 'GroupsList' },
      }, {
        text: this.group.name,
      }];
    },
  },

  methods: {
    ...mapActions('vuapix/groups/groupDetail', {
      fetch: 'doQuery',
    }),
    autoload() {
      return this.fetch({ id: this.id });
    },
  },
};
</script>
