<template>
  <form-dialog
    :title="$t('dialog.newGroup.title')"
    :submit-label="$t('dialog.newGroup.actions.submit')"
    :value="value"
    @input="$emit('input', $event)"
  >
    <new-group-form
      @success="onSuccess"
    ></new-group-form>
  </form-dialog>
</template>

<script>
import FormDialog from '@/components/dialog/FormDialog.vue';
import NewGroupForm from '@/components/form/NewGroupForm.vue';

export default {
  name: 'NewGroupDialog',

  components: {
    FormDialog,
    NewGroupForm,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onSuccess({ id: groupId }) {
      this.$router.push({ name: 'GroupOverview', params: { groupId } });
    },
  },
};
</script>
