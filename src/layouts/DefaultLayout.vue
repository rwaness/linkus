<template>
  <div class="fill-height">
    <app-bar @nav:click="toggleDrawer" />

    <nav-drawer
      v-model="drawerOpened"
      :mini="drawerMini"
    />

    <v-content class="fill-height">
      <slot />
    </v-content>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppBar from '@/components/layout/AppBar.vue';
import NavDrawer from '@/components/layout/NavDrawer.vue';

export default {
  name: 'CustomLayout',

  components: {
    AppBar,
    NavDrawer,
  },

  data() {
    return {
      drawerOpened: null,
      drawerMini: false,
    };
  },

  methods: {
    toggleDrawer() {
      this.drawerOpened = true;
      this.drawerMini = !this.drawerMini;
    },
  },
};
</script>
