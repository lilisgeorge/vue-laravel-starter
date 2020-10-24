<template>
  <div
    class="px-6 sm:px-8 py-4 sm:py-6"
    :class="[
      gray ? 'bg-gray-100' : 'border-t',
      stickToEdgesOnMobile ? 'sm:rounded-b' : 'rounded-b',
    ]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    gray: Boolean,
    stickToEdgesOnMobile: Boolean,
  },
};
</script>
