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
import { mapGetters, mapActions } from 'vuex';
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

  created() {
    if (!this.user) {
      this.tryAuth();
    }
  },

  computed: {
    ...mapGetters('stitch', [
      'user',
    ]),
  },

  methods: {
    ...mapActions('stitch', [
      'tryAuth',
    ]),
  },
};
</script>
