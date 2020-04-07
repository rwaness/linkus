<template>
  <v-container fluid>
    <pre>{{ group }}</pre>
    <br>
    <br>
  </v-container>
</template>

<script>
export default {
  name: 'GroupOverview',

  props: {
    group: {
      type: Object,
      required: true,
    },
  },
};
</script>
