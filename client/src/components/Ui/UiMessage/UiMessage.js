import { h } from 'vue';

const UiMessage = (props, context) => h(
  'span',
  {
    ...context.attrs,
    class: [
      {
        'text-red-600': props.error,
        'text-green-600': props.success,
        'text-teal-600': props.info,
      },
      'inline-block',
      'text-sm',
      'leading-5',
    ],
  },
  context.slots,
);

UiMessage.props = {
  error: Boolean,
  success: Boolean,
  info: Boolean,
};

export default UiMessage;
