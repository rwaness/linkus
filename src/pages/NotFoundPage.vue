<template>
  <default-layout class="not-found">
    <not-found></not-found>
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import NotFound from '@/components/error/NotFound.vue';

export default {
  name: 'NotFoundPage',

  components: {
    DefaultLayout,
    NotFound,
  },
};
</script>
