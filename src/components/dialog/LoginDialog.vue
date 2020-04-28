<template>
  <form-dialog
    v-model="model"
    title="Login"
  >
    <login-form></login-form>
  </form-dialog>
</template>

<script>
import LoginForm from '@/components/form/LoginForm.vue';
import DialogMixin from '@/mixins/DialogMixin';
import FormDialog from '@/components/layout/FormDialog.vue';

export default {
  name: 'LoginDialog',

  mixins: [DialogMixin],

  components: {
    FormDialog,
    LoginForm,
  },
};
</script>
