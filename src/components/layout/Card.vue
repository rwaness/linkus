<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="toolbar-right"></slot>
    </v-toolbar>

    <slot></slot>
  </v-card>
</template>

<script>
export default {
  name: 'Card',

  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
