<template>
  <div class="step">
    <v-stepper-step
      :step="step"
      :complete="complete"
    >
      {{ title }}
    </v-stepper-step>
    <v-stepper-content
      :step="step"
    >
      <slot></slot>

      <v-btn
        class="d-block mx-auto"
        color="primary"
        @click="nextStep"
      >
        {{ nextLabel || $t('stepper.nextLabel') }}
      </v-btn>
    </v-stepper-content>
  </div>
</template>

<script>
export default {
  name: 'Step',

  props: {
    step: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    nextLabel: {
      type: String,
      default: '',
    },
    checkBeforeNext: {
      type: Function,
      default: () => true,
    },
  },

  methods: {
    async nextStep() {
      if (await this.checkBeforeNext()) {
        this.$emit('step:next');
      }
    },
  },
};
</script>
