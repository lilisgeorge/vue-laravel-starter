<template>
  <div>
    <div
      ref="trigger"
      @click="toggle"
    >
      <slot name="trigger" />
    </div>
    <div
      v-if="state.open"
      ref="dropdown"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import {
  reactive, ref, onUnmounted, watch, nextTick,
} from 'vue';
import { createPopper } from '@popperjs/core';

const on = (element, event, handler) => {
  if (element && event && handler) {
    if (document.addEventListener) {
      element.addEventListener(event, handler, false);
    } else {
      element.attachEvent(`on${event}`, handler);
    }
  }
};

const off = (element, event, handler) => {
  if (element && event) {
    if (document.removeEventListener) {
      element.removeEventListener(event, handler, false);
    } else {
      element.detachEvent(`on${event}`, handler);
    }
  }
};

export default {
  name: 'UiDropdown',
  props: {
    placement: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      open: false,
      popper: null,
    });

    const trigger = ref(null);
    const dropdown = ref(null);

    function setupPopper() {
      state.popper = createPopper(trigger.value, dropdown.value, {
        placement: props.placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 12],
            },
          },
        ],
      });
    }

    watch(
      () => state.open,
      async (isOpen) => {
        await nextTick();

        if (isOpen) {
          setupPopper();
        }
      },
    );

    function elementContains(elm, otherElm) {
      if (typeof elm.contains === 'function') {
        return elm.contains(otherElm);
      }

      return false;
    }

    function handleDocumentClick(e) {
      if (trigger.value && elementContains(trigger.value, e.target) && state.open) {
        return;
      }

      if (dropdown.value && elementContains(dropdown.value, e.target)) {
        return;
      }

      state.open = false;
      state.popper.destroy();
      state.popper = null;
      off(document, 'click', handleDocumentClick);
    }

    function toggle() {
      if (state.open) {
        state.open = false;
        return;
      }

      on(document, 'click', handleDocumentClick);
      state.open = true;
    }

    onUnmounted(() => {
      if (state.popper) {
        off(document, 'click', handleDocumentClick);
        state.popper.destroy();
      }
    });

    return {
      state,
      trigger,
      dropdown,
      toggle,
    };
  },
};
</script>
