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
    submit() {
      return this.validate()
        && VuapixFormMixin.methods.submit.call(this);
    },
  },
};
