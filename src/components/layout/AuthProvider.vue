<template>
  <div class="auth-provider">
    <slot
      :user="user"
      :authenticating="vmsAuthenticating"
    ></slot>
  </div>
</template>

<script>
import { VmsAuthProvider } from '@/lib/vue-mongodb-stitch';

export default {
  name: 'AuthProvider',

  extends: VmsAuthProvider,

  computed: {
    isLoggedIn() {
      return this.vmsUser
        && this.vmsUser.isLoggedIn
        && this.vmsUser.loggedInProviderType !== 'anon-user';
    },
    user() {
      return (this.isLoggedIn && this.vmsUser) || null;
    },
  },

  methods: {
    vmsEmit(eventName, param) {
      if (eventName !== 'authenticated' || this.isLoggedIn) {
        this.$emit(eventName, param);
      }
    },
  },
};
</script>
