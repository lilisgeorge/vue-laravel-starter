<template>
  <UiCard>
    <UiCardHeader>
      <UiHeading :level="4">
        Profile Information
      </UiHeading>
      <p class="text-gray-600 mt-2">
        Update your profile information and email address
      </p>
    </UiCardHeader>
    <UiForm
      v-slot="{ isPending }"
      :schema="formSchema"
      :action="attemptUpdateUserProfile"
    >
      <UiCardBody>
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
                <div>
                  <UiInput
                    id="name"
                    type="text"
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
                name="email"
              >
                <UiLabel
                  for="email"
                >
                  Email address
                </UiLabel>
                <div>
                  <UiInput
                    id="email"
                    type="email"
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
          :busy="isPending"
        >
          Update profile information
        </UiButton>
      </UiCardFooter>
    </UiForm>
  </UiCard>
</template>

<script>
import * as yup from 'yup';
import { useStore } from 'vuex';

export default {
  name: 'UserProfileForm',
  emits: ['success', 'failure'],
  setup(props, ctx) {
    const store = useStore();

    const formSchema = {
      validation: yup.object().shape({
        name: yup.string().required().max(255),
        email: yup.string().required().email().max(255),
      }),
      values: {
        name: store.state.user.name,
        email: store.state.user.email,
      },
    };

    async function attemptUpdateUserProfile(formData) {
      try {
        await store.dispatch({
          type: 'updateUserProfileInformation',
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
      attemptUpdateUserProfile,
    };
  },
};
</script>
