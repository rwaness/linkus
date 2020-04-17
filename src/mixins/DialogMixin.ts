import OptionalModelMixin from './OptionalModelMixin';

export default {
  mixins: [OptionalModelMixin],

  methods: {
    close() {
      this.model = false;
    },
  },
};
