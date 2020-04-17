<template>
  <form-dialog
    v-model="model"
    :title="$t('dialog.updateProfile.title')"
    :submit-label="$t('dialog.updateProfile.actions.submit')"
  >
    <template v-slot:activator="{ on }">
      <slot name="activator" :on="on"></slot>
    </template>

    <update-profile-form
      :profile="profile"
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
    profile: {
      type: Object,
      required: true,
    },
  },
};
</script>
