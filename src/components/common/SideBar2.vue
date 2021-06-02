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

          <el-menu-item index="/study/catagory">
            <i class="el-icon-document" style="font-size:200%;"></i>
            <span slot="title" class="item">资料目录</span>
          </el-menu-item>

          <el-menu-item index="/study/upload">
            <i class="el-icon-sort" style="font-size:200%;"></i>
            <span slot="title" class="item">上传资料</span>
          </el-menu-item>
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
  width: 342%;
  min-height: 31.25rem /* 500/16 */;
  background: linear-gradient(
    to right,
    rgb(216, 214, 217),
    rgba(224, 228, 230, 0.5)
  );
  /* background-color: rgb(241, 246, 100) !important; */
}
.el-menu-vertical-demo {
  background: linear-gradient(
    to right,
    rgb(216, 214, 217),
    rgba(224, 228, 230, 0.5)
  );
  /* background-color: rgb(220, 221, 220) !important; */
  height: 62.5rem /* 1000/16 */;
}

.side-background {
  background: linear-gradient(
    to right,
    rgb(216, 214, 217),
    rgba(224, 228, 230, 0.5)
  );
}
.collapsse {
  position: fixed;
  left: 0;
  bottom: 3.125rem /* 50/16 */;
}
.item {
  margin-left: 0.5rem /* 8/16 */;
  font-size: 1rem /* 16/16 */;
}
#side-bar {
  /* background-color: #f6f6f6; */
}
.el-menu--collapse {
  width: 5.5rem /* 88/16 */;
  text-align: center;
}
.el-menu-item {
  height: 3.875rem /* 62/16 */;
  background: linear-gradient(
    to right,
    rgb(216, 214, 217),
    rgba(224, 228, 230, 0.5)
  );
}
.el-menu-item.is-active {
  color: #333;
  font-weight: 600;
}

.openbutton {
  margin-left: 3.3125rem /* 53/16 */;
  border: none;
  font-size: 1.5625rem /* 25/16 */;
  background: linear-gradient(
    to right,
    rgb(216, 214, 217),
    rgba(224, 228, 230, 0.5)
  );
  color: black;
}
.user-profile {
  position: relative;
  width: 15.75rem /* 252/16 */;
  height: 11.25rem /* 180/16 */;
  background: linear-gradient(
    to right,
    rgb(216, 214, 217),
    rgba(224, 228, 230, 0.5)
  );
  padding-top: 1.25rem /* 20/16 */;
}
.user-profile-collapse {
  position: relative;
  width: 5.5rem /* 88/16 */;
  height: 5rem /* 80/16 */;
  padding-top: 1.25rem /* 20/16 */;
  background: linear-gradient(
    to right,
    rgb(216, 214, 217),
    rgba(224, 228, 230, 0.5)
  );

  border-right: 1px solid rgb(230, 230, 230);
}
.user-avatar {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 3.75rem /* 60/16 */;
  height: 3.75rem /* 60/16 */;
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
  font-size: 1.25rem /* 20/16 */;
  font-weight: 500;
  margin-top: 4.0625rem; /* 65/16 */
}
.user-profile-header-info {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 6.25rem /* 100/16 */;
  text-align: center;
  margin-top: 0.75rem; /* 12/16 */
}
.user-profile-header-info2 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 5rem /* 80/16 */;
  text-align: center;
}
.user-profile-header-info2 ul {
  margin: 0px;
  padding: 0px;
  display: flex;
  height: 2.25rem; /* 36/16 */
}

.user-profile-header-info2 ul li {
  list-style: none;
  color: #222226;
  margin-left: 0.625rem /* 10/16 */;
  padding: 0.1875rem /* 3/16 */;
  flex: 1;
  font-size: 1.3125rem /* 21/16 */;
  font-weight: 500;
  height: 2.25rem /* 36/16 */;
  line-height: 2.25rem; /* 36/16 */
  /* border: 1px solid rgb(230, 230, 230); */
}
.user-profile-header-info ul {
  display: flex;
}

.user-profile-header-info ul li {
  list-style: none;
  float: left;
  height: 3.125rem /* 50/16 */;
  width: 3.125rem /* 50/16 */;
  margin: 0.3125rem /* 5/16 */ 0.625rem /* 10/16 */;
}
.el-submenu .el-menu-item {
  min-width: 8.8125rem /* 141/16 */;
}
element.style {
  padding-left: 1.6875rem /* 27/16 */;
}
</style>