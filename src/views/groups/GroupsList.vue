<template>
  <page-content
    class="groups-list"
    :autoload="autoload"
    :loading="querying"
  >
    <div class="fill-height flex flex-column flex-nowrap">
      <breadcrumbs :items="breadcrumbs" class="flex-grow-0" />

      <list
        class="flex-grow-1"
        :items="groups"
        no-results-icon="mdi-account-group"
        :no-results-label="$t('pages.groupsList.noResults.label')"
        :no-results-message="$t('pages.groupsList.noResults.message')"
        :no-results-action-label="$t('pages.groupsList.noResults.action')"
        @no-results-action:click="createFormOpened = true">

        <template v-slot:list-item="{ item: group }">
          <group-list-item :group="group" />
        </template>

        <v-btn
          slot="after-list"
          fab
          fixed
          bottom
          right
          color="primary"
          @click="createFormOpened = true"
        >
          <v-icon>mdi-account-multiple-plus</v-icon>
        </v-btn>
      </list>
    </div>

    <v-dialog v-model="createFormOpened">
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
import List from '@/components/util/List.vue';
import GroupCreationCard from '@/components/groups/GroupCreationCard.vue';
import GroupListItem from '@/components/groups/list/GroupListItem.vue';

export default {
  name: 'GroupsList',

  components: {
    PageContent,
    Breadcrumbs,
    List,
    GroupCreationCard,
    GroupListItem,
  },

  data() {
    return {
      breadcrumbs: [{
        text: this.$t('pages.groupsList.title'),
      }],
      createFormOpened: false,
    };
  },

  computed: {
    ...mapGetters('vuapix/groups/groupsList', {
      groups: 'data',
      querying: 'querying',
      error: 'error',
    }),
  },

  methods: {
    ...mapActions('vuapix/groups/groupsList', {
      fetchGroups: 'doQuery',
    }),
    autoload() {
      return this.fetchGroups();
    },
    goToMyGroup({ id: groupId }) {
      this.$router.push({ name: 'GroupDetail', params: { groupId } });
    },
  },
};
</script>
