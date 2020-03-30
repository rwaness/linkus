<template>
  <auth-view :enable-login="false">
    <template v-slot:authenticated="{ user }">
      <v-menu
        v-model="open"
        offset-y
        right
      >
        <template v-slot:activator="{ on }">
          <v-btn icon dark v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                User
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ user.profile.email }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item @click="goTo('MyPreferences')">
            <v-list-item-icon>
               <v-icon>mdi-account-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('appbar.account.preferences') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item @click="logout">
            <v-list-item-icon>
               <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('appbar.account.logout') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </auth-view>
</template>

<script>
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';

export default {
  name: 'ContextualMenu',

  components: {
    AuthView,
  },

  data() {
    return {
      open: false,
    };
  },

  methods: {
    goTo(routeName) {
      if (this.$router.currentRoute.name === routeName) {
        this.open = false;
      } else {
        this.$router.push({ name: routeName });
      }
    },
    logout() {
      return this.$mongodbStitch.logout();
    },
  },
};
</script>
