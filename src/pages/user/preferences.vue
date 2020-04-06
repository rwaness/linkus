<template>
  <v-container>
    <h1>{{ $t('pages.myPreferences.title') }}</h1>

    <!-- language -->
    <h2 class="title">
      <v-icon>mdi-translate</v-icon>
      {{ $t('pages.myPreferences.language.subtitle') }}
    </h2>

    <v-divider></v-divider>

    <!-- theme -->
    <h2 class="title">
      <v-icon>mdi-brightness-6</v-icon>
      {{ $t('pages.myPreferences.theme.subtitle') }}
    </h2>
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
