<template>
  <component
    :is="appComp"
    :user="user"
  ></component>
</template>

<script>
import LoadingOverlay from '@/components/layout/LoadingOverlay.vue';
import NotFound from '@/components/error/NotFound.vue';

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
        error: NotFound,
        delay: 200,
        timeout: 3000,
      });
    },
  },
};
</script>
