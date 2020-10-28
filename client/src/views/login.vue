<template>
  <Layout>
    <UiContainer>
      <UiHeading
        :level="2"
        class="text-center mb-12"
      >
        Vue-Laravel Starter
      </UiHeading>
      <div class="max-w-lg w-full mx-auto">
        <LoginForm @success="handleSuccess" />
      </div>
    </UiContainer>
  </Layout>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import Layout from '@/layouts/ViewLayout.vue';
import LoginForm from '@/components/Forms/LoginForm.vue';

export default {
  name: 'LoginView',
  components: { Layout, LoginForm },
  setup() {
    const route = useRoute();
    const router = useRouter();

    function handleSuccess() {
      const { redirect = { name: 'dashboard' } } = route.query;

      router.replace(redirect);
    }

    return {
      handleSuccess,
    };
  },
};
</script>
