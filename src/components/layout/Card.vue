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

    <!-- <v-card-title>
      {{  }}
    </v-card-title> -->

    <slot></slot>

    <v-card-actions v-if="$slots['actions']">
      <slot name="actions"></slot>
    </v-card-actions>
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
