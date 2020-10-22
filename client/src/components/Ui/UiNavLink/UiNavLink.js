import { h } from 'vue';

const UiNavLink = (props, context) => h(
  'a',
  {
    ...context.attrs,
    class: [
      'cursor-default', 'px-3', 'py-2',
      'rounded',
      'transition-all', 'ease-in-out', 'duration-150',
      'flex', 'flex-row', 'space-x-2', 'items-center',
      'outline-none',
      props.active ? [
        'bg-blue-600',
        'text-white',
      ] : [
        'text-gray-800',
        'hover:bg-gray-200',
        'hover:text-gray-900',
      ],
    ],
  },
  context.slots,
);

UiNavLink.props = {
  active: Boolean,
};

export default UiNavLink;
