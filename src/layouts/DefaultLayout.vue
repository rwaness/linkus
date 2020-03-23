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

      <v-btn
        v-if="!user"
        @click="showRegistration = true"
      >
        <v-icon>mdi-account-circle</v-icon>
        SIGN UP
      </v-btn>
      <v-menu
        v-else
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-account-circle</v-icon>
            <template>Username</template>
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

      <v-overlay
        v-model="showRegistration"
        :dark="false"
      >
        <registration-form
          @close="showRegistration = false"
        />
      </v-overlay>
    </v-content>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import RegistrationForm from '@/lib/vue-mongodb-stitch/components/RegistrationForm.vue';

export default {
  name: 'CustomLayout',

  components: {
    RegistrationForm,
  },

  data() {
    return {
      drawer: null,
      drawerMini: true,
      items: [
        { title: 'Home', icon: 'mdi-home', link: '/' },
        { title: 'Projects', icon: 'mdi-hexagon-multiple', link: '/projects' },
        { title: 'About', icon: 'mdi-help-circle', link: '/about' },
      ],
      showRegistration: false,
    };
  },

  computed: {
    ...mapGetters([
      'user',
    ]),
  },

  methods: {
    toggleDrawer() {
      this.drawer = true;
      this.drawerMini = !this.drawerMini;
    },
  },
};
</script>
