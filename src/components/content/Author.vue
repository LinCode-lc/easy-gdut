<template>
  <section id="author">
    <el-card class="" shadow="never">
      <el-row>
        <el-col :span="5">
          <!-- <el-avatar
            style="border:1px solid blanchedalmond"
            shape="circle"
            :size="45"
            src="./1.jpg"
          ></el-avatar> -->
          <img src="./1.jpg" alt="" class="avatar" />
        </el-col>
        <el-col :span="19">
          <el-row style="margin-left:10px;">
            <router-link :to="{ path: `/member/${user.username}/home` }">
              <span style="color:black; font-size:18px">{{
                user.userName
              }}</span>
            </router-link>
          </el-row>
          <el-row style="font-size:12px" class="user-button">
            <button
              v-if="hasFollow"
              @click="handleUnFollow(user.userId)"
              class="el-icon-star-on"
            >
              已关注
            </button>
            <button
              v-else
              @click="handleFollow(user.userId)"
              class="el-icon-star-off"
            >
              关注
            </button>

            <button class="el-icon-message">私信</button>
            <button class="el-icon-chat-round">提问</button>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="has-text-centered">
        <el-col :span="6"
          ><span class="spanText">文章</span>
          <h2 class="span-num">7</h2></el-col
        >
        <el-col :span="6"
          ><span class="spanText">经验</span>
          <h2 class="span-num">216</h2></el-col
        >
        <el-col :span="6"
          ><span class="spanText">粉丝</span>
          <h2 class="span-num">
            {{ user.fansCount === null ? 0 : user.fansCount }}
          </h2></el-col
        >
        <el-col :span="6"
          ><span class="spanText">关注</span>
          <h2 class="span-num">
            {{ user.focusCount === null ? 0 : user.focusCount }}
          </h2></el-col
        >
      </el-row>
    </el-card>
  </section>
</template>

<script>
import { follow, hasFollow, unFollow } from "@/network/follow";
import { mapGetters } from "vuex";
export default {
  name: "Author",
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      hasFollow: false
    };
  },
  mounted() {
    this.fetchInfo();
  },
  computed: {
    ...mapGetters(["token"])
  },
  methods: {
    fetchInfo() {
      if (this.token != null && this.token !== "") {
        hasFollow(this.user.id).then(value => {
          const { data } = value;
          this.hasFollow = data.hasFollow;
        });
      }
    },
    handleFollow: function(id) {
      if (this.token != null && this.token !== "") {
        follow(id).then(response => {
          const { message } = response;
          this.$message.success(message);
          this.hasFollow = !this.hasFollow;
          this.user.followerCount = parseInt(this.user.followerCount) + 1;
        });
      } else {
        this.$message.success("请先登录");
      }
    },
    handleUnFollow: function(id) {
      unFollow(id).then(response => {
        const { message } = response;
        this.$message.success(message);
        this.hasFollow = !this.hasFollow;
        this.user.followerCount = parseInt(this.user.followerCount) - 1;
      });
    }
  }
};
</script>

<style scoped>
.user-button button {
  background-color: #fff;
  border-radius: 4px;
  font-size: 10px;
  padding: 3px 3px;
  margin: 0 3px;
  border: none;
  outline: none;
}
.avatar {
  border-radius: 50%;
  border: 1px solid #fff;
}
.has-text-centered {
  margin-top: 10px;
}
.spanText {
  font-size: 14px;
}
.span-num {
  font-size: 16px;
  margin-top: 10px;
}
</style>
