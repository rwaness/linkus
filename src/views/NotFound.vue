<template>
  <default-layout class="not-found">
    <no-results
      class="fill-height"
      icon="mdi-cloud-alert"
      :label="$t('pages.notFound.noResults.label')"
      :message="$t('pages.notFound.noResults.message')"
      :action-label="$t('pages.notFound.noResults.action')"
      @click:action="$router.push({ name: 'Home' })"
    />
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import NoResults from '@/components/list/NoResults.vue';

export default {
  name: 'NotFound',

  components: {
    DefaultLayout,
    NoResults,
  },
};
</script>
