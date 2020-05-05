<template>
  <toolbar
    :title="app.name"
    :back-route="{ name: 'AppsListPage' }"
  >
    <template v-slot:append>
      <v-btn
        v-if="!userHasApp"
        icon
        @click="$emit('app:add')"
      >
        <v-icon>mdi-toy-brick-plus-outline</v-icon>
      </v-btn>

      <template v-else>
        <v-btn
          icon
          @click="$emit('app:secure')"
        >
          <v-icon>mdi-shield-edit</v-icon>
        </v-btn>

        <v-menu
          v-model="menuOpened"
          offset-y
          right
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="$emit('app:remove')">
              <v-list-item-icon>
                <v-icon>mdi-close</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Remove App</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </template>
  </toolbar>
</template>

<script>
import Toolbar from '@/components/layout/Toolbar.vue';

export default {
  name: 'AppToolbar',

  components: {
    Toolbar,
  },

  props: {
    app: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      menuOpened: false,
    };
  },

  computed: {
    userHasApp() {
      return this.user
        && this.user.customData.apps.includes(this.app.id);
    },
  },
};
</script>
