<template>
  <Layout title="Settings">
    <UiContainer>
      <UserProfileForm />
    </UiContainer>
  </Layout>
</template>

<script>
import Layout from '@/layouts/BaseChildLayout.vue';
import UserProfileForm from '@/components/Forms/UserProfileForm.vue';

export default {
  name: 'SettingsView',
  components: {
    Layout,
    UserProfileForm,
  },
};
</script>
