export default {
  beforeCreate() {
    console.log(`${this.$options.name}::beforeCreate`);
  },

  created() {
    console.log(`${this.$options.name}::created`);
  },

  beforeMount() {
    console.log(`${this.$options.name}::beforeMount`);
  },

  mounted() {
    console.log(`${this.$options.name}::mounted`);
  },

  beforeUpdate() {
    console.log(`${this.$options.name}::beforeUpdate`);
  },

  updated() {
    console.log(`${this.$options.name}::updated`);
  },

  beforeDestroy() {
    console.log(`${this.$options.name}::beforeDestroy`);
  },

  destroyed() {
    console.log(`${this.$options.name}::destroyed`);
  },
};
