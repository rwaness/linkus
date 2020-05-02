<template>
  <v-toolbar dense>
    <slot name="prepend"></slot>

    <slot>
      <v-btn
        v-if="enableBackBtn"
        icon
        @click="$emit('click;back')"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-toolbar-title class="primary--text">
        {{ title }}
      </v-toolbar-title>

      <v-spacer></v-spacer>
    </slot>

    <slot name="append"></slot>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Toolbar',

  props: {
    title: {
      type: String,
      default: '',
    },
    enableBackBtn: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
