<template>
  <default-layout class="my-groups">
    <auth-view
      class="fill-height d-flex flex-column flex-nowrap"
      enable-login
      @authenticated="onAuthenticate"
    >
      <h1 class="display-1">
        <!-- <v-icon color="amber darken-2">mdi-account-group</v-icon> -->
        {{ $t('pages.myGroups.title') }}
      </h1>

      <no-results
        v-if="!myGroups.length"
        class="flex-grow-1"
        icon="mdi-account-group"
        :label="$t('pages.myGroups.noResults.label')"
        :message="$t('pages.myGroups.noResults.message')"
        :action-label="$t('pages.myGroups.noResults.action')"
        @click:action="createFormOpened = true"
      />

      <template v-else>
        <pre>{{ myGroups }}</pre>
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
    </auth-view>
  </default-layout>
</template>

<script>
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import NoResults from '@/components/list/NoResults.vue';
import GroupCreationCard from '@/components/groups/GroupCreationCard.vue';

export default {
  name: 'MyGroups',

  components: {
    AuthView,
    DefaultLayout,
    NoResults,
    GroupCreationCard,
  },

  data() {
    return {
      createFormOpened: false,
      myGroups: [],
    };
  },

  methods: {
    async onAuthenticate(user) {
      this.myGroups = await this.$mongodbStitch.db.collection('groups').find({
        owner: user.id,
      }, {
        limit: 100,
      }).asArray();
    },
    onCreate({ _id: id }) {
      this.$router.push({ name: 'Group', params: { id } });
    },
  },
};
</script>
