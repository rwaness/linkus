<template>
  <div>
    <v-toolbar dense>
      <v-toolbar-title class="title">
        {{ profile.name }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="editionFormOpened = true">
        <v-icon>mdi-account-edit</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container>
      <span class="subtitle-2">{{ $t('pages.user.profile.bio') }}</span>
      <v-divider></v-divider>
      <p>{{ profile.bio }}</p>

      <span class="subtitle-2">{{ $t('pages.user.profile.livingPlace') }}</span>
      <v-divider></v-divider>
      <p>{{ profile.livingPlace }}</p>

      <span class="subtitle-2">{{ $t('pages.user.profile.birthDate') }}</span>
      <v-divider></v-divider>
      <p>{{ profile.birthDate }}</p>

      <span class="subtitle-2">{{ $t('pages.user.profile.email') }}</span>
      <v-divider></v-divider>
      <p>{{ profile.email }}</p>

      <span class="subtitle-2">{{ $t('pages.user.profile.phone') }}</span>
      <v-divider></v-divider>
      <p>{{ profile.phone }}</p>

      <span class="subtitle-2">{{ $t('pages.user.profile.job') }}</span>
      <v-divider></v-divider>
      <p>{{ profile.job }}</p>
    </v-container>

    <update-profile-dialog
      v-model="editionFormOpened"
      :profile="profile"
    ></update-profile-dialog>
  </div>
</template>

<script>
import UpdateProfileDialog from '@/components/dialog/UpdateProfileDialog.vue';

export default {
  name: 'UserProfile',

  components: {
    UpdateProfileDialog,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      editionFormOpened: false,
      updating: false,
    };
  },

  computed: {
    profile() {
      return this.user.customData.profile;
    },
  },
};
</script>
