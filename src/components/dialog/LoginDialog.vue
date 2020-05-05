<template>
  <form-dialog
    v-model="model"
    title="Login"
  >
    <login-form
      @success="onSuccess"
    ></login-form>
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

  methods: {
    onSuccess({ id: groupId }) {
      this.$router.push({ name: 'GroupOverviewPage', params: { groupId } });
    },
  },
};
</script>
