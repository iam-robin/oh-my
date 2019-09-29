<template>
<div class="container">
  <div class="header">
    <div>Your daily limits</div>
    <div class="icon" @mouseover="showHelp = true" @mouseout="showHelp = false">
      <span>?</span>
    </div>
    <div class="help-container" v-if="showHelp">
      You want to set a new limit? <br> <br>Visit the desired website and click on the extension icon on your browser bar!
    </div>
  </div>

  <LimitContainer v-for="limit in limits" :key="limit.domain"
    :domain="limit.domain"
    :limit="limit"
  />

</div>
</template>

<script>
// import moment from 'moment';
import LimitContainer from '../../components/LimitContainer.vue';

export default {
  name: 'limits',

  components: {
    LimitContainer,
  },

  data: function() {
    return {
      // array with objects: key (dates) and values (websites)
      limits: [],
      exceededLimits: 0,
      showHelp: false,
    };
  },

  props: {
    date: String,
  },

  created: function() {
    this.getLimits();
  },

  watch: {
    date: function() {
      this.getLimits();
    },
  },

  methods: {
    getLimits: function() {
      let storageLimits = JSON.parse(localStorage.getItem('limits'));
      let limits = [];
      for (let i = 0; i < storageLimits.length; i++) {
        let limit = {
          domain: storageLimits[i].domain,
          timeLimit: storageLimits[i].timeLimit,
          usageTime: 0,
          timeLimitPercentage: 0,
          viewsLimit: storageLimits[i].viewsLimit,
          siteViews: 0,
          viewsLimitPercentage: 0,
        };
        limits.push(limit);
      }
      this.limits = limits;
      this.calculateLimits();
    },

    calculateLimits: function() {
      let day = this.date;
      let websites = JSON.parse(localStorage.getItem(day));

      for (let i = 0; i < websites.length; i++) {
        for (let x = 0; x < this.limits.length; x++) {
          if (websites[i].domain === this.limits[x].domain) {
            // usage time
            if (this.limits[x].timeLimit) {
              let usageTime = parseInt(websites[i].time / 60000);
              let timeLimit = this.limits[x].timeLimit;
              let timeLimitPercentage = (100 / timeLimit) * usageTime;
              if (timeLimitPercentage > 100) {
                timeLimitPercentage = 100;
              }
              this.limits[x].usageTime = usageTime;
              this.limits[x].timeLimitPercentage = timeLimitPercentage;
            }

            // site views
            if (this.limits[x].viewsLimit) {
              let siteViews = websites[i].count;
              let viewsLimit = this.limits[x].viewsLimit;
              let viewsLimitPercentage = (100 / viewsLimit) * siteViews;
              if (viewsLimitPercentage > 100) {
                viewsLimitPercentage = 100;
              }
              this.limits[x].siteViews = siteViews;
              this.limits[x].viewsLimitPercentage = viewsLimitPercentage;
            }
          }
        }
      }
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

  .header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 3px;
    margin-bottom: 29px;
    padding-bottom: 16px;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    letter-spacing: 1px;

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 3px solid $black;
      height: 24px;
      width: 24px;
      background-color: $white;
      cursor: pointer;

      span {
        font-size: 16px;
        font-weight: 800;
        margin-left: 1px;
      }
    }

    .help-container {
      position: absolute;
      right: 0;
      top: 46px;
      width: 240px;
      background-color: $white;
      border: 3px solid black;
      z-index: 9999;
      padding: 16px;
      font-size: 12px;

      &:after,
      &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        border-style: solid;
        transform: rotate(270deg);
      }

      &:after {
        top: -14px;
        right: 5px;
        border-color: transparent transparent transparent $white;
        border-width: 8px;
      }

      &:before {
        top: -19px;
        right: 4px;
        border-color: transparent transparent transparent $black;
        border-width: 9px;
      }
    }
  }
}
</style>
