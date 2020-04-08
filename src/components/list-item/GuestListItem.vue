<template>
  <v-list-item class="guest-list-item">
    <v-list-item-avatar>
      <v-icon>mdi-account-question</v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ guest.email }}</v-list-item-title>
      <v-list-item-subtitle>
        {{ $t('listItem.guest.invitedBy', { member: guest.invitedBy.name }) }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'GuestListItem',

  props: {
    guest: {
      type: Object,
      required: true,
    },
  },
};
</script>
