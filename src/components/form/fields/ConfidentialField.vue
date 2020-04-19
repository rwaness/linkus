<template>
  <div class="confidential-field">
    <component
      :is="component"
      v-bind="$attrs"
      v-on="$listeners"
      :append-outer-icon="confidentiality.level | getConfidentialityIcon"
      @click:append-outer="!disableConfidentiality && (open = true)"
    >
      <slot></slot>
    </component>

    <card-dialog
      v-model="open"
      :title="$attrs.label"
    >
      <v-list subheader>
        <v-list-item-group
          v-model="modelLevel"
          mandatory
          color="primary"
        >
          <confidentiality-list-item
            value="public"
          ></confidentiality-list-item>

          <v-divider></v-divider>

          <confidentiality-list-item
            value="shared"
          >
            <v-list-item-content>
              <v-list-item-group>
                <groups-select
                  v-model="modelSharedGroups"
                  :label="'shared' | getConfidentialityLabel"
                  :disabled="modelLevel !== 'shared'"
                  no-data-text="No groups yet"
                ></groups-select>
              </v-list-item-group>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                small
                color="primary"
                :disabled="modelLevel !== 'shared'"
                @click="updateConfidentiality"
              >
                OK
              </v-btn>
            </v-list-item-action>
          </confidentiality-list-item>

          <v-divider></v-divider>

          <confidentiality-list-item
            value="private"
          ></confidentiality-list-item>
        </v-list-item-group>
      </v-list>
    </card-dialog>
  </div>
</template>

<script>
import { defaultLevel, getConfidentialityIcon, getConfidentialityLabel } from '@/services/confidentiality';
import CardDialog from '@/components/dialog/CardDialog.vue';
import ConfidentialityListItem from '@/components/list-item/ConfidentialityListItem.vue';
import GroupsSelect from '@/components/form/fields/GroupsSelect.vue';

export default {
  name: 'ConfidentialField',

  filters: {
    getConfidentialityIcon,
    getConfidentialityLabel,
  },

  components: {
    CardDialog,
    ConfidentialityListItem,
    GroupsSelect,
  },

  props: {
    confidentiality: {
      type: Object,
      default: () => ({
        level: defaultLevel,
        sharedGroups: [],
      }),
    },
    disableConfidentiality: {
      type: Boolean,
      default: false,
    },
    component: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      open: false,
      modelLevel: this.confidentiality.level,
      modelSharedGroups: this.confidentiality.sharedGroups,
    };
  },

  watch: {
    modelLevel(modelLevel) {
      console.log('updateModelLevel', modelLevel);
      if (modelLevel !== 'shared') {
        this.updateConfidentiality();
      }
    },
  },

  methods: {
    updateConfidentiality() {
      this.$emit('update:confidentiality', {
        level: this.modelLevel,
        sharedGroups: this.modelSharedGroups,
      });
      this.open = false;
    },
  },
};
</script>
