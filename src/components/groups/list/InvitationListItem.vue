<template>
  <group-list-item :group="group" class="invitation-list-item">
    <template v-slot:icon>
      <v-list-item-icon>
        <v-btn icon small color="green">
          <v-icon>mdi-check-circle-outline</v-icon>
        </v-btn>
        <v-btn icon small color="red">
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-list-item-icon>
    </template>
  </group-list-item>
</template>

<script>
import GroupListItem from './GroupListItem.vue';

export default {
  name: 'InvitationListItem',

  components: {
    GroupListItem,
  },

  props: {
    group: {
      type: Object,
      required: true,
    },
  },
};
</script>
