<template>
  <v-list-item
    class="app-list-item"
    :to="link"
  >
    <v-list-item-title>{{ app.name }}</v-list-item-title>

    <v-list-item-icon>
      <v-icon>mdi-chevron-right</v-icon>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
export default {
  name: 'AppListItem',

  props: {
    app: {
      type: Object,
      required: true,
    },
  },

  computed: {
    link() {
      return { name: 'AppDetail', params: { appId: this.app.id } };
    },
  },
};
</script>
