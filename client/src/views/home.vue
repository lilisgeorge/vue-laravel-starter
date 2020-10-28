<template>
  <Layout>
    <template #header>
      <Header
        title="Home"
      />
    </template>
  </Layout>
</template>

<script>
import Layout from '@/layouts/ViewLayout.vue';
import Header from '@/components/Header.vue';

export default {
  name: 'Home',
  components: {
    Layout,
    Header,
  },
};
</script>
