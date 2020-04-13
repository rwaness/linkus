import { VuapixFormMixin } from '@/lib/vuapix';

export default {
  mixins: [VuapixFormMixin],

  methods: {
    validate() {
      let valid = false;
      if (this.$refs.form && typeof this.$refs.form.validate === 'function') {
        valid = this.$refs.form.validate();
      }
      return valid;
    },
  },
};
