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
import List from '@/components/util/List.vue';
import PluginListItem from '@/components/plugins/list/PluginListItem.vue';

export default {
  name: 'GroupPlugins',

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
