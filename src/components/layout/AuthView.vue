<template>
  <auth-provider
    class="auth-view"
    :enable-login="enableLogin"
  >
    <template v-slot="{ user }">
      <slot v-if="user.customData.onBoarded" :user="user"></slot>
      <on-boarding v-else :user="user"></on-boarding>
    </template>
    <template v-slot:unauthenticated>
      <slot name="unauthenticated"></slot>
    </template>
  </auth-provider>
</template>

<script>
import { AuthProvider } from '@/lib/vue-mongodb-stitch';
import OnBoarding from '@/components/on-boarding';

// TODO handle enable-login here !
export default {
  name: 'AuthView',

  components: {
    AuthProvider,
    OnBoarding,
  },

  props: {
    enableLogin: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
