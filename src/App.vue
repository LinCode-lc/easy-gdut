<template>
  <div id="app">
    <div class="mb-5">
      <Header></Header>
    </div>
    
        
    
      <el-col :xs="24" :sm="5">
        <el-row><el-col :span="20" :offset="2" ><LoginWelcome></LoginWelcome></el-col></el-row>
        <el-row><el-col :span="20" :offset="2"><SideBar></SideBar></el-col></el-row>
      </el-col>

      <router-view />
      

        
      
    
  
    

    
  </div>
</template>

<script>

import SideBar from "./components/common/SideBar";
import Header from "./components/common/Header";

import LoginWelcome from "./components/content/LoginWelcome"
// import Card from "./components/content/Card"
// import Card2 from "./components/content/Card2"
export default {
  name: "App",
  components: {
    // NavMenu,
    SideBar,
    Header,
    
    LoginWelcome,
    // Card,
    // Card2
  }
};
</script>

<style>

</style>
