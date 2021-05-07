<template>
  <div class="nine-square">
    <div class="scale">
      <div class="card-h">
        <div class="profile">
          <div class="profile-avatar">
            <div class="avatar"><img :src="avatar" alt="" /></div>
          </div>
          <div class="profile-message">
            <div class="username">{{ username }}</div>
            <div class="create-time">{{ createTime }}</div>
          </div>
        </div>
      </div>
      <p class="content">{{ description }}</p>
      <div class="card-b">
        <div v-for="(item, index) in images" :key="index" :class="showCol">
          <img :src="item" alt="" class="image" />
        </div>
      </div>
    </div>
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
      if (this.images.length == 3 || this.images.length > 4) {
        return "col3";
      } else if (this.images.length % 2 == 0) {
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
  width: 400px;
  border-radius: 5px;
  overflow: hidden;
  background-color: rgb(40, 40, 40);
  transition: all 0.3;
}

.nine-square:hover {
  transform: scale(1.07);
}
.profile {
  height: 60px;
  position: relative;
}
.profile-avatar {
  display: inline-block;
  position: absolute;
  left: 10px;
  top: 10px;
}

.avatar {
  width: 38px;
  height: 38px;
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
  left: 55px;
  top: 6px;
}
.username {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
}
.create-time {
  margin-top: 5px;
  font-size: 13px;
  color: rgb(130, 132, 146);
}
.content {
  margin: 0px;
  margin-bottom: 10px;
  text-align: left;
  padding: 0px 15px;
  color: #fff;
}
.card-b {
  /* display: flex;
  flex-wrap: wrap; */
  width: 400px;
  margin-bottom: 15px;
  /* margin: 0 auto; */
}

.col1 {
  width: 330px;
  height: 300px;
  display: inline-block;
  text-align: center;
  margin: 3px;
  /* display: inline-block; */
  /* flex: auto; */
}
.col2 {
  width: 190px;
  height: 190px;
  /* flex: auto; */
  /* float: left; */
  display: inline-block;
  text-align: center;
  margin: 3px;
}
.col3 {
  width: 125px;
  height: 115px;
  /* flex: auto; */
  display: inline-block;
  text-align: center;
  margin: 3px;
}
.image {
  height: 100%;
  width: 100%;
  border: 1px solid rgb(40, 40, 40);
  border-radius: 5px;
}
</style>
