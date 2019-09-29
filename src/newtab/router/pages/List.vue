<template>
<div class="component">
  <div class="container">
    
    <div class="list-header">
      <div>
        <span>Domain</span> 
      </div>
      <div>
        <span v-if="mode === 'time'">Usage time</span>
        <span v-if="mode === 'views'">Site views</span>
        <span v-if="mode === 'clicks'">Clicks on website</span>
        <span v-if="mode === 'scroll'">Scroll distance</span>
      </div>
    </div>

    <!--mode: time -->
    <!-- <transition-group appear
      name="staggered-fade"
      tag="ul"
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-if="mode === 'time'"
    > -->
    <ul v-if="mode === 'time'">
      <li v-for="(website, index) in sortedData"
          :key="website.domain"
          v-bind:data-index="index">
        <router-link :to="{ name: 'detail', params: { domain: website.domain }}">
          <div class="left">
            <span v-if="website.favicon != '' && website.favicon" :style="{ backgroundImage: 'url(' + website.favicon + ')' }" class="favicon"></span>
            <span v-else class="placeholder"></span>
            <span class="domain">{{ website.domain }}</span>
          </div>
          <div class="right">
            <div class="bar-container">
              <span class="dot" v-for="index in dots" :key="index" :class="{ active: index <= getDotState(website.time) }"></span>
            </div>
            <span class="value time">{{ formatMS(website.time, true) }}</span>

            <TimeIcon color='#000' :size=20 />
          </div>
        </router-link>
      </li>
    </ul>
    <!-- </transition-group> -->

    <!--mode: views -->
    <!-- <transition-group appear
      name="staggered-fade"
      tag="ul"
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-if="mode === 'views'"
    > -->
    <ul v-if="mode === 'views'">
      <li v-for="website in sortedData" :key="website.domain">
        <router-link :to="{ name: 'detail', params: { domain: website.domain }}">
          <div class="left">
            <span v-if="website.favicon != '' && website.favicon" :style="{ backgroundImage: 'url(' + website.favicon + ')' }" class="favicon"></span>
            <span v-else class="placeholder"></span>
            <span class="domain">{{ website.domain }}</span>
          </div>
          <div class="right">
            <div class="bar-container">
              <span class="dot" v-for="index in dots" :key="index" :class="{ active: index <= getDotState(website.count) }"></span>
            </div>
            <span class="value views">{{ website.count }}</span>
            <ViewsIcon color='#000' :size=20 />
          </div>
        </router-link>
      </li>
    </ul>
    <!-- </transition-group> -->

    <!--mode: clicks -->
    <ul v-if="mode === 'clicks'">
      <li v-for="website in sortedData" :key="website.domain">
        <router-link :to="{ name: 'detail', params: { domain: website.domain }}">
          <div class="left">
            <span v-if="website.favicon != '' && website.favicon" :style="{ backgroundImage: 'url(' + website.favicon + ')' }" class="favicon"></span>
            <span v-else class="placeholder"></span>
            <span class="domain">{{ website.domain }}</span>
          </div>
          <div class="right">
            <div class="bar-container">
              <span class="dot" v-for="index in dots" :key="index" :class="{ active: index <= getDotState(website.clicks) }"></span>
            </div>
            <span class="value clicks">{{ website.clicks }}</span>
            <ClicksIcon color='#000' :size=20 />
          </div>
        </router-link>
      </li>
    </ul>

    <!--mode: scroll -->
    <ul v-if="mode === 'scroll'">
      <li v-for="website in sortedData" :key="website.domain">
        <router-link :to="{ name: 'detail', params: { domain: website.domain }}">
          <div class="left">
            <span v-if="website.favicon != '' && website.favicon" :style="{ backgroundImage: 'url(' + website.favicon + ')' }" class="favicon"></span>
            <span v-else class="placeholder"></span>
            <span class="domain">{{ website.domain }}</span>
          </div>
          <div class="right">
            <div class="bar-container">
              <span class="dot" v-for="index in dots" :key="index" :class="{ active: index <= getDotState(website.scroll) }"></span>
            </div>
            <span class="value scroll">{{ parseInt(website.scroll)}} px</span>
            <ScrollIcon color='#000' :size=20 />
          </div>
        </router-link>
      </li>
    </ul>

  </div>
</div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import formatMS from '../../functions/formatMS';

import TimeIcon from '../../components/icons/TimeIcon.vue';
import ViewsIcon from '../../components/icons/ViewsIcon.vue';
import ClicksIcon from '../../components/icons/ClicksIcon.vue';
import ScrollIcon from '../../components/icons/ScrollIcon.vue';

