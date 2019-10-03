<template>
  <header>
    <!--<svg class="logo" viewBox="0 0 972 376" fill="none" v-on:click="restart()">
      <path d="M185.7 136.9C132.3 136.9 97.2 169.9 97.2 219.7C97.2 269.8 132.3 302.8 185.7 302.8C239.1 302.8 274.5 269.8 274.5 219.7C274.5 169.9 239.1 136.9 185.7 136.9ZM185.7 180.1C206.7 180.1 220.8 196.3 220.8 220.3C220.8 244.6 206.7 260.8 185.7 260.8C165 260.8 150.9 244.6 150.9 220.3C150.9 196.3 165 180.1 185.7 180.1ZM410.309 136.6C386.609 136.6 368.009 146.5 356.609 165.1V78.4H303.209V301H356.609V220.9C356.609 199.6 368.609 184.6 388.409 184.3C405.509 184.3 416.009 195.7 416.009 214V301H469.409V198.7C469.409 160.6 446.009 136.6 410.309 136.6ZM721.922 136.6C695.522 136.6 675.722 148.9 665.222 172.9C657.122 150.1 637.622 136.6 611.222 136.6C587.822 136.6 569.522 146.5 558.422 165.4V138.7H505.322V301H558.422V220.9C558.422 199.6 570.422 184.6 589.322 184.3C605.822 184.3 616.022 195.4 616.022 214V301H669.422V220.9C669.422 199.6 681.122 184.6 700.022 184.3C716.522 184.3 726.722 195.4 726.722 214V301H780.122V198.7C780.122 160.6 757.022 136.6 721.922 136.6ZM902.004 316.9L971.604 138.7H918.504L884.004 244.3L845.304 138.7H790.404L857.604 297.1L853.704 304.6C849.504 312.7 843.204 316.9 834.204 316.9C826.404 316.9 820.104 314.2 812.604 307.9L790.404 344.8C805.104 356.2 820.104 361.6 838.404 361.6C869.004 361.6 889.704 347.2 902.004 316.9Z" fill="black"/>
      <path d="M36.6 152.4C21.6 152.4 11.1 162.9 11.1 178.2C11.1 193.5 21.6 204.3 36.6 204.3C51.6 204.3 62.4 193.5 62.4 178.2C62.4 162.9 51.6 152.4 36.6 152.4ZM36.6 241.5C21.6 241.5 11.1 252 11.1 267.3C11.1 282.6 21.6 293.4 36.6 293.4C51.6 293.4 62.4 282.6 62.4 267.3C62.4 252 51.6 241.5 36.6 241.5Z" fill="black"/>
    </svg>-->
    <svg class="logo" viewBox="0 0 993 366" fill="none" v-on:click="restart()">
      <path d="M386 126.6C362.3 126.6 343.7 136.5 332.3 155.1V68.4H278.9V291H332.3V210.9C332.3 189.6 344.3 174.6 364.1 174.3C381.2 174.3 391.7 185.7 391.7 204V291H445.1V188.7C445.1 150.6 421.7 126.6 386 126.6ZM742.584 126.6C716.184 126.6 696.384 138.9 685.884 162.9C677.784 140.1 658.284 126.6 631.884 126.6C608.484 126.6 590.184 136.5 579.084 155.4V128.7H525.984V291H579.084V210.9C579.084 189.6 591.084 174.6 609.984 174.3C626.484 174.3 636.684 185.4 636.684 204V291H690.084V210.9C690.084 189.6 701.784 174.6 720.684 174.3C737.184 174.3 747.384 185.4 747.384 204V291H800.784V188.7C800.784 150.6 777.684 126.6 742.584 126.6ZM922.666 306.9L992.266 128.7H939.166L904.666 234.3L865.966 128.7H811.066L878.266 287.1L874.366 294.6C870.166 302.7 863.866 306.9 854.866 306.9C847.066 306.9 840.766 304.2 833.266 297.9L811.066 334.8C825.766 346.2 840.766 351.6 859.066 351.6C889.666 351.6 910.366 337.2 922.666 306.9Z" fill="black"/>
      <circle class="mouth" cx="167.5" cy="209.5" r="61.5" stroke="black" stroke-width="44"/>
      <circle cx="28" cy="164" r="28" fill="black"/>
      <circle cx="28" cy="255" r="28" fill="black"/>
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

body.darkmode {

  .logo {
    path,
    circle {
      fill: $white;
    }
    .mouth {
      fill: none;
      stroke: $white;
    }
  }

  .menu a {
    color: $darkgrey;
    opacity: .5;

    &.router-link-active {
      color: $white;
      opacity: 1;
    }
  }
}
</style>
