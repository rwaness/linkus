<template>
  <default-layout>
    <auth-view
      enable-login
      @authenticated="onAuthenticate"
    >
      GROUPS
      <br />
      <pre>{{ myGroups }}</pre>
    </auth-view>
  </default-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';

export default {
  name: 'MyGroups',

  components: {
    DefaultLayout,
    AuthView,
  },

  data() {
    return {
      myGroups: [],
    };
  },

  methods: {
    async onAuthenticate(user) {
      await this.$mongodbStitch.db.collection('groups').updateOne({
        owner: user.id,
      }, {
        $set: { number: 42 },
      }, {
        upsert: true,
      });

      this.myGroups = await this.$mongodbStitch.db.collection('groups').find({
        owner: user.id,
      }, {
        limit: 100,
      }).asArray();
    },
  },
};
</script>
