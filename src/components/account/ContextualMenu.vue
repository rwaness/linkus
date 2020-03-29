<template>
  <auth-view :enable-login="false">
    <template v-slot:authenticated>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <!-- eslint-disable vue/valid-v-on -->
          <div :on="on">
            <slot />
          </div>
        </template>

        <v-list>
          <v-list-item @click="">
            <v-list-item-title>test</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </auth-view>
  <!-- <v-menu
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
  </v-menu> -->
</template>

<script>
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';

export default {
  name: 'ContextualMenu',

  components: {
    AuthView,
  },
};
</script>
