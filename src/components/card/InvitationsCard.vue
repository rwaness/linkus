<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>{{ $t('dialog.myInvitations.card.title') }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <list
      :items="invitations"
      no-results-icon="mdi-account-question"
      :no-results-label="$t('dialog.myInvitations.card.noResults.label')"
      :no-results-message="$t('dialog.myInvitations.card.noResults.message')"
      :no-results-action-label="$t('dialog.myInvitations.card.noResults.action')"
      @no-results-action:click="close"
    >
      <template v-slot:list-item="{ item: group }">
        <invitation-list-item :group="group" />
      </template>
    </list>
  </v-card>
</template>

<script>
import List from '@/components/util/List.vue';
import InvitationListItem from '@/components/list-item/InvitationListItem.vue';

export default {
  name: 'InvitationsCard',

  components: {
    List,
    InvitationListItem,
  },

  props: {
    invitations: {
      type: Array,
      required: true,
    },
  },

  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
