<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>{{ $t('pages.myGroups.invitations.card.title') }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list>
      <template v-for="(group, index) in invitations">
        <v-divider v-if="index" :key="`divider-${index}`"></v-divider>
        <invitation-list-item :group="group" :key="`item-${group._id}`" />
      </template>
    </v-list>
  </v-card>
</template>

<script>
import InvitationListItem from './list/InvitationListItem.vue';

export default {
  name: 'InvitationsCard',

  components: {
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
