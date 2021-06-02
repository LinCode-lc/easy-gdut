<template>
  <div id="side-bar">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          router
          :default-active="$route.path"
          class="el-menu-vertical-demo side-background"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-notebook-2"></i>
              <span>学习资</span>
            </template>
            <el-menu-item-group>
              <!-- <template slot="title">分组一</template> -->
              <el-menu-item index="/study/upload">
                <i class="el-icon-sort"></i>
                <span slot="title">上传资料</span>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <!-- <template slot="title">分组一</template> -->
              <el-menu-item index="/study/catagory">
                <i class="el-icon-document"></i>
                <span slot="title">资料目录</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/deliver">
            <i class="el-icon-bicycle"></i>
            <span slot="title">跑腿服务</span>
          </el-menu-item>
          <el-menu-item index="/group">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">校园组队</span>
          </el-menu-item>
          <el-menu-item index="/trade">
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
/* #side-bar {
  background-color: rgb(221, 220, 221);
} */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  min-height: 400px;
  background-color: rgb(220, 221, 220) !important;
}
.side-background {
  background-color: rgb(220, 221, 220) !important;
}
</style>