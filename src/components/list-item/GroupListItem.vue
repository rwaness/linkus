<template>
  <v-list-item
    class="group-list-item"
    :to="link"
  >
    <group-list-item-content :group="group" />

    <slot name="icon">
      <v-list-item-icon>
        <v-icon>mdi-chevron-right</v-icon>
      </v-list-item-icon>
    </slot>
  </v-list-item>
</template>

<script>
import GroupListItemContent from '@/components/list-item/content/GroupListItemContent.vue';

export default {
  name: 'GroupListItem',

  components: {
    GroupListItemContent,
  },

  props: {
    group: {
      type: Object,
      required: true,
    },
  },

  computed: {
    link() {
      return { name: 'GroupOverviewPage', params: { groupId: this.group.id } };
    },
  },
};
</script>
