import { h } from 'vue';

const UiNavLinkIcon = (props, context) => h(
  'div',
  {
    ...context.attrs,
    class: [
      'inline-flex', 'w-6', 'h-6', 'text-gray-600',
    ],
  },
  context.slots,
);

UiNavLinkIcon.props = {
  //
};

export default UiNavLinkIcon;
