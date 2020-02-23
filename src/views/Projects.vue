<template>
  <default-layout>
    <auth-view>
      PROJECTS
      <br />
      <pre>{{ projects }}</pre>
    </auth-view>
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthView from '@/lib/stitch/components/AuthView.vue';

export default {
  name: 'Projects',

  components: {
    DefaultLayout,
    AuthView,
  },

  /*
  async created() {
    // test stitch
    const user = await this.$mongoDbStitch.loginWithCredential();

    await this.$mongoDbStitch.db.collection('projects').updateOne({
      stitchId: user.id,
    }, {
      $set: { number: 42 },
    }, {
      upsert: true,
    });

    this.projects = await this.$mongoDbStitch.db.collection('projects').find({
      stitchId: user.id,
    }, {
      limit: 100,
    }).asArray();
  },
  */

  data() {
    return {
      projects: [],
    };
  },
};
</script>
