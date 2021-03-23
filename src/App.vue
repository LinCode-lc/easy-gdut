<template>
  <div id="app">
    <div class="mb-5">
      <Header></Header>
    </div>
    
        
    <!-- </div> -->
    <!-- <el-col :span="5">
       
    </el-col> -->
      <el-col :xs="24" :sm="5"><LoginWelcome></LoginWelcome><SideBar></SideBar></el-col>

      <el-col :xs="24" :sm="19">
        <!-- <el-card><div class="topicc" ><Topic></Topic></div></el-card>
        <el-card><div class="topicc" ><Topic></Topic></div></el-card>
        <el-card><div class="topicc" ><Topic></Topic></div></el-card>
        <el-card><div class="topicc" ><Topic></Topic></div></el-card> -->
      
        <!-- <el-row ><Topic></Topic></el-row> -->
        <el-col :xs="24" :sm="6">
          <Card></Card>
        </el-col>

        <el-col :xs="24" :sm="6">
          <Card></Card>
        </el-col>
        <el-col :xs="24" :sm="6">
          <Card></Card>
        </el-col>
        <el-col :xs="24" :sm="6">
          <Card></Card>
        </el-col>

        <!-- <el-col :xs="24" :sm="6">
          <Card></Card>
        </el-col> -->
        
        
        
      </el-col>

     
        <!-- <div>
          <Topic></Topic>
        </div> -->
        <!-- <div>
          <Topic></Topic>
        </div>
        <div>
          <Topic></Topic>
        </div>
        <div>
          <Topic></Topic>
        </div>
        <div>
          <Topic></Topic>
        </div>
        <div>
          <Topic></Topic>
        </div>
        <div>
          <Topic></Topic>
        </div>
        <div>
          <Topic></Topic>
        </div>
        <div>
          <Topic></Topic>
        </div>
        <div>
          <Topic></Topic>
        </div> -->
      
    
  
    

    <router-view />
  </div>
</template>

<script>
// import NavMenu from "./components/common/NavMenu"
import SideBar from "./components/common/SideBar";
import Header from "./components/common/Header";
// import Topic from "./components/content/Topic";
import LoginWelcome from "./components/content/LoginWelcome"
import Card from "./components/content/Card"
export default {
  name: "App",
  components: {
    // NavMenu,
    SideBar,
    Header,
    
    LoginWelcome,
    Card
  }
};
</script>

<style>

</style>
