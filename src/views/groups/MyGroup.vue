<template>
  <div v-if="group" class="my-group fill-height" >
    <breadcrumbs :items="breadcrumbs" />

    <pre>{{ group }}</pre>
  </div>
</template>

<script>
import { BSON } from 'mongodb-stitch-browser-sdk';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue';

export default {
  name: 'MyGroup',

  components: {
    Breadcrumbs,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      group: null,
    };
  },

  computed: {
    breadcrumbs() {
      return [{
        text: this.$t('pages.myGroups.title'),
        to: { name: 'MyGroups' },
      }, {
        text: this.group.name,
      }];
    },
  },

  async created() {
    this.group = await this.$mongodbStitch.db.collection('groups').findOne({
      owner: this.user.id,
      _id: new BSON.ObjectId(this.id),
    });
  },
};
</script>
