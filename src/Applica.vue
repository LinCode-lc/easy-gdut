<template>
  <div id="applica">
    <div class="side">
      <SideBar2></SideBar2>
    </div>

    <div class="margin-l">
      <!-- <Search class="searchbar"></Search> -->
      <keep-alive>
        <router-view
          class="view"
          :span="24"
          v-if="$route.meta.keepAlive"
        ></router-view>
      </keep-alive>
      <router-view
        class="view"
        :span="24"
        v-if="!$route.meta.keepAlive"
      ></router-view>
    </div>
  </div>
</template>

<script>
import SideBar2 from "./components/common/SideBar2";
import Header from "./components/common/Header";

import LoginWelcome from "./components/content/LoginWelcome";
// import Card from "./components/content/Card"
// import Card2 from "./components/content/Card2"
export default {
  name: "Applica",
  components: {
    // NavMenu,
    SideBar2,
    Header,

    LoginWelcome
    // Card,
    // Card2
  }
};
</script>

<style>
.side {
  position: fixed;
  width: 18.75rem /* 300/16 */;
  background-color: var(--themeColor);
}
.margin-l {
  margin-left: 14.75rem /* 300/16 */;
}
/* #app {
  display: flex;
  flex-direction: column;
} */
</style>
