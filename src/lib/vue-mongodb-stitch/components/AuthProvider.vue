<template>
  <div class="auth-provider">
    <slot
      :user="vmsUser"
      :authenticating="vmsAuthenticating"
    ></slot>
  </div>
</template>

<script>
import VueMongodbStitchMixin from '../mixins/VueMongoDbStitchMixin';

export default {
  name: 'AuthProvider',

  mixins: [VueMongodbStitchMixin],
};
</script>
