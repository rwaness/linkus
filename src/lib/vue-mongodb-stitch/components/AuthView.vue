<template>
  <div class="auth-view">
    <template v-if="user">
      <slot
        v-if="$slots.authenticated"
        name="authenticated"
        :user="user"
      />
      <slot v-else />
    </template>

    <template v-else>
      <slot
        v-if="$slots.unauthenticated"
        name="unauthenticated"
      />
      <login-card v-else-if="enableLogin" />
    </template>
  </div>
</template>

<script>
import mixin from '../mixin';
import LoginCard from './LoginCard.vue';

export default {
  name: 'AuthView',

  mixins: [mixin],

  components: {
    LoginCard,
  },

  props: {
    enableLogin: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    this.onUserUpdate(this.user);
  },

  watch: {
    user(user) {
      this.onUserUpdate(user);
    },
  },

  methods: {
    auth(payload) {
      return this.$store.dispatch(`${this.mongodbStitchStoreName}/auth`, payload);
    },
    onUserUpdate(user) {
      if (user) {
        this.$emit('auhtenticated', user);
      } else {
        this.auth();
      }
    },
  },
};
</script>
