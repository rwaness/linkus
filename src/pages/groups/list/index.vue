<template>
  <default-layout class="groups-list">
    <auth-view class="fill-height" enable-login>
      <page-content vuapix-entry="vuapix/groups/groupsList">
        <template v-slot="{ data: groups }">
          <toolbar
            :title="$t('pages.groupsList.title')"
            class="flex-grow-0"
          >
            <template v-slot:append>
              <v-btn
                icon
                @click="createFormOpened = true"
              >
                <v-icon>mdi-account-multiple-plus</v-icon>
              </v-btn>
            </template>
          </toolbar>

          <list
            class="flex-grow-1"
            :items="groups"
            no-results-icon="mdi-account-group"
            :no-results-label="$t('pages.groupsList.noResults.label')"
            :no-results-message="$t('pages.groupsList.noResults.message')"
            :no-results-action-label="$t('pages.groupsList.noResults.action')"
            @no-results-action:click="createFormOpened = true"
          >
            <template v-slot:list-item="{ item: group }">
              <group-list-item :group="group" />
            </template>
          </list>

          <new-group-dialog
            v-model="createFormOpened"
          ></new-group-dialog>
        </template>
      </page-content>
    </auth-view>
  </default-layout>
</template>

<script>
import AuthView from '@/components/layout/AuthView.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import PageContent from '@/components/layout/PageContent.vue';
import Toolbar from '@/components/layout/Toolbar.vue';
import List from '@/components/layout/List.vue';
import GroupListItem from '@/components/list-item/GroupListItem.vue';
import NewGroupDialog from '@/components/dialog/NewGroupDialog.vue';

export default {
  name: 'GroupsListPage',

  components: {
    AuthView,
    DefaultLayout,
    PageContent,
    Toolbar,
    List,
    GroupListItem,
    NewGroupDialog,
  },

  data() {
    return {
      breadcrumbs: [{
        text: this.$t('pages.groupsList.title'),
      }],
      createFormOpened: false,
    };
  },
};
</script>
