<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>{{ $t('mongodbStitch.registration.card.title') }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

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

    <v-card-actions>
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
    </v-card-actions>

    <v-overlay :value="registering">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import RegistrationForm from '@/components/form/RegistrationForm.vue';

export default {
  name: 'RegistrationCard',

  components: {
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
