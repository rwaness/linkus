<template>
  <card-dialog
    v-model="model"
    :title="$t('dialog.listInvitations.title')"
  >
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
  </card-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import DialogMixin from '@/mixins/DialogMixin';
import CardDialog from '@/components/dialog/CardDialog.vue';
import List from '@/components/ui/List.vue';
import InvitationListItem from '@/components/list-item/InvitationListItem.vue';

export default {
  name: 'ListInvitationsDialog',

  mixins: [DialogMixin],

  components: {
    CardDialog,
    List,
    InvitationListItem,
  },

  props: {
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
      this.$router.push({ name: 'GroupOverviewPage', params: { groupId } });
      this.close();
    },
  },
};
</script>
