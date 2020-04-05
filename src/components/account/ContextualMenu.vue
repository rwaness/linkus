<template>
  <auth-view :enable-login="false">
    <template v-slot="{ user }">
      <v-menu
        v-model="open"
        offset-y
        right
      >
        <template v-slot:activator="{ on }">
          <v-btn icon small outlined dark v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                User
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ user.profile.email }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-dialog v-model="invitationsListOpened">
            <template v-slot:activator="{ on }">
              <v-list-item v-on="on">
                <v-list-item-icon>
                  <v-icon>mdi-account-question</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ $t('appbar.account.myInvitations') }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

            <invitations-card
              :invitations="invitations"
              @invitation:accepted="goTo('GroupDetail', { groupId: $event._id })"
              @close="invitationsListOpened = false"
            />
          </v-dialog>

          <v-divider></v-divider>

          <v-list-item @click="goTo('MyPreferences')">
            <v-list-item-icon>
               <v-icon>mdi-account-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('appbar.account.myPreferences') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item @click="logout">
            <v-list-item-icon>
               <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('appbar.account.logout') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </auth-view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';
import InvitationsCard from '@/components/groups/InvitationsCard.vue';

export default {
  name: 'ContextualMenu',

  components: {
    AuthView,
    InvitationsCard,
  },

  data() {
    return {
      open: false,
      invitationsListOpened: false,
    };
  },

  created() {
    this.fetchInvitations();
  },

  computed: {
    ...mapGetters('vuapix/groups/myInvitations', {
      invitations: 'data',
    }),
  },

  methods: {
    ...mapActions('vuapix/groups/myInvitations', {
      fetchInvitations: 'doQuery',
    }),
    goTo(routeName, params) {
      if (this.$router.currentRoute.name === routeName) {
        this.open = false;
      } else {
        this.$router.push({ name: routeName, params });
      }
    },
    logout() {
      this.goTo('Home');
      this.$mongodbStitch.logout();
    },
  },
};
</script>
