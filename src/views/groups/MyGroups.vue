<template>
  <page-content
    class="my-groups"
    :autoload="autoload"
    :loading="querying"
  >
    <div class="fill-height flex flex-column flex-nowrap">
      <breadcrumbs :items="breadcrumbs" class="flex-grow-0" />

      <no-results
        v-if="!groups.length"
        class="flex-grow-1"
        icon="mdi-account-group"
        :label="$t('pages.myGroups.noResults.label')"
        :message="$t('pages.myGroups.noResults.message')"
        :action-label="$t('pages.myGroups.noResults.action')"
        @click:action="createFormOpened = true"
      />

      <template v-else>
        <v-list>
          <template v-for="(group, index) in groups">
            <v-divider v-if="index" :key="`divider-${index}`"></v-divider>
            <group-list-item :group="group" :key="`item-${group._id}`" />
          </template>
        </v-list>

        <v-btn
          fab
          fixed
          bottom
          right
          color="primary"
          @click:action="createFormOpened = true"
        >
          <v-icon>mdi-account-multiple-plus</v-icon>
        </v-btn>
      </template>


    </div>

    <v-dialog v-model="createFormOpened">
      <group-creation-card
        @group:created="goToMyGroup"
        @close="createFormOpened = false"
      />
    </v-dialog>
  </page-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PageContent from '@/components/wrapper/PageContent.vue';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue';
import NoResults from '@/components/list/NoResults.vue';
import GroupCreationCard from '@/components/groups/GroupCreationCard.vue';
import GroupListItem from '@/components/groups/list/GroupListItem.vue';

export default {
  name: 'MyGroups',

  components: {
    PageContent,
    Breadcrumbs,
    NoResults,
    GroupCreationCard,
    GroupListItem,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      breadcrumbs: [{
        text: this.$t('pages.myGroups.title'),
      }],
      createFormOpened: false,
    };
  },

  computed: {
    ...mapGetters('vuapix/groups/myGroups', {
      groups: 'data',
      querying: 'querying',
      error: 'error',
    }),
  },

  methods: {
    ...mapActions('vuapix/groups/myGroups', {
      fetchGroups: 'doQuery',
    }),
    autoload() {
      return this.fetchGroups();
    },
    goToMyGroup({ _id: id }) {
      this.$router.push({ name: 'MyGroup', params: { id: `${id}` } });
    },
  },
};
</script>
