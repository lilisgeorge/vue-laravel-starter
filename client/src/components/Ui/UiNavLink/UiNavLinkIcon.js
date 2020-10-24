import { h } from 'vue';

const UiNavLinkIcon = (props, context) => h(
  'div',
  {
    ...context.attrs,
    class: [
      'inline-flex', 'w-6', 'h-6',
      props.active ? [
        'text-cool-gray-200',
      ] : [
        'text-cool-gray-400',
      ],
    ],
  },
  context.slots,
);

UiNavLinkIcon.props = {
  active: Boolean,
};

export default UiNavLinkIcon;
