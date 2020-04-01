<template>
  <div class="my-groups fill-height">
    <h1 class="display-1">
      <!-- <v-icon color="amber darken-2">mdi-account-group</v-icon> -->
      {{ $t('pages.myGroups.title') }}
    </h1>

    <no-results
      v-if="!groups.length"
      class="fill-height"
      icon="mdi-account-group"
      :label="$t('pages.myGroups.noResults.label')"
      :message="$t('pages.myGroups.noResults.message')"
      :action-label="$t('pages.myGroups.noResults.action')"
      @click:action="createFormOpened = true"
    />

    <template v-else>
      <v-list>
        <v-list-item
          v-for="group in groups"
          :key="`${group._id}`"
          :to="{ name: 'MyGroup', params: { id: `${group._id}` } }"
        >
          <v-list-item-content>
            <v-list-item-title>{{ group.name }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>

      <v-btn
        fab
        fixed
        bottom
        right
        color="primary"
        @click="createFormOpened = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-overlay
      v-model="createFormOpened"
      :dark="false"
    >
      <group-creation-card
        @group:created="onCreate"
        @close="createFormOpened = false"
      />
    </v-overlay>
  </div>
</template>

<script>
import NoResults from '@/components/list/NoResults.vue';
import GroupCreationCard from '@/components/groups/GroupCreationCard.vue';

export default {
  name: 'MyGroups',

  components: {
    NoResults,
    GroupCreationCard,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      createFormOpened: false,
      groups: [],
    };
  },

  async created() {
    this.groups = await this.$mongodbStitch.db.collection('groups').find({
      owner: this.user.id,
    }, {
      limit: 100,
    }).asArray();
  },

  methods: {
    onCreate({ _id: id }) {
      this.$router.push({ name: 'MyGroup', params: { id } });
    },
  },
};
</script>
