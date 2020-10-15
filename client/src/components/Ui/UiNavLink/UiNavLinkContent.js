import { h } from 'vue';

const UiNavLinkContent = (props, context) => h(
  'span',
  {
    ...context.attrs,
    class: [
      'inline-flex', 'flex-1', 'leading-6',
    ],
  },
  context.slots,
);

UiNavLinkContent.props = {
  //
};

export default UiNavLinkContent;
