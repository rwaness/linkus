<template>
  <div class="vms-mauth-provider">
    <slot
      :user="vmsUser"
      :authenticating="vmsAuthenticating"
    ></slot>
  </div>
</template>

<script>
import VueMongodbStitchMixin from '../mixins/VueMongoDbStitchMixin';

export default {
  name: 'VmsAuthProvider',

  mixins: [VueMongodbStitchMixin],
};
</script>
