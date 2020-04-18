<template>
  <card-dialog
    v-model="model"
    :title="title"
  >
    <template v-slot:activator="{ on }">
      <slot name="activator" :on="on"></slot>
    </template>

    <loading-overlay :loading="loading"></loading-overlay>

    <v-card-text>
      <slot v-if="model || !resetOnClose"></slot>
    </v-card-text>

    <template v-slot:card-actions>
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
    </template>
  </card-dialog>
</template>

<script>
import DialogMixin from '@/mixins/DialogMixin';
import CardDialog from '@/components/dialog/CardDialog.vue';
import LoadingOverlay from '@/components/ui/LoadingOverlay.vue';

export default {
  name: 'FormDialog',

  mixins: [DialogMixin],

  components: {
    CardDialog,
    LoadingOverlay,
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

  data() {
    return {
      loading: false,
    };
  },

  methods: {
    async submit() {
      this.loading = true;
      await this.$slots.default[0].componentInstance.submit();
      this.loading = false;
    },
  },
};
</script>
