<template>
  <div>
    <div
      class="bg-gradient-to-r from-pink-600 to-blue-600
      px-4 py-4 sm:px-6 sm:py-12 lg:px-10 text-white"
    >
      <UiHeading :level="2">
        Settings
      </UiHeading>
    </div>
    <div class="px-4 py-4 sm:px-6 sm:py-12 lg:px-10">
      <div class="border-2 rounded border-dashed h-64 flex items-center justify-center">
        Content ...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsView',
};
</script>
