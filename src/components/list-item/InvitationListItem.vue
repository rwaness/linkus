<template>
  <v-list-group class="invitation-list-item">
    <template v-slot:activator>
      <group-list-item-content
        :group="group"
        :subtitle="$t('listItem.invitation.subtitle', { owner: group.owner })"
      />
    </template>

    <v-list-item>
      <v-list-item-title class="font-weight-regular text-right">
        {{ $t('listItem.invitation.actions.label') }}
      </v-list-item-title>
      <v-list-item-icon>
        <v-btn
          icon
          small
          color="green"
          @click="accept"
        >
          <v-icon>mdi-check-circle-outline</v-icon>
        </v-btn>
        <v-dialog
          v-model="confirmRejectionOpened"
        >
          <template v-slot:activator="{ on }">
            <v-btn icon small color="red" v-on="on">
              <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              {{ $t('listItem.invitation.actions.reject.title') }}
            </v-card-title>
            <v-card-text>
              {{ $t('listItem.invitation.actions.reject.text', {
                groupName: group.name,
                owner: group.owner,
              }) }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="reject">
                {{ $t('listItem.invitation.actions.reject.confirm') }}
              </v-btn>
              <v-btn @click="confirmRejectionOpened = false">
                {{ $t('listItem.invitation.actions.reject.cancel') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-list-item-icon>
    </v-list-item>
  </v-list-group>
</template>

<script>
import { mapActions } from 'vuex';
import GroupListItemContent from './content/GroupListItemContent.vue';

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

  data() {
    return {
      confirmRejectionOpened: false,
    };
  },

  methods: {
    ...mapActions('vuapix/groups', [
      'acceptInvitation',
      'rejectInvitation',
    ]),
    accept() {
      this.acceptInvitation({ group: this.group });
    },
    reject() {
      this.rejectInvitation({ group: this.group });
    },
  },
};
</script>
