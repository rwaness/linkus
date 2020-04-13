<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
  >
    <card
      :title="$t('dialog.listInvitations.title')"
    >
      <template v-slot:toolbar-right>
        <v-btn
          icon
          @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>

      <list
        :items="invitations"
        no-results-icon="mdi-account-question"
        :no-results-label="$t('dialog.listInvitations.noResults.label')"
        :no-results-message="$t('dialog.listInvitations.noResults.message')"
        :no-results-action-label="$t('dialog.listInvitations.noResults.action')"
        @no-results-action:click="close"
      >
        <template v-slot:list-item="{ item: group }">
          <invitation-list-item :group="group" />
        </template>
      </list>
    </card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import Card from '@/components/card/Card.vue';
import List from '@/components/util/List.vue';
import InvitationListItem from '@/components/list-item/InvitationListItem.vue';

export default {
  name: 'ListInvitationsDialog',

  components: {
    Card,
    List,
    InvitationListItem,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    invitations: {
      type: Array,
      required: true,
    },
  },

  beforeCreate() {
    this.$store.commit('vuapix/groups/acceptInvitation/reset');
  },

  computed: {
    ...mapGetters('vuapix/groups/acceptInvitation', {
      joinedGroup: 'data',
    }),
  },

  watch: {
    joinedGroup({ id: groupId }) {
      this.$router.push({ name: 'GroupOverview', params: { groupId } });
      this.close();
    },
  },

  methods: {
    close() {
      this.$emit('input', false);
    },
  },
};
</script>
