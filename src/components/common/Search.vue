<template>
  <div class="searchout">
    <div class="searchItem">
      <b-navbar-item tag="div">
        <b-input
          v-model="searchKey"
          class="s_input"
          width="80%"
          placeholder="搜索帖子、标签和用户"
          rounded
          clearable
          @keyup.enter.native="search()"
        />

        <!-- <p class="control">
          <b-button class="is-info" @click="search()">检索 </b-button>
        </p> -->
        <b-switch v-model="darkMode" passive-type="is-warning" type="is-dark">
          {{ darkMode ? "夜" : "日" }}
        </b-switch>

        <b-navbar-dropdown>
          <b-navbar-item
            tag="router-link"
            :to="{ path: `/member/${user.username}/home` }"
          >
            🧘 个人中心
          </b-navbar-item>
          <hr class="dropdown-divider" />
          <b-navbar-item
            tag="router-link"
            :to="{ path: `/member/${user.username}/setting` }"
          >
            ⚙ 设置中心
          </b-navbar-item>
          <hr class="dropdown-divider" />
          <b-navbar-item tag="a" @click="logout"> 👋 退出登录 </b-navbar-item>
          <hr class="dropdown-divider" />
          <b-navbar-item
            type="is-danger"
            tag="router-link"
            :to="{ path: '/post/create' }"
            outlined
            >✍ Markdown发表</b-navbar-item
          >
          <b-navbar-item
            type="is-danger"
            tag="router-link"
            :to="{ path: '/post/createtopic' }"
            outlined
            >✍ 普通发表</b-navbar-item
          >
        </b-navbar-dropdown>
      </b-navbar-item>
    </div>
  </div>
</template>

<script>
import {
  disable as disableDarkMode,
  enable as enableDarkMode
} from "darkreader";
import { getDarkMode, setDarkMode } from "@/utils/auth";
import { mapGetters } from "vuex";

export default {
  name: "Search",
  data() {
    return {
      logoUrl: require("@/assets/logo.png"),
      doubaoImg: require("@/assets/img/doubao.png"),
      searchKey: "",
      darkMode: false
    };
  },
  computed: {
    ...mapGetters(["token", "user"])
    // token:"5555",
    // user:"5656"
    // ...mapGetters({
    //   'token': 'token',
    //   'user': 'user',

    // })
  },
  watch: {
    // 监听Theme模式
    darkMode(val) {
      if (val) {
        enableDarkMode({});
      } else {
        disableDarkMode();
      }
      setDarkMode(this.darkMode);
    }
  },
  created() {
    // 获取cookie中的夜间还是白天模式
    this.darkMode = getDarkMode();

    if (this.darkMode) {
      enableDarkMode({});
    } else {
      disableDarkMode();
    }
  },
  methods: {
    async logout() {
      this.$store.dispatch("user/logout").then(() => {
        this.$message.info("退出登录成功");
        // location.reload();
        setTimeout(() => {
          this.$router.push({ path: this.redirect || "/" });
        }, 500);
      });
    },
    search() {
      console.log(this.token);
      if (this.searchKey.trim() === null || this.searchKey.trim() === "") {
        this.$message.info({
          showClose: true,
          message: "请输入关键字搜索！",
          type: "warning"
        });
        return false;
      }
      this.$router.push({ path: "/search?key=" + this.searchKey });
    }
  }
};
</script>

<style scoped>
input {
  width: 80%;
  height: 86%;
}
/* .searchout {
  position: fixed;
} */
/* .searchItem {
  position: absolute;
  left: 13px;
  top: 60px;
} */
.s_input {
  margin-right: 10px;
}
.switch input[type="checkbox"] + .check.is-warning-passive,
.switch input[type="checkbox"] + .check:hover {
  background: var(--subjectColor) !important;
}
</style>