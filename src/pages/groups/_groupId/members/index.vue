<template>
  <div class="group-members">
    <group-toolbar :group="group">
      <new-invitations-dialog :group="group">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-account-plus</v-icon>
          </v-btn>
        </template>
      </new-invitations-dialog>
    </group-toolbar>

    <v-list>
      <v-list-group v-if="guests.length">
        <template v-slot:activator>
          <v-subheader class="flex-grow-1 px-0">
            {{ $t('pages.groupMembers.headers.guests', { counter: guests.length }) }}
          </v-subheader>
        </template>
        <list :items="guests" :getItemKey="({ email }) => email">
          <template v-slot:list-item="{ item: guest }">
            <guest-list-item :guest="guest" />
          </template>
        </list>
      </v-list-group>

      <v-divider></v-divider>

      <v-subheader>
        {{ $t('pages.groupMembers.headers.members', { counter: members.length }) }}
      </v-subheader>
      <list :items="members">
        <template v-slot:list-item="{ item: member }">
          <member-list-item :member="member" />
        </template>
      </list>
    </v-list>
  </div>
</template>

<script>
import GroupToolbar from '@/components/toolbar/GroupToolbar.vue';
import List from '@/components/ui/List.vue';
import GuestListItem from '@/components/list-item/GuestListItem.vue';
import MemberListItem from '@/components/list-item/MemberListItem.vue';
import NewInvitationsDialog from '@/components/dialog/NewInvitationsDialog.vue';

export default {
  name: 'GroupMembersPage',

  components: {
    GroupToolbar,
    List,
    GuestListItem,
    MemberListItem,
    NewInvitationsDialog,
  },

  props: {
    group: {
      type: Object,
      required: true,
    },
  },

  computed: {
    guests() {
      return this.group.members.filter(({ email }) => this.group.guests.includes(email));
    },
    members() {
      return this.group.members.filter(({ id }) => this.group.memberIds.includes(id));
    },
  },
};
</script>
