<template>
  <div id="commend-bar">
    <el-col class="rightbar">
      <div @click="clickItem(1)">
        <span class="icon iconfont">&#xe629;</span>
        <span class="text">评论</span>
      </div>
      <div class="">
        <div v-if="isCollection" @click="clickItem(2)">
          <span class="icon iconfont">&#xe62a;</span>
          <span class="text">收藏</span>
        </div>
        <div v-else @click="clickItem(2)">
          <span class="icon iconfont">&#xe606;</span>
          <span class="text">收藏</span>
        </div>
      </div>
      <div>
        <div v-if="isSupport" @click="clickItem(3)">
          <span class="icon iconfont">&#xeb54;</span>
          <span class="text">点赞</span>
        </div>
        <div v-else @click="clickItem(3)">
          <span class="icon iconfont">&#xe605;</span>
          <span class="text">点赞</span>
        </div>
      </div>
      <div @click="clickItem(4)">
        <span class="icon iconfont">&#xe661;</span>
        <span class="text">转发</span>
      </div>
    </el-col>

    <!-- <i class="el-icon-chat-round" style="font-size:200%;"></i>
        
      
          <i class="el-icon-star-off" style="font-size:200%;"></i>
         
     
          <i class="el-icon-thumb" style="font-size:200%;"></i>
         
      
      
          <i class="el-icon-paperclip" style="font-size:200%;"></i>
           -->
  </div>
</template>

<script>
export default {
  name: "CommendBar",
  data() {
    return {
      // isCollection: false,
      // isSupport: false
    };
  },
  props: {
    isCollection: {
      type: Boolean,
      default: false
    },
    isSupport: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickItem(index) {
      console.log(this.isCollection);
      if (index == 2) {
        this.isCollection = !this.isCollection;
        // console.log(this.isCollection);
      }
      this.$emit("clickItem", index);
    }
  }
};
</script>

<style scoped>
.rightbar {
  text-align: left;
}
.rightbar span {
  display: block;

  font-size: 25px;
  font-weight: 400;

  outline: none;
  margin-bottom: 5px;
}
.rightbar .text {
  margin: 15px 0;
  font-size: 12px;
}
</style>