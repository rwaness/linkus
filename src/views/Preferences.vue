<template>
  <default-layout class="preferences">
    <auth-view enable-login>
      <h1>{{ $t('pages.preferences.title') }}</h1>

      <!-- language -->
      <h2 class="title">
        <v-icon>mdi-translate</v-icon>
        {{ $t('pages.preferences.language.subtitle') }}
      </h2>

      <v-divider></v-divider>

      <!-- theme -->
      <h2 class="title">
        <v-icon>mdi-brightness-6</v-icon>
        {{ $t('pages.preferences.theme.subtitle') }}
      </h2>
    </auth-view>
  </default-layout>
</template>

<script>
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

export default {
  name: 'Preferences',

  components: {
    AuthView,
    DefaultLayout,
  },
};
</script>
