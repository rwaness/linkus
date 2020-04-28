<template>
  <default-layout>
    <auth-view class="fill-height d-flex flex-column">
      <template v-slot:unauthenticated>
        <apps-list></apps-list>
      </template>

      <template v-slot="{ user }">
        <toolbar
          :title="$t('pages.appsList.auth.title')"
          class="flex-grow-0"
        >
          <template v-slot:append>
            <v-btn
              icon
              @click="addFormOpened = true"
            >
              <v-icon>mdi-toy-brick-plus-outline</v-icon>
            </v-btn>
          </template>
        </toolbar>

        <user-apps-list
          :user="user.customData"
        ></user-apps-list>

        <add-app-dialog
          v-model="addFormOpened"
        ></add-app-dialog>
      </template>
    </auth-view>
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthView from '@/components/layout/AuthView.vue';
import AppsList from '@/components/list/AppsList.vue';
import UserAppsList from '@/components/list/UserAppsList.vue';
import Toolbar from '@/components/layout/Toolbar.vue';
import AddAppDialog from '@/components/dialog/AddAppDialog.vue';

export default {
  name: 'AppsListPage',

  components: {
    DefaultLayout,
    AuthView,
    AppsList,
    UserAppsList,
    Toolbar,
    AddAppDialog,
  },

  data() {
    return {
      addFormOpened: false,
    };
  },
};
</script>
