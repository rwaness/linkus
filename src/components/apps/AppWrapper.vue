<template>
  <component
    :is="appComp"
    :user="user"
  ></component>
</template>

<script>
import LoadingOverlay from '@/components/ui/LoadingOverlay.vue';
import AsyncError from './AsyncError';

export default {
  name: 'AppWrapper',

  props: {
    app: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },

  computed: {
    appComp() {
      return () => ({
        component: import(`@/lib/packages/${this.app.package}/index.vue`),
        loading: LoadingOverlay,
        error: AsyncError,
        delay: 200,
        timeout: 3000,
      });
    },
  },
};
</script>
