<template>
  <router-view :group="group"></router-view>
</template>

<script>
export default {
  name: 'GroupMembers',

  props: {
    group: {
      type: Object,
      required: true,
    },
  },
};
</script>
