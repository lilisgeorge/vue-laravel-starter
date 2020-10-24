<template>
  <div
    class="p-6 sm:p-8"
    :class="[
      {
        'bg-gray-100': gray,
        'sm:first:rounded-t': stickToEdgesOnMobile,
        'first:rounded-t': !stickToEdgesOnMobile,
        'sm:last:rounded-b': stickToEdgesOnMobile,
        'last:rounded-b': !stickToEdgesOnMobile,
      },
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
