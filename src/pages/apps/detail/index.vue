<template>
  <default-layout>
    <page-content
      vuapix-entry="vuapix/apps/appDetail"
      :vuapix-params="{ id: appId }"
    >
      <template v-slot="{ data: app }">
        <pre>{{ app }}</pre>
      </template>
    </page-content>
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import PageContent from '@/components/layout/PageContent.vue';

export default {
  name: 'AppDetail',

  components: {
    DefaultLayout,
    PageContent,
  },

  props: {
    appId: {
      type: String,
      required: true,
    },
  },
};
</script>
