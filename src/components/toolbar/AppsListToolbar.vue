<template>
  <toolbar
    :title="$t('pages.appsList.auth.title')"
    class="flex-grow-0"
  >
    <search-field
      v-if="searchOpened"
      v-model="searchModel"
      @search="doSearch"
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

      <slot name="append"></slot>
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
      searchModel: '',
      filterOpened: false,
    };
  },

  methods: {
    doSearch(search) {
      console.log('=> SEARCH :', search);
    },
  },
};
</script>
