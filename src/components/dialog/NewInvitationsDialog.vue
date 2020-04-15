<template>
  <form-dialog
    :title="$t('dialog.newInvitations.title')"
    :submit-label="$t('dialog.newInvitations.actions.submit')"
    reset-on-close
    :value="value"
    @input="$emit('input', $event)"
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
    close() {
      this.$emit('input', false);
    },
  },
};
</script>
