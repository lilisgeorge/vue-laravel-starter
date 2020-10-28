<template>
  <Layout>
    <UiContainer>
      <UiHeading
        :level="2"
        class="text-center mb-12"
      >
        Create Account
      </UiHeading>
      <div class="max-w-lg w-full mx-auto">
        <RegisterForm @success="handleSuccess" />
      </div>
    </UiContainer>
  </Layout>
</template>

<script>
import { useRouter } from 'vue-router';
import Layout from '@/layouts/ViewLayout.vue';
import RegisterForm from '@/components/Forms/RegisterForm.vue';

export default {
  name: 'RegisterView',
  components: { Layout, RegisterForm },
  setup() {
    const router = useRouter();

    function handleSuccess() {
      router.replace({ name: 'email.verification.notice' });
    }

    return {
      handleSuccess,
    };
  },
};
</script>
