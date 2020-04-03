<template>
  <div class="page-content fill-height">
    <loading-overlay :loading="!loaded || loading" />

    <template v-if="loaded">
      <slot></slot>
    </template>
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
    autoload: {
      type: Function,
      default: null,
    },
  },

  data() {
    return {
      loaded: false,
    };
  },

  async created() {
    if (this.autoload) {
      await this.autoload();
    }
    this.loaded = true;
  },
};
</script>
