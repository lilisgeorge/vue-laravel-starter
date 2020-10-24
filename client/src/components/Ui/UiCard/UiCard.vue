<template>
  <div
    class="shadow-xs"
    :class="[
      stickToEdgesOnMobile ? 'sm:rounded' : 'rounded',
    ]"
  >
    <div
      class="shadow-lg bg-white"
      :class="[
        stickToEdgesOnMobile ? 'sm:rounded' : 'rounded',
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stickToEdgesOnMobile: Boolean,
  },
};
</script>
