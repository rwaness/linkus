<template>
  <v-stepper v-model="model" vertical>
    <vnode
      v-for="(stepNode, index) in steps"
      :key="`step-${index}`"
      :vnode="stepNode"
      :step="index + 1"
      :complete="model > index + 1"
      @step:next="nextStep"
    ></vnode>
  </v-stepper>
</template>

<script>
import OptionalModelMixin from '@/mixins/OptionalModelMixin';
import Vnode from '@/components/functional/Vnode';

export default {
  name: 'Stepper',

  mixins: [OptionalModelMixin],

  components: {
    Vnode,
  },

  computed: {
    steps() {
      return this.$slots.default;
    },
  },

  methods: {
    nextStep() {
      if (this.model < this.steps.length) {
        this.model += 1;
      } else {
        this.$emit('finish');
      }
    },
  },
};
</script>
