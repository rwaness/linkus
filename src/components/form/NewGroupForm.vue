<template>
  <v-form ref="form" lazy-validation>
    <v-text-field
      v-model="name"
      :rules="nameRules"
      :label="$t('form.newGroup.name.label')"
      required
    ></v-text-field>

    <v-combobox
      v-model="emails"
      multiple
      chips
      deletable-chips
      append-icon
      :label="$t('form.newGroup.emails.label')"
      :rules="emailsRules"
    >
    </v-combobox>
  </v-form>
</template>

<script>
import FormMixin from '@/mixins/FormMixin';

export default {
  name: 'NewGroupForm',

  mixins: [FormMixin],

  data() {
    return {
      name: '',
      nameRules: [
        (v) => !!v || this.$t('form.newGroup.name.rules.required'),
      ],
      emails: [],
      emailsRules: [
        (v) => !!v.length || this.$t('form.newGroup.emails.rules.required'),
        (v) => {
          const email = v.find((e) => !/.+@.+\..+/.test(e));
          return !email || this.$t('form.newGroup.emails.rules.format', { email });
        },
      ],
    };
  },

  vuapix: {
    entry: 'vuapix/groups/newGroup',
    params() {
      return {
        name: this.name,
        guests: this.emails,
      };
    },
  },
};
</script>
