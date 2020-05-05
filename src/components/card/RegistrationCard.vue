<template>
  <card :title="$t('mongodbStitch.registration.card.title')">
    <template v-slot:toolbar-right>
      <v-btn
        icon
        @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>

    <loading-overlay :loading="registering"></loading-overlay>

    <v-card-text>
      <registration-form
        v-if="!success"
        ref="form"
        @registered="success = true"
      ></registration-form>
      <v-alert v-else type="success">
        {{ $t('mongodbStitch.registration.success.message') }}
      </v-alert>
    </v-card-text>

    <template v-slot:actions>
      <template v-if="!success">
        <v-btn
          text
          @click="$emit('goto:signin')"
        >
          {{ $t('mongodbStitch.registration.card.actions.alreadyRegistered') }}
        </v-btn>

        <v-spacer />

        <v-btn
          color="primary"
          @click="submit"
        >
          {{ $t('mongodbStitch.registration.card.actions.submit') }}
        </v-btn>
      </template>
      <template v-else>
        <v-spacer />

        <v-btn
          color="secondary"
          @click="$emit('goto:signin')"
        >
          {{ $t('mongodbStitch.registration.success.actionBtn') }}
        </v-btn>
      </template>
    </template>
  </card>
</template>

<script>
import Card from '@/components/layout/Card.vue';
import LoadingOverlay from '@/components/layout/LoadingOverlay.vue';
import RegistrationForm from '@/components/form/RegistrationForm.vue';

export default {
  name: 'RegistrationCard',

  components: {
    Card,
    LoadingOverlay,
    RegistrationForm,
  },

  data() {
    return {
      registering: false,
      success: false,
    };
  },

  methods: {
    async submit() {
      this.registering = true;
      await this.$refs.form.submit();
      this.registering = false;
    },
  },
};
</script>
