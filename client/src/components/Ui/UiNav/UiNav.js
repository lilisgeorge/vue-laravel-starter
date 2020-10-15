import { h } from 'vue';

const UiNav = (props, context) => h(
  'div',
  {
    ...context.attrs,
    class: [
      'px-4', 'py-6', 'space-y-6', 'flex', 'flex-col',
    ],
  },
  context.slots,
);

UiNav.props = {
  //
};

export default UiNav;
