<template>
  <div class="app-bar">
    <v-app-bar
      app
      color="primary"
      dark
      clipped-left
    >
      <v-app-bar-nav-icon @click="$emit('nav:click')" />

      <v-toolbar-title class="title linkus">
        L<span class="i">i</span><span class="trslt"><span class="txt-miror">N</span>Kus</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <auth-view>
        <template v-slot="{ user }">
          <contextual-menu :user="user"/>
        </template>

        <template v-slot:unauthenticated>
          <v-dialog v-model="registrationFormOpened">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on">
                <v-icon>mdi-account-circle</v-icon> SIGN UP
              </v-btn>
            </template>

            <registration-card
              @goto:signin="goToLogin"
              @close="registrationFormOpened = false"
            />
          </v-dialog>
        </template>
      </auth-view>
    </v-app-bar>
  </div>
</template>

<script>
import RegistrationCard from '@/components/card/RegistrationCard.vue';
import AuthView from '@/components/layout/AuthView.vue';
import ContextualMenu from '@/components/layout/ContextualMenu.vue';

export default {
  name: 'AppBar',

  components: {
    AuthView,
    ContextualMenu,
    RegistrationCard,
  },

  data() {
    return {
      registrationFormOpened: false,
    };
  },

  methods: {
    goToLogin() {
      if (this.$router.currentRoute && this.$router.currentRoute.name === 'LoginPage') {
        this.registrationFormOpened = false;
      } else {
        this.$router.push({ name: 'LoginPage' });
      }
    },
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
