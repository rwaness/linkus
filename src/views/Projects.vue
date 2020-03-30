<template>
  <default-layout>
    <auth-view
      enable-login
      @authenticated="onAuthenticate"
    >
      PROJECTS
      <br />
      <pre>{{ projects }}</pre>
    </auth-view>
  </default-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';

export default {
  name: 'Projects',

  components: {
    DefaultLayout,
    AuthView,
  },

  data() {
    return {
      projects: [],
    };
  },

  methods: {
    async onAuthenticate(user) {
      await this.$mongodbStitch.db.collection('projects').updateOne({
        stitchId: user.id,
      }, {
        $set: { number: 42 },
      }, {
        upsert: true,
      });

      this.projects = await this.$mongodbStitch.db.collection('projects').find({
        stitchId: user.id,
      }, {
        limit: 100,
      }).asArray();
    },
  },
};
</script>
