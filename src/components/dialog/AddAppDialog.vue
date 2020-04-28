<template>
  <card-dialog
    v-model="model"
    :title="$t('dialog.addApp.title')"
  >
    <apps-list>
      <template
        v-if="true"
        v-slot:list-item-action="{ app }"
      >
        <v-list-item-action>
          <v-btn
            icon
            @click.prevent="vuapixDoQuery(app)"
          >
            <v-icon>mdi-toy-brick-plus-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </apps-list>
  </card-dialog>
</template>

<script>
import { VuapixMixin } from '@/lib/vuapix';
import DialogMixin from '@/mixins/DialogMixin';
import CardDialog from '@/components/layout/CardDialog.vue';
import AppsList from '@/components/list/AppsList.vue';

export default {
  name: 'AddAppDialog',

  mixins: [DialogMixin, VuapixMixin],

  components: {
    CardDialog,
    AppsList,
  },

  vuapix: {
    entry: 'vuapix/apps/userAddApp',
  },
};
</script>
