<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :rules="nameRules"
      :label="$t('pages.myGroups.creation.form.name.field')"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      :label="$t('pages.myGroups.creation.form.email.field')"
      required
    ></v-text-field>

    <v-alert v-if="error" type="error">
      {{ error }}
    </v-alert>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'GroupCreationForm',

  data() {
    return {
      valid: true,
      name: '',
      nameRules: [
        (v) => !!v || this.$t('pages.myGroups.creation.form.name.rules.required'),
      ],
      email: '',
      emailRules: [
        (v) => !!v || this.$t('pages.myGroups.creation.form.email.rules.required'),
        (v) => /.+@.+\..+/.test(v) || this.$t('pages.myGroups.creation.form.email.rules.format'),
      ],
    };
  },

  computed: {
    ...mapGetters('vuapix/groups/newGroup', {
      newGroup: 'data',
      fetching: 'fetching',
      error: 'error',
    }),
  },

  watch: {
    fetching(fetching) {
      if (!fetching && !this.error) {
        this.$emit('created', this.newGroup);
      }
    },
  },

  methods: {
    ...mapActions('vuapix/groups/newGroup', [
      'fetch',
    ]),
    async submit() {
      if (this.$refs.form.validate()) {
        this.fetch({
          name: this.name,
          emails: [this.email],
        });
      }
    },
  },
};
</script>
