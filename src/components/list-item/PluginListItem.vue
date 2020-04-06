<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ plugin.name }}</v-list-item-title>
    </v-list-item-content>

    <v-list-item-icon>
      <v-icon>mdi-chevron-right</v-icon>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
export default {
  name: 'PluginListItem',

  props: {
    plugin: {
      type: Object,
      required: true,
    },
  },
};
</script>
