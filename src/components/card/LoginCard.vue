<template>
  <card :title="$t('mongodbStitch.login.card.title')">
    <loading-overlay :loading="loading"></loading-overlay>

    <v-card-text>
      <login-form
        ref="form"
      ></login-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        color="primary"
        @click="submit"
      >
        {{ $t('mongodbStitch.login.card.actions.submit') }}
      </v-btn>
    </v-card-actions>
  </card>
</template>

<script>
import LoginForm from '@/components/form/LoginForm.vue';
import Card from '@/components/layout/Card.vue';
import LoadingOverlay from '@/components/layout/LoadingOverlay.vue';

export default {
  name: 'LoginCard',

  components: {
    Card,
    LoginForm,
    LoadingOverlay,
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
