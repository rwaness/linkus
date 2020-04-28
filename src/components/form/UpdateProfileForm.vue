<template>
  <v-form ref="form" lazy-validation>
    <confidential-field
      :confidentiality.sync="confidentialityValues.name"
      disable-confidentiality
      component="v-text-field"
      v-model="profileValues.name"
      :rules="rules.name"
      :label="$t('form.updateProfile.name.label')"
      required
    ></confidential-field>

    <confidential-field
      :confidentiality.sync="confidentialityValues.bio"
      component="v-text-field"
      v-model="profileValues.bio"
      :counter="250"
      :rules="rules.bio"
      :label="$t('form.updateProfile.bio.label')"
      required
    ></confidential-field>

    <v-text-field
      v-model="profileValues.livingPlace"
      :counter="250"
      :rules="rules.livingPlace"
      :label="$t('form.updateProfile.livingPlace.label')"
    ></v-text-field>

    <v-text-field
      v-model="profileValues.birthDate"
      :counter="250"
      :rules="rules.birthDate"
      :label="$t('form.updateProfile.birthDate.label')"
    ></v-text-field>

    <v-text-field
      v-model="profileValues.email"
      :counter="250"
      :rules="rules.email"
      :label="$t('form.updateProfile.email.label')"
    ></v-text-field>

    <v-text-field
      v-model="profileValues.phone"
      :counter="250"
      :rules="rules.phone"
      :label="$t('form.updateProfile.phone.label')"
    ></v-text-field>

    <v-text-field
      v-model="profileValues.job"
      :counter="250"
      :rules="rules.job"
      :label="$t('form.updateProfile.job.label')"
    ></v-text-field>
  </v-form>
</template>

<script>
import FormMixin from '@/mixins/FormMixin';
import { VTextField } from 'vuetify/lib';
import ConfidentialField from '@/components/layout/form-field/ConfidentialField.vue';

export default {
  name: 'UpdateProfileForm',

  mixins: [FormMixin],

  components: {
    VTextField,
    ConfidentialField,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      profileValues: { ...this.user.profile },
      confidentialityValues: { ...this.user.confidentiality },
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
      return {
        profile: this.profileValues,
        confidentiality: this.confidentialityValues,
      };
    },
  },
};
</script>
