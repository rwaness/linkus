<template>
  <vuapix-provider
    entry="vuapix/apps/userAppsList"
    :params="user"
  >
    <template v-slot="{ data: apps }">
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
          ></app-list-item>
        </template>
      </list>
    </template>
  </vuapix-provider>
</template>

<script>
import { VuapixProvider } from '@/lib/vuapix';
import List from '@/components/layout/List.vue';
import AppListItem from '@/components/list-item/AppListItem.vue';

export default {
  name: 'UserAppsList',

  components: {
    VuapixProvider,
    List,
    AppListItem,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
