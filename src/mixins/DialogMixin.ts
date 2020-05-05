import OptionalModelMixin from '@/mixins/OptionalModelMixin';
import DialogBox from '@/components/layout/DialogBox.vue';

export default {
  mixins: [OptionalModelMixin],

  components: {
    DialogBox,
  },

  methods: {
    close() {
      this.model = false;
    },
  },
};
