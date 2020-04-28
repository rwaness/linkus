<template>
  <v-overlay :value="loading">
    <v-progress-circular indeterminate :size="spinSize"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: 'LoadingOverlay',

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    spinSize: {
      type: Number,
      default: 64,
    },
  },
};
</script>