export default {
  name: 'list-view',

  props: {
    mode: String,
    period: String,
    data: Array,
  },

  components: {
    TimeIcon,
    ViewsIcon,
    ClicksIcon,
    ScrollIcon,
  },

  data: function() {
    return {
      dots: 16,
      sortedData: [],
    };
  },

  watch: {
    mode: function() {
      this.sortData();
    },
    data: function() {
      this.sortData();
    },
  },

  created: function() {
    this.sortData();
    this.$emit('detailPageActive', false);
  },

  methods: {
    formatMS,

    sortData: function() {
      let sortedData = cloneDeep(this.data);

      if (this.mode === 'time') {
        sortedData.sort((a, b) => parseFloat(b.time) - parseFloat(a.time));
      } else if (this.mode === 'views') {
        sortedData.sort((a, b) => parseFloat(b.count) - parseFloat(a.count));
      } else if (this.mode === 'clicks') {
        sortedData.sort((a, b) => parseFloat(b.clicks) - parseFloat(a.clicks));
      } else if (this.mode === 'scroll') {
        sortedData.sort((a, b) => parseFloat(b.scroll) - parseFloat(a.scroll));
      }

      this.sortedData = sortedData;
    },

    getDotState: function(websiteData) {
      let maxValue = this.getMaxValue();

      let percentage = (this.dots / maxValue) * websiteData;
      percentage = parseInt(percentage);

      return percentage;
    },

    getMaxValue: function() {
      if (this.mode === 'time') {
        return this.data.reduce((max, p) => (p.time > max ? p.time : max), this.data[0].time);
      } else if (this.mode === 'views') {
        return this.data.reduce((max, p) => (p.count > max ? p.count : max), this.data[0].count);
      } else if (this.mode === 'clicks') {
        return this.data.reduce((max, p) => (p.clicks > max ? p.clicks : max), this.data[0].clicks);
      } else if (this.mode === 'scroll') {
        return this.data.reduce((max, p) => (p.scroll > max ? p.scroll : max), this.data[0].scroll);
      }
    },

    beforeEnter: function(el) {
      el.style.transform = 'translateY(40px)';
      el.style.opacity = 0;
    },

    enter: function(el, done) {
      let delay = el.dataset.index * 50;
      setTimeout(function() {
        el.style.transform = 'translateY(0px)';
        el.style.opacity = 1;
      }, delay);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/_colors.scss';

.container {
  padding: 40px 80px;
  min-height: 100vh;
  box-sizing: border-box;

  .list-header {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding-bottom: 16px;
    border-bottom: 3px solid $black;

    span {
      font-family: 'Montserrat', sans-serif;
      font-size: 12px;
      letter-spacing: 2px;
    }
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    align-content: flex-start;
    list-style: none;

    li {
      flex: 0 0 100%;
      height: 80px;
      box-sizing: border-box;
      margin-top: 24px;
      background-color: $white;
      border: 3px solid $black;
      transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, opacity 0.4s ease-in-out;

      &:hover {
        transform: translateY(-4px) !important;
        box-shadow: 0 12px 0 -8px $black;
      }

      &:first-child {
        margin-top: 34px;
      }

      &:last-child {
        margin-bottom: 40px;
      }

      a {
        height: 100%;
        width: 100%;
        display: flex;
        font-size: 16px;
        padding: 0 24px;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        color: $black;
        text-decoration: none;

        .left {
          display: flex;
          align-items: center;
          width: 33%;
          margin-right: 32px;
          overflow: hidden;

          .favicon {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 16px;
            background-size: 16px 16px;
            background-position: center;
            background-repeat: no-repeat;
          }

          .placeholder {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 16px;
            border-radius: 100%;
            background-color: $darkgrey;
          }
        }

        .right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 66%;

          .value {
            flex-shrink: 0;
            text-align: right;

            &.time {
              width: 104px;
            }
            &.views {
              width: 56px;
            }
            &.clicks {
              width: 56px;
            }
            &.scroll {
              width: 120px;
            }
          }

          svg {
            margin-left: 8px;
            flex-shrink: 0;

            path {
              fill: $black;
            }
          }

          .bar-container {
            display: flex;
            align-items: center;
            flex-direction: row-reverse;

            .dot {
              height: 8px;
              width: 8px;
              background-color: $lightgrey;
              margin-left: 4px;

              &.active {
                background-color: $black;
              }
            }
          }
        }
      }
    }
  }
}
</style>
