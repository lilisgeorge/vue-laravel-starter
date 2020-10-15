import { h } from 'vue';
import { RouterLink } from 'vue-router';

const UiNavLink = (props, context) => h(
  RouterLink,
  {
    ...context.attrs,
    class: [
      'text-gray-800', 'cursor-default', 'px-3', 'py-2',
      'hover:bg-gray-200', 'rounded', 'hover:text-gray-900',
      'transition-all', 'ease-in-out', 'duration-150',
      'flex', 'flex-row', 'space-x-2', 'items-center',
      'outline-none',
    ],
  },
  context.slots,
);

UiNavLink.props = {
  //
};

export default UiNavLink;
