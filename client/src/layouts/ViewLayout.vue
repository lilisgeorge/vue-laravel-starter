<template>
  <div class="bg-gray-200 min-h-screen">
    <slot name="header" />
    <slot>
      <UiContainer />
    </slot>
  </div>
</template>

<script>
export default {
  name: 'ViewLayout',
};
</script>
