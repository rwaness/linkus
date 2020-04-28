<template>
  <default-layout>
    <page-content
      vuapix-entry="vuapix/apps/appDetail"
      :vuapix-params="{ id: appId }"
    >
      <template v-slot="{ data: app }">
        <auth-view class="fill-height">
          <template v-slot="{ user }">
            <toolbar
              :title="app.name"
              class="flex-grow-0"
            >
            </toolbar>

            <app-wrapper
              :app="app"
              :user="user"
            ></app-wrapper>
          </template>
          <template v-slot:unauthenticated>
            <toolbar
              :title="app.name"
              class="flex-grow-0"
            >
              <template v-slot:append>
                <v-btn
                  icon
                  @click="loginOpened = true"
                >
                  <v-icon>mdi-toy-brick-plus-outline</v-icon>
                </v-btn>
              </template>
            </toolbar>

            <pre>{{ app }}</pre>

            <login-dialog
              v-model="loginOpened"
            ></login-dialog>
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
import AppWrapper from '@/components/layout/AppWrapper.vue';
import Toolbar from '@/components/layout/Toolbar.vue';
import LoginDialog from '@/components/dialog/LoginDialog.vue';

export default {
  name: 'AppDetailPage',

  components: {
    DefaultLayout,
    AuthView,
    PageContent,
    AppWrapper,
    Toolbar,
    LoginDialog,
  },

  props: {
    appId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loginOpened: false,
    };
  },
};
</script>
