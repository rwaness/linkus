<template>
  <page-content
    class="member-profile"
    vuapix-entry="vuapix/users/userDetail"
    :vuapix-params="{ id: memberId }"
  >
    <template v-slot="{ data: member, error }">
      <div class="error">{{ error }}</div>
      <pre>{{ member }}</pre>
    </template>
  </page-content>
</template>

<script>
import PageContent from '@/components/layout/PageContent.vue';

export default {
  name: 'MemberProfilePage',

  components: {
    PageContent,
  },

  props: {
    memberId: {
      type: String,
      required: true,
    },
  },
};
</script>
