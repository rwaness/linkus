<template>
  <default-layout>
    <auth-view
      enable-login
      @authenticated="onAuthenticate"
    >
      GROUPS
      <br />
      <pre>{{ groups }}</pre>
    </auth-view>
  </default-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';

export default {
  name: 'Groups',

  components: {
    DefaultLayout,
    AuthView,
  },

  data() {
    return {
      groups: [],
    };
  },

  methods: {
    async onAuthenticate(user) {
      await this.$mongodbStitch.db.collection('groups').updateOne({
        stitchId: user.id,
      }, {
        $set: { number: 42 },
      }, {
        upsert: true,
      });

      this.groups = await this.$mongodbStitch.db.collection('groups').find({
        stitchId: user.id,
      }, {
        limit: 100,
      }).asArray();
    },
  },
};
</script>
