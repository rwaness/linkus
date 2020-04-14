<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
  >
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
import Card from '@/components/util/Card.vue';
import LoadingOverlay from '@/components/util/LoadingOverlay.vue';

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
      loading: false,
    };
  },

  methods: {
    close() {
      this.$emit('input', false);
    },
    async submit() {
      this.loading = true;
      await this.$slots.default[0].componentInstance.submit();
      this.loading = false;
    },
  },
};
</script>
