<template>
  <dialog-box v-model="model">
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

      <template
        v-if="$slots['card-actions']"
        v-slot:actions
      >
        <slot name="card-actions"></slot>
      </template>
    </card>
  </dialog-box>
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
