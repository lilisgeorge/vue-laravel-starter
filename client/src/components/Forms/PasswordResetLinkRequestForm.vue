<template>
  <UiCard>
    <UiForm
      v-slot="{ isPending }"
      :schema="formSchema"
      :action="attemptPasswordResetLink"
    >
      <div class="px-12 py-10 space-y-12">
        <div class="space-y-8">
          <div class="space-y-4">
            <UiHeading
              :level="2"
            >
              Reset password
            </UiHeading>
            <p class="text-gray-600">
              Enter the email associated with your account and we will send an email
              with instructions to reset your password.
            </p>
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
        </div>
        <div>
          <UiButton
            :busy="isPending"
          >
            Send email
          </UiButton>
        </div>
      </div>
    </UiForm>
  </UiCard>
</template>

<script>
import * as yup from 'yup';
import { useStore } from 'vuex';

export default {
  name: 'PasswordResetLinkRequestForm',
  emits: ['success', 'failure'],
  setup(props, ctx) {
    const formSchema = {
      validation: yup.object().shape({
        email: yup.string().required().email(),
      }),
      values: {
        email: '',
      },
    };

    const store = useStore();

    async function attemptPasswordResetLink(formData) {
      try {
        const response = await store.dispatch({
          type: 'passwordResetLink',
          formData,
        });

        ctx.emit('success', response);

        return Promise.resolve(response);
      } catch (error) {
        ctx.emit('failure', error);
        return Promise.reject(error);
      }
    }

    return {
      formSchema,
      attemptPasswordResetLink,
    };
  },
};
</script>
