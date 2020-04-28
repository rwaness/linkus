<template>
  <v-container class="no-results fill-height">
    <v-row
      no-gutters
      justify="center"
      align="center"
      class="fill-height flex-column flex-nowrap"
    >
      <v-icon
        v-text="icon"
        size="62"
      />
      <span
        class="text-center font-weight-bold"
        v-html="label"
      />
      <span
        class="text-center"
        v-if="message"
        v-html="message"
      />
      <v-btn
        v-if="actionLabel"
        v-html="actionLabel"
        class="mt-3"
        color="primary"
        @click="$emit('action:click')"
      />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NoResults',

  props: {
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: '',
    },
    actionLabel: {
      type: String,
      default: '',
    },
  },
};
</script>
