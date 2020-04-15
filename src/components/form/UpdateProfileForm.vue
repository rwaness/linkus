<template>
  <v-form ref="form" lazy-validation>
    <v-text-field
      v-model="values.name"
      :rules="rules.name"
      :label="$t('form.updateProfile.name.label')"
      required
    ></v-text-field>

    <v-text-field
      v-model="values.bio"
      :counter="250"
      :rules="rules.bio"
      :label="$t('form.updateProfile.bio.label')"
    ></v-text-field>

    <v-text-field
      v-model="values.livingPlace"
      :counter="250"
      :rules="rules.livingPlace"
      :label="$t('form.updateProfile.livingPlace.label')"
    ></v-text-field>

    <v-text-field
      v-model="values.birthDate"
      :counter="250"
      :rules="rules.birthDate"
      :label="$t('form.updateProfile.birthDate.label')"
    ></v-text-field>

    <v-text-field
      v-model="values.email"
      :counter="250"
      :rules="rules.email"
      :label="$t('form.updateProfile.email.label')"
    ></v-text-field>

    <v-text-field
      v-model="values.phone"
      :counter="250"
      :rules="rules.phone"
      :label="$t('form.updateProfile.phone.label')"
    ></v-text-field>

    <v-text-field
      v-model="values.job"
      :counter="250"
      :rules="rules.job"
      :label="$t('form.updateProfile.job.label')"
    ></v-text-field>
  </v-form>
</template>

<script>
import FormMixin from '@/mixins/FormMixin';

export default {
  name: 'UpdateProfileForm',

  mixins: [FormMixin],

  props: {
    profile: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      values: { ...this.profile },
      rules: {
        name: [
          (v) => !!v || this.$t('form.updateProfile.name.rules.required'),
        ],
        bio: [
          (v) => (v && v.length <= 250) || this.$t('form.updateProfile.bio.rules.format', { nbChars: 250 }),
        ],
        livingPlace: [
        ],
        birthDate: [
        ],
        email: [
        ],
        phone: [
        ],
        job: [
        ],
      },
    };
  },

  vuapix: {
    entry: 'vuapix/users/updateProfile',
    params() {
      return this.values;
    },
  },
};
</script>
