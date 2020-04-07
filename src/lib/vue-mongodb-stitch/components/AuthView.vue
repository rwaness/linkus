<template>
  <div class="auth-view">
    <slot v-if="authenticating" name="authenticating"></slot>
    <slot v-else-if="user" :user="user" />
    <slot v-else name="unauthenticated">
      <v-container>
        <login-card v-if="enableLogin" />
      </v-container>
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

  data() {
    return {
      authenticating: true,
    };
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
    async onUserUpdate(user) {
      if (user) {
        this.$emit('authenticated', user);
      } else {
        await this.$mongodbStitch.auth();
      }
      this.authenticating = false;
    },
  },
};
</script>
