<template>
  <v-card>
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Forget Password ?</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
      </v-form>

      <v-alert v-if="success" type="success">
        An e-mail has been sent to {{ email }}.
      </v-alert>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="warning"
        @click="$emit('close')"
      >
        Cancel
      </v-btn>

      <v-spacer />

      <v-btn
        color="primary"
        @click="validate"
      >
        Retrieve
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ForgetPwdForm',

  props: {
    redirect: {
      type: String,
      default: '/',
    },
  },

  data() {
    return {
      valid: true,
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      success: false,
    };
  },

  methods: {
    ...mapActions('stitch', [
      'forgetPwd',
    ]),
    validate() {
      if (this.$refs.form.validate()) {
        const proceeded = this.forgetPwd({
          email: this.email,
        });
        if (proceeded) {
          this.success = true;
          setTimeout(() => this.$emit('close'), 5000);
        } else {
          // TODO handle error
        }
      }
    },
  },
};
</script>
