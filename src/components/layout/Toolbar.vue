<template>
  <v-toolbar dense>
    <slot name="prepend"></slot>

    <slot>
      <v-btn
        v-if="backRoute"
        icon
        :to="backRoute"
        exact
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-toolbar-title :class="['primary--text', { 'px-0': backRoute }]">
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
    backRoute: {
      type: [Object, String],
      default: null,
      validator: (br) => (typeof br === 'object' ? !!br.name : typeof br === 'string'),
    },
  },
};
</script>
