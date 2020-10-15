<template>
  <Form
    ref="form"
    v-slot="{ errors }"
    :validation-schema="schema.validation"
    :initial-values="schema.values"
    @submit="handleSubmit"
  >
    <slot v-bind="{ isIdle, isPending, isResolved, isRejected, errors }" />
  </Form>
</template>

<script>
import { computed, reactive, ref } from 'vue';
import useServerError from '@/use/serverError';

const STATUS_IDLE = 'STATUS_IDLE';
const STATUS_PENDING = 'STATUS_PENDING';
const STATUS_RESOLVED = 'STATUS_RESOLVED';
const STATUS_REJECTED = 'STATUS_REJECTED';

export default {
  name: 'UiForm',
  props: {
    schema: {
      type: Object,
      default: null,
    },
    action: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      status: STATUS_IDLE,
    });

    const form = ref(null);

    const isIdle = computed(() => state.status === STATUS_IDLE);
    const isPending = computed(() => state.status === STATUS_PENDING);
    const isResolved = computed(() => state.status === STATUS_RESOLVED);
    const isRejected = computed(() => state.status === STATUS_REJECTED);

    async function handleSubmit(values) {
      try {
        state.status = STATUS_PENDING;
        await props.action(values);
        state.status = STATUS_RESOLVED;
      } catch (error) {
        state.status = STATUS_REJECTED;

        const {
          isValidationError,
          getFirstErrors,
        } = useServerError(error);

        if (isValidationError()) {
          form.value.setErrors(getFirstErrors());
        }
      } finally {
        setTimeout(() => {
          state.status = STATUS_IDLE;
        }, 2000);
      }
    }

    return {
      form, isIdle, isPending, isResolved, isRejected, handleSubmit,
    };
  },
};
</script>
