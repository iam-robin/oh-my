<template>
  <header>
    <svg class="logo" viewBox="0 0 50 50" fill="none" v-on:click="restart()">
      <rect x="1.5" y="1.5" width="47" height="47" stroke="#333333" stroke-width="3"/>
      <rect x="1.5" y="1.5" width="17" height="47" stroke="#333333" stroke-width="3"/>
      <rect x="-1.5" y="1.5" width="17" height="18" transform="matrix(-1 0 0 1 17 0)" fill="#FECE60" stroke="#333333" stroke-width="3"/>
      <rect x="-1.5" y="1.5" width="30" height="17" transform="matrix(-1 0 0 1 47 30)" fill="#E6E9EE" stroke="#333333" stroke-width="3"/>
    </svg>
    <div class="menu">
      <router-link :class="state" v-for="(link, index) in links" :key="index" :to="link.to">
        {{ link.name }}
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
  props: {
    links: Array,
    state: String,
  },

  methods: {
    restart: function() {},
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:500');
@import '../scss/_colors.scss';

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 80px;
  height: 120px;
  box-sizing: border-box;
  border-bottom: 3px solid $black;

  .logo {
    width: 40px;
    height: 40px;
  }

  .menu {
    display: flex;
    margin-right: -20px;

    a {
      display: flex;
      font-family: 'Montserrat', sans-serif;
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: $darkgrey;
      text-decoration: none;
      padding: 20px;

      &:hover {
        color: darken($darkgrey, 10%);
      }

      &.router-link-active {
        color: $black;

        &:hover {
          color: $black;
        }
      }

      &.close {
        color: $black;

        &:after {
          content: '';
          display: inline-block;
          height: 16px;
          width: 16px;
          background-image: url('@~/icons/X.svg');
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
