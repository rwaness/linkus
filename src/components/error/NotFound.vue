<template>
  <no-results
    icon="mdi-cloud-alert"
    :label="$t('pages.notFound.noResults.label')"
    :message="$t('pages.notFound.noResults.message')"
    :action-label="$t('pages.notFound.noResults.action')"
    @action:click="$router.push({ name: 'HomePage' })"
  ></no-results>
</template>

<script>
import NoResults from '@/components/layout/NoResults.vue';

export default {
  name: 'NotFound',

  components: {
    NoResults,
  },
};
</script>
