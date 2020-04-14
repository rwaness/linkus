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
      <data-section :title="$t('pages.user.profile.bio')">
        <p>{{ profile.bio }}</p>
      </data-section>

      <data-section :title="$t('pages.user.profile.livingPlace')">
        <p>{{ profile.livingPlace }}</p>
      </data-section>

      <data-section :title="$t('pages.user.profile.birthDate')">
       <p>{{ profile.birthDate }}</p>
      </data-section>

      <data-section :title="$t('pages.user.profile.email')">
        <p>{{ profile.email }}</p>
      </data-section>

      <data-section :title="$t('pages.user.profile.phone')">
       <p>{{ profile.phone }}</p>
      </data-section>

      <data-section :title="$t('pages.user.profile.job')">
       <p>{{ profile.job }}</p>
      </data-section>
    </v-container>

    <update-profile-dialog
      v-model="editionFormOpened"
      :profile="profile"
    ></update-profile-dialog>
  </div>
</template>

<script>
import DataSection from '@/components/util/DataSection.vue';
import UpdateProfileDialog from '@/components/dialog/UpdateProfileDialog.vue';

export default {
  name: 'UserProfile',

  components: {
    DataSection,
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
