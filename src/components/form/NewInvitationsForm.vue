<template>
  <v-form ref="form" lazy-validation>
    <v-combobox
      v-model="emails"
      multiple
      chips
      deletable-chips
      append-icon
      :label="$t('form.invitations.emails.label')"
      :messages="$t('form.newGroup.emails.message')"
      :rules="rules"
    ></v-combobox>
  </v-form>
</template>

<script>
import FormMixin from '@/mixins/FormMixin';

export default {
  name: 'NewInvitationsForm',

  mixins: [FormMixin],

  props: {
    group: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      emails: [],
      rules: [
        (v) => !!v.length || this.$t('form.invitations.emails.rules.required'),
        (v) => {
          const email = v.find((e) => !/.+@.+\..+/.test(e));
          return !email || this.$t('form.invitations.emails.rules.format', { email });
        },
      ],
    };
  },

  vuapix: {
    entry: 'vuapix/groups/invite',
    params() {
      return {
        group: this.group,
        guests: this.emails,
      };
    },
  },
};
</script>
