<template>
  <div class="app-bar">
    <v-app-bar
      app
      color="primary"
      dark
      clipped-left
    >
      <v-app-bar-nav-icon @click="$emit('click:nav')" />

      <v-toolbar-title class="title linkus">
          L<span class="i">i</span><span class="trslt"><span class="txt-miror">N</span>Kus</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <auth-view>
        <contextual-menu />
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

<style lang="scss">
.linkus {
  // color: #455A64; // blue-grey darken-2
  .i {
    position: relative;
    z-index: 2;
    background-color: #1976d2; // primary
    color: #FFA000; // amber darken-2
  }
  .trslt {
    position: relative;
    left: -5px;
  }
  .txt-miror {
    display: inline-block;
    transform: scale(-1, 1);
  }
}
</style>
