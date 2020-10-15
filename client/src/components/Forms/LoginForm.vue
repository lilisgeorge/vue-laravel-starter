<template>
  <UiCard>
    <UiForm
      v-slot="{ isPending }"
      :schema="formSchema"
      :action="attemptLogin"
    >
      <div class="px-12 py-10 space-y-12">
        <div class="space-y-6">
          <div class="space-y-2">
            <Field
              v-slot="{ field, errorMessage }"
              name="email"
            >
              <UiLabel
                for="email"
              >
                Email address
              </UiLabel>
              <div class="flex">
                <UiInput
                  id="email"
                  type="email"
                  :disabled="isPending"
                  v-bind="field"
                  class="flex-auto"
                />
              </div>
              <UiMessage
                v-if="errorMessage"
                error
              >
                {{ errorMessage }}
              </UiMessage>
            </Field>
          </div>
          <div class="space-y-2">
            <Field
              v-slot="{ field, errorMessage }"
              name="password"
            >
              <UiLabel
                for="password"
              >
                Password
              </UiLabel>
              <div class="flex">
                <UiInput
                  id="password"
                  type="password"
                  :disabled="isPending"
                  v-bind="field"
                  class="flex-auto"
                />
              </div>
              <UiMessage
                v-if="errorMessage"
                error
              >
                {{ errorMessage }}
              </UiMessage>
            </Field>
          </div>
        </div>
        <div>
          <UiButton
            :disabled="isPending"
            class="w-full"
          >
            Submit
          </UiButton>
        </div>
      </div>
    </UiForm>
    <div class="p-8 bg-gray-50">
      <p class="text-center text-gray-700">
        Not a member? <router-link
          to="/register"
          class="inline-block text-blue-600 border-b border-dotted border-transparent
        focus:text-blue-500 focus:outline-none focus:border-blue-500"
        >
          Register
        </router-link>
      </p>
    </div>
  </UiCard>
</template>

<script>
import * as yup from 'yup';
import { useStore } from 'vuex';

export default {
  name: 'LoginForm',
  emits: ['success', 'failure'],
  setup(props, ctx) {
    const formSchema = {
      validation: yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
      }),
      values: {
        email: '',
        password: '',
      },
    };

    const store = useStore();

    async function attemptLogin(credentials) {
      try {
        await store.dispatch({
          type: 'login',
          credentials,
        });

        ctx.emit('success');

        return Promise.resolve();
      } catch (error) {
        ctx.emit('failure', error);
        return Promise.reject(error);
      }
    }

    return {
      formSchema,
      attemptLogin,
    };
  },
};
</script>
