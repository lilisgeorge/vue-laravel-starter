<template>
  <div
    :style="[style, customStyle]"
    aria-hidden="true"
  >
    <!-- this img is not displayed; it is used to detect failure-to-load of div background image -->
    <img
      v-if="isImage"
      style="display: none"
      :src="src"
      @error="onImgError"
    >
    <span v-show="!isImage">{{ userInitial }}</span>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue';

const backgroundColors = [
  '#F44336', '#FF4081', '#9C27B0', '#673AB7',
  '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688',
  '#4CAF50', '#8BC34A', '#CDDC39', '#FFC107',
  '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B',
];

function genBackgroundColor(seed) {
  return backgroundColors[seed % (backgroundColors.length)];
}

function genInitial(username) {
  const parts = username.split(/[ -]/);
  let initials = '';

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < parts.length; i++) {
    initials += parts[i].charAt(0);
  }

  if (initials.length > 3 && initials.search(/[A-Z]/) !== -1) {
    initials = initials.replace(/[a-z]+/g, '');
  }

  initials = initials.substr(0, 3).toUpperCase();

  return initials;
}

function lightenColor(hex, amt) {
  let usePound = false;

  if (hex[0] === '#') {
    // eslint-disable-next-line no-param-reassign
    hex = hex.slice(1);
    usePound = true;
  }

  const num = parseInt(hex, 16);
  // eslint-disable-next-line no-bitwise
  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  // eslint-disable-next-line no-bitwise
  let b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  // eslint-disable-next-line no-bitwise
  let g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  // eslint-disable-next-line no-bitwise
  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}

export default {
  name: 'UiAvatar',

  props: {
    username: {
      type: String,
      required: true,
    },
    initials: {
      type: String,
      default: null,
    },
    backgroundColor: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
    customStyle: {
      type: Object,
      default: null,
    },
    inline: Boolean,
    size: {
      type: Number,
      default: 50,
    },
    src: {
      type: String,
      default: null,
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    lighten: {
      type: Number,
      default: 80,
    },
  },

  emits: ['avatar-initials'],

  setup(props, ctx) {
    const state = reactive({
      imgError: false,
    });

    const background = computed(() => {
      if (!state.imgError) {
        if (props.backgroundColor) {
          return props.backgroundColor;
        }

        return genBackgroundColor(props.username.length, backgroundColors);
      }

      return undefined;
    });

    const isImage = computed(() => !state.imgError && Boolean(props.src));

    const fontColor = computed(() => {
      if (!isImage.value) {
        return props.color || lightenColor(background, props.lighten);
      }

      return undefined;
    });

    const style = computed(() => {
      const attrs = {
        display: props.inline ? 'inline-flex' : 'flex',
        width: `${props.size}px`,
        height: `${props.size}px`,
        borderRadius: props.rounded ? '50%' : 0,
        lineHeight: `${(props.size + Math.floor(props.size / 20))}px`,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        userSelect: 'none',
      };

      const imgBackgroundAndFontStyle = {
        background: `transparent url('${props.src}') no-repeat scroll 0% 0% / ${props.size}px ${props.size}px content-box border-box`,
      };

      const initialBackgroundAndFontStyle = {
        backgroundColor: background.value,
        font: `${Math.floor(props.size / 2.5)}px/${props.size}px Helvetica, Arial, sans-serif`,
        color: fontColor.value,
      };

      const backgroundAndFontStyle = (isImage.value)
        ? imgBackgroundAndFontStyle
        : initialBackgroundAndFontStyle;

      Object.assign(attrs, backgroundAndFontStyle);

      return attrs;
    });

    const userInitial = computed(() => {
      if (!isImage.value) {
        const initials = props.initials || genInitial(props.username);
        return initials;
      }
      return undefined;
    });

    function onImgError() {
      state.imgError = true;
    }

    onMounted(() => {
      if (isImage.value) {
        ctx.emit('avatar-initials', this.username, this.userInitial);
      }
    });

    return {
      onImgError,
      isImage,
      userInitial,
      style,
    };
  },
};
</script>
