<template>
  <div class="p-12 bg-gray-100 min-h-screen">
    Logout View
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { HttpClient } from '@/utils/api';
import { useStore } from 'vuex';

const api = new HttpClient('/');

export default {
  name: 'LogoutView',
  setup() {
    const router = useRouter();
    const store = useStore();

    async function attemptLogout() {
      try {
        await api.post('logout');

        await store.commit({
          type: 'setUser',
          user: null,
        });

        router.replace({ name: 'index' });
      } catch (error) {
        //
      }
    }

    attemptLogout();
  },
};
</script>
