export default {
  computed: {
    vuapixOption() {
      const vuapixOption = typeof this.$options.vuapix === 'function'
        ? this.$options.vuapix.call(this)
        : this.$options.vuapix;
      const { entry, params } = vuapixOption;
      return {
        entry,
        params: (typeof params !== 'function' ? () => params : params).bind(this),
      };
    },
    vuapixData() {
      return this.$store.getters[`${this.vuapixOption.entry}/data`];
    },
    vuapixQuerying() {
      return this.$store.getters[`${this.vuapixOption.entry}/querying`];
    },
    vuapixError() {
      return this.$store.getters[`${this.vuapixOption.entry}/error`];
    },
  },

  created() {
    if (!this.vuapixOption || !this.vuapixOption.entry) {
      throw new Error(`Missing "vuapix" $option on component "${this.$options.name}"`);
    }
  },

  watch: {
    vuapixQuerying(vuapixQuerying: boolean) {
      if (vuapixQuerying) {
        this.vuapixEmit('query');
      } else if (this.vuapixError) {
        this.vuapixEmit('error', this.vuapixError);
      } else {
        this.vuapixEmit('success', this.vuapixData);
      }
    },
  },

  methods: {
    vuapixDoQuery() {
      const { entry, params } = this.vuapixOption;
      return this.$store.dispatch(entry, params());
    },
    vuapixEmit(eventName: string, data?: any) {
      this.$emit(`vuapix:${eventName}`, data);
    },
  },
};
