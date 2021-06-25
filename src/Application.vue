<template>
  <div id="application">
    <div class="side">
      <SideBar></SideBar>
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
import SideBar from "./components/common/SideBar";
import Header from "./components/common/Header";

import LoginWelcome from "./components/content/LoginWelcome";
export default {
  name: "Application",
  components: {
    // NavMenu,
    SideBar,
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
