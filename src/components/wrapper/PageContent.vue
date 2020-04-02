<template>
  <div class="page-content fill-height">
    <loading-overlay :loading="loading" />

    <slot></slot>
  </div>
</template>

<script>
import LoadingOverlay from '@/components/util/LoadingOverlay.vue';

export default {
  name: 'PageContent',

  components: {
    LoadingOverlay,
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    this.$emit('initialize');
  },
};
</script>
