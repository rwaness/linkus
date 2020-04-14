<template>
  <toolbar :title="user.customData.profile.name">
    <template v-slot:append>
      <slot></slot>
    </template>
  </toolbar>
</template>

<script>
import Toolbar from '@/components/util/Toolbar.vue';

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
