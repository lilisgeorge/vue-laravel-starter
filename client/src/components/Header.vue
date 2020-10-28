<template>
  <div class="bg-gradient-to-r from-pink-600 to-blue-600 text-white">
    <slot name="header">
      <UiContainer>
        <UiHeading :level="2">
          {{ title }}
        </UiHeading>
      </UiContainer>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: { type: String, default: 'Title' },
  },
};
</script>
