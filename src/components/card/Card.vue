<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        v-if="$listeners.close"
        icon
        @click="$emit('close')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <loading-overlay :loading="loading"></loading-overlay>

    <slot></slot>

    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
import LoadingOverlay from '@/components/util/LoadingOverlay.vue';

export default {
  name: 'Card',

  components: {
    LoadingOverlay,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
