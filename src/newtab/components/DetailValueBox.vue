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
        <ClicksIcon
          v-if="icon === 'clicks'"
          color="#000"
          :size=20
        />
        <ScrollIcon
          v-if="icon === 'scroll'"
          color="#000"
          :size=20
        />
      </span>
      <h2 class="title">{{ title }}</h2>
    </div>

    <p class="value" v-if="dependency">{{ value }}</p>
    <p class="value" v-else>0 {{ unit }}</p>

    <div class="value-container all-websites">
      <div class="icon">
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.076938 19.307C0.256563 18.9477 0.693407 18.8021 1.05266 18.9817L8 22.4554L14.9473 18.9817C15.3066 18.8021 15.7434 18.9477 15.9231 19.307C16.1027 19.6662 15.9571 20.1031 15.5978 20.2827L8.32524 23.919C8.1205 24.0213 7.8795 24.0213 7.67476 23.919L0.402178 20.2827C0.0429279 20.1031 -0.102687 19.6662 0.076938 19.307Z" fill="#B4BBC5"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.076938 15.6708C0.256563 15.3115 0.693407 15.1659 1.05266 15.3455L8 18.8192L14.9473 15.3455C15.3066 15.1659 15.7434 15.3115 15.9231 15.6708C16.1027 16.03 15.9571 16.4669 15.5978 16.6465L8.32524 20.2828C8.1205 20.3851 7.8795 20.3851 7.67476 20.2828L0.402178 16.6465C0.0429279 16.4669 -0.102687 16.03 0.076938 15.6708Z" fill="#B4BBC5"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.076938 12.0346C0.256563 11.6753 0.693407 11.5297 1.05266 11.7093L8 15.183L14.9473 11.7093C15.3066 11.5297 15.7434 11.6753 15.9231 12.0346C16.1027 12.3938 15.9571 12.8307 15.5978 13.0103L8.32524 16.6466C8.1205 16.7489 7.8795 16.7489 7.67476 16.6466L0.402178 13.0103C0.0429279 12.8307 -0.102687 12.3938 0.076938 12.0346Z" fill="#B4BBC5"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.67475 4.43676C7.87949 4.33439 8.12048 4.33439 8.32523 4.43676L15.5978 8.07306C15.8442 8.19625 15.9998 8.44807 15.9998 8.72353C15.9998 8.999 15.8442 9.25082 15.5978 9.37401L8.32523 13.0103C8.12048 13.1127 7.87949 13.1127 7.67475 13.0103L0.402165 9.37401C0.155781 9.25082 0.000146072 8.999 0.000146072 8.72353C0.000146072 8.44807 0.155781 8.19625 0.402165 8.07306L7.67475 4.43676ZM2.3536 8.72353L7.99999 11.5467L13.6464 8.72353L7.99999 5.90034L2.3536 8.72353Z" fill="#B4BBC5"/>
        </svg>
      </div>
      <span>{{ allWebsites }}</span>
    </div>

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
import ClicksIcon from './icons/ClicksIcon.vue';
import ScrollIcon from './icons/ScrollIcon.vue';

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
    ViewsIcon,
    ClicksIcon,
    ScrollIcon,
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
      font-size: 21px;
      font-weight: 800;
      margin: 24px 24px 16px 24px;
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
