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

    <v-text-field
      v-model="profileValues.livingPlace"
      :counter="250"
      :rules="rules.livingPlace"
      :label="$t('form.updateProfile.livingPlace.label')"
    ></v-text-field>
  </v-form>
</template>

<script>
import FormMixin from '@/mixins/FormMixin';
import { VTextField } from 'vuetify/lib';
import ConfidentialField from '@/components/layout/form-field/ConfidentialField.vue';

export default {
  name: 'AddAppForm',

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
        livingPlace: [
        ],
      },
    };
  },

  vuapix: {
    entry: 'vuapix/apps/userAddApp',
  },
};
</script>
