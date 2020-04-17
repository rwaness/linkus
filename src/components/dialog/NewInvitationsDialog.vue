<template>
  <form-dialog
    v-model="model"
    :title="$t('dialog.newInvitations.title')"
    :submit-label="$t('dialog.newInvitations.actions.submit')"
    reset-on-close
  >
    <template v-slot:activator="{ on }">
      <slot name="activator" :on="on"></slot>
    </template>

    <new-invitations-form
      :group="group"
      @success="close"
    ></new-invitations-form>
  </form-dialog>
</template>

<script>
import DialogMixin from '@/mixins/DialogMixin';
import FormDialog from '@/components/dialog/FormDialog.vue';
import NewInvitationsForm from '@/components/form/NewInvitationsForm.vue';

export default {
  name: 'NewInvitationsDialog',

  mixins: [DialogMixin],

  components: {
    FormDialog,
    NewInvitationsForm,
  },

  props: {
    group: {
      type: Object,
      required: true,
    },
  },
};
</script>
