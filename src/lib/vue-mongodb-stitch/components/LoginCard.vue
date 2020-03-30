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
      <login-form ref="form" />
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn
        color="primary"
        @click="submit"
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
    async submit() {
      this.logging = true;
      await this.$refs.form.submit();
      this.logging = false;
    },
  },
};
</script>
