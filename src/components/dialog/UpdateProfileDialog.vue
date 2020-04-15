<template>
  <form-dialog
    :title="$t('dialog.updateProfile.title')"
    :submit-label="$t('dialog.updateProfile.actions.submit')"
    :value="value"
    @input="$emit('input', $event)"
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
import FormDialog from '@/components/dialog/FormDialog.vue';
import UpdateProfileForm from '@/components/form/UpdateProfileForm.vue';

export default {
  name: 'UpdateProfileDialog',

  components: {
    FormDialog,
    UpdateProfileForm,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    profile: {
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
