<template>
  <default-layout>
    <auth-provider class="fill-height">
      <template v-slot="{ user }">
        <page-content
          vuapix-entry="vuapix/apps/appDetail"
          :vuapix-params="{ id: appId }"
        >
          <template v-slot="{ data: app }">
            <app-toolbar
              class="flex-grow-0"
              :app="app"
              :user="user"
              @app:add="confirmAppAddingDialog = true"
              @app:secure="confirmAppAddingDialog = true"
            ></app-toolbar>

            <template v-if="user">
              <app-wrapper
                :app="app"
                :user="user"
                class="flex-grow-1"
              ></app-wrapper>
            </template>

            <template v-else>
              <pre>{{ app }}</pre>
            </template>

            <add-app-dialog
              v-model="confirmAppAddingDialog"
              :app="app"
            ></add-app-dialog>
          </template>
        </page-content>
      </template>
    </auth-provider>
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import PageContent from '@/components/layout/PageContent.vue';
import AuthProvider from '@/components/layout/AuthProvider.vue';
import AppWrapper from '@/components/layout/AppWrapper.vue';
import AppToolbar from '@/components/toolbar/AppToolbar.vue';
import AddAppDialog from '@/components/dialog/AddAppDialog.vue';

export default {
  name: 'AppDetailPage',

  components: {
    DefaultLayout,
    AuthProvider,
    PageContent,
    AppWrapper,
    AppToolbar,
    AddAppDialog,
  },

  props: {
    appId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      confirmAppAddingDialog: false,
    };
  },
};
</script>
