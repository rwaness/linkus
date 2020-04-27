import { VuapixMixin } from '@/lib/vuapix';

export default {
  mixins: [VuapixMixin],

  mounted() {
    if (!this.$refs.form) {
      throw new Error(`Missing "form" ref on component "${this.$options.name}"`);
    }
  },

  methods: {
    validate() {
      let valid = false;
      if (this.$refs.form && typeof this.$refs.form.validate === 'function') {
        valid = this.$refs.form.validate();
      }
      return valid;
    },
    submit() {
      return this.validate() && this.vuapixDoQuery();
    },
    vuapixEmit(eventName, data) {
      const event = eventName === 'query' ? 'submit' : eventName;
      this.$emit(event, data);
    },
  },
};
