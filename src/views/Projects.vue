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
    const user = await this.$mongoDbStitch.login();

    await this.$mongoDbStitch.db().collection('projects').updateOne({
      stitchId: user.id,
    }, {
      $set: { number: 42 },
    }, {
      upsert: true,
    });

    this.projects = await this.$mongoDbStitch.db().collection('projects').find({
      stitchId: user.id,
    }, {
      limit: 100,
    }).asArray();
  },
  data() {
    return {
      projects: [],
    };
  },
};
</script>
