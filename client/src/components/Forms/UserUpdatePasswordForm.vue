<template>
  <UiCard>
    <UiCardHeader>
      <UiHeading :level="4">
        Update Password
      </UiHeading>
      <p class="text-gray-600 mt-2">
        Ensure your account is using a long, random password to stay secure.
      </p>
    </UiCardHeader>
    <UiForm
      v-slot="{ isPending }"
      :schema="formSchema"
      :action="attemptUpdateUserPassword"
    >
      <UiCardBody>
        <div class="space-y-12">
          <div class="space-y-6">
            <div class="space-y-2">
              <Field
                v-slot="{ field, errorMessage }"
                name="current_password"
              >
                <UiLabel
                  for="current_password"
                >
                  Current password
                </UiLabel>
                <div>
                  <UiInput
                    id="current_password"
                    type="password"
                    :disabled="isPending"
                    v-bind="field"
                    class="w-full md:w-1/2 lg:w-1/3"
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
                  New password
                </UiLabel>
                <div>
                  <UiInput
                    id="password"
                    type="password"
                    :disabled="isPending"
                    v-bind="field"
                    class="w-full md:w-1/2 lg:w-1/3"
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
                  Confirm new password
                </UiLabel>
                <div>
                  <UiInput
                    id="password_confirmation"
                    type="password"
                    :disabled="isPending"
                    v-bind="field"
                    class="w-full md:w-1/2 lg:w-1/3"
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
        </div>
      </UiCardBody>
      <UiCardFooter gray>
        <UiButton
          :disabled="isPending"
        >
          Save
        </UiButton>
      </UiCardFooter>
    </UiForm>
  </UiCard>
</template>

<script>
import * as yup from 'yup';
import { useStore } from 'vuex';

export default {
  name: 'UserUpdatePassword',
  emits: ['success', 'failure'],
  setup(props, ctx) {
    const store = useStore();

    const formSchema = {
      validation: yup.object().shape({
        current_password: yup.string(),
        password: yup.string().required().min(8),
        password_confirmation: yup.string()
          .oneOf([yup.ref('password'), null], "Passwords don't match")
          .required('Password confirmation is required'),
      }),
      values: {
        current_password: '',
        password: '',
        password_confirmation: '',
      },
    };

    async function attemptUpdateUserPassword(formData) {
      try {
        await store.dispatch({
          type: 'updateUserPassword',
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
      attemptUpdateUserPassword,
    };
  },
};
</script>
