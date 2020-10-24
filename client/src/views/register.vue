<template>
  <div class="p-12 bg-gray-200 min-h-screen">
    <UiHeading
      :level="2"
      class="text-center mb-12"
    >
      Create Account
    </UiHeading>
    <div class="max-w-lg w-full mx-auto">
      <RegisterForm @success="handleSuccess" />
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import RegisterForm from '@/components/Forms/RegisterForm.vue';

export default {
  name: 'RegisterView',
  components: { RegisterForm },
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
