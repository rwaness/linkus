<template>
  <v-stepper v-model="value" vertical>
    <vnode
      v-for="(stepNode, index) in steps"
      :key="`step-${index}`"
      :vnode="stepNode"
      :step="index + 1"
      :complete="value > index + 1"
      @step:next="nextStep"
    ></vnode>
  </v-stepper>
</template>

<script>
import Vnode from '@/components/functional/Vnode';

export default {
  name: 'Stepper',

  components: {
    Vnode,
  },

  data() {
    return {
      value: 1,
    };
  },

  computed: {
    steps() {
      return this.$slots.default;
    },
  },

  methods: {
    nextStep() {
      if (this.value < this.steps.length) {
        this.value += 1;
      } else {
        this.$emit('finish');
      }
    },
  },
};
</script>
