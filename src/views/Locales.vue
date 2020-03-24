<template>
  <default-layout>
    <hello-i18n />
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import HelloI18n from '@/components/HelloI18n.vue';

export default {
  name: 'Locales',

  components: {
    DefaultLayout,
    HelloI18n,
  },
};
</script>
