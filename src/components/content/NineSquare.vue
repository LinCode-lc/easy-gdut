<template>
  <div class="nine-square" v-if="plateId">
    <div @click="showDrawer">
      <div class="card-h">
        <div class="profile">
          <div class="profile-avatar">
            <div class="avatar">
              <img
                v-if="cardMessage.user.userAvatar"
                :src="cardMessage.user.userAvatar"
                alt=""
              />
              <img
                v-else
                src="http://120.79.162.254:8070/gdut-c/resources/defalut_user_avatar.jpg"
                alt=""
              />
            </div>
          </div>
          <div class="profile-message">
            <div class="username">{{ cardMessage.user.userName }}</div>
            <div class="create-time">{{ cardMessage.creatTime }}</div>
          </div>
        </div>
      </div>
      <p class="markContent">{{ cardMessage.postContents }}</p>
      <div class="card-b">
        <div
          v-for="(item, index) in cardMessage.images"
          :key="index"
          :class="showCol"
        >
          <img :src="item.imageSrc" alt="" class="image" />
        </div>
      </div>
    </div>
    <div class="bottomIconBox">
      <div>
        <div class="bottomIcon black" v-if="isSupport" @click="handleSupport">
          <img src="@/assets/img/svg/clickLike.svg" alt="" />
        </div>
        <div class="bottomIcon " v-else @click="handleSupport">
          <img src="@/assets/img/svg/like.svg" alt="" />
        </div>
      </div>
      <div>
        <div
          class="bottomIcon black"
          v-if="isCollection"
          @click="handleCollection"
        >
          <img src="@/assets/img/svg/collectionClick.svg" alt="" />
        </div>
        <div class="bottomIcon" v-else @click="handleCollection">
          <img src="@/assets/img/svg/collection.svg" alt="" />
        </div>
      </div>
      <div>
        <div class="bottomIcon black" v-if="false">
          <img src="@/assets/img/svg/comment.svg" alt="" />
        </div>
        <div class="bottomIcon" v-else>
          <img src="@/assets/img/svg/comment.svg" alt="" />
        </div>
      </div>
    </div>
  </div>

  <div class="nine-square" v-else>
    <router-link
      :to="{ name: 'topic-detail', params: { id: cardMessage.postId } }"
    >
      <div class="card-h">
        <div class="profile">
          <div class="profile-avatar">
            <div class="avatar">
              <img
                v-if="cardMessage.user.userAvatar"
                :src="cardMessage.user.userAvatar"
                alt=""
              />
              <img
                v-else
                src="http://120.79.162.254:8070/gdut-c/resources/defalut_user_avatar.jpg"
                alt=""
              />
            </div>
          </div>
          <div class="profile-message">
            <div class="username">{{ cardMessage.user.userName }}</div>
            <div class="create-time">{{ cardMessage.creatTime }}</div>
          </div>
        </div>
      </div>
      <div class="topicTitle">{{ cardMessage.postTitle }}</div>
      <p class="markContent">{{ cardMessage.postContents }}</p>
      <div class="card-b">
        <div
          v-for="(item, index) in cardMessage.images"
          :key="index"
          :class="showCol"
        >
          <img :src="item.imageSrc" alt="" class="image" />
        </div>
      </div>
    </router-link>
    <div class="bottomIconBox">
      <div>
        <div class="bottomIcon black" v-if="isSupport" @click="handleSupport">
          <img src="@/assets/img/svg/clickLike.svg" alt="" />
        </div>
        <div class="bottomIcon " v-else @click="handleSupport">
          <img src="@/assets/img/svg/like.svg" alt="" />
        </div>
      </div>
      <div>
        <div
          class="bottomIcon black"
          v-if="isCollection"
          @click="handleCollection"
        >
          <img src="@/assets/img/svg/collectionClick.svg" alt="" />
        </div>
        <div class="bottomIcon" v-else @click="handleCollection">
          <img src="@/assets/img/svg/collection.svg" alt="" />
        </div>
      </div>
      <div>
        <div class="bottomIcon black" v-if="true">
          <img src="@/assets/img/svg/comment.svg" alt="" />
        </div>
        <div class="bottomIcon" v-else>
          <img src="@/assets/img/svg/comment.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getTopic,
  getCommentList,
  saveCollection,
  removeCollection,
  saveSupport,
  hasSupport,
  hasCollection,
  hasFollow,
  removeSupport,
  saveFollow,
  removeFollow
} from "@/network/detail.js";
import { mapGetters } from "vuex";
export default {
  name: "NineSquare",
  data() {
    return {
      avatar:
        "https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=a587b23df11f3a295a9dddcaac159007/500fd9f9d72a60590cfef2f92934349b023bba62.jpg",
      title: "",
      username: "艺画开天",
      createTime: "6分钟前",
      description:
        "的看法领导妇女四道口附近上空地方还是大家看法事件的看法和科技孵化和出面可能是的能力可能能吃苦的那颗城市快速路才能",
      images: [],
      showCol: "",
      //点赞
      isSupport: false,
      //收藏
      isCollection: false
    };
  },
  props: {
    cardMessage: {
      type: Object,
      default() {
        return {};
      }
    },
    plateId: {
      type: Number,
      default: 1
    }
  },
  created() {
    // console.log(this.cardMessage);
    this.showCol = this.countCol();
    //判断该用户是否已经对该帖子点过赞
    hasSupport(
      this.cardMessage.postId,
      this.$store.state.user.user.userId
    ).then(result => {
      // console.log(result);
      this.isSupport = result.data;
    });

    //判断是否收藏过这篇帖子
    hasCollection(
      this.cardMessage.postId,
      this.$store.state.user.user.userId
    ).then(result => {
      // console.log(result);
      this.isCollection = result.data;
    });
  },
  methods: {
    countCol() {
      if (this.cardMessage.images.length > 9) {
        // console.log(this.cardMessage.images.length);
        this.cardMessage.images = this.cardMessage.images.splice(
          // this.cardMessage.images.length - 9
          4,
          9
        );
        // console.log(this.cardMessage.images.length);
      }
      if (
        this.cardMessage.images.length == 3 ||
        this.cardMessage.images.length > 4
      ) {
        return "col3";
      } else if (this.cardMessage.images.length % 2 == 0) {
        return "col2";
      } else {
        return "col1";
      }
    },
    //控制点赞
    handleSupport() {
      this.isSupport = !this.isSupport;
      if (this.isSupport) {
        saveSupport(
          this.cardMessage.postId,
          1,
          this.cardMessage.user.userId,
          this.$store.state.user.user.userId
        ).then(response => {});
      } else {
        removeSupport(
          this.cardMessage.postId,
          1,
          this.cardMessage.user.userId,
          this.$store.state.user.user.userId
        ).then(response => {});
      }
    },
    //控制收藏
    handleCollection() {
      this.isCollection = !this.isCollection;
      if (this.isCollection) {
        saveCollection(
          this.cardMessage.postId,
          this.$store.state.user.user.userId
        ).then(response => {});
      } else {
        removeCollection(
          this.cardMessage.postId,
          this.$store.state.user.user.userId
        ).then(response => {});
      }
    },
    //向父组件告知被点击
    showDrawer() {
      this.$emit("childClick", 0);
    }
  },
  mounted() {
    this.$emit("childMounted", 0);
  }
};
</script>

