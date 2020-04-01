<template>
  <div v-if="myGroup" class="my-group fill-height" >
    <h1 class="display-1">
      <!-- <v-icon color="amber darken-2">mdi-account-group</v-icon> -->
      {{ myGroup.name }}
    </h1>

    <pre>{{ myGroup }}</pre>
  </div>
</template>

<script>
import { BSON } from 'mongodb-stitch-browser-sdk';

export default {
  name: 'MyGroup',

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
      myGroup: null,
    };
  },

  async created() {
    this.myGroup = await this.$mongodbStitch.db.collection('groups').findOne({
      owner: this.user.id,
      _id: new BSON.ObjectId(this.id),
    });
  },
};
</script>
