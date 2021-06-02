<template>
  <div id="applica">
    <div class="side">
      <SideBar2></SideBar2>
    </div>

    <el-col class="margin-l" :span="20">
      <!-- <Search class="searchbar"></Search> -->
      <router-view class="view" :span="24"></router-view>
    </el-col>
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
  left: 1.125rem /* 18/16 */;
  top: 0px;
  margin-left: 1.875rem /* 30/16 */;
  padding-top: 0px;
  width: 15.6875rem /* 251/16 */;
  background-color: rgb(241, 246, 250);
  height: 100%;
}
.margin-l {
  margin-left: 18.75rem /* 300/16 */;
}
/* #app {
  display: flex;
  flex-direction: column;
} */
</style>
