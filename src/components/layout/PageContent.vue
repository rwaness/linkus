<template>
  <vuapix-wrapper class="page-content fill-height"
    :entry="vuapixEntry"
    :params="vuapixParams"
  >
    <loading-overlay slot="loader" :loading="true" />

    <template v-slot="props">
      <slot v-bind="props"></slot>
    </template>
  </vuapix-wrapper>
</template>

<script>
import VuapixWrapper from '@/lib/vuapix/components/VuapixWrapper.vue';
import LoadingOverlay from '@/components/util/LoadingOverlay.vue';

export default {
  name: 'PageContent',

  components: {
    VuapixWrapper,
    LoadingOverlay,
  },

  props: {
    vuapixEntry: {
      type: String,
      required: true,
    },
    vuapixParams: {
      type: Object,
      default: undefined,
    },
  },
};
</script>
