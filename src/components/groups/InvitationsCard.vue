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

    <v-card-text>
      <v-list>
        <group-list-item
          v-for="group in invitations"
          :key="`${group._id}`"
          :group="group"
        />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import GroupListItem from './list/GroupListItem.vue';

export default {
  name: 'InvitationsCard',

  components: {
    GroupListItem,
  },

  props: {
    invitations: {
      type: Array,
      required: true,
    },
  },
};
</script>
