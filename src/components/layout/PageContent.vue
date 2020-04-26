<template>
  <vuapix-provider class="page-content fill-height"
    :entry="vuapixEntry"
    :params="vuapixParams"
    @vuapix:success="loaded = true"
  >
    <template v-slot="props">
      <loading-overlay
        :loading="!loaded || props.querying"
      ></loading-overlay>

      <slot
        v-if="loaded"
        v-bind="props"
      ></slot>
    </template>
  </vuapix-provider>
</template>

<script>
import { VuapixProvider } from '@/lib/vuapix';
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

  data() {
    return {
      loaded: false,
    };
  },
};
</script>
