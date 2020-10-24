<template>
  <div class="p-12 bg-gray-200 min-h-screen">
    Email Verification Verify View
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'EmailVerificationVerifyView',
  setup() {
    async function attemptVerify() {
      const route = useRoute();
      const router = useRouter();
      const store = useStore();

      const {
        params: {
          id, hash,
        },
        query: {
          expires, signature,
        },
      } = route;

      try {
        await store.dispatch({
          type: 'verifyEmail',
          id,
          hash,
          expires,
          signature,
        });

        router.replace({ name: 'index' });
      } catch (error) {
        //
      }
    }

    attemptVerify();
  },
};
</script>
