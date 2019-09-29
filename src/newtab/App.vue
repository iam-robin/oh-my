<template>
  <div>
    <div class="info-container">
      <MainHeader
        v-on:click.native="getActiveRoute()"
        :links="[
          {name: 'Top Four', to: '/ratio'},
          {name: 'List', to: '/list'},
          {name: 'Limits', to: '/limit'}]"
      />

      <main>
        <!-- time mode -->
        <div class="value" v-if="activeMode === 'time' && this.activeRoute !== 'limit'">
          <h1 v-if="periodSum.time > 0" class="sum">{{formatMS(periodSum.time, true)}}</h1>
          <h1 v-else class="sum">–</h1>
        </div>

        <!-- views mode -->
        <div class="value" v-if="activeMode === 'views' && this.activeRoute !== 'limit'">
          <h1 v-if="periodSum.views > 0" class="sum">{{periodSum.views}}</h1>
          <h1 v-else class="sum">–</h1>
        </div>

        <!-- clicks mode -->
        <div class="value" v-if="activeMode === 'clicks' && this.activeRoute !== 'limit'">
          <h1 v-if="periodSum.clicks > 0" class="sum">{{periodSum.clicks}}</h1>
          <h1 v-else class="sum">–</h1>
        </div>

        <!-- scroll mode -->
        <div class="value" v-if="activeMode === 'scroll' && this.activeRoute !== 'limit'">
          <h1 v-if="periodSum.scroll > 0" class="sum">{{parseInt(periodSum.scroll/100)}}K px</h1>
          <h1 v-else-if="periodSum.scroll > 1000" class="sum">{{parseInt(periodSum.scroll/1000)}}K px</h1>
          <h1 v-else-if="periodSum.scroll > 1000000" class="sum">{{parseInt(periodSum.scroll/1000000)}}M px</h1>
          <h1 v-else class="sum">–</h1>
        </div>

        <!-- limits -->
        <div class="value" v-if="this.activeRoute === 'limit'">
          <TrophyIcon
            v-if="exceededLimits === 0"
            color="#000"
            :size=72
          />
          <ExceededIcon
            v-else
            color="#000"
            :size=72
          />
          <h1 class="exceeded">
            <span v-if="exceededLimits > 0">{{ exceededLimits }} </span>
            <span v-else>no </span>
            <span v-if="exceededLimits === 1 || exceededLimits === 0">limit </span>
            <span v-else>limits </span>
            exceeded
          </h1>
        </div>

        <div class="date" :class="{ active: !this.menuActive }">

          <TimeIcon
            v-if="activeMode === 'time' && activeRoute !== 'limit'"
            color='#000'
            :size=20
          />

          <ViewsIcon
            v-if="activeMode === 'views' && activeRoute !== 'limit'"
            color='#000'
            :size=20
          />

          <ClicksIcon
            v-if="activeMode === 'clicks' && activeRoute !== 'limit'"
            color='#000'
            :size=20
          />

          <ScrollIcon
            v-if="activeMode === 'scroll' && activeRoute !== 'limit'"
            color='#000'
            :size=20
          />
          <span v-if="activeRoute !== 'limit'" class="mode">{{activeMode}} | </span>
          <span>{{formatedDate}}</span>
        </div>

      </main>

      <SettingsMenu
        :activeRoute="activeRoute"
        @modeChanged="activeMode = $event"
        @periodChanged="getPeriod($event)"
        @formatedDateChanged="formatedDate = $event"
        @menuStateChanged="menuActive = $event"
        @dateChanged="getDate($event)"
      />

    </div>
    <div class="content-container" v-bind:class="{detail: detailPageActive}">
      <router-view :mode="activeMode"
        :data='relevantData'
        :date="storageDate"
        :entireData='data'
        :period='activePeriod'
        @detailPageActive="handleDetailPage">
      </router-view>
    </div>
  </div>
</template>

<script>
import MainHeader from './components/MainHeader.vue';
import SettingsMenu from './components/SettingsMenu.vue';
import TimeIcon from './components/icons/TimeIcon.vue';
import ViewsIcon from './components/icons/ViewsIcon.vue';
import ClicksIcon from './components/icons/ClicksIcon.vue';
import ScrollIcon from './components/icons/ScrollIcon.vue';
import TrophyIcon from './components/icons/TrophyIcon.vue';
import ExceededIcon from './components/icons/ExceededIcon.vue';

import moment from 'moment';
import formatMS from './functions/formatMS';
import getPeriodDays from './functions/getPeriodDays';
import mergeSameWebsitesInPeriod from './functions/mergeSameWebsitesInPeriod';
import getFirstDate from './functions/getFirstDate';

