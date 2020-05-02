<template>
  <default-layout>
    <auth-view class="fill-height d-flex flex-column">
      <template v-slot:unauthenticated>
        <apps-list-toolbar
          class="flex-grow"
        ></apps-list-toolbar>

        <apps-list></apps-list>
      </template>

      <template v-slot="{ user }">
        <apps-list-toolbar class="flex-grow-0">
          <template v-slot:append>
            <v-btn
              icon
              @click="addFormOpened = true"
            >
              <v-icon>mdi-toy-brick-plus-outline</v-icon>
            </v-btn>
          </template>
        </apps-list-toolbar>

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
import AppsListToolbar from '@/components/toolbar/AppsListToolbar.vue';
import AppsList from '@/components/list/AppsList.vue';
import UserAppsList from '@/components/list/UserAppsList.vue';
import AddAppDialog from '@/components/dialog/AddAppDialog.vue';

export default {
  name: 'AppsListPage',

  components: {
    DefaultLayout,
    AuthView,
    AppsListToolbar,
    AppsList,
    UserAppsList,
    AddAppDialog,
  },

  data() {
    return {
      addFormOpened: false,
    };
  },
};
</script>
