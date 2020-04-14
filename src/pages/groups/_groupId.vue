<template>
  <default-layout class="group-detail">
    <auth-view class="fill-height" enable-login>
      <page-content
        vuapix-entry="vuapix/groups/groupDetail"
        :vuapix-params="{ id: groupId }"
      >
        <template v-slot="{ data: group }">
          <no-results
            v-if="!group"
            icon="mdi-account-group"
            :label="$t('pages.groupDetail.noResults.label')"
            :message="$t('pages.groupDetail.noResults.message')"
            :action-label="$t('pages.groupDetail.noResults.action')"
            @action:click="$router.push({ name: 'GroupsList' })"
          />
          <template v-else>
            <router-view :group="group"></router-view>

            <bottom-nav :nav-items="navItems" />
          </template>
        </template>
      </page-content>
    </auth-view>
  </default-layout>
</template>

<script>
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import PageContent from '@/components/layout/PageContent.vue';
import BottomNav from '@/components/layout/BottomNav.vue';
import NoResults from '@/components/ui/NoResults.vue';

export default {
  name: 'Group',

  components: {
    AuthView,
    DefaultLayout,
    PageContent,
    BottomNav,
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
        to: { name: 'GroupMembers', params: { groupId: this.groupId } },
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
};
</script>
