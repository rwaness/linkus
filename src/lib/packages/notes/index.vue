<template>
  <div>
    user: {{ user.id }}
  </div>
</template>

<script>
export default {
  name: 'NoteApp',

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
