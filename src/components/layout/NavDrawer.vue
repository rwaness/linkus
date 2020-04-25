<template>
  <v-navigation-drawer
    :value="value"
    app
    clipped
    :mini-variant="mini"
    :expand-on-hover="mini"
    dark
    @input="$emit('input', $event)"
  >
    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.link"
        :exact="item.exact"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavDrawer',

  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    value: {
      validator: (value) => [
        null,
        true,
        false,
      ].includes(value),
    },
    mini: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      items: [{
        title: this.$t('nav.items.home'),
        icon: 'mdi-home',
        link: { name: 'HomePage' },
        exact: true,
      }, {
        title: this.$t('nav.items.groupsList'),
        icon: 'mdi-account-group',
        link: { name: 'GroupsListPage' },
      }, {
        title: this.$t('nav.items.appsList'),
        icon: 'mdi-toy-brick',
        link: { name: 'AppsListPage' },
      }],
    };
  },
};
</script>
