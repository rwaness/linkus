<template>
  <div class="group-overview">
    <group-toolbar :group="group">
      <!-- <v-btn
        icon
        @click="invitationsFormOpened = true"
      >
        <v-icon>mdi-account-plus</v-icon>
      </v-btn> -->
    </group-toolbar>

    <v-container fluid>
      <pre>{{ group }}</pre>
      <br>
      <br>
    </v-container>
  </div>
</template>

<script>
import GroupToolbar from '@/components/toolbar/GroupToolbar.vue';

export default {
  name: 'GroupOverviewPage',

  components: {
    GroupToolbar,
  },

  props: {
    group: {
      type: Object,
      required: true,
    },
  },
};
</script>
