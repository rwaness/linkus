<template>
  <page-content vuapix-entry="vuapix/apps/appsList">
    <template v-slot="{ data: apps }">
      <list :items="apps">
        <template v-slot:list-item="{ item: app }">
          <app-list-item :app="app">
            <template v-slot:action>
              <slot
                name="list-item-action"
                :app="app"
              ></slot>
            </template>
          </app-list-item>
        </template>
      </list>
    </template>
  </page-content>
</template>

<script>
import PageContent from '@/components/layout/PageContent.vue';
import List from '@/components/layout/List.vue';
import AppListItem from '@/components/list-item/AppListItem.vue';

export default {
  name: 'AppsList',

  components: {
    PageContent,
    List,
    AppListItem,
  },
};
</script>
