<template>
  <dialog-box v-model="model">
    <auth-view>
      <template v-slot:unauthenticated>
        <login-card
          @close="close"
        ></login-card>
      </template>

      <template v-slot="{ user }">
        <slot :user="user"></slot>
      </template>
    </auth-view>
  </dialog-box>
</template>

<script>
import DialogMixin from '@/mixins/DialogMixin';
import AuthView from '@/components/layout/AuthView.vue';
import LoginCard from '@/components/card/LoginCard.vue';

export default {
  name: 'AuthDialog',

  mixins: [DialogMixin],

  components: {
    AuthView,
    LoginCard,
  },
};
</script>
