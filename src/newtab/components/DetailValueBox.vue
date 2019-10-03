<template>
<div class="value-box">
  <div class="box">
    <div class="header">
      <span class="icon">
        <TimeIcon
          v-if="icon === 'time'"
          color="#000"
          :size=20
        />
        <ViewsIcon
          v-if="icon === 'views'"
          color="#000"
          :size=20
        />
      </span>
      <h2 class="title">{{ title }}</h2>
    </div>

    <p class="value" v-if="dependency">{{ value }}</p>
    <p class="value" v-else>0 {{ unit }}</p>

    <div class="value-container place">
      <div class="icon">
        <svg width="16" height="16" version="1.1" viewBox="0 0 16 16" >
          <g transform="scale(0.666667)">
            <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8,6h13"></path>
            <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8,12h13"></path>
            <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8,18h13"></path>
            <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3,6v0"></path>
            <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3,12v0"></path>
            <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3,18v0"></path>
          </g>
        </svg>
      </div>
      <span v-if="place === 1">{{ place }}st rank</span>
      <span v-else-if="place === 2">{{ place }}nd rank</span>
      <span v-else-if="place === 3">{{ place }}rd rank</span>
      <span v-else-if="place >= 4">{{ place }}th rank</span>
      <span v-else>rank > 100</span>
    </div>

  </div>
</div>
</template>

<script>
import TimeIcon from './icons/TimeIcon.vue';
import ViewsIcon from './icons/ViewsIcon.vue';

export default {
  name: 'detail-value-box',
  props: {
    icon: String,
    title: String,
    dependency: Boolean,
    value: String,
    allWebsites: String,
    place: Number,
    unit: String,
  },

  components: {
    TimeIcon,
    ViewsIcon
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/_colors.scss';

.value-box {
  width: 33.333333%;

  .box {
    box-sizing: border-box;
    background-color: $white;
    border: 3px solid $black;
    margin: 16px;
    padding-bottom: 16px;

    .header {
      position: relative;
      height: 40px;
      display: flex;
      align-items: center;
      border-bottom: 3px solid $black;

      .icon {
        margin-left: 8px;
        margin-right: 24px;

        &:after {
          content: '';
          position: absolute;
          left: 36px;
          top: 0;
          display: inline-block;
          height: 40px;
          width: 3px;
          background-color: $black;
        }
      }

      .title {
        padding-right: 24px;
        margin: 0;
        font-size: 12px;
        font-weight: 400;
        font-family: 'Montserrat', sans-serif;
        letter-spacing: 1px;
      }
    }

    .value {
      font-size: 26px;
      font-weight: 800;
      margin: 24px 24px 12px 24px;
    }

    .value-container {
      display: flex;
      font-size: 16px;
      align-items: center;
      margin: 0px 24px 8px 24px;

      .icon {
        width: 18px;
        height: 18px;
        margin-right: 8px;

        svg {
          width: 18px;

          path {
            fill: $black;
          }
        }
      }

      &.all-websites {
        .icon {
          height: 24px;
          svg {
            width: 14px;
            margin-left: 2px;
          }
        }
      }
    }
  }
}
</style>
