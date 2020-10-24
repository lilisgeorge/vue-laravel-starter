<template>
  <div
    class="px-6 sm:px-8 py-4 sm:py-6"
    :class="[
      gray ? 'bg-gray-100' : 'border-b',
      stickToEdgesOnMobile ? 'sm:rounded-t' : 'rounded-t',
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
