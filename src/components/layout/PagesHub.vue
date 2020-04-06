<template>
  <page-content
    class="pages-hub"
    :autoload="autoload"
    :loading="loading"
  >
    <breadcrumbs :items="fullBreadcrumbs" />

    <slot></slot>

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
  </page-content>
</template>

<script>
import PageContent from '@/components/layout/PageContent.vue';
import Breadcrumbs from './Breadcrumbs.vue';

export default {
  name: 'PagesHub',

  components: {
    PageContent,
    Breadcrumbs,
  },

  props: {
    autoload: {
      type: Function,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    breadcrumbs: {
      type: Array,
      required: true,
    },
    navItems: {
      type: Array,
      required: true,
    },
  },

  computed: {
    fullBreadcrumbs() {
      const { breadcrumbs } = this;

      const matchedRoutesName = this.$router.getMatchedComponents(this.$route).map((r) => r.name);
      const itemAncestorsCount = this.navItems.map(({ to }) => {
        const matchedRoutes = this.$router.getMatchedComponents(to);
        return matchedRoutes.filter(({ name }) => matchedRoutesName.includes(name)).length;
      });
      const indexOfAncestorRoute = itemAncestorsCount.indexOf(Math.max(...itemAncestorsCount));
      if (indexOfAncestorRoute) {
        const {
          icon,
          ...activRoute
        } = this.navItems[indexOfAncestorRoute];
        breadcrumbs.push(activRoute);
      }

      return breadcrumbs;
    },
  },
};
</script>
