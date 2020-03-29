<template>
  <default-layout>
    <auth-view
      enable-login
      @auhtenticated="onAuthenticate"
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

  computed: {
    ...mapGetters('stitch', [
      'user',
    ]),
  },

  methods: {
    async onAuthenticate() {
      await this.$mongodbStitch.db.collection('projects').updateOne({
        stitchId: this.user.id,
      }, {
        $set: { number: 42 },
      }, {
        upsert: true,
      });

      this.projects = await this.$mongodbStitch.db.collection('projects').find({
        stitchId: this.user.id,
      }, {
        limit: 100,
      }).asArray();
    },
  },
};
</script>
