<template>
  <div class="list">
    <no-results
      v-if="!items.length && shouldDisplayNoResults"
      :icon="noResultsIcon"
      :label="noResultsLabel"
      :message="noResultsMessage"
      :action-label="noResultsActionLabel"
      @action:click="$emit('no-results-action:click')"
    />

    <template v-else>
      <v-list>
        <template>
          <div v-for="item in items" :key="`item-${getItemKey(item)}`">
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
    getItemKey: {
      type: Function,
      default: ({ id }) => id,
    },
    noResultsIcon: {
      type: String,
      default: '',
    },
    noResultsLabel: {
      type: String,
      default: '',
    },
    noResultsMessage: {
      type: String,
      default: '',
    },
    noResultsActionLabel: {
      type: String,
      default: '',
    },
  },

  computed: {
    shouldDisplayNoResults() {
      return this.noResultsLabel || this.noResultsMessage;
    },
  },
};
</script>
