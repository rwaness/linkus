<template>
  <default-layout class="my-preferences">
    <auth-view enable-login>
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
    </auth-view>
  </default-layout>
</template>

<script>
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

export default {
  name: 'MyPreferences',

  components: {
    AuthView,
    DefaultLayout,
  },
};
</script>
