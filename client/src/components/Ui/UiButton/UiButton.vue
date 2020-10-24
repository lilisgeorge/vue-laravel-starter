<template>
  <component
    :is="tag"
    class="inline-block text-center px-4 py-2 border border-transparent rounded font-medium
    sm:text-sm sm:leading-5
    focus:outline-none"
    :class="[
      text
        ? 'text-black hover:bg-amber-50 focus:bg-amber-50'
        : 'bg-amber-600 text-black focus:bg-amber-500 focus:shadow-outline-amber'
    ]"
    v-bind="$attrs"
    @click="onClick"
  >
    <svg
      v-if="busy"
      class="animate-spin h-4 w-4 text-black inline-flex"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962
        0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <slot v-else />
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
    busy: Boolean,
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
