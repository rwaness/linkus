<template>
  <v-list-group class="invitation-list-item">
    <template v-slot:activator>
      <group-list-item-content
        :group="group"
        :subtitle="$t('pages.myGroups.invitations.card.listItem.subtitle')"
      />
    </template>

    <v-list-item>
      <v-list-item-title class="font-weight-regular text-right">
        {{ $t('pages.myGroups.invitations.card.listItem.action') }}
      </v-list-item-title>
      <v-list-item-icon>
        <v-btn icon small color="green">
          <v-icon>mdi-check-circle-outline</v-icon>
        </v-btn>
        <v-btn icon small color="red">
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-list-item-icon>
    </v-list-item>
  </v-list-group>
</template>

<script>
import GroupListItemContent from './GroupListItemContent.vue';

export default {
  name: 'InvitationListItem',

  components: {
    GroupListItemContent,
  },

  props: {
    group: {
      type: Object,
      required: true,
    },
  },
};
</script>
