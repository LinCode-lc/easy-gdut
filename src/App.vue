<template class="hhhh">
  <div id="app">
    <!-- <el-col class="side" :span="3">
      <SideBar2></SideBar2>
    </el-col>

    <el-col style="margin-left:300px" :span="20">
      <Search class="searchbar"></Search>
      <router-view class="view" :span="24"></router-view>
    </el-col> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import SideBar2 from "./components/common/SideBar2";
// import Header from "./components/common/Header";
// import Search from "./components/common/Search";
// import LoginWelcome from "./components/content/LoginWelcome";
// import Card from "./components/content/Card"
// import Card2 from "./components/content/Card2"
export default {
  name: "App"
  // components: {
  //   // NavMenu,
  //   SideBar2,
  //   Header,
  //   Search,

  //   LoginWelcome
  //   // Card,
  //   // Card2
  // }
};
</script>

<style>
</style>
