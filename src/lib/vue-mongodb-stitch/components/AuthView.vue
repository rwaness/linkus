<template>
  <div class="auth-view">
    <slot v-if="user" />

    <forget-pwd-form
      v-else-if="forgetPwd"
      @close="forgetPwd = false"
    />
    <login-form v-else
      @forget-pwd="forgetPwd = true"
    />
  </div>
</template>

<script>
import LoginForm from './LoginForm.vue';
import ForgetPwdForm from './ForgetPwdForm.vue';

export default {
  name: 'AuthView',

  components: {
    LoginForm,
    ForgetPwdForm,
  },

  data() {
    return {
      forgetPwd: false,
    };
  },

  computed: {
    storeName() {
      return this.$mongodbStitch.get('storeName');
    },
    user() {
      return this.$store.getters[`${this.storeName}/user`];
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
    auth(payload) {
      return this.$store.dispatch(`${this.storeName}/auth`, payload);
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
