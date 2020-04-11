<template>
  <card
    :title="$t('dialog.myInvitations.card.title')"
    @close="close"
  >
    <list
      :items="invitations"
      no-results-icon="mdi-account-question"
      :no-results-label="$t('dialog.myInvitations.card.noResults.label')"
      :no-results-message="$t('dialog.myInvitations.card.noResults.message')"
      :no-results-action-label="$t('dialog.myInvitations.card.noResults.action')"
      @no-results-action:click="close"
    >
      <template v-slot:list-item="{ item: group }">
        <invitation-list-item :group="group" />
      </template>
    </list>
  </card>
</template>

<script>
import { mapGetters } from 'vuex';
import Card from '@/components/card/Card.vue';
import List from '@/components/util/List.vue';
import InvitationListItem from '@/components/list-item/InvitationListItem.vue';

export default {
  name: 'InvitationsListCard',

  components: {
    Card,
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
      this.$router.push({ name: 'GroupOverview', params: { groupId } });
      this.close();
    },
  },

  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
