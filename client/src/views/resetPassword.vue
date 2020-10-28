<template>
  <Layout>
    <UiContainer>
      <div class="max-w-lg w-full mx-auto space-y-8">
        <UiCard
          v-if="successMessage"
        >
          <div class="px-10 py-10 space-y-8 text-center">
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
              Password reset succesfully
            </UiHeading>

            <p
              v-if="successMessage"
              class="text-gray-600 text-center"
            >
              {{ successMessage }}
            </p>
          </div>
          <div class="px-12 py-10 text-center bg-gray-50">
            <RouterLink
              v-slot="{ href, navigate }"
              :to="{
                name: 'login',
                replace: true,
              }"
              custom
            >
              <UiButton
                tag="a"
                :href="href"
                class="w-full"
                @click="navigate"
              >
                Login
              </UiButton>
            </RouterLink>
          </div>
        </UiCard>

        <PasswordResetForm
          v-else
          @success="handleSuccess"
        />
      </div>
    </UiContainer>
  </Layout>
</template>

<script>
import { reactive, toRefs } from 'vue';
import Layout from '@/layouts/ViewLayout.vue';
import PasswordResetForm from '@/components/Forms/PasswordResetForm.vue';

export default {
  name: 'ResetPasswordView',
  components: { Layout, PasswordResetForm },
  setup() {
    const state = reactive({
      successMessage: '',
    });

    function handleSuccess(response) {
      state.successMessage = response.data?.message || '';
    }

    return {
      handleSuccess,
      ...toRefs(state),
    };
  },
};
</script>
