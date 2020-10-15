<template>
  <div class="p-12 bg-gray-100 min-h-screen">
    <UiCard class="w-full max-w-lg mx-auto">
      <div class="px-12 py-10">
        <ui-heading
          :level="2"
          class="text-center font-bold text-blue-600 mb-8"
        >
          Thanks for registering!
        </ui-heading>
        <p class="text-sm text-gray-600 text-center mb-4">
          Before getting started, could you verify your email address
          by clicking on the link we just emailed to you?
          If you didn't receive the email, we will gladly send you another.
        </p>
        <p class="text-sm text-blue-600 font-medium text-center">
          A new verification link has been sent to the email address
          you provided during registration.
        </p>
      </div>
      <div class="px-12 py-10 bg-gray-50 flex flex-col space-y-4">
        <ui-button @click="handleResendVerificationEmail">
          Resend Verification Email
        </ui-button>
        <ui-button
          text
          tag="router-link"
          to="/logout"
        >
          Logout
        </ui-button>
      </div>
    </UiCard>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'EmailVerificationNoticeView',
  setup() {
    const store = useStore();

    async function handleResendVerificationEmail() {
      try {
        await store.dispatch({
          type: 'sendEmailVerificationNotice',
        });
      } catch (error) {
        //
      }
    }

    return {
      handleResendVerificationEmail,
    };
  },
};
</script>
