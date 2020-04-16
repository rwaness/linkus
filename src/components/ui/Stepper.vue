<template>
  <v-stepper v-model="value" vertical>
    <vnode
      v-for="(stepNode, index) in steps"
      :key="`step-${index}`"
      :vnode="stepNode"
      :step="index + 1"
      :complete="value > index + 1"
      @step:next="value = Math.min(value + 1, steps.length)"
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
};
</script>
