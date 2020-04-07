<template>
  <v-container>
    <!-- language -->
    <v-row>
      <v-col cols="12">
        <h2 class="subtitle-2">
          <v-icon>mdi-translate</v-icon>
          {{ $t('pages.user.preferences.language.subtitle') }}
        </h2>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <!-- theme -->
    <v-row>
      <v-col cols="12">
        <h2 class="subtitle-2">
          <v-icon>mdi-brightness-6</v-icon>
          {{ $t('pages.user.preferences.theme.subtitle') }}
        </h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'UserPreferences',

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
