<template>
  <v-list-item :value="value">
    <v-list-item-icon>
      <v-icon>{{ value | getConfidentialityIcon }}</v-icon>
    </v-list-item-icon>

    <slot>
      <v-list-item-title>
        {{ value | getConfidentialityLabel }}
      </v-list-item-title>
    </slot>
  </v-list-item>
</template>

<script>
import { getConfidentialityIcon, getConfidentialityLabel } from '@/services/confidentiality';

export default {
  name: 'ConfidentialityListItem',

  filters: {
    getConfidentialityIcon,
    getConfidentialityLabel,
  },

  props: {
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
