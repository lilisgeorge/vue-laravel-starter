import { h } from 'vue';

const UiNavLinkGroup = (props, context) => h(
  'div',
  {
    ...context.attrs,
    class: [
      'space-y-4',
    ],
  },
  [
    ...(props.withCaption ? [
      h(
        'div',
        {
          class: ['flex', 'flex-row', 'space-x-2', 'px-2'],
        },
        context.slots.caption || h(
          'h2',
          {
            class: [
              'text-xs', 'uppercase', 'font-medium', 'flex-1', 'text-gray-600',
              'cursor-default', 'leading-4',
            ],
          },
          props.caption,
        ),
      ),
    ] : []),
    h(
      'div',
      {
        ...context.attrs,
        class: [
          'flex', 'flex-col', 'space-y-2',
        ],
      },
      context.slots,
    ),
  ],
);

UiNavLinkGroup.props = {
  caption: {
    type: String,
    default: 'Caption',
  },
  withCaption: Boolean,
};

export default UiNavLinkGroup;
