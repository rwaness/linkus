<template>
  <div>
    <pre>{{ group }}</pre>
  </div>
</template>

<script>
export default {
  name: 'GroupSettings',

  props: {
    group: {
      type: Object,
      required: true,
    },
  },
};
</script>
