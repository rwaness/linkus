<template>
  <v-form ref="form" lazy-validation>
    <v-text-field
      v-model="values.name"
      :rules="rules.name"
      :label="$t('form.userProfile.name.label')"
      required
    ></v-text-field>

    <v-text-field
      v-model="values.bio"
      :counter="250"
      :rules="rules.bio"
      :label="$t('form.userProfile.bio.label')"
    ></v-text-field>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'UserProfileForm',

  props: {
    profile: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      values: this.getDefaultValues(),
      rules: {
        name: [
          (v) => !!v || this.$t('form.userProfile.name.rules.required'),
        ],
        bio: [
          (v) => (v && v.length <= 250) || this.$t('form.userProfile.bio.rules.format', { nbChars: 250 }),
        ],
      },
    };
  },

  watch: {
    profile() {
      this.reset();
    },
  },

  methods: {
    ...mapActions('vuapix/users', {
      updateProfile: 'profile',
    }),
    getDefaultValues() {
      return { ...this.profile };
    },
    reset() {
      this.values = this.getDefaultValues();
    },
    async submit() {
      let user;
      if (this.$refs.form.validate()) {
        user = await this.updateProfile(this.values);
      }
      return user;
    },
  },
};
</script>
