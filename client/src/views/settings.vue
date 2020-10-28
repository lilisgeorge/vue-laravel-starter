<template>
  <Layout>
    <Header title="Settings" />
    <UiContainer>
      <div class="space-y-12">
        <UserProfileForm />
        <UserUpdatePasswordForm />
      </div>
    </UiContainer>
  </Layout>
</template>

<script>
import Layout from '@/layouts/ViewLayout.vue';
import Header from '@/components/Header.vue';
import UserProfileForm from '@/components/Forms/UserProfileForm.vue';
import UserUpdatePasswordForm from '@/components/Forms/UserUpdatePasswordForm.vue';

export default {
  name: 'SettingsView',
  components: {
    Layout,
    Header,
    UserProfileForm,
    UserUpdatePasswordForm,
  },
};
</script>
