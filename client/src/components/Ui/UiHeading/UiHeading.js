import { h } from 'vue';

const classByLevel = {
  0: [
    'text-4xl', 'md:text-5xl', 'leading-tight', 'font-medium',
  ],
  1: [
    'text-2xl', 'md:text-4xl', 'leading-tight', 'font-medium',
  ],
  2: [
    'text-xl', 'md:text-2xl', 'leading-tight', 'font-medium',
  ],
  3: [
    'text-lg', 'md:text-xl', 'leading-tight', 'font-medium',
  ],
  4: [
    'text-base', 'md:text-lg', 'leading-tight', 'font-medium',
  ],
  5: [
    'text-sm', 'leading-tight', 'uppercase',
    'tracking-wider', 'font-semibold',
  ],
  6: [
    'text-xs', 'leading-tight', 'uppercase',
    'tracking-wider', 'font-semibold',
  ],
};

const UiHeading = (props, context) => h(
  `h${props.level}`,
  {
    ...context.attrs,
    class: [
      classByLevel[props.level],
    ],
  },
  context.slots,
);

UiHeading.props = {
  level: {
    type: Number,
    default: 1,
  },
};

export default UiHeading;
