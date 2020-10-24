<template>
  <UiCard>
    <UiCardBody>
      <UiForm
        v-slot="{ isPending }"
        :schema="formSchema"
        :action="attemptRegister"
      >
        <div class="space-y-12">
          <div class="space-y-6">
            <div class="space-y-2">
              <Field
                v-slot="{ field, errorMessage }"
                name="name"
              >
                <UiLabel
                  for="name"
                >
                  Name
                </UiLabel>
                <div class="flex">
                  <UiInput
                    id="name"
                    type="text"
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
    </UiCardBody>
    <UiCardFooter gray>
      <p class="text-center text-gray-700">
        Already a member? <router-link
          to="/login"
          class="inline-block text-black border-b border-dotted border-transparent
        focus:text-black focus:outline-none focus:border-black font-medium"
        >
          Login
        </router-link>
      </p>
    </UiCardFooter>
  </UiCard>
</template>

<script>
import { useStore } from 'vuex';
import * as yup from 'yup';

export default {
  name: 'RegisterForm',
  emits: ['success', 'failure'],
  setup(props, ctx) {
    const formSchema = {
      validation: yup.object().shape({
        name: yup.string().required().max(255),
        email: yup.string().required().email().max(255),
        password: yup.string().required().min(8),
      }),
      values: {
        name: '',
        email: '',
        password: '',
      },
    };

    const store = useStore();

    async function attemptRegister(formData) {
      try {
        await store.dispatch({
          type: 'register',
          formData,
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
      attemptRegister,
    };
  },
};
</script>
