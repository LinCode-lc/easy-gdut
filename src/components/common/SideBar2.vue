<template>
  <div id="side-bar" >
    
    
    <el-col :span="7"  >
     <el-row> <el-col :span="10" ><img src=".././content/1.jpg" alt="" class="avatar" > </el-col></el-row>


      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        
        <el-submenu index="1" >
          <template slot="title">
            <i class="el-icon-notebook-2" style="font-size:200%;"></i>
            <span class="item">学习资料</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/study/upload">
              <i class="el-icon-sort" style="font-size:200%;"></i>
              <span slot="title" class="item">上传资料</span>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/study/catagory">
              <i class="el-icon-document" style="font-size:200%;"></i>
              <span slot="title" class="item">资料目录</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/deliver" >
          <i class="el-icon-bicycle" style="font-size:200%;"></i>
          <span slot="title" class="item">跑腿服务</span>
        </el-menu-item>
        <el-menu-item index="/group" >
          <i class="el-icon-s-promotion" style="font-size:200%;"></i>
          <span slot="title" class="item">校园组队</span>
        </el-menu-item>
        <el-menu-item index="/trade" >
          <i class="el-icon-suitcase-1" style="font-size:200%;"></i>
          <span slot="title" class="item">闲置交易</span>
        </el-menu-item>
      </el-menu>
      <el-radio-group v-model="isCollapse" class="collapsse">
        <el-button :label="false" @click="changeCollapse">
          <div v-if="isCollapse" class="el-icon-arrow-right"></div>
          <div v-else class="el-icon-arrow-left"></div>
        </el-button>
      </el-radio-group>
    </el-col>
    
  </div>
</template>

<script>
export default {
  name: "SideBar2",
  data() {
    return {
      isCollapse: false,
      circleUrl:
        ".././content/1.jpg"
    };
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 650px;
  /* background-color: #f6f6f6; */
}
.collapsse {
  position: fixed;
  left: 0;
  bottom: 50px;
}
.item{
    margin-left: 8px;
    font-size: 16px;
    
}
#side-bar{
  /* background-color: #f6f6f6; */
}
.avatar{
  border-radius: 50%;
  border:1px solid #f6f6f6;
  margin:20px 0 20px 5px;
}

</style>