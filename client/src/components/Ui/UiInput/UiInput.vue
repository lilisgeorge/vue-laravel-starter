<template>
  <input
    :type="$attrs.type || 'text'"
    :value="modelValue"
    class="appearance-none px-4 py-2 leading-6 border border-gray-300 rounded
    sm:text-sm sm:leading-5
    focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
    v-on="inputListeners"
  >
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'UiInput',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const inputListeners = computed(() => ({
      ...ctx.listeners,
      input(ev) {
        ctx.emit('update:modelValue', ev.target.value);
      },
    }));

    return { inputListeners };
  },
};
</script>
