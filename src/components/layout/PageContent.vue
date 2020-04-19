<template>
  <vuapix-provider class="page-content fill-height"
    :entry="vuapixEntry"
    :params="vuapixParams"
  >
    <template v-slot:loader="{ loading }">
      <loading-overlay :loading="loading" />
    </template>

    <template v-slot="props">
      <slot v-bind="props"></slot>
    </template>
  </vuapix-provider>
</template>

<script>
import VuapixProvider from '@/lib/vuapix/components/VuapixProvider.vue';
import LoadingOverlay from '@/components/ui/LoadingOverlay.vue';

export default {
  name: 'PageContent',

  components: {
    VuapixProvider,
    LoadingOverlay,
  },

  props: {
    vuapixEntry: {
      type: String,
      required: true,
    },
    vuapixParams: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
