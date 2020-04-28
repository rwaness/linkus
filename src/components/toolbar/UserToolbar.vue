<template>
  <toolbar :title="user.profile.name">
    <template v-slot:append>
      <slot></slot>
    </template>
  </toolbar>
</template>

<script>
import Toolbar from '@/components/layout/Toolbar.vue';

export default {
  name: 'GroupToolbar',

  components: {
    Toolbar,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
