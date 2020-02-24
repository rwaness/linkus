<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          ref="pwd"
          v-model="password"
          :rules="pwdRules"
          :type="pwdType"
          label="Password"
          required
          append-icon="mdi-eye"
          @click:append="togglePwd"
          @blur="showPwd = false"
        ></v-text-field>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn
        text
        @click="$emit('forget-pwd')"
      >
        Forget Password ?
      </v-btn>

      <v-spacer />

      <v-btn
        color="primary"
        @click="validate"
      >
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'LoginForm',

  props: {
    redirect: {
      type: String,
      default: '/',
    },
  },

  data() {
    return {
      valid: true,
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      pwdRules: [
        (v) => !!v || 'Password is required',
      ],
      showPwd: false,
    };
  },

  computed: {
    storeName() {
      return this.$mongodbStitch.get('storeName');
    },
    user() {
      return this.$store.getters[`${this.storeName}/user`];
    },
    pwdType() {
      return this.showPwd ? 'text' : 'password';
    },
  },

  created() {
    if (this.user) {
      this.onUserConnect();
    }
  },

  watch: {
    user(user) {
      if (user) {
        this.onUserConnect();
      }
    },
  },

  methods: {
    loginWithEmailAndPassword(payload) {
      return this.$store.dispatch(`${this.storeName}/loginWithEmailAndPassword`, payload);
    },
    onUserConnect() {
      // this.$router.push(this.redirect);
    },
    togglePwd() {
      // force focus to enable "blur" event hidding pwd again
      this.$refs.pwd.focus();
      this.showPwd = !this.showPwd;
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.loginWithEmailAndPassword({
          email: this.email,
          password: this.password,
        });
      }
    },
  },
};
</script>
