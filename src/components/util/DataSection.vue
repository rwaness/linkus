<template>
  <div class="data-section">
    <v-icon v-if="icon" v-text="icon"></v-icon>
    <span class="subtitle-2">{{ title }}</span>
    <v-divider></v-divider>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DataSection',

  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
