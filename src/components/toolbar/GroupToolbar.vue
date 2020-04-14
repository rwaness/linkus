<template>
  <toolbar :title="group.name">
    <template v-slot:prepend>
      <v-btn
        icon
        :to="{ name: 'GroupsList' }"
        exact
        class="ml-n4"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </template>

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
    group: {
      type: Object,
      required: true,
    },
  },
};
</script>
