export default {
  computed: {
    mongodbStitchStoreName() {
      return this.$mongodbStitch.get('storeName');
    },
    user() {
      return this.$store.getters[`${this.mongodbStitchStoreName}/user`];
    },
  },
};