export default {
  name: 'app-view',
  data: function() {
    return {
      data: [],
      relevantData: [],
      periodSum: {},
      detailPageActive: false,
      activeRoute: this.$router.currentRoute.name,
      exceededLimits: 0,

      date: moment(),
      activePeriod: 'day',
      activeMode: 'time',
      menuActive: false,
      formatedDate: '',
      storageDate: moment().format('YYYY-MM-DD'),
    };
  },

  components: {
    MainHeader,
    SettingsMenu,
    TimeIcon,
    ViewsIcon,
    ClicksIcon,
    ScrollIcon,
    TrophyIcon,
    ExceededIcon,
  },

  created: function() {
    this.getData();
    this.getRelevantData();
    this.getExceededLimits();
  },

  methods: {
    formatMS,

    getDate: function(newDate) {
      this.date = newDate;
      this.storageDate = moment(newDate).format('YYYY-MM-DD');
      this.getRelevantData();
      this.getExceededLimits();
    },

    getPeriod: function(newPeriod) {
      this.activePeriod = newPeriod;
      this.getRelevantData();
    },

    getData: function() {
      let storageKeys = Object.keys(localStorage);
      let data = [];
      for (let i = 0; i < storageKeys.length; i++) {
        // for each key in storage build object with key(date) value(websites)
        // and push it to data array
        let key = storageKeys[i];
        if (key !== 'limits') {
          let websites = JSON.parse(localStorage.getItem(key));
          let timeSum = 0;
          let viewSum = 0;
          let clickSum = 0;
          let scrollSum = 0;
          for (let i = 0; i < websites.length; i++) {
            timeSum += websites[i].time;
            viewSum += websites[i].count;
            clickSum += websites[i].clicks;
            scrollSum += websites[i].scroll;
          }
          let object = {
            date: key,
            websites: websites,
            timeSum: timeSum,
            viewSum: viewSum,
            clickSum: clickSum,
            scrollSum: scrollSum,
          };
          data.unshift(object);
        }
      }
      this.data = data;
    },

    getRelevantData: function() {
      let entireData = this.data;

      let periodSum = {
        time: 0,
        views: 0,
        clicks: 0,
        scroll: 0,
      };

      let currentPeriod = [];
      let currentPeriodData = [];

      let relevantData = [];

      // reset data
      this.relevantData = [];
      this.periodSum = {};

      if (this.activePeriod === 'total') {
        currentPeriod = getPeriodDays(this.date, this.activePeriod, getFirstDate());
      } else {
        currentPeriod = getPeriodDays(this.date, this.activePeriod);
      }

      // calculate the current period
      for (let i = 0; i < currentPeriod.length; i++) {
        let periodday = moment(currentPeriod[i]).format('YYYY-MM-DD');
        for (let x = 0; x < entireData.length; x++) {
          if (entireData[x].date === periodday) {
            periodSum.time += entireData[x].timeSum;
            periodSum.views += entireData[x].viewSum;
            periodSum.clicks += entireData[x].clickSum;
            periodSum.scroll += entireData[x].scrollSum;
            currentPeriodData.push(entireData[x]);
          }
        }
      }

      this.periodSum = periodSum;
      relevantData = mergeSameWebsitesInPeriod(currentPeriodData);
      this.relevantData = relevantData;
    },

    getExceededLimits: function() {
      let storageLimits = JSON.parse(localStorage.getItem('limits'));
      let data = this.relevantData;
      let exceededLimits = 0;
      for (let x = 0; x < storageLimits.length; x++) {
        for (let i = 0; i < data.length; i++) {
          // check time limits
          if (storageLimits[x].domain === data[i].domain && storageLimits[x].timeLimit) {
            let usageTime = parseInt(data[i].time / 60000);
            let timeLimit = storageLimits[x].timeLimit;
            if (usageTime > timeLimit) {
              exceededLimits++;
            }
          }
          // check views limits
          if (storageLimits[x].domain === data[i].domain && storageLimits[x].viewsLimit) {
            let siteViews = data[i].count;
            let viewsLimit = storageLimits[x].viewsLimit;
            if (siteViews > viewsLimit) {
              exceededLimits++;
            }
          }
        }
      }
      this.exceededLimits = exceededLimits;
    },

    getActiveRoute: function() {
      this.activeRoute = this.$router.currentRoute.name;
    },

    handleDetailPage: function(isActive) {
      this.detailPageActive = isActive;
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Fira+Mono:400,700');
@import url('https://fonts.googleapis.com/css?family=Montserrat:500');
@import 'scss/_colors.scss';

::-webkit-scrollbar {
  width: 0px; /* remove scrollbar space */
}

::selection {
  background: $primary;
}

html {
  overflow: hidden;
  height: 100%;
}

body {
  height: 100%;
  overflow: auto;
  margin: 0;
  padding: 0;
  font-family: 'Fira Mono', monospace;
  font-weight: 400;
  font-size: 12px;
  border-top: 3px solid $black;
  -webkit-font-smoothing: subpixel-antialiased;

  .info-container {
    width: 40%;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: $white;
    height: 100vh;
    border-right: 3px solid $black;

    main {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .value {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        flex: 0 0 100%;

        h1.sum {
          font-size: 67px;
          margin: 0;
          text-align: center;
        }

        h1.exceeded {
          font-size: 21px;
          margin: 0;
        }

        svg {
          flex: 0 0 100%;
          margin-bottom: 16px;
        }
      }

      .date {
        display: flex;
        align-items: center;
        font-size: 16px;
        margin-top: 16px;
        opacity: 0;
        transition: opacity 0.2s ease-out;

        &.active {
          opacity: 1;
        }

        svg {
          margin-right: 8px;

          path {
            fill: $black;
          }
        }

        .mode {
          margin-right: 8px;
        }
      }
    }
  }

  .content-container {
    display: inline-block;
    margin-left: 40%;
    width: 60%;
    background-color: $lightgrey;
    min-height: 100vh;

    &.detail {
      width: 100%;
      margin: 0;
    }
  }
}
</style>
