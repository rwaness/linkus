<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Registration</v-toolbar-title>
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

        <password-field
          v-model="confirmPassword"
          :rules="confPwdRules"
          label="Confirm Password"
          required
        ></password-field>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn
        text
        @click="$emit('forget-pwd')"
      >
        Already have an account ? Login...
      </v-btn>

      <v-spacer />

      <v-btn
        color="primary"
        @click="validate"
      >
        sign up
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import PasswordField from './PasswordField.vue';

export default {
  name: 'RegistrationForm',

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
      confirmPassword: '',
      confPwdRules: [
        (v) => !!v || 'Confirm Password is required',
        (v) => v === this.password || 'Confirm Password does not match password',
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
    registerWithEmail(payload) {
      return this.$store.dispatch(`${this.storeName}/registerWithEmail`, payload);
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
        this.registerWithEmail({
          email: this.email,
          password: this.password,
        });
      }
    },
  },
};
</script>
