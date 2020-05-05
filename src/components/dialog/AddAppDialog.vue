<template>
  <auth-dialog v-model="model">
    <template v-slot="{ user }">
      <form-card
        :title="$t('dialog.addApp.title')"
        @close="close"
      >
        <add-app-form
          :user="user"
        ></add-app-form>
      </form-card>
    </template>
  </auth-dialog>
</template>

<script>
import DialogMixin from '@/mixins/DialogMixin';
import AuthDialog from '@/components/layout/AuthDialog.vue';
import FormCard from '@/components/layout/FormCard.vue';
import AddAppForm from '@/components/form/AddAppForm.vue';

export default {
  name: 'AddAppDialog',

  mixins: [DialogMixin],

  components: {
    AuthDialog,
    FormCard,
    AddAppForm,
  },

  props: {
    app: {
      type: Object,
      required: true,
    },
  },
};
</script>
