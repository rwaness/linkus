<template>
  <v-menu
    v-model="open"
    offset-y
    right
  >
    <template v-slot:activator="{ on }">
      <v-badge
        :value="invitations.length"
        color="red"
        dot
        overlap
        bottom
      >
        <v-btn icon small outlined dark v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-badge>
    </template>

    <v-list>
      <v-list-item :to="{ name: 'UserProfilePage' }" exact>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ user.customData.profile.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ user.profile.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item @click="showInvitations">
        <v-list-item-icon>
          <v-badge
            :value="invitations.length"
            color="red"
            overlap
            bottom
            :content="invitations.length"
          >
            <v-icon>mdi-account-question</v-icon>
          </v-badge>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('appbar.account.invitationsList') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item :to="{ name: 'UserPreferencesPage' }">
        <v-list-item-icon>
            <v-icon>mdi-account-cog</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('appbar.account.preferences') }}</v-list-item-title>
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

    <list-invitations-dialog
      v-model="invitationsListOpened"
      :invitations="invitations"
    />
  </v-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ListInvitationsDialog from '@/components/dialog/ListInvitationsDialog.vue';

export default {
  name: 'ContextualMenu',

  components: {
    ListInvitationsDialog,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
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
    ...mapGetters('vuapix/groups/invitationsList', {
      invitations: 'data',
    }),
  },

  methods: {
    ...mapActions('vuapix/groups', {
      fetchInvitations: 'invitationsList',
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
      this.goTo('HomePage');
      this.$mongodbStitch.logout();
    },
  },
};
</script>
