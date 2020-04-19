<template>
  <div class="vuapix-provider">
    <slot name="loader" :loading="loading"></slot>

    <template v-if="loaded">
      <slot :data="data" :error="error" :querying="querying"></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'VuapixProvider',

  props: {
    entry: {
      type: String,
      required: true,
    },
    params: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      loaded: false,
    };
  },

  computed: {
    data() {
      return this.$store.getters[`${this.entry}/data`];
    },
    querying() {
      return this.$store.getters[`${this.entry}/querying`];
    },
    error() {
      return this.$store.getters[`${this.entry}/error`];
    },
    loading() {
      return !this.loaded || this.querying;
    },
  },

  async created() {
    await this.load();
    this.loaded = true;
  },

  methods: {
    load() {
      return this.$store.dispatch(this.entry, this.params);
    },
  },
};
</script>
