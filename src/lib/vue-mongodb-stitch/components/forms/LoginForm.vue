<template>
  <v-form ref="form" lazy-validation>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      :label="$t('mongodbStitch.login.form.email.field')"
      required
    ></v-text-field>

    <password-field
      v-model="password"
      :rules="pwdRules"
      :label="$t('mongodbStitch.login.form.password.field')"
      required
    ></password-field>

    <v-alert v-if="errorMessage" type="error">
      {{ errorMessage }}
    </v-alert>
  </v-form>
</template>

<script>
import PasswordField from './fields/PasswordField.vue';

export default {
  name: 'LoginForm',

  components: {
    PasswordField,
  },

  data() {
    return {
      errorMessage: null,
      email: '',
      emailRules: [
        (v) => !!v || this.$t('mongodbStitch.login.form.email.rules.required'),
        (v) => /.+@.+\..+/.test(v) || this.$t('mongodbStitch.login.form.email.rules.format'),
      ],
      password: '',
      pwdRules: [
        (v) => !!v || this.$t('mongodbStitch.login.form.password.rules.required'),
      ],
    };
  },

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          const user = await this.$mongodbStitch.loginWithEmailAndPassword(
            this.email,
            this.password,
          );
          this.$emit('authenticated', user);
        } catch (error) {
          this.errorMessage = this.$mongodbStitch.getErrorMessage(error);
        }
      }
    },
  },
};
</script>
