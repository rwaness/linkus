<template>
  <auth-provider
    class="auth-view"
    @authenticated="$emit('authenticated', $event)"
  >
    <template v-slot="{ user, authenticating }">
      <loading-overlay
        v-if="enableLoading"
        :loading="authenticating"
      ></loading-overlay>

      <slot
        v-if="!user"
        name="unauthenticated"
      >
        <v-container v-if="enableLogin">
          <login-card></login-card>
        </v-container>
      </slot>
      <on-boarding
        v-else-if="!user.customData.onBoarded"
        :user="user"
      ></on-boarding>
      <slot
        v-else
        :user="user"
      ></slot>
    </template>
  </auth-provider>
</template>

<script>
import AuthProvider from '@/components/layout/AuthProvider.vue';
import LoadingOverlay from '@/components/layout/LoadingOverlay.vue';
import LoginCard from '@/components/card/LoginCard.vue';
import OnBoarding from '@/components/on-boarding';

export default {
  name: 'AuthView',

  components: {
    AuthProvider,
    LoadingOverlay,
    LoginCard,
    OnBoarding,
  },

  props: {
    enableLoading: {
      type: Boolean,
      default: false,
    },
    enableLogin: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
