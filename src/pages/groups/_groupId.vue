<template>
  <default-layout class="groups-wrapper">
    <auth-view
      class="fill-height"
      enable-login
    >
      <page-content
        class="group-detail"
        :autoload="autoload"
        :loading="querying"
      >
        <no-results
          v-if="!group"
          icon="mdi-account-group"
          :label="$t('pages.groupDetail.noResults.label')"
          :message="$t('pages.groupDetail.noResults.message')"
          :action-label="$t('pages.groupDetail.noResults.action')"
          @action:click="$router.push({ name: 'GroupsList' })"
        />
        <hub-page
          v-else
          :breadcrumbs="breadcrumbs"
          :nav-items="navItems"
        >
          <router-view :group="group"></router-view>
        </hub-page>
      </page-content>
    </auth-view>
  </default-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import PageContent from '@/components/layout/PageContent.vue';
import HubPage from '@/components/layout/HubPage.vue';
import NoResults from '@/components/util/NoResults.vue';

export default {
  name: 'Group',

  components: {
    AuthView,
    DefaultLayout,
    PageContent,
    HubPage,
    NoResults,
  },

  props: {
    groupId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      navItems: [{
        icon: 'mdi-view-dashboard',
        text: this.$t('pages.groupDetail.nav.overview'),
        to: { name: 'GroupOverview', params: { groupId: this.groupId } },
        exact: true,
      }, {
        icon: 'mdi-account-multiple',
        text: this.$t('pages.groupDetail.nav.members'),
        to: { name: 'GroupMembersList', params: { groupId: this.groupId } },
      }, {
        icon: 'mdi-puzzle',
        text: this.$t('pages.groupDetail.nav.plugins'),
        to: { name: 'GroupPlugins', params: { groupId: this.groupId } },
      }, {
        icon: 'mdi-cogs',
        text: this.$t('pages.groupDetail.nav.settings'),
        to: { name: 'GroupSettings', params: { groupId: this.groupId } },
      }],
    };
  },

  computed: {
    ...mapGetters('vuapix/groups/groupDetail', {
      group: 'data',
      querying: 'querying',
      error: 'error',
    }),
    breadcrumbs() {
      return this.group
        ? [{
          text: this.$t('pages.groupsList.title'),
          to: { name: 'GroupsList' },
        }, {
          text: this.group.name,
          to: { name: 'GroupOverview', params: { groupId: this.groupId } },
        }]
        : [];
    },
  },

  methods: {
    ...mapActions('vuapix/groups', {
      fetch: 'groupDetail',
    }),
    autoload() {
      return this.fetch({ id: this.groupId });
    },
  },
};
</script>
