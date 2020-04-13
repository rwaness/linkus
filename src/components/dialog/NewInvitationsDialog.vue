<template>
  <form-dialog
    :title="$t('dialog.newInvitations.title')"
    :submit-label="$t('dialog.newInvitations.actions.submit')"
    reset-on-close
    :value="value"
    @input="$emit('input', $event)"
  >
    <new-invitations-form
      :group="group"
      @success="onSuccess"
    ></new-invitations-form>
  </form-dialog>
</template>

<script>
import FormDialog from '@/components/dialog/FormDialog.vue';
import NewInvitationsForm from '@/components/form/NewInvitationsForm.vue';

export default {
  name: 'NewInvitationsDialog',

  components: {
    FormDialog,
    NewInvitationsForm,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    group: {
      type: Object,
      required: true,
    },
  },

  methods: {
    onSuccess() {
      this.$emit('input', false);
    },
  },
};
</script>
