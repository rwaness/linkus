<template>
  <v-breadcrumbs :items="allItems">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item v-bind="item">
        <v-icon v-if="item.icon" v-text="item.icon"></v-icon>
        <template v-else>{{ item.text }}</template>
      </v-breadcrumbs-item>
    </template>

    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: 'breadcrumbs',

  props: {
    items: {
      type: Array,
      required: true,
    },
    withHomeIcon: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    allItems() {
      const allItems = [...this.items];
      const { to, ...lastItem } = allItems.pop();
      if (this.withHomeIcon) {
        allItems.unshift({ icon: 'mdi-home', to: { name: 'Home' } });
      }
      return [...allItems.map((item) => ({
        disabled: false,
        exact: true,
        ...item,
      })), {
        tag: 'h1',
        'active-class': 'subtitle-2',
        disabled: true,
        ...lastItem,
      }];
    },
  },
};
</script>
