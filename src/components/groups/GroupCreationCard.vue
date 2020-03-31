<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>{{ $t('pages.myGroups.creation.card.title') }}</v-toolbar-title>
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
        {{ $t('pages.myGroups.creation.card.actions.submit') }}
      </v-btn>
    </v-card-actions>

    <v-overlay :value="processing">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import GroupCreationForm from './forms/GroupCreationForm.vue';

export default {
  name: 'GroupCreationCard',

  components: {
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
