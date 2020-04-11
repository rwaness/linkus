<template>
  <card
    :title="$t('pages.groupsList.creation.card.title')"
    :loading="processing"
    @close="$emit('close')"
  >
    <v-card-text>
      <group-creation-form
        ref="form"
        @submit="processing = true"
        @success="$emit('group:created', $event)"
      />
    </v-card-text>

    <template slot="actions">
      <v-spacer />

      <v-btn
        color="primary"
        @click="submit"
      >
        {{ $t('pages.groupsList.creation.card.actions.submit') }}
      </v-btn>
    </template>
  </card>
</template>

<script>
import Card from '@/components/card/Card.vue';
import GroupCreationForm from '@/components/form/GroupCreationForm.vue';

export default {
  name: 'GroupCreationCard',

  components: {
    Card,
    GroupCreationForm,
  },

  data() {
    return {
      processing: false,
    };
  },

  methods: {
    submit() {
      this.$refs.form.submit();
    },
  },
};
</script>
