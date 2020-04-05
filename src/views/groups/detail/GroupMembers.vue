<template>
  <div>
    <list :items="group.members">
      <template v-slot:list-item="{ item: user }">
        <user-list-item :user="user" />
      </template>
    </list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import List from '@/components/util/List.vue';
import UserListItem from '@/components/users/list/UserListItem.vue';

export default {
  name: 'GroupMembers',

  components: {
    List,
    UserListItem,
  },

  computed: {
    ...mapGetters('vuapix/groups', {
      group: 'groupDetail',
    }),
  },
};
</script>
