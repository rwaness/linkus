<template>
  <v-list-item
    class="app-list-item"
    :to="link"
    exact
  >
    <v-list-item-title>{{ app.name }}</v-list-item-title>

    <v-list-item-action v-if="!userHasApp">
      <v-btn
        icon
        @click.prevent="$emit('app:add')"
      >
        <v-icon>mdi-toy-brick-plus-outline</v-icon>
      </v-btn>
    </v-list-item-action>

    <v-list-item-icon v-else>
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
    user: {
      type: Object,
      required: true,
    },
  },

  computed: {
    link() {
      return { name: 'AppDetailPage', params: { appId: this.app.id } };
    },
    userHasApp() {
      return this.user
        && this.user.customData.apps.includes(this.app.id);
    },
  },
};
</script>
