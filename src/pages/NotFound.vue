<template>
  <default-layout class="not-found">
    <no-results
      icon="mdi-cloud-alert"
      :label="$t('pages.notFound.noResults.label')"
      :message="$t('pages.notFound.noResults.message')"
      :action-label="$t('pages.notFound.noResults.action')"
      @action:click="$router.push({ name: 'Home' })"
    />
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import NoResults from '@/components/util/NoResults.vue';

export default {
  name: 'NotFound',

  components: {
    DefaultLayout,
    NoResults,
  },
};
</script>
