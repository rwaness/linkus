<template>
  <div class="auth-view">
    <slot v-if="user" :user="user" />
    <slot v-else name="unauthenticated">
      <login-card v-if="enableLogin" />
    </slot>
  </div>
</template>

<script>
import LoginCard from './LoginCard.vue';

export default {
  name: 'AuthView',

  components: {
    LoginCard,
  },

  props: {
    enableLogin: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    user() {
      return this.$mongodbStitch.user;
    },
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
    onUserUpdate(user) {
      if (user) {
        this.$emit('authenticated', user);
      } else {
        this.$mongodbStitch.auth();
      }
    },
  },
};
</script>
