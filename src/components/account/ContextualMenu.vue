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
          <v-list-item :to="{ name: 'UserProfile' }" exact>
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

          <v-list-item @click="showInvitations">
            <v-list-item-icon>
              <v-icon>mdi-account-question</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('appbar.account.myInvitations') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item :to="{ name: 'UserPreferences' }">
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

      <v-dialog v-model="invitationsListOpened">
        <invitations-card
          :invitations="invitations"
          @invitation:accepted="goTo('GroupOverview', { groupId: $event.id })"
          @close="invitationsListOpened = false"
        />
      </v-dialog>
    </template>
  </auth-view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AuthView from '@/lib/vue-mongodb-stitch/components/AuthView.vue';
import InvitationsCard from '@/components/card/InvitationsCard.vue';

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
    ...mapActions('vuapix/groups', {
      fetchInvitations: 'myInvitations',
    }),
    showInvitations() {
      this.invitationsListOpened = true;
      this.open = false;
    },
    goTo(routeName, params) {
      if (routeName === this.$route.name) {
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
