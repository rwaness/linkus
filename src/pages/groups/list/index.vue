<template>
  <default-layout class="groups-wrapper">
    <auth-view
      class="fill-height"
      enable-login
    >
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
    </auth-view>
  </default-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import PageContent from '@/components/layout/PageContent.vue';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue';
import List from '@/components/util/List.vue';
import GroupCreationCard from '@/components/card/GroupCreationCard.vue';
import GroupListItem from '@/components/list-item/GroupListItem.vue';

export default {
  name: 'GroupsList',

  components: {
    AuthView,
    DefaultLayout,
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
      this.$router.push({ name: 'GroupHome', params: { groupId } });
    },
  },
};
</script>
