<template>
  <v-container>
    <pre>{{ user.customData }}</pre>
  </v-container>
</template>

<script>
export default {
  name: 'UserProfile',

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
