<template>
  <default-layout>
    <auth-provider class="fill-height">
      <template v-slot="{ user }">
        <page-content
          vuapix-entry="vuapix/apps/appsList"
          :vuapix-params="{ user, lookup, filters }"
        >
          <template v-slot="{ data: apps }">
            <apps-list-toolbar
              class="flex-grow-0"
              @apps:search="lookup = $event"
              @apps:filter="filters = $event"
            ></apps-list-toolbar>

            <list
              class="flex-grow-1"
              :items="apps"
              no-results-icon="mdi-toy-brick-outline"
              :no-results-label="$t('pages.appsList.auth.noResults.label')"
              :no-results-message="$t('pages.appsList.auth.noResults.message')"
              :no-results-action-label="$t('pages.appsList.auth.noResults.action')"
              @no-results-action:click="addFormOpened = true"
            >
              <template v-slot:list-item="{ item: app }">
                <app-list-item
                  :app="app"
                  :user="user"
                  @app:add="appToAdd = app"
                ></app-list-item>
              </template>
            </list>

            <add-app-dialog
              v-if="appToAdd"
              :value="true"
              :app="appToAdd"
              @input="appToAdd = null"
            ></add-app-dialog>
          </template>
        </page-content>
      </template>
    </auth-provider>
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthProvider from '@/components/layout/AuthProvider.vue';
import PageContent from '@/components/layout/PageContent.vue';
import List from '@/components/layout/List.vue';
import AppsListToolbar from '@/components/toolbar/AppsListToolbar.vue';
import AppListItem from '@/components/list-item/AppListItem.vue';
import AddAppDialog from '@/components/dialog/AddAppDialog.vue';

export default {
  name: 'AppsListPage',

  components: {
    DefaultLayout,
    AuthProvider,
    PageContent,
    List,
    AppsListToolbar,
    AppListItem,
    AddAppDialog,
  },

  data() {
    return {
      lookup: '',
      filters: {},
      appToAdd: null,
    };
  },
};
</script>
