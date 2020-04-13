export default {
  computed: {
    vuapixData() {
      return this.$store.getters[`${this.$options.vuapix.entry}/data`];
    },
    vuapixQuerying() {
      return this.$store.getters[`${this.$options.vuapix.entry}/querying`];
    },
    vuapixError() {
      return this.$store.getters[`${this.$options.vuapix.entry}/error`];
    },
  },

  created() {
    if (!this.$options.vuapix || !this.$options.vuapix.entry) {
      throw new Error('Missing component $options "vuapix"');
    }
  },

  watch: {
    vuapixQuerying(vuapixQuerying) {
      if (vuapixQuerying) {
        this.$emit('submit');
      } else if (this.vuapixError) {
        this.$emit('error', this.vuapixError);
      } else {
        this.$emit('success', this.vuapixData);
      }
    },
  },

  methods: {
    validate() {
      return true;
    },
    async submit() {
      let result;
      if (this.validate()) {
        const { entry, params = () => undefined } = this.$options.vuapix;
        result = await this.$store.dispatch(entry, params.call(this));
      }
      return result;
    },
  },
};
