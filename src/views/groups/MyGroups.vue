<template>
  <page-content
    class="my-groups"
    :loading="querying"
    @initialize="initialize"
  >
    <v-toolbar flat>
      <breadcrumbs :items="breadcrumbs" />

      <v-spacer></v-spacer>

      <v-dialog
        v-if="invitations.length"
        v-model="invitationsListOpened"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            outlined
            color="accent"
            v-on="on"
          >
            <v-icon>mdi-account-multiple-plus</v-icon>
          </v-btn>
        </template>

        <invitations-card
          :invitations="invitations"
          @invitation:accepted="goToMyGroup"
          @close="invitationsListOpened = false"
        />
      </v-dialog>
    </v-toolbar>

    <no-results
      v-if="!groups.length"
      class="fill-height"
      icon="mdi-account-group"
      :label="$t('pages.myGroups.noResults.label')"
      :message="$t('pages.myGroups.noResults.message')"
      :action-label="$t('pages.myGroups.noResults.action')"
      @click:action="createFormOpened = true"
    />

    <template v-else>
      <v-list>
        <template v-for="(group, index) in groups">
          <v-divider v-if="index" :key="`divider-${index}`"></v-divider>
          <group-list-item :group="group" :key="`item-${group._id}`" />
        </template>
      </v-list>

      <v-btn
        fab
        fixed
        bottom
        right
        color="primary"
        @click="createFormOpened = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-dialog v-model="createFormOpened">
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          fixed
          bottom
          right
          color="primary"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <group-creation-card
        @group:created="goToMyGroup"
        @close="createFormOpened = false"
      />
    </v-dialog>
  </page-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PageContent from '@/components/wrapper/PageContent.vue';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue';
import NoResults from '@/components/list/NoResults.vue';
import InvitationsCard from '@/components/groups/InvitationsCard.vue';
import GroupCreationCard from '@/components/groups/GroupCreationCard.vue';
import GroupListItem from '@/components/groups/list/GroupListItem.vue';

export default {
  name: 'MyGroups',

  components: {
    PageContent,
    Breadcrumbs,
    NoResults,
    GroupCreationCard,
    GroupListItem,
    InvitationsCard,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      breadcrumbs: [{
        text: this.$t('pages.myGroups.title'),
      }],
      invitationsListOpened: false,
      createFormOpened: false,
    };
  },

  computed: {
    ...mapGetters('vuapix/groups/myGroups', {
      groups: 'data',
      querying: 'querying',
      error: 'error',
    }),
    ...mapGetters('vuapix/groups/myInvitations', {
      invitations: 'data',
    }),
  },

  methods: {
    ...mapActions('vuapix/groups/myInvitations', {
      fetchInvitations: 'doQuery',
    }),
    ...mapActions('vuapix/groups/myGroups', {
      fetchGroups: 'doQuery',
    }),
    initialize() {
      this.fetchInvitations();
      this.fetchGroups();
    },
    goToMyGroup({ _id: id }) {
      this.$router.push({ name: 'MyGroup', params: { id } });
    },
  },
};
</script>
