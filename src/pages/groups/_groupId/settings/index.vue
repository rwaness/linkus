<template>
  <div>
    <pre>{{ group }}</pre>
  </div>
</template>

<script>
export default {
  name: 'GroupSettingsPage',

  props: {
    group: {
      type: Object,
      required: true,
    },
  },
};
</script>
