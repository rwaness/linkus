<template>
  <default-layout class="my-group">
    <auth-view
      class="fill-height d-flex flex-column flex-nowrap"
      enable-login
      @authenticated="onAuthenticate"
    >
      <template  v-if="myGroup">
        <h1 class="display-1">
          <!-- <v-icon color="amber darken-2">mdi-account-group</v-icon> -->
          {{ myGroup.name }}
        </h1>

        <pre>{{ myGroup }}</pre>
      </template>
    </auth-view>
  </default-layout>
</template>

<script>
import { BSON } from 'mongodb-stitch-browser-sdk';
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

export default {
  name: 'MyGroup',

  components: {
    AuthView,
    DefaultLayout,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      myGroup: null,
    };
  },

  methods: {
    async onAuthenticate(user) {
      this.myGroup = await this.$mongodbStitch.db.collection('groups').findOne({
        owner: this.$mongodbStitch.user.id,
        _id: new BSON.ObjectId(this.id),
      });
    },
  },
};
</script>
