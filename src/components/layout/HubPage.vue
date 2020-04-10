<template>
  <div class="hub-page fill-height">
    <slot></slot>

    <v-bottom-navigation fixed grow>
      <v-btn
        v-for="(item, idx) in navItems"
        :key="`nav-${idx}`"
        :to="item.to"
        :exact="item.exact"
      >
        <span>{{ item.text }}</span>
        <v-icon v-text="item.icon"></v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  name: 'HubPage',

  props: {
    navItems: {
      type: Array,
      required: true,
    },
  },
};
</script>
