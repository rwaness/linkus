<template>
  <div class="group-members">
    <v-toolbar dense>
      <v-btn
        x-small
        text
        :to="{ name: 'GroupsList' }"
        exact
        class="ml-n4"
      >
        <v-icon>mdi-chevron-left</v-icon>All groups
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="invitationsFormOpened = true">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </v-toolbar>

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

    <new-invitations-dialog
      v-model="invitationsFormOpened"
      :group="group"
    ></new-invitations-dialog>
  </div>
</template>

<script>
import List from '@/components/util/List.vue';
import GuestListItem from '@/components/list-item/GuestListItem.vue';
import MemberListItem from '@/components/list-item/MemberListItem.vue';
import NewInvitationsDialog from '@/components/dialog/NewInvitationsDialog.vue';

export default {
  name: 'GroupMembers',

  components: {
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

  data() {
    return {
      invitationsFormOpened: false,
    };
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
