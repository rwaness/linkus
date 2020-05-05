<template>
  <v-dialog
    v-model="model"
    scrollable
  >
    <template v-slot:activator="{ on }">
      <slot name="activator" :on="on"></slot>
    </template>

    <slot></slot>
  </v-dialog>
</template>

<script>
import OptionalModelMixin from '@/mixins/OptionalModelMixin';

export default {
  name: 'DialogBox',

  mixins: [OptionalModelMixin],
};
</script>
