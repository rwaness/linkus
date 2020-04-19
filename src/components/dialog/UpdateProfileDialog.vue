<template>
  <form-dialog
    v-model="model"
    :title="$t('dialog.updateProfile.title')"
    :submit-label="$t('dialog.updateProfile.actions.submit')"
    reset-on-close
  >
    <template v-slot:activator="{ on }">
      <slot name="activator" :on="on"></slot>
    </template>

    <update-profile-form
      :user="user"
      @success="close"
    ></update-profile-form>
  </form-dialog>
</template>

<script>
import DialogMixin from '@/mixins/DialogMixin';
import FormDialog from '@/components/dialog/FormDialog.vue';
import UpdateProfileForm from '@/components/form/UpdateProfileForm.vue';

export default {
  name: 'UpdateProfileDialog',

  mixins: [DialogMixin],

  components: {
    FormDialog,
    UpdateProfileForm,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
