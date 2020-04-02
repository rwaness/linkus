<template>
  <v-list-item-content>
    <v-list-item-title>{{ group.name }}</v-list-item-title>
    <v-list-item-subtitle>{{ subtitle }}</v-list-item-subtitle>
  </v-list-item-content>
</template>

<script>
export default {
  name: 'GroupListItemContent',

  props: {
    group: {
      type: Object,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
};
</script>
