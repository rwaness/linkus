<template>
  <v-container>
    <v-app-bar
      app
      color="primary"
      dark
      clipped-left
    >
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                User
              </v-list-item-title>
              <v-list-item-subtitle>
                role
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      :mini-variant="drawerMini"
      :expand-on-hover="drawerMini"
      dark
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

    <v-content>
      <slot />
    </v-content>
  </v-container>
</template>

<script>
export default {
  name: 'CustomLayout',
  data() {
    return {
      drawer: null,
      drawerMini: true,
      items: [
        { title: 'Home', icon: 'mdi-home', link: '/' },
        { title: 'About', icon: 'mdi-help-box', link: '/about' },
      ],
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = true;
      this.drawerMini = !this.drawerMini;
    },
  },
};
</script>
