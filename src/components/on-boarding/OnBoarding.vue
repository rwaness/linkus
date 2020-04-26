<template>
  <v-container class="on-boarding">
    <header class="headline mb-4 text-center">
      {{ $t('onboarding.title') }}
    </header>

    <stepper @finish="vuapixDoQuery">
      <step
        :title="$t('onboarding.step.1.title')"
        :check-before-next="updateProfile"
      >
        <update-profile-form
          ref="updateProfileForm"
          :user="userData"
        ></update-profile-form>
      </step>

      <step :title="$t('onboarding.step.2.title')">
        <vuapix-provider entry="vuapix/groups/invitationsList">
          <template v-slot="{ data: invitations }">
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
          </template>
        </vuapix-provider>
      </step>

      <step
        :title="$t('onboarding.step.3.title')"
        :next-label="$t('onboarding.step.3.nextLabel')"
      ></step>
    </stepper>
  </v-container>
</template>

<script>
import { VuapixProvider, VuapixMixin } from '@/lib/vuapix';
import Stepper from '@/components/ui/Stepper.vue';
import Step from '@/components/ui/Step.vue';
import UpdateProfileForm from '@/components/form/UpdateProfileForm.vue';
import List from '@/components/ui/List.vue';
import InvitationListItem from '@/components/list-item/InvitationListItem.vue';

export default {
  name: 'OnBoarding',

  mixins: [VuapixMixin],

  components: {
    VuapixProvider,
    Stepper,
    Step,
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

  vuapix: {
    entry: 'vuapix/users/flagAsOnBoarded',
  },

  computed: {
    userData() {
      return this.user.customData;
    },
  },

  methods: {
    updateProfile() {
      return this.$refs.updateProfileForm.submit();
    },
  },
};
</script>
