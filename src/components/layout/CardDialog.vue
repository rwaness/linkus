<template>
  <v-dialog
    v-model="model"
    scrollable
  >
    <template v-slot:activator="{ on }">
      <slot name="activator" :on="on"></slot>
    </template>

    <card :title="title">
      <template v-slot:toolbar-right>
        <v-btn
          icon
          @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>

      <slot></slot>

      <v-card-actions v-if="$slots['card-actions']">
        <slot name="card-actions"></slot>
      </v-card-actions>
    </card>
  </v-dialog>
</template>

<script>
import DialogMixin from '@/mixins/DialogMixin';
import Card from '@/components/layout/Card.vue';

export default {
  name: 'CardDialog',

  mixins: [DialogMixin],

  components: {
    Card,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
