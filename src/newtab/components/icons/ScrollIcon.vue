<template>
<svg :style="{ 'height': size, 'width': size }" viewBox="0 0 26 26" fill="none">
  <rect :style="{ 'height': size, 'width': size }" fill="none"/>
  <path :style="{ 'fill': color }" fill-rule="evenodd" clip-rule="evenodd" d="M12.2929 3.29289C12.6834 2.90237 13.3166 2.90237 13.7071 3.29289L20.2071 9.79289C20.4931 10.0789 20.5787 10.509 20.4239 10.8827C20.2691 11.2564 19.9045 11.5 19.5 11.5H6.50003C6.09557 11.5 5.73093 11.2564 5.57615 10.8827C5.42137 10.509 5.50692 10.0789 5.79292 9.79289L12.2929 3.29289ZM8.91424 9.5H17.0858L13 5.41421L8.91424 9.5Z" fill="black"/>
  <path :style="{ 'fill': color }" fill-rule="evenodd" clip-rule="evenodd" d="M13 23.2C12.7348 23.2 12.4805 23.0946 12.2929 22.9071L5.79293 16.4071C5.50693 16.1211 5.42137 15.6909 5.57616 15.3173C5.73094 14.9436 6.09557 14.6999 6.50003 14.6999L19.5 14.7C19.9045 14.7 20.2691 14.9436 20.4239 15.3173C20.5787 15.6909 20.4931 16.1211 20.2071 16.4071L13.7071 22.9071C13.5196 23.0946 13.2652 23.2 13 23.2ZM17.0858 16.7L8.91425 16.7L13 20.7857L17.0858 16.7Z" fill="black"/>
</svg>
</template>

<script>
export default {
  name: 'limit-container',
  props: {
    color: String,
    size: Number,
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/_colors.scss';
</style>
