<template>
  <div id="side-bar">
        <el-row class="tac">
      <el-col :span="12">
      
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-notebook-2"></i>
              <span>学习资料</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-bicycle"></i>
            <span slot="title">跑腿服务</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">校园组队</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-suitcase-1"></i>
            <span slot="title">闲置交易</span>
          </el-menu-item>
        </el-menu>
      </el-col>
  
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  methods: {
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
    width: 200px;
    min-height: 400px;
  }
</style>