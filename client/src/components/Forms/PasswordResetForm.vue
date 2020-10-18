<template>
  <UiCard>
    <UiForm
      v-slot="{ isPending }"
      :schema="formSchema"
      :action="attemptPasswordReset"
    >
      <div class="px-12 py-10">
        <UiHeading
          :level="2"
          class="text-center font-bold"
        >
          Create new password
        </UiHeading>
      </div>
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
          <div class="space-y-2">
            <Field
              v-slot="{ field, errorMessage }"
              name="password_confirmation"
            >
              <UiLabel
                for="password_confirmation"
              >
                Confirm password
              </UiLabel>
              <div class="flex">
                <UiInput
                  id="password_confirmation"
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
        <div class="flex flex-col space-y-2">
          <UiButton
            :disabled="isPending"
            class="w-full"
          >
            Reset password
          </UiButton>
        </div>
      </div>
    </UiForm>
  </UiCard>
</template>

<script>
import * as yup from 'yup';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  name: 'LoginForm',
  emits: ['success', 'failure'],
  setup(props, ctx) {
    const route = useRoute();
    const store = useStore();

    const formSchema = {
      validation: yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
        password_confirmation: yup.string()
          .oneOf([yup.ref('password'), null], "Passwords don't match")
          .required('Password confirmation is required'),
      }),
      values: {
        email: route.params?.email || '',
        password: '',
        password_confirmation: '',
      },
    };

    async function attemptPasswordReset(formData) {
      try {
        const response = await store.dispatch({
          type: 'passwordReset',
          formData: {
            ...formData,
            token: route.params?.token || '',
          },
        });

        ctx.emit('success', response);

        return Promise.resolve();
      } catch (error) {
        ctx.emit('failure', error);
        return Promise.reject(error);
      }
    }

    return {
      formSchema,
      attemptPasswordReset,
    };
  },
};
</script>
