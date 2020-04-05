<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>{{ $t('pages.groupsList.creation.card.title') }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text>
      <group-creation-form
        ref="form"
        @created="$emit('group:created', $event)"
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn
        color="primary"
        @click="submit"
      >
        {{ $t('pages.groupsList.creation.card.actions.submit') }}
      </v-btn>
    </v-card-actions>

    <loading-overlay :loading="processing" />
  </v-card>
</template>

<script>
import LoadingOverlay from '@/components/util/LoadingOverlay.vue';
import GroupCreationForm from './forms/GroupCreationForm.vue';

export default {
  name: 'GroupCreationCard',

  components: {
    LoadingOverlay,
    GroupCreationForm,
  },

  data() {
    return {
      processing: false,
    };
  },

  methods: {
    async submit() {
      this.processing = true;
      await this.$refs.form.submit();
      this.processing = false;
    },
  },
};
</script>
