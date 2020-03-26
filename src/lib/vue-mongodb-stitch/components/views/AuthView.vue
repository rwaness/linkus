<template>
  <div class="auth-view">
    <slot v-if="user" />

    <login-card v-else />
  </div>
</template>

<script>
import mixin from '../../mixin';
import LoginCard from '../LoginCard.vue';

export default {
  name: 'AuthView',

  mixins: [mixin],

  components: {
    LoginCard,
  },

  created() {
    this.onUserUpdate(this.user);
  },

  watch: {
    user(user) {
      this.onUserUpdate(user);
    },
  },

  methods: {
    auth(payload) {
      return this.$store.dispatch(`${this.mongodbStitchStoreName}/auth`, payload);
    },
    onUserUpdate(user) {
      if (user) {
        this.$emit('auhtenticated', user);
      } else {
        this.auth();
      }
    },
  },
};
</script>
