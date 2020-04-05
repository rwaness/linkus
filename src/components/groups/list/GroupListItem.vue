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
import GroupListItemContent from './GroupListItemContent.vue';

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
    id() {
      const { _id: id } = this.group;
      return `${id}`;
    },
    link() {
      return { name: 'GroupDetail', params: { groupId: this.id } };
    },
  },
};
</script>
