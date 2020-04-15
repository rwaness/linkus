<template>
  <v-dialog
    v-model="modelValue"
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

      <loading-overlay :loading="loading"></loading-overlay>

      <v-card-text>
        <slot v-if="value || !resetOnClose"></slot>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn @click="close">
          {{ $t('dialog.actions.cancel') }}
        </v-btn>

        <v-btn
          color="primary"
          @click="submit"
        >
          {{ submitLabel || $t('dialog.actions.submit') }}
        </v-btn>
      </v-card-actions>
    </card>
  </v-dialog>
</template>

<script>
import Card from '@/components/ui/Card.vue';
import LoadingOverlay from '@/components/ui/LoadingOverlay.vue';

export default {
  name: 'FormDialog',

  components: {
    Card,
    LoadingOverlay,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    resetOnClose: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    submitLabel: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      modelValue: this.value,
      loading: false,
    };
  },

  watch: {
    value(value) {
      this.modelValue = value;
    },
    modelValue(modelValue) {
      this.$emit('input', modelValue);
    },
  },

  methods: {
    close() {
      this.modelValue = false;
    },
    async submit() {
      this.loading = true;
      await this.$slots.default[0].componentInstance.submit();
      this.loading = false;
    },
  },
};
</script>
