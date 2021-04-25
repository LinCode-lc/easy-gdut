<template>
  <div id="side-bar">
    <el-col :span="7">
      <!-- <el-row>
        <el-col :span="10"
          ><img src=".././content/1.jpg" alt="" class="avatar" /> </el-col
      ></el-row> -->
      <div v-if="isCollapse" class="user-profile-collapse">
        <a href="../.././views/user/Profile.vue">
          <router-link :to="{ path: '/profile' }">
            <div class="user-avatar">
              <img :src="user.userAvatar" alt="" v-if="token" />
              <img :src="nocircleUrl" alt="" v-else />
            </div>
          </router-link>
        </a>
      </div>
      <div class="user-profile" v-else>
        <router-link :to="{ path: '/profile' }">
          <div class="user-avatar" v-if="token">
            <img :src="user.userAvatar" alt="" />
          </div>
          <div class="user-avatar" v-else>
            <img :src="nocircleUrl" alt="" />
          </div>
        </router-link>
        <div v-if="token">
          <div class="user-name">
            <div>{{ user.userName }}</div>
          </div>
          <div class="user-profile-header-info">
            <ul>
              <li>
                <div class="user-profile-statistics-num" data-v-d1dbb6f8="">
                  0
                </div>
                <div class="user-profile-statistics-name" data-v-d1dbb6f8="">
                  动态
                </div>
              </li>
              <li>
                <div class="user-profile-statistics-num" data-v-d1dbb6f8="">
                  0
                </div>
                <div class="user-profile-statistics-name" data-v-d1dbb6f8="">
                  关注
                </div>
              </li>
              <li>
                <div class="user-profile-statistics-num" data-v-d1dbb6f8="">
                  12
                </div>
                <div class="user-profile-statistics-name" data-v-d1dbb6f8="">
                  粉丝
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <div class="user-profile-header-info2">
            <ul>
              <li>
                <div class="user-profile-statistics-name">
                  <b-button
                    class="is-light"
                    tag="router-link"
                    :to="{ path: '/register' }"
                  >
                    注册
                  </b-button>
                </div>
              </li>
              <li>
                <div class="user-profile-statistics-name">
                  <b-button
                    class="is-light"
                    tag="router-link"
                    :to="{ path: '/login' }"
                  >
                    登录
                  </b-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <el-submenu index="1">
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
        <el-menu-item index="/deliver">
          <i class="el-icon-bicycle" style="font-size:200%;"></i>
          <span slot="title" class="item">跑腿服务</span>
        </el-menu-item>
        <el-menu-item index="/group">
          <i class="el-icon-s-promotion" style="font-size:200%;"></i>
          <span slot="title" class="item">校园组队</span>
        </el-menu-item>
        <el-menu-item index="/trade">
          <i class="el-icon-suitcase-1" style="font-size:200%;"></i>
          <span slot="title" class="item">闲置交易</span>
        </el-menu-item>
      </el-menu>
      <el-radio-group v-model="isCollapse" class="collapsse">
        <el-button :label="false" @click="changeCollapse" class="openbutton">
          <div v-if="isCollapse" class="el-icon-arrow-right"></div>
          <div v-else class="el-icon-arrow-left"></div>
        </el-button>
      </el-radio-group>
    </el-col>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SideBar2",
  data() {
    return {
      // user: {},
      isCollapse: false,
      circleUrl:
        "https://upload.jianshu.io/users/upload_avatars/16442330/5636fb80-f1ab-4dff-a2b5-0b6e0e31a125.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240",
      nocircleUrl:
        "https://gss0.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/w=580/sign=98575ac840ed2e73fce98624b700a16d/7d82b112495409237379d6329858d109b3de491b.jpg",
      hadlogin: false
    };
  },
  computed: {
    ...mapGetters(["token", "user"])
  },
  created() {
    // console.log(this.$store.state.user.token);
    // // console.log(this.$store.state.user.user);
    // // console.log(this.$store.state.user.user.userName);
    // console.log(Boolean(this.$store.state.user.token));
    // if (this.$store.state.user.token) {
    //   this.hadlogin = true;
    // } else {
    //   this.hadlogin = false;
    // }
    // console.log(this.hadlogin);
    // // console.log(this.$store.state.user);
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
.item {
  margin-left: 8px;
  font-size: 16px;
}
#side-bar {
  /* background-color: #f6f6f6; */
}

.openbutton {
  margin-left: 25px;
  border: none;
  font-size: 25px;
}
.user-profile {
  position: relative;
  width: 250px;
  height: 180px;
  /* background-color: burlywood; */
  border-right: 1px solid rgb(230, 230, 230);
}
.user-profile-collapse {
  position: relative;
  width: 50px;
  height: 30px;
  bottom: 35px;
  left: 10px;
  /* background-color: burlywood; */
  border-right: 1px solid rgb(230, 230, 230);
}
.user-avatar {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.user-avatar img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}

.user-name {
  position: absolute;
  left: 50%;
  color: #222226;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: 500;
  margin-top: 65px;
}
.user-profile-header-info {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100px;
  text-align: center;
}
.user-profile-header-info2 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 80px;
  text-align: center;
}
.user-profile-header-info2 ul {
  margin: 0px;
  padding: 0px;
  display: flex;
  height: 36px;
}

.user-profile-header-info2 ul li {
  list-style: none;
  color: #222226;
  margin-left: 10px;
  padding: 3px;
  flex: 1;
  font-size: 21px;
  font-weight: 500;
  height: 36px;
  line-height: 36px;
  /* border: 1px solid rgb(230, 230, 230); */
}
.user-profile-header-info ul {
  display: flex;
}

.user-profile-header-info ul li {
  list-style: none;
  float: left;
  height: 50px;
  width: 50px;
  margin: 5px 10px;
}
</style>