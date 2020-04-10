<template>
  <v-bottom-navigation fixed grow class="bottom-nav">
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
</template>

<script>
export default {
  name: 'BottomNav',

  props: {
    navItems: {
      type: Array,
      required: true,
    },
  },
};
</script>
