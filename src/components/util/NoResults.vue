<template>
  <v-container class="no-results fill-height">
    <v-row
      no-gutters
      justify="center"
      align="center"
      class="fill-height flex-column flex-nowrap"
    >
      <v-icon
        size="62"
        v-text="icon"
      />
      <span
        class="font-weight-bold"
        v-html="label"
      />
      <span
        v-if="message"
        v-html="message"
      />
      <v-btn
        v-if="actionLabel"
        color="accent"
        v-html="actionLabel"
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
