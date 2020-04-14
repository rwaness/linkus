<template>
  <v-toolbar dense>
    <slot name="prepend"></slot>

    <v-toolbar-title>{{ title }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <slot name="append"></slot>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Toolbar',

  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
