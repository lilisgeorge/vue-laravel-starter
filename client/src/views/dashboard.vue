<template>
  <Layout>
    <RouterView />
  </Layout>
</template>

<script>
import Layout from '@/layouts/DashboardLayout.vue';

export default {
  name: 'DashboardView',
  components: {
    Layout,
  },
};
</script>
