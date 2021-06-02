<template>
  <div class="nine-square">
    <router-link
      :to="{ name: 'topic-detail', params: { id: cardMessage.postId } }"
    >
      <div class="scale">
        <div class="card-h">
          <div class="profile">
            <div class="profile-avatar">
              <div class="avatar">
                <img :src="cardMessage.user.userAvatar" alt="" />
              </div>
            </div>
            <div class="profile-message">
              <div class="username">{{ cardMessage.user.userName }}</div>
              <div class="create-time">{{ cardMessage.creatTime }}</div>
            </div>
          </div>
        </div>
        <p class="content">{{}}</p>
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
    </router-link>
  </div>
</template>

<script>
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
      images: [
        "https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=a587b23df11f3a295a9dddcaac159007/500fd9f9d72a60590cfef2f92934349b023bba62.jpg",
        "https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=a587b23df11f3a295a9dddcaac159007/500fd9f9d72a60590cfef2f92934349b023bba62.jpg",
        "https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=a587b23df11f3a295a9dddcaac159007/500fd9f9d72a60590cfef2f92934349b023bba62.jpg",
        "https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=a587b23df11f3a295a9dddcaac159007/500fd9f9d72a60590cfef2f92934349b023bba62.jpg",
        "https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=a587b23df11f3a295a9dddcaac159007/500fd9f9d72a60590cfef2f92934349b023bba62.jpg",
        "https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=a587b23df11f3a295a9dddcaac159007/500fd9f9d72a60590cfef2f92934349b023bba62.jpg"
      ],
      showCol: ""
    };
  },
  props: {
    cardMessage: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created() {
    this.showCol = this.countCol();
    console.log(this.showCol);
  },
  methods: {
    countCol() {
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
    }
  }
};
</script>

<style scoped>
.nine-square {
  width: 25rem /* 400/16 */;
  border-radius: 10px;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
  transition: all 0.3;
}

.nine-square:hover {
  transform: scale(1.07);
}
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
</style>
