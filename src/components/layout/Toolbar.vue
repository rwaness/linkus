<template>
  <v-toolbar dense>
    <slot name="prepend"></slot>

    <slot>
      <v-spacer v-if="$slots.prepend"></v-spacer>

      <v-toolbar-title class="primary--text">
        {{ title }}
      </v-toolbar-title>

      <v-spacer v-if="$slots.append"></v-spacer>
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
  },
};
</script>
