<template>
<svg :style="{ 'height': size, 'width': size }" viewBox="0 0 72 72" fill="none">
<path d="M45 58H26.5L13.5 46V26.5L26.5 14H45.5L58 26.5V46L45 58Z" fill="#EDEFF3"/>
<path :style="{ 'fill': color }" fill-rule="evenodd" clip-rule="evenodd" d="M25.3948 12H46.6052L60 25.3948V46.6052L46.6052 60H25.3948L12 46.6052V25.3948L25.3948 12ZM27.0798 16.0678L16.0678 27.0798V44.9203L27.0798 55.9322H44.9202L55.9322 44.9203V27.0798L44.9202 16.0678H27.0798Z" fill="black"/>
<path :style="{ 'fill': color }" fill-rule="evenodd" clip-rule="evenodd" d="M38 40L38 24L34 24L34 40L38 40Z" fill="black"/>
<path :style="{ 'fill': color }" fill-rule="evenodd" clip-rule="evenodd" d="M38 48L38 44L34 44L34 48L38 48Z" fill="black"/>
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
