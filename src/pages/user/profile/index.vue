<template>
  <v-container>
    <v-dialog v-model="editionFormOpened">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-account-edit</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-text>
          <user-profile-form
            ref="form"
            :profile="profile"
          ></user-profile-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="cancel"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="submit"
          >
            Save
          </v-btn>
        </v-card-actions>

        <loading-overlay :loading="updating"></loading-overlay>
      </v-card>
    </v-dialog>

    <p>{{ profile.bio }}</p>
  </v-container>
</template>

<script>
import UserProfileForm from '@/components/form/UserProfileForm.vue';
import LoadingOverlay from '@/components/util/LoadingOverlay.vue';

export default {
  name: 'UserProfile',

  components: {
    UserProfileForm,
    LoadingOverlay,
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

  watch: {
    profile() {
      this.editionFormOpened = false;
    },
  },

  methods: {
    cancel() {
      this.$refs.form.reset();
    },
    async submit() {
      this.updating = true;
      await this.$refs.form.submit();
      this.updating = false;
    },
  },
};
</script>
