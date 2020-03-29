<template>
  <div class="app-bar">
    <v-app-bar
      app
      color="primary"
      dark
      clipped-left
    >
      <v-app-bar-nav-icon @click="$emit('click:nav')" />

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>

      <auth-view>
        <contextual-menu slot="authenticated" />
        <v-btn
          slot="unauthenticated"
          @click="$emit('click:signup')"
        >
          <v-icon>mdi-account-circle</v-icon> SIGN UP
        </v-btn>
      </auth-view>
    </v-app-bar>

  </div>
</template>

<script>
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';
import ContextualMenu from '@/components/account/ContextualMenu.vue';

export default {
  name: 'AppBar',

  components: {
    AuthView,
    ContextualMenu,
  },
};
</script>
