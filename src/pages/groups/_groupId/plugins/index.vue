<template>
  <div>
    <list :items="group.plugins">
      <template v-slot:list-item="{ item: user }">
        <plugin-list-item :user="user" />
      </template>
    </list>

    <v-btn
      fab
      color="accent"
      absolute
      bottom
      right
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import List from '@/components/layout/List.vue';
import PluginListItem from '@/components/list-item/PluginListItem.vue';

export default {
  name: 'GroupPluginsPage',

  components: {
    List,
    PluginListItem,
  },

  props: {
    group: {
      type: Object,
      required: true,
    },
  },
};
</script>
