<template>
  <default-layout class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'HomePage',
  components: {
    DefaultLayout,
    HelloWorld,
  },
};
</script>
