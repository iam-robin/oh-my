<template>

  <div class="container">

    <div class="grid">
      <div class="gridItem" v-for="(website, index) in content" :key="website.domain"
      :style="{ 'background-color': website.dominant_color.hex,
                'grid-column-start': website.grid_column_start,
                'grid-column-end': website.grid_column_end,
                'grid-row-start': website.grid_row_start,
                'grid-row-end': website.grid_row_end}">
        <router-link :to="{ name: 'detail', params: { domain: website.domain}}">
          <div class="desc">
            <span class="index">0{{index+1}}</span>
            <div class="content">
              <span class="domain">{{website.domain}}</span>
              <div v-if="columnWidthLimitation <= website.grid_column_end - website.grid_column_start" class="value-container">

                <span class="value" v-if="mode === 'time'">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <g>
                      <path d="M8.00002 16C3.60001 16 0 12.4 0 8.00002C0 3.60001 3.60001 0 8.00002 0C12.4 0 16 3.60001 16 8.00002C16 12.4 12.4 16 8.00002 16ZM8.00002 1.33334C4.33334 1.33334 1.33334 4.33334 1.33334 8.00002C1.33334 11.6667 4.33334 14.6667 8.00002 14.6667C11.6667 14.6667 14.6667 11.6667 14.6667 8.00002C14.6667 4.33334 11.6667 1.33334 8.00002 1.33334Z" fill="black"/>
                      <path d="M8.00004 8.66676C7.60004 8.66676 7.33337 8.40009 7.33337 8.00009V3.33342C7.33337 2.93342 7.60004 2.66675 8.00004 2.66675C8.40004 2.66675 8.66671 2.93342 8.66671 3.33342V8.00009C8.66671 8.40009 8.40004 8.66676 8.00004 8.66676Z" fill="black"/>
                      <path d="M10.6667 11.3333C10.4667 11.3333 10.3334 11.2666 10.2 11.1333L7.53337 8.46659C7.26671 8.19992 7.26671 7.79992 7.53337 7.53325C7.80004 7.26659 8.20004 7.26659 8.46671 7.53325L11.1334 10.1999C11.4001 10.4666 11.4001 10.8666 11.1334 11.1333C11 11.2666 10.8667 11.3333 10.6667 11.3333Z" fill="black"/>
                    </g>
                  </svg>
                  {{formatMS(website.time)}} | {{Math.round(website.percent * 1000) / 10}}%
                </span>

                <span class="value" v-if="mode === 'views'">
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <g>
                      <path d="M8.00005 10.6666C6.53338 10.6666 5.33337 9.46659 5.33337 7.99992C5.33337 6.53325 6.53338 5.33325 8.00005 5.33325C9.46672 5.33325 10.6667 6.53325 10.6667 7.99992C10.6667 9.46659 9.46672 10.6666 8.00005 10.6666ZM8.00005 6.66659C7.26671 6.66659 6.66671 7.26659 6.66671 7.99992C6.66671 8.73326 7.26671 9.33326 8.00005 9.33326C8.73338 9.33326 9.33338 8.73326 9.33338 7.99992C9.33338 7.26659 8.73338 6.66659 8.00005 6.66659Z" fill="#B4BBC5"/>
                      <path d="M8.00012 14C3.02087 14 0.232487 8.6 0.0997071 8.375C-0.0330729 8.15 -0.0330729 7.85 0.0997071 7.625C0.232487 7.4 3.02087 2 8.00012 2C12.9794 2 15.7678 7.4 15.9005 7.625C16.0333 7.85 16.0333 8.15 15.9005 8.375C15.7678 8.6 12.9794 14 8.00012 14ZM1.4939 8C2.1578 9.125 4.48145 12.5 8.00012 12.5C11.5188 12.5 13.8424 9.125 14.5063 8C13.8424 6.875 11.5188 3.5 8.00012 3.5C4.48145 3.5 2.1578 6.875 1.4939 8Z" fill="#B4BBC5"/>
                    </g>
                  </svg>
                  {{website.count}} views | {{Math.round(website.percent * 1000) / 10}}%
                </span>

                <span class="value" v-if="mode === 'clicks'">
                  <svg width="16" height="16" version="1.1" viewBox="0 0 16 16">
                    <g transform="scale(0.666667)">
                      <path fill="#000" d="M14,23c0,0 0,0 0,0c-0.4,0 -0.8,-0.3 -0.9,-0.7l-2.3,-6.9c-0.2,-0.5 0.1,-1.1 0.6,-1.3c0.5,-0.2 1.1,0.1 1.3,0.6l1.4,4.3l6.1,-15.3l-15.3,6.2l4.3,1.4c0.5,0.2 0.8,0.7 0.6,1.3c-0.2,0.5 -0.7,0.8 -1.3,0.6l-6.9,-2.3c-0.3,-0.1 -0.6,-0.5 -0.6,-0.9c0,-0.4 0.2,-0.8 0.6,-1l20,-8c0.4,-0.1 0.8,0 1.1,0.3c0.3,0.3 0.4,0.7 0.2,1.1l-8,20c-0.1,0.4 -0.5,0.6 -0.9,0.6Z"></path>
                      <path fill="#000" d="M4,23c-0.8,0 -1.5,-0.3 -2.1,-0.9c-1.2,-1.2 -1.2,-3.1 0,-4.2l6.3,-6.3c0.4,-0.4 1,-0.4 1.4,0c0.4,0.4 0.4,1 0,1.4l-6.3,6.3c-0.2,0.2 -0.3,0.4 -0.3,0.7c0,0.3 0.1,0.5 0.3,0.7c0.4,0.4 1,0.4 1.4,0l6.3,-6.3c0.4,-0.4 1,-0.4 1.4,0c0.4,0.4 0.4,1 0,1.4l-6.3,6.3c-0.6,0.6 -1.3,0.9 -2.1,0.9Z"></path>
                    </g>
                  </svg>
                  {{website.clicks}} clicks | {{Math.round(website.percent * 1000) / 10}}%
                </span>

                <span class="value" v-if="mode === 'scroll'">
                  <svg width="16" height="16" version="1.1" viewBox="0 0 16 16" >
                    <g transform="scale(0.666667)">
                      <path fill="#000" d="M12,24c-6.6,0 -12,-5.4 -12,-12c0,-6.6 5.4,-12 12,-12c6.6,0 12,5.4 12,12c0,6.6 -5.4,12 -12,12Zm0,-22c-5.5,0 -10,4.5 -10,10c0,5.5 4.5,10 10,10c5.5,0 10,-4.5 10,-10c0,-5.5 -4.5,-10 -10,-10Z"></path>
                      <path fill="#000" d="M15,11c-0.3,0 -0.5,-0.1 -0.7,-0.3l-2.3,-2.3l-2.3,2.3c-0.4,0.4 -1,0.4 -1.4,0c-0.4,-0.4 -0.4,-1 0,-1.4l3,-3c0.4,-0.4 1,-0.4 1.4,0l3,3c0.4,0.4 0.4,1 0,1.4c-0.2,0.2 -0.4,0.3 -0.7,0.3Z"></path>
                      <path fill="#000" d="M12,18c-0.3,0 -0.5,-0.1 -0.7,-0.3l-3,-3c-0.4,-0.4 -0.4,-1 0,-1.4c0.4,-0.4 1,-0.4 1.4,0l2.3,2.3l2.3,-2.3c0.4,-0.4 1,-0.4 1.4,0c0.4,0.4 0.4,1 0,1.4l-3,3c-0.2,0.2 -0.4,0.3 -0.7,0.3Z"></path>
                    </g>
                  </svg>
                  {{website.scroll}} px | {{Math.round(website.percent * 1000) / 10}}%
                </span>

              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>

