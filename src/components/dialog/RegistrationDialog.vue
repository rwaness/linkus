<template>
  <dialog-box v-model="model">
    <template v-slot:activator="{ on }">
      <slot name="activator" :on="on"></slot>
    </template>

    <registration-card
      @goto:signin="goToLogin"
      @close="close"
    ></registration-card>
  </dialog-box>
</template>

<script>
import DialogMixin from '@/mixins/DialogMixin';
import RegistrationCard from '@/components/card/RegistrationCard.vue';

export default {
  name: 'RegistrationDialog',

  mixins: [DialogMixin],

  components: {
    RegistrationCard,
  },

  methods: {
    goToLogin() {
      if (this.$router.currentRoute && this.$router.currentRoute.name === 'LoginPage') {
        this.close();
      } else {
        this.$router.push({ name: 'LoginPage' });
      }
    },
  },
};
</script>
