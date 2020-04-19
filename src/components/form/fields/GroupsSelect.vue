<template>
  <vuapix-provider entry="vuapix/groups/groupsList">
    <template v-slot="{ data: groups }">
      <v-select
        v-model="model"
        :label="label"
        :items="groups"
        item-value="id"
        item-text="name"
        :no-data-text="noDataText"
        :disabled="disabled"
        dense
        multiple
        clearable
      >
        <template v-slot:selection="{ item, index }">
          <v-chip
            v-if="index === 0"
            small
            deletable
          >
            <span>{{ item.name }}</span>
          </v-chip>
          <span
            v-if="index === 1"
            class="grey--text caption"
          >
            (+{{ model.length - 1 }} others)
          </span>
        </template>
      </v-select>
    </template>
  </vuapix-provider>
</template>

<script>
import { VuapixProvider } from '@/lib/vuapix';
import OptionalModelMixin from '@/mixins/OptionalModelMixin';


export default {
  name: 'GroupsSelect',

  mixins: [OptionalModelMixin],

  components: {
    VuapixProvider,
  },

  props: {
    label: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    noDataText: {
      type: String,
      default: '',
    },
  },
};
</script>