</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import formatMS from '../../functions/formatMS';

export default {
  name: 'ratio-view',
  data: function() {
    return {
      columnWidthLimitation: 27,
      count: 4,
      rows: [],
      columns: [],
      xLeft: 100,
      yLeft: 100,
      aLeft: 1000,
      minRatio: 0.1,

      column: false,
      mayChangeDirection: true,

      content: [],
    };
  },

  props: {
    mode: String,
    data: Array,
  },

  watch: {
    mode: function() {
      this.resetValues();
      this.getContent();
    },
    data: function() {
      this.resetValues();
      this.getContent();
    },
  },

  created: function() {
    this.getContent();
    // send data to app.vue
    this.$emit('detailPageActive', false);
  },

  methods: {
    formatMS,

    getContent: function() {
      let data = cloneDeep(this.data);

      // get and sort the top websites (count and mode as parameter)
      let topWebsites = this.findTopWebsites(this.count, data, this.mode);
      topWebsites = this.getWebsitePercentage(topWebsites, this.mode);

      for (let i = 0; i < topWebsites.length; i++) {
        topWebsites[i] = this.calculateColumnsRows(topWebsites[i], i, topWebsites);
      }

      this.content = topWebsites;
    },

    findTopWebsites: function(websiteCount, websites, mode) {
      let sortedWebsites = websites;
      let topWebsites = [];

      if (mode === 'time') {
        // sort all Websites by time (highest first)
        sortedWebsites.sort(function(a, b) {
          if (a.time < b.time) {
            return 1;
          } else if (a.time === b.time) {
            return 0;
          } else {
            return -1;
          }
        });
      } else if (mode === 'views') {
        // sort all Websites by site views (highest first)
        sortedWebsites.sort(function(a, b) {
          if (a.count < b.count) {
            return 1;
          } else if (a.count === b.count) {
            return 0;
          } else {
            return -1;
          }
        });
      } else if (mode === 'clicks') {
        // sort all Websites by clicks (highest first)
        sortedWebsites.sort(function(a, b) {
          if (a.clicks < b.clicks) {
            return 1;
          } else if (a.clicks === b.clicks) {
            return 0;
          } else {
            return -1;
          }
        });
      } else if (mode === 'scroll') {
        // sort all Websites by scroll (highest first)
        sortedWebsites.sort(function(a, b) {
          if (a.scroll < b.scroll) {
            return 1;
          } else if (a.scroll === b.scroll) {
            return 0;
          } else {
            return -1;
          }
        });
      }

      // get nth (count) highest times and save them in new array
      for (let i = 0; i < sortedWebsites.length; i++) {
        if (i < websiteCount) {
          topWebsites.push(sortedWebsites[i]);
        } else {
          break;
        }
      }
      return topWebsites;
    },

    getWebsitePercentage: function(websites, mode) {
      let sum = 0;

      if (mode === 'time') {
        // calculate sum of the top Websites usage time
        for (let i = 0; i < websites.length; i++) {
          // merge ms time into minutes
          let time = parseInt(websites[i].time / (1000 * 60));
          // if 0 minutes -> 0.5
          if (time === 0) {
            time = 0.5;
          }
          sum += time;
        }
        // add the percentage of each top side to the object
        websites.forEach(function(website) {
          // merge ms time into minutes
          let time = parseInt(website.time / (1000 * 60));

          // if 0 minutes -> 0.5
          if (time === 0) {
            time = 0.5;
          }

          let percentage = ((100 / sum) * time) / 100;
          let roundedPercentage = Math.round(percentage * 1000) / 1000;
          website['percent'] = roundedPercentage;
        });
      } else if (mode === 'views') {
        for (let i = 0; i < websites.length; i++) {
          sum += websites[i].count;
        }
        // add the percentage of each top side to the object
        websites.forEach(function(website) {
          let count = website.count;
          let percentage = ((100 / sum) * count) / 100;
          let roundedPercentage = Math.round(percentage * 1000) / 1000;
          website['percent'] = roundedPercentage;
        });
      } else if (mode === 'clicks') {
        for (let i = 0; i < websites.length; i++) {
          sum += websites[i].clicks;
        }
        // add the percentage of each top side to the object
        websites.forEach(function(website) {
          let clicks = website.clicks;
          let percentage = ((100 / sum) * clicks) / 100;
          let roundedPercentage = Math.round(percentage * 1000) / 1000;
          website['percent'] = roundedPercentage;
        });
      } else if (mode === 'scroll') {
        for (let i = 0; i < websites.length; i++) {
          sum += websites[i].scroll;
        }
        // add the percentage of each top side to the object
        websites.forEach(function(website) {
          let scroll = website.scroll;
          let percentage = ((100 / sum) * scroll) / 100;
          let roundedPercentage = Math.round(percentage * 1000) / 1000;
          website['percent'] = roundedPercentage;
        });
      }

      return websites;
    },

    calculateColumnsRows: function(website, index) {
      const site = website;
      let aNeeded = 10000 * site.percent;
      if (this.column) {
        let xNeeded = Math.round(aNeeded / this.yLeft);
        let ratio = xNeeded / this.yLeft;
        if (this.mayChangeDirection && ratio < this.minRatio) {
          this.column = !this.column;
          this.mayChangeDirection = false;
          this.calculateColumnsRows(site, index);
        } else {
          this.xLeft = this.xLeft - xNeeded;
          if (this.columns.length === 0) {
            site.grid_column_start = 1;
          } else {
            site.grid_column_start = this.columns[this.columns.length - 1];
          }
          if (index === this.count - 1) {
            site.grid_column_end = 101;
          } else {
            site.grid_column_end = site.grid_column_start + xNeeded;
          }
          if (this.rows.length === 0) {
            site.grid_row_start = 1;
          } else {
            site.grid_row_start = this.rows[this.rows.length - 1];
          }
          site.grid_row_end = 101;
          this.columns.push(site.grid_column_end);
        }
      } else {
        let yNeeded = Math.round(aNeeded / this.xLeft);
        let ratio = yNeeded / this.xLeft;
        if (this.mayChangeDirection && ratio < this.minRatio) {
          this.column = !this.column;
          this.mayChangeDirection = false;
          this.calculateColumnsRows(site, index);
        } else {
          this.yLeft = this.yLeft - yNeeded;
          if (this.rows.length === 0) {
            site.grid_row_start = 1;
          } else {
            site.grid_row_start = this.rows[this.rows.length - 1];
          }
          if (index === this.count - 1) {
            site.grid_row_end = 101;
          } else {
            site.grid_row_end = site.grid_row_start + yNeeded;
          }
          if (this.columns.length === 0) {
            site.grid_column_start = 1;
          } else {
            site.grid_column_start = this.columns[this.columns.length - 1];
          }
          site.grid_column_end = 101;
          this.rows.push(site.grid_row_end);
        }
      }

      if (this.mayChangeDirection) {
        this.column = !this.column;
      }

      return site;
    },

    resetValues: function() {
      this.columns = [];
      this.rows = [];
      this.column = false;
      this.xLeft = 100;
      this.yLeft = 100;
      this.aLeft = 1000;
      this.mayChangeDirection = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/_colors.scss';

.container {
  height: 100vh;
  // 40px 80px - margin of grid item
  padding: 28px 68px;
  box-sizing: border-box;
}

.grid {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(100, 1fr);
  grid-template-rows: repeat(100, 1fr);

  .gridItem {
    position: relative;
    margin: 12px;
    border: 3px solid $black;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    overflow: hidden;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 0 -8px $black;
    }

    a {
      height: 100%;
      width: 100%;
      display: block;
      color: $black;
      text-decoration: none;
    }

    .desc {
      position: relative;
      background-color: $white;
      color: $black;
      padding: 10px 16px 7px 8px;
      border-bottom: 3px solid $black;
      overflow: hidden;

      .index {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 32px;
        top: 0;
        left: 0;
        font-weight: 800;

        &:after {
          content: '';
          display: inline-block;
          position: absolute;
          right: -2px;
          top: 0;
          height: 100%;
          width: 3px;
          background-color: $black;
        }
      }

      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        margin-left: 40px;

        .domain {
          margin-right: 16px;
          padding-bottom: 4px;
          font-size: 16px;
        }

        .value-container {
          padding-bottom: 4px;
          &:first-child {
            margin-right: 16px;
          }

          .value {
            display: flex;
            align-items: center;

            svg {
              display: none;
              margin-right: 8px;
              height: 12px;
              width: 12px;

              path {
                fill: $black;
              }
            }
          }
        }
      }

      // white element to crop overflowed content
      &:after {
        content: '';
        position: absolute;
        display: inline-block;
        height: 100%;
        width: 16px;
        background-color: $white;
        right: 0;
        top: 0;
      }
    }
  }
}
</style>
