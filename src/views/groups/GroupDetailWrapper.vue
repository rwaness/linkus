<template>
  <page-content
    class="my-group"
    :autoload="autoload"
    :loading="querying"
  >
    <no-results
      v-if="!group"
      class="fill-height"
      icon="mdi-account-group"
      :label="$t('pages.groupDetail.noResults.label')"
      :message="$t('pages.groupDetail.noResults.message')"
      :action-label="$t('pages.groupDetail.noResults.action')"
      @action:click="$router.push({ name: 'GroupsList' })"
    />

    <template v-else>
      <breadcrumbs :items="breadcrumbs" />

      <v-container fluid>
        <router-view></router-view>
      </v-container>

      <v-bottom-navigation fixed grow>
        <v-btn
          v-for="(item, idx) in navItems"
          :key="`nav-${idx}`"
          :to="item.to"
          :exact="item.exact"
        >
          <span>{{ item.text }}</span>
          <v-icon v-text="item.icon"></v-icon>
        </v-btn>
      </v-bottom-navigation>
    </template>
  </page-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PageContent from '@/components/wrapper/PageContent.vue';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue';
import NoResults from '@/components/util/NoResults.vue';

export default {
  name: 'GroupDetailWrapper',

  components: {
    PageContent,
    Breadcrumbs,
    NoResults,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      navItems: [{
        icon: 'mdi-home-outline',
        text: this.$t('pages.groupDetail.nav.home'),
        to: { name: 'GroupDetail', params: { id: this.id } },
        exact: true,
      }, {
        icon: 'mdi-account-multiple-outline',
        text: this.$t('pages.groupDetail.nav.members'),
        to: { name: 'GroupMembers', params: { id: this.id } },
      }, {
        icon: 'mdi-puzzle-outline',
        text: this.$t('pages.groupDetail.nav.plugins'),
        to: { name: 'GroupPlugins', params: { id: this.id } },
      }, {
        icon: 'mdi-cog-outline',
        text: this.$t('pages.groupDetail.nav.settings'),
        to: { name: 'GroupSettings', params: { id: this.id } },
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
      const breadcrumbs = [{
        text: this.$t('pages.groupsList.title'),
        to: { name: 'GroupsList' },
      }, {
        text: this.group.name,
        to: { name: 'GroupDetail', params: { id: this.id } },
      }];
      const { icon, ...activRoute } = this.navItems.find(({ to }) => to.name === this.$route.name);
      if (activRoute.to.name !== 'GroupDetail') {
        breadcrumbs.push(activRoute);
      }
      return breadcrumbs;
    },
  },

  methods: {
    ...mapActions('vuapix/groups/groupDetail', {
      fetch: 'doQuery',
    }),
    autoload() {
      return this.fetch({ id: this.id });
    },
  },
};
</script>
