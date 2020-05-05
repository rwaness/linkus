<template>
  <toolbar
    class="apps-list-toolbar"
    :title="$t('pages.appsList.auth.title')"
  >
    <search-field
      v-if="searchOpened"
      @search="$emit('apps:search', $event)"
    ></search-field>

    <template v-slot:append>
      <v-btn
        v-if="!searchOpened"
        icon
        @click="searchOpened = true"
      >
        <v-icon>mdi-toy-brick-search</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="filterOpened = true"
      >
        <v-icon>mdi-filter</v-icon>
      </v-btn>
    </template>
  </toolbar>
</template>

<script>
import Toolbar from '@/components/layout/Toolbar.vue';
import SearchField from '@/components/layout/form-field/SearchField.vue';

export default {
  name: 'AppsListToolbar',

  components: {
    Toolbar,
    SearchField,
  },

  data() {
    return {
      searchOpened: false,
      filterOpened: false,
    };
  },
};
</script>
