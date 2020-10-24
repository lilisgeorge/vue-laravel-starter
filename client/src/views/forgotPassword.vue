<template>
  <div class="p-12 bg-gray-200 min-h-screen">
    <div class="max-w-lg w-full mx-auto space-y-8">
      <UiCard
        v-if="throttleErrorMessage"
      >
        <div class="p-10 space-y-8 text-center">
          <div class="bg-red-50 rounded-lg p-4 inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="text-red-600 w-10 h-10"
            >
              <path
                fill="none"
                d="M0 0h24v24H0z"
              />
              <path
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477
                10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"
              />
            </svg>
          </div>
          <UiHeading
            :level="2"
            class="text-center font-bold"
          >
            Too many Requests
          </UiHeading>

          <p class="text-gray-600 text-center">
            {{ throttleErrorMessage }}
          </p>
        </div>
      </UiCard>

      <UiCard
        v-else-if="successMessage"
      >
        <div class="p-10 space-y-8 text-center">
          <div class="bg-green-50 rounded-lg p-4 inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="text-green-600 w-10 h-10"
            >
              <path
                fill="none"
                d="M0 0h24v24H0z"
              />
              <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
            </svg>
          </div>
          <UiHeading
            :level="2"
            class="text-center font-bold"
          >
            Check your email
          </UiHeading>

          <p class="text-gray-600 text-center">
            {{ successMessage }}
          </p>
        </div>
        <div class="p-8 bg-gray-50">
          <p class="text-center text-gray-700">
            Did not receive the email? Check your spam filter, or <button
              class="inline-block text-blue-600 border-b border-dotted border-transparent
            focus:text-blue-600 focus:outline-none focus:border-blue-600"
              @click="successMessage = ''"
            >
              try another email address
            </button>
          </p>
        </div>
      </UiCard>

      <PasswordResetLinkRequestForm
        v-else
        @success="handleSuccess"
        @failure="handleFailure"
      />
    </div>
  </div>
</template>

<script>
import useServerError from '@/use/serverError';
import PasswordResetLinkRequestForm from '@/components/Forms/PasswordResetLinkRequestForm.vue';
import { reactive, toRefs } from 'vue';

export default {
  name: 'ForgotPasswordView',
  components: { PasswordResetLinkRequestForm },
  setup() {
    const state = reactive({
      throttleErrorMessage: '',
      successMessage: '',
    });

    function handleSuccess(response) {
      state.successMessage = response.data.message;
    }

    function handleFailure(error) {
      const { isThrottleError, getErrorMessage } = useServerError(error);

      if (isThrottleError()) {
        state.throttleErrorMessage = getErrorMessage();
      }
    }

    return {
      handleSuccess,
      handleFailure,
      ...toRefs(state),
    };
  },
};
</script>
