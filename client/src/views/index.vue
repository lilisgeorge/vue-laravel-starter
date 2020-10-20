<template>
  <div class="layout">
    <div class="navigation">
      <div class="navigation-inner">
        <GlobalNavigation />
        <div class="contextual-navigation">
          <div class="p-4">
            <div class="w-full text-xl font-semibold leading-10">
              Vue-laravel-starter
            </div>
          </div>
          <Navigation />
        </div>
      </div>
    </div>
    <div class="content">
      <div class="p-10 h-full">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import GlobalNavigation from '@/components/GlobalNavigation.vue';
import Navigation from '@/components/Navigation.vue';

export default {
  name: 'IndexView',
  components: {
    GlobalNavigation,
    Navigation,
  },
  setup() {
    //
  },
};
</script>

<style lang="postcss">
.layout {
  @apply flex flex-row h-screen flex-auto;
}

.navigation {
  @apply block fixed top-0 bottom-0 left-0 transform -translate-x-full;
  @apply transition-transform duration-150 ease-in-out;
}

@screen lg {
  .navigation {
    @apply translate-x-0;
  }
}

.navigation-inner {
  @apply flex flex-row h-full;
}

.global-navigation {
  @apply w-16 bg-blue-900;
}

.contextual-navigation {
  @apply w-64 bg-gray-100;
}

.content {
  @apply flex-auto;
  @apply transition-all duration-150 ease-in-out;
}

@screen lg {
  .content {
    @apply ml-16 pl-64;
  }
}
</style>
