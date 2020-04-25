<template>
  <v-list-item
    class="member-list-item"
    :to="{ name: 'MemberProfilePage', params: { memberId: member.id } }"
  >
    <v-list-item-avatar>
      <v-icon>mdi-account</v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ member.name }}</v-list-item-title>
    </v-list-item-content>

    <v-list-item-icon>
      <v-icon>mdi-chevron-right</v-icon>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
export default {
  name: 'MemberListItem',

  props: {
    member: {
      type: Object,
      required: true,
    },
  },
};
</script>
