<template>
<footer>
  <div class="menu" :class="{ active: this.menuActive, limit: this.activeRoute === 'limit' }">

    <div class="menu-container date">
      <span v-on:click="prevDate()" class="arrow prev" :class="{ disabled: prevButtonDisabled || getPeriod('total') }">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M13.3334 8H2.66669" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.66669 12L2.66669 8L6.66669 4" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>

        <h2>{{formatedDate}}</h2>

      <span v-on:click="nextDate()" class="arrow next" :class="{ disabled: nextButtonDisabled || getPeriod('total') }">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M13.3334 8H2.66669" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.66669 12L2.66669 8L6.66669 4" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>

    <div class="menu-container period">
      <span v-on:click="prevPeriod()" class="arrow prev">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M13.3334 8H2.66669" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.66669 12L2.66669 8L6.66669 4" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <ul>

        <li v-on:click="setPeriod('day')" :class="{ active: getPeriod('day') }">
          <Data1
            v-if="getPeriod('day')"
            color="#000"
            :size=22
          />
          <Data1
            v-else
            color="#AAB2BD"
            :size=22
          />
          <span>day</span>
        </li>

        <li v-on:click="setPeriod('week')" :class="{ active: getPeriod('week') }">
          <Data2
            v-if="getPeriod('week')"
            color="#000"
            :size=22
          />
          <Data2
            v-else
            color="#AAB2BD"
            :size=22
          />
          <span>week</span>
        </li>

        <li v-on:click="setPeriod('month')" :class="{ active: getPeriod('month') }">
          <Data3
            v-if="getPeriod('month')"
            color="#000"
            :size=22
          />
          <Data3
            v-else
            color="#AAB2BD"
            :size=22
          />
          <span>month</span>
        </li>

        <li v-on:click="setPeriod('total')" :class="{ active: getPeriod('total') }">
          <Data4
            v-if="getPeriod('total')"
            color="#000"
            :size=22
          />
          <Data4
            v-else
            color="#AAB2BD"
            :size=22
          />
          <span>total</span>
        </li>

      </ul>
      <span v-on:click="nextPeriod()" class="arrow next">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M13.3334 8H2.66669" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.66669 12L2.66669 8L6.66669 4" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>

    <div class="menu-container mode">
      <span v-on:click="prevMode()" class="arrow prev">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M13.3334 8H2.66669" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.66669 12L2.66669 8L6.66669 4" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <ul>
        <li v-on:click="setMode('time')" :class="{ active: getMode('time') }">
          <TimeIcon
            v-if="getMode('time')"
            color="#000"
            :size=20
          />
          <TimeIcon
            v-else
            color="#AAB2BD"
            :size=20
          />
          <span>time</span>
        </li>

        <li v-on:click="setMode('views')" :class="{ active: getMode('views') }">
          <ViewsIcon
            v-if="getMode('views')"
            color="#000"
            :size=20
          />
          <ViewsIcon
            v-else
            color="#AAB2BD"
            :size=20
          />
          <span>views</span>
        </li>

        <li v-on:click="setMode('clicks')" :class="{ active: getMode('clicks') }">
          <ClicksIcon
            v-if="getMode('clicks')"
            color="#000"
            :size=20
          />
          <ClicksIcon
            v-else
            color="#AAB2BD"
            :size=20
          />
          <span>clicks</span>
        </li>

        <li v-on:click="setMode('scroll')" :class="{ active: getMode('scroll') }">
          <ScrollIcon
            v-if="getMode('scroll')"
            color="#000"
            :size=20
          />
          <ScrollIcon
            v-else
            color="#AAB2BD"
            :size=20
          />
          <span>scroll</span>
        </li>

      </ul>
      <span v-on:click="nextMode()" class="arrow next">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M13.3334 8H2.66669" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.66669 12L2.66669 8L6.66669 4" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>

  </div>
  <button class="settings"
          :class="{ open: menuActive }"
          v-on:click="toggleMenu()">
    <span v-if="menuActive">Close</span>
    <span v-else>Settings</span>
  </button>
</footer>
</template>

<script>
import moment from 'moment';
import getFirstDate from '../functions/getFirstDate';
import cloneDeep from 'lodash/cloneDeep';

