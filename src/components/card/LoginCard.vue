<template>
  <card :title="$t('mongodbStitch.login.card.title')">
    <template
      v-if="$listeners['close']"
      v-slot:toolbar-right
    >
      <v-btn
        icon
        @click="$emit('close')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>

    <loading-overlay :loading="logging"></loading-overlay>

    <v-card-text>
      <login-form
        ref="form"
      ></login-form>
    </v-card-text>

    <template v-slot:actions>
      <v-spacer></v-spacer>

      <v-btn
        color="primary"
        @click="submit"
      >
        {{ $t('mongodbStitch.login.card.actions.submit') }}
      </v-btn>
    </template>
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
