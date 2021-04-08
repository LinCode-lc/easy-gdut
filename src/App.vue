<template>
  <div id="app">
    <div class="mb-5">
      <Header></Header>
    </div>
    
        
    
      <el-col  :sm="7" class="side" >
        <!-- <el-row><el-col :span="20" :offset="2" ><LoginWelcome></LoginWelcome></el-col></el-row> -->
       <el-col :span="20" :offset="1" ><SideBar2></SideBar2></el-col>
      </el-col>
     
 
      
    
      <el-col :sm="{span:16}"  style="margin-left:300px" >  
      <router-view />
      </el-col>
   
      

    
  </div>
</template>

<script>

import SideBar2 from "./components/common/SideBar2";
import Header from "./components/common/Header";

import LoginWelcome from "./components/content/LoginWelcome"
// import Card from "./components/content/Card"
// import Card2 from "./components/content/Card2"
export default {
  name: "App",
  components: {
    // NavMenu,
    SideBar2,
    Header,
    
    LoginWelcome,
    // Card,
    // Card2
  }
};
</script>

<style>

.side{
  position: fixed;
  
  
  top: 50px;

}



</style>
