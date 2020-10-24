<template>
  <div>
    <div
      class="bg-gradient-to-r from-pink-600 to-blue-600
      px-4 py-4 sm:px-6 sm:py-12 lg:px-10 text-white"
    >
      <UiHeading :level="2">
        Settings
      </UiHeading>
    </div>
    <div class="px-4 py-4 sm:px-6 sm:py-12 lg:px-10">
      <UserProfileForm />
    </div>
  </div>
</template>

<script>
import UserProfileForm from '@/components/Forms/UserProfileForm.vue';

export default {
  name: 'SettingsView',
  components: {
    UserProfileForm,
  },
};
</script>
