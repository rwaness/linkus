<template>
  <dialog-box v-model="model">
    <template v-slot:activator="{ on }">
      <slot name="activator" :on="on"></slot>
    </template>

    <form-card
      :title="title"
      :submit-label="submitLabel"
      @cancel="close"
      @close="close"
    >
      <slot v-if="model || !resetOnClose"></slot>
    </form-card>
  </dialog-box>
</template>

<script>
import DialogMixin from '@/mixins/DialogMixin';
import FormCard from '@/components/layout/FormCard.vue';

export default {
  name: 'FormDialog',

  mixins: [DialogMixin],

  components: {
    FormCard,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    submitLabel: {
      type: String,
      default: '',
    },
    resetOnClose: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
