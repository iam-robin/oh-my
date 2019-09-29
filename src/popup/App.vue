<template>
  <div>
    <div v-if="tabInfo && tabInfo.domain != '' && tabInfo.domain != 'newtab' ">
      <div class="website">
        <span v-if="tabInfo && tabInfo.favIconUrl != ''" :style="{ backgroundImage: 'url(' + tabInfo.favIconUrl + ')' }" class="favicon"></span>
        <span v-else class="placeholder favicon"></span>
        <h1 class="domain" v-if="tabInfo">{{ tabInfo.domain }}</h1>
      </div>

      <router-view v-if="tabInfo"
        :websiteData="websiteData"
        :hasLimit="hasLimit"
        :thisLimit="thisLimit"
        :limits="limits"
        :tabInfo="tabInfo">
      </router-view>
    </div>
    <div v-else>
      you can't set a limit for this website
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import extractRootDomain from '../background/functions/extractRootDomain';
import formatMS from '../newtab/functions/formatMS';

export default {
  data() {
    return {
      hasLimit: false,
      limits: [],
      thisLimit: {},
      tabInfo: null,
      websiteData: {},
      timeLimit: 0,
      viewsLimit: 0,
      message: '',
    };
  },
  mounted() {
    this.getTabInfo();
  },

  methods: {
    getTabInfo: function() {
      // queries for getting tab info
      let query = { active: true, currentWindow: true };
      let self = this;
      function callback(tabs) {
        let tabInfo = tabs[0];
        let tabUrl = tabInfo.url;
        self.tabInfo = tabInfo;
        self.tabInfo['domain'] = extractRootDomain(tabUrl);
        self.getLimit();
        self.getWebsiteData();
      }
      // call the callback function
      chrome.tabs.query(query, callback);
    },

    getLimit: function() {
      // check if there is already a limit on this page
      this.limits = JSON.parse(localStorage.getItem('limits'));

      for (let i = 0; i < this.limits.length; i++) {
        if (this.tabInfo.domain === this.limits[i].domain) {
          this.thisLimit = this.limits[i];
          this.hasLimit = true;
          break;
        } else {
          this.hasLimit = false;
        }
      }
    },

    getWebsiteData: function() {
      let today = moment().format('YYYY-MM-DD');
      let websites = JSON.parse(localStorage.getItem(today));
      let websiteData;
      for (let i = 0; i < websites.length; i++) {
        if (websites[i].domain === this.tabInfo.domain) {
          websiteData = websites[i];
          break;
        }
      }
      websiteData.time = formatMS(websiteData.time, true);
      this.websiteData = websiteData;
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Fira+Mono:400,700');
@import url('https://fonts.googleapis.com/css?family=Montserrat:500');
@import '../newtab/scss/_colors.scss';

body {
  position: relative;
  width: 240px;
  margin: 0px !important;
  padding: 24px;
  font-family: 'Fira Mono', monospace;
  border: 3px solid $black;
  border-radius: 5px;

  h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin: 0;
    margin-bottom: 8px;
  }

  button {
    font-family: 'Montserrat', sans-serif;
    margin-top: 32px;
    border: 2px solid black;
    padding: 8px 16px;
    cursor: pointer;

    &.primary {
      font-weight: 800;
    }

    &:focus {
      outline: none;
    }
  }

  .website {
    display: flex;
    align-items: center;
    margin-bottom: 32px;

    .domain {
      font-size: 16px;
      font-weight: 400;
      margin: 0;
    }

    .favicon {
      display: inline-block;
      height: 16px;
      width: 16px;
      background-size: contain;
      margin-right: 8px;

      &.placeholder {
        background-color: $darkgrey;
        border-radius: 100%;
      }
    }
  }

  .value-container {
    display: flex;
    align-items: center;
    margin: 0;
    height: 40px;

    .icon {
      margin-top: 2px;
      svg {
        height: 16px;
        width: 16px;
        path {
          fill: $black;
        }
      }
    }

    .value {
      margin-left: 8px;
      display: flex;
      align-items: flex-end;
      font-size: 16px;
      font-weight: 800;

      p {
        margin: 0;
      }

      .limit {
        margin-left: 8px;
        font-weight: 400;
        font-size: 12px;
      }
    }
  }

  .message {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: $white;
    align-items: center;
    justify-content: center;
  }
}
</style>
