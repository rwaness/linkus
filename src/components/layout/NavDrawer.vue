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
        link
        :to="item.link"
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
      items: [
        {
          title: this.$t('nav.items.home'),
          icon: 'mdi-home',
          link: { name: 'Home' },
        },
        {
          title: this.$t('nav.items.myGroups'),
          icon: 'mdi-hexagon-multiple',
          link: { name: 'MyGroups' },
        },
        {
          title: this.$t('nav.items.about'),
          icon: 'mdi-help-circle',
          link: { name: 'About' },
        },
      ],
    };
  },
};
</script>
