<template>
  <component
    :is="tag"
    class="inline-block text-center px-4 py-2 border border-transparent rounded font-medium
    sm:text-sm sm:leading-5
    focus:outline-none"
    :class="[
      text
        ? 'text-blue-600 hover:bg-blue-50 focus:bg-blue-50'
        : 'bg-blue-600 text-white focus:bg-blue-500 focus:shadow-outline-blue'
    ]"
    v-bind="$attrs"
    @click="onClick"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'UiButton',
  props: {
    text: Boolean,
    tag: {
      type: String,
      default: 'button',
    },
  },
  emits: ['click'],
  setup(props, ctx) {
    function onClick(e) {
      ctx.emit('click', e);
    }

    return {
      onClick,
    };
  },
};
</script>
