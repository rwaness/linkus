export default {
  data() {
    return {
      vmsAuthenticating: true,
    };
  },

  computed: {
    vmsUser() {
      return this.$mongodbStitch.user;
    },
  },

  created() {
    this.vmsOnUserUpdate(this.vmsUser);
  },

  watch: {
    vmsUser(vmsUser) {
      this.vmsOnUserUpdate(vmsUser);
    },
  },

  methods: {
    async vmsOnUserUpdate(vmsUser) {
      if (vmsUser) {
        this.vmsEmit('authenticated', vmsUser);
      } else {
        await this.$mongodbStitch.auth();
      }
      this.vmsAuthenticating = false;
    },
    vmsEmit(eventName, param) {
      this.$emit(`vms:${eventName}`, param);
    },
  },
};
