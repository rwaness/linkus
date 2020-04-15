<template>
  <v-container class="on-boarding">
    <header class="headline mb-4 text-center">
      {{ $t('onboarding.title') }}
    </header>

    <v-stepper
      v-model="step"
      vertical
    >
      <v-stepper-step :step="1" :complete="step > 1">
        {{ $t('onboarding.step.1.title') }}
      </v-stepper-step>
      <v-stepper-content :step="1">
        <v-card>
          <update-profile-form
            ref="updateProfileForm"
            :profile="user.customData.profile"
          >
          </update-profile-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="nextStep"
            >
              {{ $t('onboarding.step.1.nextLabel') }}
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-stepper-content>

      <v-stepper-step :step="2" :complete="step > 2">
        {{ $t('onboarding.step.2.title') }}
      </v-stepper-step>
      <v-stepper-content :step="2">
        <vuapix-provider entry="vuapix/groups/invitationsList">
          <template v-slot="{ data: invitations }">
            <v-card>
              <list
                :items="invitations"
                no-results-icon="mdi-account-question"
                :no-results-label="$t('onboarding.step.2.noResults.label')"
                :no-results-message="$t('onboarding.step.2.noResults.message')"
              >
                <template v-slot:list-item="{ item: group }">
                  <invitation-list-item :group="group" />
                </template>
              </list>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click="nextStep"
                >
                  {{ $t('onboarding.step.2.nextLabel') }}
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </template>
        </vuapix-provider>
      </v-stepper-content>

      <v-stepper-step :step="3" :complete="step > 3">
        {{ $t('onboarding.step.3.title') }}
      </v-stepper-step>
      <v-stepper-content :step="3">
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="nextStep"
        >
          {{ $t('onboarding.step.3.nextLabel') }}
        </v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script>
import { VuapixProvider, VuapixFormMixin } from '@/lib/vuapix';
import UpdateProfileForm from '@/components/form/UpdateProfileForm.vue';
import List from '@/components/ui/List.vue';
import InvitationListItem from '@/components/list-item/InvitationListItem.vue';

export default {
  name: 'OnBoarding',

  mixins: [VuapixFormMixin],

  components: {
    VuapixProvider,
    UpdateProfileForm,
    List,
    InvitationListItem,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      step: 1,
      stepsCallback: {
        1: this.updateProfile,
        3: this.submit,
      },
    };
  },

  vuapix: {
    entry: 'vuapix/users/flagAsOnBoarded',
  },

  methods: {
    async nextStep() {
      if (typeof this.stepsCallback[this.step] === 'function') {
        await this.stepsCallback[this.step]();
      }
      if (this.step < 3) {
        this.step += 1;
      }
    },
    updateProfile() {
      return this.$refs.updateProfileForm.submit();
    },
  },
};
</script>
