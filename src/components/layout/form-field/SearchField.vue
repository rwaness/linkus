<template>
  <v-text-field
    :value="value"
    placeholder="Search"
    :loading="loading"
    autofocus
    clearable
    dense
    hide-details
    @input="$emit('input', $event)"
    @keyup.enter="doSearch"
  >
    <template v-slot:append-outer>
      <v-btn
        small
        outlined
        color="primary"
        :disabled="!value"
        @click="doSearch"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: 'SearchField',

  props: {
    value: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
    };
  },

  methods: {
    doSearch() {
      this.$emit('search', this.value);
    },
  },
};
</script>
