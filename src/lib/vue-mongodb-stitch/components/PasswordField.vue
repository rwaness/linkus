<template>
  <v-text-field
    ref="field"
    :value="value"
    :rules="rules"
    :type="type"
    :label="label"
    required
    :append-icon="appendIcon"
    @click:append="toggleVisibility"
    @blur="hidden = true"
    @input="$emit('input', $event)"
  ></v-text-field>
</template>

<script>
export default {
  name: 'PasswordField',

  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    label: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      value: '',
      hidden: true,
    };
  },

  computed: {
    appendIcon() {
      return this.hidden ? 'mdi-eye-outline' : 'mdi-eye-off-outline';
    },
    type() {
      return this.hidden ? 'password' : 'text';
    },
  },

  methods: {
    toggleVisibility() {
      // force focus to enable "blur" event hidding pwd again
      this.$refs.field.focus();
      this.hidden = !this.hidden;
    },
  },
};
</script>
