<template>
  <v-list-item
    class="group-list-item"
    :to="link"
  >
    <v-list-item-content>
      <v-list-item-title>{{ group.name }}</v-list-item-title>
    </v-list-item-content>

    <slot name="icon">
      <v-list-item-icon>
        <v-icon>mdi-chevron-right</v-icon>
      </v-list-item-icon>
    </slot>
  </v-list-item>
</template>

<script>
export default {
  name: 'GroupListItem',

  props: {
    group: {
      type: Object,
      required: true,
    },
  },

  computed: {
    id() {
      const { _id: id } = this.group;
      return `${id}`;
    },
    link() {
      return { name: 'MyGroup', params: { id: this.id } };
    },
  },
};
</script>
