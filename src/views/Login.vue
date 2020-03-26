<template>
  <default-layout>
    <login-card />
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import LoginCard from '@/lib/vue-mongodb-stitch/components/LoginCard.vue';

export default {
  name: 'Locales',

  components: {
    DefaultLayout,
    LoginCard,
  },
};
</script>
