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
          <img :src="user.userAvatar" alt="" class="avatar" />
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
              v-if="isFollow"
              @click="handleFollow()"
              class="el-icon-star-on"
            >
              已关注
            </button>
            <button v-else @click="handleFollow()" class="el-icon-star-off">
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
// import { follow, hasFollow, unFollow } from "@/network/follow";
import { mapGetters } from "vuex";
export default {
  name: "Author",
  props: {
    user: {
      type: Object,
      default: null
    },
    isFollow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hasFollow: false
    };
  },

  computed: {
    ...mapGetters(["token"])
  },
  methods: {
    handleFollow() {
      this.$emit("handleFollow", 0);
    }
  }
};
</script>

<style scoped>
.user-button button {
  background-color: #fff;
  border-radius: 0.25rem /* 4/16 */;
  font-size: 0.625rem /* 10/16 */;
  padding: 0.1875rem /* 3/16 */ 0.1875rem /* 3/16 */;
  margin: 0 0.1875rem /* 3/16 */;
  border: none;
  outline: none;
}
.avatar {
  border-radius: 50%;
  border: 1px solid #fff;
}
.has-text-centered {
  margin-top: 0.625rem /* 10/16 */;
}
.spanText {
  font-size: 0.875rem /* 14/16 */;
}
.span-num {
  font-size: 1rem /* 16/16 */;
  margin-top: 0.625rem /* 10/16 */;
}
</style>