<style scoped>
.nine-square {
  width: 100% /* 400/16 */;
  height: 100%;
  border-radius: 10px;
  /* overflow: hidden; */
  background-color: rgb(255, 255, 255);
  transition: all 0.3;
}

/* .nine-square:hover {
  transform: scale(1.07);
} */
.profile {
  height: 3.75rem /* 60/16 */;
  position: relative;
}
.profile-avatar {
  display: inline-block;
  position: absolute;
  left: 0.625rem /* 10/16 */;
  top: 0.625rem /* 10/16 */;
}

.avatar {
  width: 2.375rem /* 38/16 */;
  height: 2.375rem; /* 38/16 */
}
.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  /* margin: 13px 5px 10px 10px; */
}
.profile-message {
  display: inline-block;
  position: absolute;
  left: 3.4375rem /* 55/16 */;
  top: 0.375rem /* 6/16 */;
}
.username {
  font-size: 1.125rem /* 18/16 */;
  font-weight: 700;
  color: rgb(7, 7, 7);
}
.create-time {
  margin-top: 0.3125rem /* 5/16 */;
  font-size: 0.8125rem /* 13/16 */;
  color: rgb(130, 132, 146);
}
.content {
  margin: 0px;
  margin-bottom: 0.625rem /* 10/16 */;
  text-align: left;
  padding: 0rem /* 0/16 */ 0.9375rem /* 15/16 */;
  line-height: 1.5;
  color: rgb(7, 7, 7);
}
.card-b {
  /* display: flex;
  flex-wrap: wrap; */
  width: 25rem /* 400/16 */;
  text-align: center;
  margin-bottom: 0.9375rem; /* 15/16 */
  /* margin: 0 auto; */
  margin-left: 2rem;
}

.col1 {
  width: 20.625rem /* 330/16 */;
  height: 18.75rem /* 300/16 */;
  display: inline-block;
  text-align: center;
  margin: 0.1875rem; /* 3/16 */
  /* display: inline-block; */
  /* flex: auto; */
}
.col2 {
  width: 11.875rem /* 190/16 */;
  height: 11.875rem /* 190/16 */;
  /* flex: auto; */
  /* float: left; */
  display: inline-block;
  text-align: center;
  margin: 0.1875rem /* 3/16 */;
}
.col3 {
  width: 7.8125rem /* 125/16 */;
  height: 7.1875rem /* 115/16 */;
  /* flex: auto; */
  display: inline-block;
  text-align: center;
  margin: 0.1875rem /* 3/16 */;
}
.image {
  height: 100%;
  width: 100%;
  border: 1px solid rgba(13, 24, 24, 0.1);
  border-radius: 0.3125rem /* 5/16 */;
}
/* markDowm帖子的样式 */
.topicTitle {
  font-weight: 600;
  color: #333;
  padding: 0 /* 10/16 */ 2.625rem /* 10/16 */;
  margin: 0.625rem /* 10/16 */ 0;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.markContent {
  font-weight: 400;
  color: #333;
  padding: 0 /* 10/16 */ 0.625rem /* 10/16 */;
  margin: 0.625rem /* 10/16 */ 0;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
/* 卡片底部图标的样式 */
.bottomIconBox {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.bottomIcon {
  width: 2.25rem /* 20/16 */;
  height: 2.25rem /* 20/16 */;

  /* flex: 1; */
  margin: 0.625rem 1rem;
}
.black {
  opacity: 0.7;
  width: 1.8rem;
  height: 1.8rem;
}
</style>
