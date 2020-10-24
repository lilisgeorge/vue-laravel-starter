<template>
  <div class="px-4 py-4 sm:px-6 sm:py-12 lg:px-10">
    <slot>
      <div class="border-2 rounded border-dashed h-64 flex items-center justify-center">
        Place your content here.
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'UiContainer',
};
</script>
