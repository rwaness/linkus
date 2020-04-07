<template>
  <v-form ref="form" lazy-validation>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      :label="$t('mongodbStitch.registration.form.email.field')"
      required
    ></v-text-field>

    <password-field
      v-model="password"
      :rules="pwdRules"
      :label="$t('mongodbStitch.registration.form.password.field')"
      required
    ></password-field>

    <password-field
      v-model="confirmPassword"
      :rules="confPwdRules"
      :label="$t('mongodbStitch.registration.form.confPwd.field')"
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
  name: 'RegistrationForm',

  components: {
    PasswordField,
  },

  data() {
    return {
      errorMessage: null,
      email: '',
      emailRules: [
        (v) => !!v || this.$t('mongodbStitch.registration.form.email.rules.required'),
        (v) => /.+@.+\..+/.test(v) || this.$t('mongodbStitch.registration.form.email.rules.format'),
      ],
      password: '',
      pwdRules: [
        (v) => !!v || this.$t('mongodbStitch.registration.form.password.rules.required'),
      ],
      confirmPassword: '',
      confPwdRules: [
        (v) => !!v || this.$t('mongodbStitch.registration.form.confPwd.rules.format'),
        (v) => v === this.password || this.$t('mongodbStitch.registration.form.confPwd.rules.format'),
      ],
    };
  },

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          await this.$mongodbStitch.registerWithEmail(
            this.email,
            this.password,
          );
          this.$emit('registered');
        } catch (error) {
          this.errorMessage = this.$mongodbStitch.getErrorMessage(error);
        }
      }
    },
  },
};
</script>
