<template>
  <v-container>
    <!-- language -->
    <data-section
      icon="mdi-translate"
      :title="$t('pages.user.preferences.language.subtitle')"
    ></data-section>

    <!-- theme -->
    <data-section
      icon="mdi-brightness-6"
      :title="$t('pages.user.preferences.theme.subtitle')"
    ></data-section>
  </v-container>
</template>

<script>
import DataSection from '@/components/layout/DataSection.vue';

export default {
  name: 'UserPreferencesPage',

  components: {
    DataSection,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
