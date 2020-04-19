<template>
  <div>
    <user-toolbar :user="userData">
      <update-profile-dialog :user="userData">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-account-edit</v-icon>
          </v-btn>
        </template>
      </update-profile-dialog>
    </user-toolbar>

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
  </div>
</template>

<script>
import UserToolbar from '@/components/toolbar/UserToolbar.vue';
import DataSection from '@/components/ui/DataSection.vue';
import UpdateProfileDialog from '@/components/dialog/UpdateProfileDialog.vue';

export default {
  name: 'UserProfile',

  components: {
    UserToolbar,
    DataSection,
    UpdateProfileDialog,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  computed: {
    userData() {
      return this.user.customData;
    },
    profile() {
      return this.userData.profile;
    },
  },
};
</script>
