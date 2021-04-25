<template>
  <div class="card3">
    <a-card hoverable style="width: 365px;font-size:17px">
      <img
        slot="cover"
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
      <template slot="actions" class="ant-card-actions" style="width:400px">
        <a-icon
          key="collect"
          @click="
            starsuccess();
            star();
          "
          v-if="isstar"
          type="star"
        />
        <a-icon
          key="collect"
          @click="
            starsuccess();
            star();
          "
          v-if="!isstar"
          type="star"
          theme="filled"
        />
        <a-icon key="comment" type="message" theme="filled" />
        <a-icon
          key="like"
          @click="
            likesuccess();
            like();
          "
          v-if="islike"
          type="like"
        />
        <a-icon
          key="like"
          @click="
            likesuccess();
            like();
          "
          v-if="!islike"
          type="like"
          theme="filled"
        />
      </template>
      <a-card-meta
        title="创意画笔"
        description=" Luxury is not in the name, we use quality to prove"
      >
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </a-card-meta>
    </a-card>
  </div>
</template>


<script>
export default {
  name: "card3",
  data() {
    return {
      currentDate: new Date(),
      islike: true,
      isstar: true
    };
  },
  methods: {
    like() {
      this.islike = !this.islike;
    },

    star() {
      this.isstar = !this.isstar;
    },

    likesuccess() {
      if (this.islike) {
        this.$message.success("点赞成功", 1);
      } else {
        this.$message.success("已取消点赞", 1);
      }
    },

    starsuccess() {
      if (this.isstar) {
        this.$message.success("收藏成功", 1);
      } else {
        this.$message.success("已取消收藏", 1);
      }
    }
  }
};
</script>
