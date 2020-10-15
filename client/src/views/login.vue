<template>
  <div class="p-12 bg-gray-100 min-h-screen">
    <UiHeading
      :level="2"
      class="text-center mb-12"
    >
      Login
    </UiHeading>
    <div class="max-w-lg w-full mx-auto">
      <LoginForm @success="handleSuccess" />
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import LoginForm from '@/components/Forms/LoginForm.vue';

export default {
  name: 'LoginView',
  components: { LoginForm },
  setup() {
    const route = useRoute();
    const router = useRouter();

    function handleSuccess() {
      const { redirect = { name: 'index' } } = route.query;

      router.replace(redirect);
    }

    return {
      handleSuccess,
    };
  },
};
</script>
