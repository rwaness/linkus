<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>{{ $t('mongodbStitch.login.card.title') }}</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <login-form
        ref="form"
        @loggedin="onLoggedIn"
      ></login-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn
        color="primary"
        @click="validate"
      >
        {{ $t('mongodbStitch.login.card.actions.submit') }}
      </v-btn>
    </v-card-actions>

    <v-overlay :value="logging">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import LoginForm from './forms/LoginForm.vue';

export default {
  name: 'LoginCard',

  components: {
    LoginForm,
  },

  data() {
    return {
      logging: false,
    };
  },

  methods: {
    async validate() {
      this.logging = true;
      await this.$refs.form.validate();
      this.logging = false;
    },
    onLoggedIn(user) {
      // TODO
    },
  },
};
</script>
