<template>
  <div class="limit">
    <router-link :to="{ name: 'detail', params: { domain: domain }}">
      <header>{{ domain }}</header>
    </router-link>
    
    <div v-if="limit.timeLimit" class="limit-container time">
      <div class="icon">
        <TimeIcon 
          color="#000"
          :size=20
        />
      </div>
      <div class="bar-container"
        :class="{ filled: limit.timeLimitPercentage <= 0 }">
        <div v-if="limit.timeLimit - limit.usageTime >= 0" class="value">{{limit.timeLimit - limit.usageTime}}min / {{limit.timeLimit}}min</div>
        <div v-else class="value exceeded">{{-1*(limit.timeLimit - limit.usageTime)}}min above your limit</div>
        <div class="bar" v-if="limit.timeLimitPercentage < 100"
          :style="{ 'width': 100 - timeLimit + '%',
                'background-color': getColor()}">
        </div>
      </div>
    </div>
    
    <div v-if="limit.viewsLimit" class="limit-container time">
      <div class="icon">
        <ViewsIcon 
          color="#000"
          :size=20
        />
      </div>
      <div class="bar-container"
      :class="{ filled: limit.viewsLimitPercentage <= 0 }">
        <div v-if="limit.viewsLimit - limit.siteViews >= 0" class="value">{{limit.viewsLimit - parseInt(limit.siteViews)}} views / {{limit.viewsLimit}} views</div>
        <div v-else class="value exceeded">{{-1*(limit.viewsLimit - parseInt(limit.siteViews))}} views above your limit</div>
        <div class="bar" v-if="limit.viewsLimitPercentage < 100"
          :style="{ 'width': 100 - parseInt(viewsLimit) + '%',
              'background-color': getColor()}">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TweenLite from 'gsap/TweenLite';
import getOverAllData from '../functions/getOverAllData.js';
import mergeSameWebsitesInPeriod from '../functions/mergeSameWebsitesInPeriod.js';

import TimeIcon from './icons/TimeIcon.vue';
import ViewsIcon from './icons/ViewsIcon.vue';

export default {
  name: 'limit-container',
  props: {
    domain: String,
    limit: Object,
  },

  components: {
    TimeIcon,
    ViewsIcon,
  },

  data: function() {
    return {
      timeLimit: 0,
      viewsLimit: 0,
      overAllData: getOverAllData(),
    };
  },

  watch: {
    limit: {
      handler: function(newValue) {
        TweenLite.to(this.$data, 0.2, { timeLimit: newValue.timeLimitPercentage, viewsLimit: newValue.viewsLimitPercentage });
      },
    },
  },

  created: function() {
    this.timeLimit = this.limit.timeLimitPercentage;
    this.viewsLimit = this.limit.viewsLimitPercentage;

    this.getColor();
  },

  methods: {
    getColor: function() {
      let mergedData = mergeSameWebsitesInPeriod(this.overAllData);
      for (let i = 0; i < mergedData.length; i++) {
        if (mergedData[i].domain === this.domain) {
          return mergedData[i].dominant_color.hex;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/_colors.scss';

a {
  color: $black;
  text-decoration: none;
}

.limit {
  width: 100%;
  margin-bottom: 48px;

  &:last-child {
    margin-bottom: 0;
  }

  header {
    display: flex;
    align-items: center;
    padding-left: 24px;
    height: 54px;
    background-color: $white;
    border: 3px solid $black;
    font-size: 16px;
  }

  .limit-container {
    display: flex;
    height: 54px;
    border-bottom: 3px solid $black;
    border-left: 3px solid $black;
    border-right: 3px solid $black;
    background-color: $white;

    .icon {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      height: 56px;
      width: 56px;
      border-right: 3px solid $black;

      svg {
        height: 18px;
        width: 18px;

        path {
          fill: $black;
        }
      }
    }

    .bar-container {
      position: relative;
      width: 100%;
      height: 100%;

      .value {
        position: absolute;
        top: 20px;
        left: 24px;

        &.exceeded {
          font-weight: 800;
        }
      }

      .bar {
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        border-right: 3px solid $black;
      }

      &.filled {
        .bar {
          border-right: none;
        }
      }
    }
  }
}
</style>
