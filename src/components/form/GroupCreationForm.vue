<template>
  <v-form ref="form" lazy-validation>
    <v-text-field
      v-model="name"
      :rules="nameRules"
      :label="$t('pages.groupsList.creation.form.name.field')"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      :label="$t('pages.groupsList.creation.form.email.field')"
      required
    ></v-text-field>
  </v-form>
</template>

<script>
import VuapixFormMixin from '@/lib/vuapix/mixins/VuapixFormMixin';

export default {
  name: 'GroupCreationForm',

  mixins: [VuapixFormMixin],

  data() {
    return {
      name: '',
      nameRules: [
        (v) => !!v || this.$t('pages.groupsList.creation.form.name.rules.required'),
      ],
      email: '',
      emailRules: [
        (v) => !!v || this.$t('pages.groupsList.creation.form.email.rules.required'),
        (v) => /.+@.+\..+/.test(v) || this.$t('pages.groupsList.creation.form.email.rules.format'),
      ],
    };
  },

  vuapix: {
    entry: 'vuapix/groups/newGroup',
    params() {
      return {
        name: this.name,
        guests: [this.email],
      };
    },
  },

  methods: {
    validate() {
      return this.$refs.form.validate();
    },
  },
};
</script>
