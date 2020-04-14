<template>
  <v-container>
    <data-section :title="$t('pages.user.account.email')">
      <p>{{ email }}</p>
    </data-section>
  </v-container>
</template>

<script>
import DataSection from '@/components/util/DataSection.vue';

export default {
  name: 'UserAccount',

  components: {
    DataSection,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  computed: {
    email() {
      return this.user.profile.email;
    },
    identities() {
      return this.user.identities;
    },
  },
};
</script>
