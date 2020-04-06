<template>
  <v-container>
    <h1 class="title">{{ user.id }}</h1>
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
