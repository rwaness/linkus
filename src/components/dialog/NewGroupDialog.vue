<template>
  <form-dialog
    v-model="model"
    :title="$t('dialog.newGroup.title')"
    :submit-label="$t('dialog.newGroup.actions.submit')"
  >
    <new-group-form
      @success="onSuccess"
    ></new-group-form>
  </form-dialog>
</template>

<script>
import DialogMixin from '@/mixins/DialogMixin';
import FormDialog from '@/components/layout/FormDialog.vue';
import NewGroupForm from '@/components/form/NewGroupForm.vue';

export default {
  name: 'NewGroupDialog',

  mixins: [DialogMixin],

  components: {
    FormDialog,
    NewGroupForm,
  },

  methods: {
    onSuccess({ id: groupId }) {
      this.$router.push({ name: 'GroupOverviewPage', params: { groupId } });
    },
  },
};
</script>
