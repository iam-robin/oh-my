<template>
<div>
  <h2>todays usage</h2>
  
  <div v-if="websiteData.time" class="value-container time">
    <div class="icon">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8.00002 16C3.60001 16 0 12.4 0 8.00002C0 3.60001 3.60001 0 8.00002 0C12.4 0 16 3.60001 16 8.00002C16 12.4 12.4 16 8.00002 16ZM8.00002 1.33334C4.33334 1.33334 1.33334 4.33334 1.33334 8.00002C1.33334 11.6667 4.33334 14.6667 8.00002 14.6667C11.6667 14.6667 14.6667 11.6667 14.6667 8.00002C14.6667 4.33334 11.6667 1.33334 8.00002 1.33334Z" fill="black"/>
          <path d="M8.00004 8.66676C7.60004 8.66676 7.33337 8.40009 7.33337 8.00009V3.33342C7.33337 2.93342 7.60004 2.66675 8.00004 2.66675C8.40004 2.66675 8.66671 2.93342 8.66671 3.33342V8.00009C8.66671 8.40009 8.40004 8.66676 8.00004 8.66676Z" fill="black"/>
          <path d="M10.6667 11.3333C10.4667 11.3333 10.3334 11.2666 10.2 11.1333L7.53337 8.46659C7.26671 8.19992 7.26671 7.79992 7.53337 7.53325C7.80004 7.26659 8.20004 7.26659 8.46671 7.53325L11.1334 10.1999C11.4001 10.4666 11.4001 10.8666 11.1334 11.1333C11 11.2666 10.8667 11.3333 10.6667 11.3333Z" fill="black"/>
      </svg>
    </div>
    <div class="value">
      <p>{{ websiteData.time }}</p>
      <p class="limit" v-if="hasLimit">/ {{ thisLimit.timeLimit }}min</p>
      <p class="limit" v-else>/ no limit</p>
    </div>
  </div>

  <div v-if="websiteData.count" class="value-container views">
    <div class="icon">
      <svg width="16" height="16" viewBox="0 0 16 16">
        <path d="M8.00005 10.6666C6.53338 10.6666 5.33337 9.46659 5.33337 7.99992C5.33337 6.53325 6.53338 5.33325 8.00005 5.33325C9.46672 5.33325 10.6667 6.53325 10.6667 7.99992C10.6667 9.46659 9.46672 10.6666 8.00005 10.6666ZM8.00005 6.66659C7.26671 6.66659 6.66671 7.26659 6.66671 7.99992C6.66671 8.73326 7.26671 9.33326 8.00005 9.33326C8.73338 9.33326 9.33338 8.73326 9.33338 7.99992C9.33338 7.26659 8.73338 6.66659 8.00005 6.66659Z" fill="#B4BBC5"/>
        <path d="M8.00012 14C3.02087 14 0.232487 8.6 0.0997071 8.375C-0.0330729 8.15 -0.0330729 7.85 0.0997071 7.625C0.232487 7.4 3.02087 2 8.00012 2C12.9794 2 15.7678 7.4 15.9005 7.625C16.0333 7.85 16.0333 8.15 15.9005 8.375C15.7678 8.6 12.9794 14 8.00012 14ZM1.4939 8C2.1578 9.125 4.48145 12.5 8.00012 12.5C11.5188 12.5 13.8424 9.125 14.5063 8C13.8424 6.875 11.5188 3.5 8.00012 3.5C4.48145 3.5 2.1578 6.875 1.4939 8Z" fill="#B4BBC5"/>
      </svg>
    </div>
    <div class="value">
      <p v-if="websiteData.count > 1">{{ websiteData.count }} views</p>
      <p v-if="websiteData.count === 1">{{ websiteData.count }} view</p>
      <p class="limit" v-if="hasLimit">/ {{thisLimit.viewsLimit}} views</p>
      <p class="limit" v-else>/ no limit</p>
    </div>
  </div>

  <router-link v-if="!hasLimit" :to="'/EditLimit'">
    <button class="primary">add limit</button>
  </router-link>

  <router-link v-if="hasLimit" :to="'/EditLimit'">
    <button class="primary">edit limit</button>
  </router-link>

  <button v-if="hasLimit" v-on:click="deleteLimitFromStorage()">delete limit</button>

  <div class="message" v-if="message !== ''">
    {{message}}
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
    };
  },
  props: {
    websiteData: Object,
    hasLimit: Boolean,
    thisLimit: Object,
    limits: Array,
    tabInfo: Object,
  },

  methods: {
    deleteLimitFromStorage: function() {
      for (let i = 0; i < this.limits.length; i++) {
        if (this.tabInfo.domain === this.limits[i].domain) {
          this.limits.splice(i, 1);
          localStorage.setItem('limits', JSON.stringify(this.limits));
          this.message = 'limit deleted';
        }
      }

      setTimeout(function() {
        window.close();
      }, 1500);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
