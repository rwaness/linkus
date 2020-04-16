export default {
  props: ['value'],

  data() {
    return {
      model: this.value,
    };
  },

  watch: {
    value(value) {
      this.model = value;
    },
    model(model) {
      this.$emit('input', model);
    },
  },
};
