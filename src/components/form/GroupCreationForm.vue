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

  computed: {
    ...mapGetters('vuapix/groups/newGroup', {
      newGroup: 'data',
      querying: 'querying',
      error: 'error',
    }),
  },

  watch: {
    querying(querying) {
      if (!querying && !this.error) {
        this.$emit('created', this.newGroup);
      }
    },
  },

  methods: {
    ...mapActions('vuapix/groups', {
      createGroup: 'newGroup',
    }),
    async submit() {
      let group;
      if (this.$refs.form.validate()) {
        group = await this.createGroup({
          name: this.name,
          guests: [this.email],
        });
      }
      return group;
    },
  },
};
</script>
