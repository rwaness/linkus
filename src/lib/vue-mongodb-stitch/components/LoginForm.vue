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

        <password-field
          v-model="password"
          :rules="pwdRules"
          label="Password"
          required
        ></password-field>
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
import PasswordField from './PasswordField.vue';

export default {
  name: 'LoginForm',

  components: {
    PasswordField,
  },

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
    loginWithEmailAndPassword(payload) {
      return this.$store.dispatch(`${this.storeName}/loginWithEmailAndPassword`, payload);
    },
    onUserUpdate(user) {
      if (user) {
        // TODO uncomment
        // this.onUserConnect();
      }
    },
    onUserConnect() {
      this.$router.push(this.redirect);
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
