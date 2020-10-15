import { h } from 'vue';

const UiNavLinkBadge = (props, context) => h(
  'span',
  {
    ...context.attrs,
    class: [
      'inline-block', 'font-medium', 'text-xs', 'text-center', 'leading-4', 'py-1', 'px-2',
      'text-white', 'bg-pink-600', 'min-w-6', 'h-6', 'rounded-full',
    ],
  },
  context.slots,
);

UiNavLinkBadge.props = {
  //
};

export default UiNavLinkBadge;
