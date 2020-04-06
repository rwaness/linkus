<template>
  <v-list-item :to="{ name: 'MemberProfile', params: { memberId: user.id } }">
    <v-list-item-avatar>
      <v-icon>mdi-account</v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ user.email }}</v-list-item-title>
    </v-list-item-content>

    <v-list-item-icon>
      <v-icon>mdi-chevron-right</v-icon>
    </v-list-item-icon>
    </v-list-item>
</template>

<script>
export default {
  name: 'UserListItem',

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
