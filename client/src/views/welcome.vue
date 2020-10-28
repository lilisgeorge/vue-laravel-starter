<template>
  <Layout>
    <UiContainer>
      <UiHeading
        :level="5"
        class="text-center"
      >
        Welcome to
      </UiHeading>

      <h1 class="text-5xl font-light text-center">
        Vue + Laraver starter
      </h1>

      <div class="text-center mt-12">
        <RouterLink to="/login">
          Login
        </RouterLink> | <RouterLink to="/register">
          Register
        </RouterLink>
      </div>
    </UiContainer>
  </Layout>
</template>

<script>
import Layout from '@/layouts/ViewLayout.vue';

export default {
  name: 'WelcomeView',
  components: { Layout },
};
</script>
