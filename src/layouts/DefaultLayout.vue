<template>
  <v-container fluid class="fill-height">
    <app-bar
      @click:nav="toggleDrawer"
      @click:signup="registrationFormOpened = true"
    />

    <nav-drawer
      v-model="drawerOpened"
      :mini="drawerMini"
    />

    <v-content class="fill-height">
      <slot />

      <v-overlay
        v-model="registrationFormOpened"
        :dark="false"
      >
        <registration-card
          @goto:signin="goToLogin"
          @close="closeRegistration"
        />
      </v-overlay>
    </v-content>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import AppBar from '@/components/layout/AppBar.vue';
import NavDrawer from '@/components/layout/NavDrawer.vue';
import RegistrationCard from '@/lib/vue-mongodb-stitch/components/RegistrationCard.vue';

export default {
  name: 'CustomLayout',

  components: {
    AppBar,
    NavDrawer,
    RegistrationCard,
  },

  data() {
    return {
      drawerOpened: null,
      drawerMini: false,
      registrationFormOpened: false,
    };
  },

  methods: {
    toggleDrawer() {
      this.drawerOpened = true;
      this.drawerMini = !this.drawerMini;
    },
    closeRegistration() {
      this.registrationFormOpened = false;
    },
    goToLogin() {
      if (this.$router.currentRoute && this.$router.currentRoute.name === 'Login') {
        this.closeRegistration();
      } else {
        this.$router.push({ name: 'Login' });
      }
    },
  },
};
</script>
