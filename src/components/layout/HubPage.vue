<template>
  <div class="hub-page fill-height">
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
  </div>
</template>

<script>
import Breadcrumbs from './Breadcrumbs.vue';

export default {
  name: 'HubPage',

  components: {
    Breadcrumbs,
  },

  props: {
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
      const breadcrumbs = [...this.breadcrumbs];

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
