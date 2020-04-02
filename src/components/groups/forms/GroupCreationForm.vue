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

    <v-alert v-if="errorMessage" type="error">
      {{ errorMessage }}
    </v-alert>
  </v-form>
</template>

<script>

export default {
  name: 'LoginForm',

  data() {
    return {
      errorMessage: null,
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
    user() {
      return this.$mongodbStitch.user;
    },
  },

  created() {
    // TODO to try
    if (!this.user) {
      this.valid = false;
    }
  },

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          const myGroup = {
            owner: this.user.id,
            name: this.name,
          };
          const { insertedId } = await this.$mongodbStitch.db.collection('groups').insertOne(myGroup);
          this.$emit('created', {
            _id: insertedId,
            ...myGroup,
          });
        } catch (error) {
          this.errorMessage = `${error}`;
        }
      }
    },
  },
};
</script>
