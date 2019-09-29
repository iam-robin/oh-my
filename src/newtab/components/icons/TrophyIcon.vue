<template>
<svg :style="{ 'height': size, 'width': size }" viewBox="0 0 72 72" fill="none">
  <path d="M49.3321 13.589H23.3806H21.7241V38.4362L30.5587 47.2707H40.4976L49.3321 38.4362V13.589Z" fill="#F5BA4F" stroke="black"/>
  <path :style="{ 'fill': color }" fill-rule="evenodd" clip-rule="evenodd" d="M20.1914 11.6007H51.8442V39.2742L42.3784 48.74H29.6573L20.1914 39.2742V11.6007ZM24.4118 15.8211V37.526L31.4054 44.5196H40.6302L47.6239 37.526V15.8211H24.4118Z"/>
  <path :style="{ 'fill': color }" fill-rule="evenodd" clip-rule="evenodd" d="M9.20602 25.56L24.3999 40.7539L24.3999 14.3455L9.20866 14.3455L9.20602 25.56ZM13.4268 23.8123L13.428 18.5659L20.1795 18.5659L20.1795 30.565L13.4268 23.8123Z"/>
  <path :style="{ 'fill': color }" fill-rule="evenodd" clip-rule="evenodd" d="M47.6006 40.7598L62.7944 25.5659L62.7918 14.3514L47.6006 14.3514L47.6006 40.7598ZM51.821 30.5709L51.821 18.5718L58.5724 18.5718L58.5736 23.8182L51.821 30.5709Z"/>
  <path :style="{ 'fill': color }" fill-rule="evenodd" clip-rule="evenodd" d="M38.1159 62.6689V46.4508H33.8955V62.6689H38.1159Z"/>
  <path :style="{ 'fill': color }" fill-rule="evenodd" clip-rule="evenodd" d="M49.7142 65.1969H22.2817V60.9766H49.7142V65.1969Z"/>
</svg>
</template>

<script>
export default {
  name: 'trophy-icon',
  props: {
    color: String,
    size: Number,
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/_colors.scss';
</style>
