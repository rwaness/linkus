<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
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
import mixin from '../../mixin';
import PasswordField from './fields/PasswordField.vue';

export default {
  name: 'LoginForm',

  mixins: [mixin],

  components: {
    PasswordField,
  },

  data() {
    return {
      errorMessage: null,
      valid: true,
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
    async validate() {
      if (this.$refs.form.validate()) {
        try {
          const user = await this.$store.dispatch(`${this.mongodbStitchStoreName}/loginWithEmailAndPassword`, {
            email: this.email,
            password: this.password,
          });
          this.$emit('loggedin', user);
        } catch (error) {
          this.errorMessage = this.$mongodbStitch.getErrorMessage(error);
        }
      }
    },
  },
};
</script>
