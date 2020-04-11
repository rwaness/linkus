<template>
  <div class="vuapix-wrapper">
    <template v-if="!loaded || querying">
      <slot name="loader"></slot>
    </template>

    <template v-if="loaded">
      <slot :data="data" :error="error" :querying="querying"></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'VuapixWrapper',

  props: {
    entry: {
      type: String,
      required: true,
    },
    params: {
      type: Object,
      default: undefined,
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
