<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>{{ $t('dialog.myInvitations.card.title') }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <no-results
      v-if="!invitations.length"
      icon="mdi-account-question"
      :label="$t('dialog.myInvitations.card.noResults.label')"
      :message="$t('dialog.myInvitations.card.noResults.message')"
    />
    <template v-else>
      <v-subheader>{{ $t('dialog.myInvitations.card.subheader') }}</v-subheader>
      <v-list subheader dense>
        <template v-for="(group, index) in invitations">
          <v-divider v-if="index" :key="`divider-${index}`"></v-divider>
          <invitation-list-item :group="group" :key="`item-${group._id}`" />
        </template>
      </v-list>
    </template>
  </v-card>
</template>

<script>
import NoResults from '@/components/list/NoResults.vue';
import InvitationListItem from './list/InvitationListItem.vue';

export default {
  name: 'InvitationsCard',

  components: {
    NoResults,
    InvitationListItem,
  },

  props: {
    invitations: {
      type: Array,
      required: true,
    },
  },
};
</script>
