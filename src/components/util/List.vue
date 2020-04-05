<template>
  <div class="list">
    <no-results
      v-if="!items.length"
      class="fill-height"
      :icon="noResultsIcon"
      :label="noResultsLabel"
      :message="noResultsMessage"
      :action-label="noResultsActionLabel"
      @action:click="$emit('no-results-action:click')"
    />

    <template v-else>
      <v-list>
        <template>
          <div v-for="item in items" :key="`item-${item._id}`">
            <v-divider></v-divider>
            <slot name="list-item" :item="item" />
          </div>
        </template>
      </v-list>

      <slot name="after-list" />
    </template>
  </div>
</template>

<script>
import NoResults from './NoResults.vue';

export default {
  name: 'List',

  components: {
    NoResults,
  },

  props: {
    items: {
      type: Array,
      required: true,
    },
    noResultsIcon: {
      type: String,
      required: true,
    },
    noResultsLabel: {
      type: String,
      required: true,
    },
    noResultsMessage: {
      type: String,
      required: true,
    },
    noResultsActionLabel: {
      type: String,
      default: '',
    },
  },
};
</script>
