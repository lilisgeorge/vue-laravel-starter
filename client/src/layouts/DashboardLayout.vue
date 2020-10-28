<template>
  <div class="flex flex-row min-h-screen flex-auto bg-gray-200">
    <div
      class="block fixed top-0 bottom-0 left-0
      transform -translate-x-full lg:translate-x-0 transition-transform duration-150 ease-in-out"
    >
      <div class="flex flex-row h-full">
        <GlobalNavigation />
        <div class="w-64 bg-cool-gray-800 text-white">
          <div class="p-4">
            <div class="w-full text-xl font-semibold leading-10">
              Vue-laravel-starter
            </div>
          </div>
          <Navigation />
        </div>
      </div>
    </div>
    <div class="flex-auto transition-all duration-150 ease-in-out lg:ml-16 lg:pl-64">
      <slot />
    </div>
  </div>
</template>

<script>
import GlobalNavigation from '@/components/GlobalNavigation.vue';
import Navigation from '@/components/Navigation.vue';

export default {
  name: 'DashboardLayout',
  components: {
    GlobalNavigation,
    Navigation,
  },
};
</script>
