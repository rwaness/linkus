<template>
  <auth-view :enable-login="false">
    <template v-slot:authenticated="{ user }">
      <v-menu offset-y right>
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

          <v-list-item @click="logout">
            <v-list-item-icon>
               <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
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

  methods: {
    logout() {
      return this.$mongodbStitch.logout();
    },
  },
};
</script>