import TimeIcon from './icons/TimeIcon.vue';
import ViewsIcon from './icons/ViewsIcon.vue';
import ClicksIcon from './icons/ClicksIcon.vue';
import ScrollIcon from './icons/ScrollIcon.vue';
import Data1 from './icons/Data1.vue';
import Data2 from './icons/Data2.vue';
import Data3 from './icons/Data3.vue';
import Data4 from './icons/Data4.vue';

export default {
  name: 'seetings-menu',
  data: function() {
    return {
      date: moment(),
      menuActive: false,
      activeMode: 'time',
      activePeriod: 'day',
      formatedDate: '',
      nextButtonDisabled: true,
      prevButtonDisabled: false,
    };
  },

  props: {
    activeRoute: String,
  },

  components: {
    TimeIcon,
    ViewsIcon,
    ClicksIcon,
    ScrollIcon,
    Data1,
    Data2,
    Data3,
    Data4,
  },

  watch: {
    activeRoute: function() {
      if (this.activeRoute === 'limit') {
        this.setPeriod('day');
      }
    },
  },

  created: function() {
    this.formatDate();

    // add key down event listener to window to detect key navigation
    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') {
        // next time period
        this.nextDate();
      } else if (e.key === 'ArrowLeft') {
        // prev time period
        this.prevDate();
      } else if (e.key === 'ArrowDown') {
        this.nextMode();
      } else if (e.key === 'ArrowUp') {
        this.prevMode();
      }
    });
  },

  methods: {
    toggleMenu: function() {
      this.menuActive = !this.menuActive;
      this.$emit('menuStateChanged', this.menuActive);
    },

    formatDate: function() {
      let date = cloneDeep(this.date);
      if (this.activePeriod === 'day') {
        // date.format('ddd DD/MM/YYYY') for weekday
        this.formatedDate = date.format('DD/MM/YYYY');
      } else if (this.activePeriod === 'week') {
        this.formatedDate = date.startOf('isoWeek').format('DD/MM') + ' - ' + date.endOf('isoWeek').format('DD/MM/YYYY');
      } else if (this.activePeriod === 'month') {
        this.formatedDate = date.format('MMM YYYY');
      } else if (this.activePeriod === 'total') {
        let minDay = getFirstDate();
        if (minDay.format('YYYY') === moment().format('YYYY')) {
          this.formatedDate = minDay.format('DD/MM') + ' – ' + moment().format('DD/MM/YYYY');
        } else {
          this.formatedDate = minDay.format('DD/MM/YYYY') + ' – ' + moment().format('DD/MM/YYYY');
        }
      }

      this.$emit('formatedDateChanged', this.formatedDate);
    },

    isSamePeriod: function(date, otherDate) {
      if (this.activePeriod === 'day') {
        return date.format('YY-MM-DD') === otherDate.format('YY-MM-DD');
      } else if (this.activePeriod === 'week') {
        return date.startOf('isoWeek').format('DD/MM') === otherDate.startOf('isoWeek').format('DD/MM');
      } else if (this.activePeriod === 'month') {
        return date.format('MMM YYYY') === otherDate.format('MMM YYYY');
      }
      return false;
    },

    nextDate: function() {
      if (!this.isSamePeriod(this.date, moment())) {
        if (this.activePeriod === 'day') {
          this.date.add(1, 'days');
        } else if (this.activePeriod === 'week') {
          this.date.add(1, 'weeks');
        } else if (this.activePeriod === 'month') {
          this.date.add(1, 'months');
        }
      }

      this.checkButtons();
      this.formatDate();
      this.$emit('dateChanged', this.date);
    },

    prevDate: function() {
      if (!this.isSamePeriod(this.date, getFirstDate())) {
        if (this.activePeriod === 'day') {
          this.date.subtract(1, 'days');
        } else if (this.activePeriod === 'week') {
          this.date.subtract(1, 'weeks');
        } else if (this.activePeriod === 'month') {
          this.date.subtract(1, 'months');
        }
      }

      this.checkButtons();
      this.formatDate();
      this.$emit('dateChanged', this.date);
    },

    checkButtons: function() {
      if (this.isSamePeriod(this.date, getFirstDate())) {
        this.prevButtonDisabled = true;
      } else {
        this.prevButtonDisabled = false;
      }
      if (this.isSamePeriod(this.date, moment())) {
        this.nextButtonDisabled = true;
      } else {
        this.nextButtonDisabled = false;
      }
    },

    nextPeriod: function() {
      if (this.activePeriod === 'day') {
        this.setPeriod('week');
      } else if (this.activePeriod === 'week') {
        this.setPeriod('month');
      } else if (this.activePeriod === 'month') {
        this.setPeriod('total');
      } else if (this.activePeriod === 'total') {
        this.setPeriod('day');
      }

      this.checkButtons();
    },

    prevPeriod: function() {
      if (this.activePeriod === 'day') {
        this.setPeriod('total');
      } else if (this.activePeriod === 'week') {
        this.setPeriod('day');
      } else if (this.activePeriod === 'month') {
        this.setPeriod('week');
      } else if (this.activePeriod === 'total') {
        this.setPeriod('month');
      }

      this.checkButtons();
    },

    nextMode: function() {
      if (this.activeMode === 'time') {
        this.setMode('views');
      } else if (this.activeMode === 'views') {
        this.setMode('clicks');
      } else if (this.activeMode === 'clicks') {
        this.setMode('scroll');
      } else if (this.activeMode === 'scroll') {
        this.setMode('time');
      }
    },

    prevMode: function() {
      if (this.activeMode === 'time') {
        this.setMode('scroll');
      } else if (this.activeMode === 'views') {
        this.setMode('time');
      } else if (this.activeMode === 'clicks') {
        this.setMode('views');
      } else if (this.activeMode === 'scroll') {
        this.setMode('clicks');
      }
    },

    getMode: function(menuItem) {
      return this.activeMode === menuItem;
    },

    setMode: function(menuItem) {
      this.activeMode = menuItem;
      this.$emit('modeChanged', this.activeMode);
    },

    getPeriod: function(menuItem) {
      return this.activePeriod === menuItem;
    },

    setPeriod: function(menuItem) {
      this.activePeriod = menuItem;
      this.formatDate();
      this.checkButtons();
      this.$emit('periodChanged', this.activePeriod);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/_colors.scss';

footer {
  .menu {
    display: flex;
    flex-wrap: wrap;
    height: 0;
    margin-bottom: 96px;
    user-select: none;
    z-index: 9;
    transition: 0.3s ease-in-out;

    &.active {
      height: 360px;

      &.limit {
        height: 123px;
      }
    }

    .menu-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 3px solid $black;
      height: 120px;
      box-sizing: border-box;

      span.arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 117px;
        cursor: pointer;

        &.disabled {
          background-color: $lightgrey;
          cursor: auto;

          svg path {
            stroke: $darkgrey;
          }

          &:hover {
            background-color: $lightgrey;
          }
        }

        &.prev {
          border-right: 3px solid $black;
        }

        &.next {
          border-left: 3px solid $black;

          svg {
            transform: rotate(180deg);
          }
        }

        &:hover {
          background-color: $primary;
        }

        svg {
          height: 24px;
          width: 24px;
        }
      }

      &.period,
      &.mode {
        ul {
          margin: 0;
          padding: 0;
          display: flex;

          li {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            list-style: none;
            padding: 16px;
            cursor: pointer;
            text-decoration: none;

            svg {
              flex: 0 0 100%;

              path {
                fill: $darkgrey;
              }
            }

            span {
              flex: 0 0 100%;
              margin-top: 8px;
              font-family: 'Montserrat', sans-serif;
              font-weight: 400;
              font-size: 10px;
              text-transform: uppercase;
              text-align: center;
              letter-spacing: 2px;
              color: $darkgrey;
            }

            &.active {
              svg path {
                fill: $black;
              }

              span {
                font-weight: 800;
                color: $black;
              }
            }

            &:hover {
              span {
                color: darken($darkgrey, 10%);
              }
              svg path {
                fill: darken($darkgrey, 10%);
              }

              &.active {
                span {
                  color: $black;
                }
                svg path {
                  fill: $black;
                }
              }
            }
          }
        }
      }

      &.date {
        h2 {
          font-size: 16px;
          font-weight: 400;
          margin: 0;
        }
      }
    }
  }

  button.settings {
    position: fixed;
    bottom: 0;
    width: 40%;
    height: 96px;
    border: none;
    outline: none;
    cursor: pointer;
    border-top: 3px solid $black;
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 2px;
    z-index: 999;

    &.open {
      background-color: $white;

      &:hover {
        background-color: $primary;
      }
    }

    &:hover {
      background-color: $primary;
    }
  }
}
</style>
