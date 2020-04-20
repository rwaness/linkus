<template>
  <default-layout>
    <page-content vuapix-entry="vuapix/apps/appsList">
      <template v-slot="{ data: apps }">
        <list :items="apps">
          <template v-slot:list-item="{ item: app }">
            <app-list-item
              :app="app"
            ></app-list-item>
          </template>
        </list>
      </template>
    </page-content>
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import PageContent from '@/components/layout/PageContent.vue';
import List from '@/components/ui/List.vue';
import AppListItem from '@/components/list-item/AppListItem.vue';

export default {
  name: 'AppsList',

  components: {
    DefaultLayout,
    PageContent,
    List,
    AppListItem,
  },
};
</script>
