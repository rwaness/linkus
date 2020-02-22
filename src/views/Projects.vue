<template>
  <default-layout>
    PROJECTS
    <br />
    <pre>{{ projects }}</pre>
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';

export default {
  name: 'Projects',
  components: {
    DefaultLayout,
  },
  async created() {
    // test stitch
    this.projects = await this.$mongoDbStitch.login()
      .then(() => this.$mongoDbStitch.db().collection('projects').updateOne({
        stitchId: this.$mongoDbStitch.client.auth.user.id,
      }, {
        $set: { number: 42 },
      }, {
        upsert: true,
      }))
      .then(() => this.$mongoDbStitch.db().collection('projects').find({
        stitchId: this.$mongoDbStitch.client.auth.user.id,
      }, {
        limit: 100,
      }).asArray());
  },
  data() {
    return {
      projects: [],
    };
  },
};
</script>
