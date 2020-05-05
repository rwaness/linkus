<template>
  <card :title="title">
    <template
      v-if="$listeners['close']"
      v-slot:toolbar-right
    >
      <v-btn
        icon
        @click="$emit('close')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>

    <loading-overlay :loading="loading"></loading-overlay>

    <v-card-text>
      <slot></slot>
    </v-card-text>

    <template v-slot:actions>
      <v-spacer></v-spacer>

      <v-btn @click="$emit('cancel')">
        {{ $t('formCard.actions.cancel') }}
      </v-btn>

      <v-btn
        color="primary"
        @click="submit"
      >
        {{ submitLabel || $t('formCard.actions.submit') }}
      </v-btn>
    </template>
  </card>
</template>

<script>
import Card from '@/components/layout/Card.vue';
import LoadingOverlay from '@/components/layout/LoadingOverlay.vue';

export default {
  name: 'FormCard',

  components: {
    Card,
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
