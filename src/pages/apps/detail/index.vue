<template>
  <default-layout>
    <page-content
      vuapix-entry="vuapix/apps/appDetail"
      :vuapix-params="{ id: appId }"
    >
      <template v-slot="{ data: app }">
        <auth-view>
          <template v-slot="{ user }">
            <app-wrapper
              :app="app"
              :user="user"
            ></app-wrapper>
          </template>
          <template v-slot:unauthenticated>
            <pre>{{ app }}</pre>
          </template>
        </auth-view>
      </template>
    </page-content>
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import PageContent from '@/components/layout/PageContent.vue';
import AuthView from '@/components/layout/AuthView.vue';
import AppWrapper from '@/components/apps/AppWrapper.vue';

export default {
  name: 'AppDetail',

  components: {
    DefaultLayout,
    AuthView,
    PageContent,
    AppWrapper,
  },

  props: {
    appId: {
      type: String,
      required: true,
    },
  },
};
</script>
