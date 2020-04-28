<template>
  <v-list-item
    class="app-list-item"
    :to="link"
    exact
  >
    <v-list-item-title>{{ app.name }}</v-list-item-title>

    <slot name="action">
      <v-list-item-icon>
        <v-icon>mdi-chevron-right</v-icon>
      </v-list-item-icon>
    </slot>
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
      return { name: 'AppDetailPage', params: { appId: this.app.id } };
    },
  },
};
</script>
