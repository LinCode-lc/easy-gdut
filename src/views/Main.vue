<template>
  <div id="main">
    <Search class="search"></Search>
    <!-- <el-col :span="22" class="main-content"> -->
    <!-- <div v-for="(item, index) in records" :key="index" class="card-item">
        <Card :cardMessage="item"></Card>
      </div> -->
    <div class="cardlist" ref="cardlist">
      <div
        v-for="(item, index) in records"
        :key="index"
        @click="showDrawer(item)"
        class="nine-box"
        ref="nine-box"
      >
        <NineSquare
          @childMounted="childMounted"
          :cardMessage="item"
          :plateId="item.plateId"
          class="nine-card"
          ref="nine-card"
        ></NineSquare>
      </div>
    </div>
    <!-- <pagination
      v-show="page.total > 0"
      :total="page.total"
      :page.sync="page.current"
      :limit.sync="page.size"
      @pagination="init"
    /> -->

    <!-- 详情抽屉 -->
    <div v-if="visible">
      <a-radio-group style="margin-right: 8px" :default-value="placement">
      </a-radio-group>
      <a-button type="primary" @click="showDrawer">
        Open
      </a-button>
      <a-drawer
        title=""
        :placement="placement"
        :closable="true"
        :visible="visible"
        @close="onClose"
        width="100"
        height="600"
        class="locker"
      >
        <div ref="getHeight">
          <!-- 作者模块 -->
          <div class="authorBox">
            <div class="userInfo">
              <el-col :span="5" class="imgDiv">
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
            </div>
            <div class="has-text-centered">
              <div class="author-item">
                <span class="spanText">文章</span>
                <h2 class="span-num">7</h2>
              </div>
              <div class="author-item">
                <span class="spanText">经验</span>
                <h2 class="span-num">216</h2>
              </div>
              <div class="author-item">
                <span class="spanText">粉丝</span>
                <h2 class="span-num">
                  {{ user.fansCount === null ? 0 : user.fansCount }}
                </h2>
              </div>
              <div class="author-item">
                <span class="spanText">关注</span>
                <h2 class="span-num">
                  {{ user.focusCount === null ? 0 : user.focusCount }}
                </h2>
              </div>
            </div>
          </div>
          <!-- ----- -->

          <!-- 帖子内容 -->
          <div class="topicContent">
            <h2 class="topicTitle">{{ postTitle }}</h2>
            <div class="cc topicText" v-html="analyzeEmoji(postContents)">
              {{ analyzeEmoji(postContents) }}
            </div>

            <!-- 图片 -->
            <div class="imageBox">
              <div
                v-for="(item, index) in images"
                :key="index"
                :class="showCol"
              >
                <div class="card-c">
                  <img
                    :src="item.imageSrc"
                    alt=""
                    class="image"
                    :preview="index"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- --- -->
        </div>

        <!-- 评论 -->
        <div class="showComment">
          <Comment
            :postId="postId"
            :userId="this.$store.state.user.user.userId"
            :commentIf="commentIf"
          ></Comment>
        </div>
        <!-- ------ -->
        <div class="commendBar">
          <CommendBar
            @clickItem="doClick"
            :isCollection="isCollection"
            :isSupport="isSupport"
          ></CommendBar>
        </div>
      </a-drawer>
    </div>

    <div class="changeCol">
      <a-dropdown>
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          浏览模式 <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;" @click="clickChangeColmun(1)">单栏</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;" @click="clickChangeColmun(2)">双栏</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;" @click="clickChangeColmun(3)">三栏</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import Card from "../components/content/Card";
import NineSquare from "../components/content/NineSquare";
// import Card2 from "../components/content/Card2"
import { getList } from "@/network/main.js";
import Pagination from "@/components/common/Pagination";
import Search from "@/components/common/Search";
import Comment from "@/components/common/comment/Comment";
import CommendBar from "@/components/common/CommendBar";
//瀑布流
let waterfall = function(opt) {
  this.el = document.getElementsByClassName(opt.el)[0];
  this.oItems = document.getElementsByClassName(opt.childName);
  // this.elWidth = opt.elWidth;
  // this.itemWidth = opt.childWidth;
  this.colmun = opt.colmun;
  this.gap = opt.gap;
  this.heightArr = [];
  this.itemWidth =
    (this.el.offsetWidth - this.gap * (this.colmun - 1)) / this.colmun;
};
waterfall.prototype.init = function() {
  console.log(
    "======================================================================================"
  );
  console.log(this.itemWidth);
  console.log(this.itemWidth);
  console.log(this.oItems);
  console.log(this.oItems.length);
  console.log(this.colmun);
  console.log(this.gap);
  console.log(this.heightArr);

  this.render();
};
function getMinIdx(arr) {
  console.log(arr);
  return arr.indexOf(Math.min.apply(null, arr));
}
waterfall.prototype.render = function() {
  console.log(this.oItems.length);
  let item = null;
  for (let i = 0; i < this.oItems.length; i++) {
    item = this.oItems[i];

    item.style.width = this.itemWidth + "px";
    console.log(item);
    console.log(item.style.width);
    if (i < this.colmun) {
      item.style.top = 0;
      item.style.left = i * (this.itemWidth + this.gap) + "px";
      this.heightArr.push(item.offsetHeight);
    } else {
      console.log(this.heightArr);
      let minIdx = getMinIdx(this.heightArr);
      console.log(minIdx);
      item.style.left = minIdx * (this.itemWidth + this.gap) + "px";
      item.style.top = this.heightArr[minIdx] + this.gap + "px";
      this.heightArr[minIdx] += item.offsetHeight + this.gap;
    }
  }
};
export default {
  name: "Main",
  components: {
    Card,
    // Card2,
    Pagination,
    Search,
    NineSquare,
    Comment,
    CommendBar
  },
  data() {
    return {
      activeName: "latest",
      records: [],
      page: {
        current: 1,
        size: 5,
        total: 20,
        tab: "latest"
      },
      //表情解析
      OwOlist: [
        //表情包和表情路径
        { title: "微笑", url: "weixiao.gif" },
        { title: "嘻嘻", url: "xixi.gif" },
        { title: "哈哈", url: "haha.gif" },
        { title: "可爱", url: "keai.gif" },
        { title: "可怜", url: "kelian.gif" },
        { title: "挖鼻", url: "wabi.gif" },
        { title: "吃惊", url: "chijing.gif" },
        { title: "害羞", url: "haixiu.gif" },
        { title: "挤眼", url: "jiyan.gif" },
        { title: "闭嘴", url: "bizui.gif" },
        { title: "鄙视", url: "bishi.gif" },
        { title: "爱你", url: "aini.gif" },
        { title: "泪", url: "lei.gif" },
        { title: "偷笑", url: "touxiao.gif" },
        { title: "亲亲", url: "qinqin.gif" },
        { title: "生病", url: "shengbing.gif" },
        { title: "太开心", url: "taikaixin.gif" },
        { title: "白眼", url: "baiyan.gif" },
        { title: "右哼哼", url: "youhengheng.gif" },
        { title: "左哼哼", url: "zuohengheng.gif" },
        { title: "嘘", url: "xu.gif" },
        { title: "衰", url: "shuai.gif" },
        { title: "吐", url: "tu.gif" },
        { title: "哈欠", url: "haqian.gif" },
        { title: "抱抱", url: "baobao.gif" },
        { title: "怒", url: "nu.gif" },
        { title: "疑问", url: "yiwen.gif" },
        { title: "馋嘴", url: "chanzui.gif" },
        { title: "拜拜", url: "baibai.gif" },
        { title: "思考", url: "sikao.gif" },
        { title: "汗", url: "han.gif" },
        { title: "困", url: "kun.gif" },
        { title: "睡", url: "shui.gif" },
        { title: "钱", url: "qian.gif" },
        { title: "失望", url: "shiwang.gif" },
        { title: "酷", url: "ku.gif" },
        { title: "色", url: "se.gif" },
        { title: "哼", url: "heng.gif" },
        { title: "鼓掌", url: "guzhang.gif" },
        { title: "晕", url: "yun.gif" },
        { title: "悲伤", url: "beishang.gif" },
        { title: "抓狂", url: "zhuakuang.gif" },
        { title: "黑线", url: "heixian.gif" },
        { title: "阴险", url: "yinxian.gif" },
        { title: "怒骂", url: "numa.gif" },
        { title: "互粉", url: "hufen.gif" },
        { title: "书呆子", url: "shudaizi.gif" },
        { title: "愤怒", url: "fennu.gif" },
        { title: "感冒", url: "ganmao.gif" },
        { title: "心", url: "xin.gif" },
        { title: "伤心", url: "shangxin.gif" },
        { title: "猪", url: "zhu.gif" },
        { title: "熊猫", url: "xiongmao.gif" },
        { title: "兔子", url: "tuzi.gif" },
        { title: "喔克", url: "ok.gif" },
        { title: "耶", url: "ye.gif" },
        { title: "棒棒", url: "good.gif" },
        { title: "不", url: "no.gif" },
        { title: "赞", url: "zan.gif" },
        { title: "来", url: "lai.gif" },
        { title: "弱", url: "ruo.gif" },
        { title: "草泥马", url: "caonima.gif" },
        { title: "神马", url: "shenma.gif" },
        { title: "囧", url: "jiong.gif" },
        { title: "浮云", url: "fuyun.gif" },
        { title: "给力", url: "geili.gif" },
        { title: "围观", url: "weiguan.gif" },
        { title: "威武", url: "weiwu.gif" },
        { title: "话筒", url: "huatong.gif" },
        { title: "蜡烛", url: "lazhu.gif" },
        { title: "蛋糕", url: "dangao.gif" },
        { title: "发红包", url: "fahongbao.gif" }
      ],
      //抽屉
      visible: false,
      placement: "bottom",
      //点开了哪个帖子 帖子id
      postId: "",
      //点开帖子的作者
      user: {},
      //是否关注了即将点开的帖子的作者
      hasFollow: false,
      //帖子内容
      postTitle: "",
      postContents: "",
      images: [],
      showCol: "",
      //帖子详情侧边栏
      isCollection: false,
      isSupport: false,
      //评论
      commentIf: false,
      //分列
      colmun: 2,
      //子组件加载好的个数
      childCount: 0
    };
  },

  created() {
    this.init(this.tab);
  },
  methods: {
    init(tab) {
      getList(this.page.current, 30, tab).then(response => {
        const { data } = response;
        console.log(data);
        // this.page.current = data.current
        // console.log(data);
        this.page.total = data.total;
        this.page.size = data.size;
        this.records = data.records;
      });
    },
    //改变列数
    clickChangeColmun(colNum) {
      this.colmun = colNum;
      this.changeColmun();
    },
    changeColmun() {
      // this.$nextTick(
      //   setTimeout(() => {

      let wf = new waterfall({
        elWidth: 80.25,
        childWidth: 25,
        el: "cardlist",
        childName: "nine-box",
        colmun: this.colmun,
        gap: 10
      });
      wf.init();
      //   }, 2000)
      // );
    },
    //子组件加载完了
    childMounted() {
      this.childCount++;
      console.log(this.childCount);
      if (this.childCount != this.records.length) {
        this.changeColmun();
      }
    },

    // handleClick(tab) {
    //   this.page.current = 1
    //   this.init(tab.name)
    // }
    //抽屉
    showDrawer(item) {
      this.postId = item.postId;
      this.user = item.user;
      this.postTitle = item.postTitle;
      this.postContents = item.postContents;
      //判断图片个数并赋值
      this.countCol(item.images.length);
      this.images = item.images;

      console.log(item);
      if (item.plateId != 0) {
        this.visible = true;
      }
    },
    onClose() {
      this.visible = false;
    },
    //展示图片的样式 根据图片数调整
    countCol(length) {
      if (length == 3 || length > 4) {
        this.showCol = "col3";
      } else if (length % 2 == 0) {
        this.showCol = "col2";
      } else {
        this.showCol = "col1";
      }
    },
    //解析表情
    analyzeEmoji: function(cont) {
      //编译表情替换成图片展示出来
      var pattern1 = /\[[\u4e00-\u9fa5]+\]/g;
      var pattern2 = /\[[\u4e00-\u9fa5]+\]/;
      var content = cont.match(pattern1);
      var str = cont;
      if (content) {
        for (var i = 0; i < content.length; i++) {
          for (var j = 0; j < this.OwOlist.length; j++) {
            if ("[" + this.OwOlist[j].title + "]" == content[i]) {
              var src = this.OwOlist[j].url;
              break;
            }
          }
          var s = require("@/assets/face/" + src);
          var imoj = " <img src='" + s + "'/>";

          str = str.replace(pattern2, imoj);
        }
      }
      return str;
    },
    //处理右侧边栏图标的点击事件
    doClick(index) {
      let postId = this.postId;
      let userId = this.$store.state.user.user.userId;
      // console.log(index);
      // console.log(this.$refs.getHeight.offsetHeight);
      // console.log(this.$refs.getHeight.scrollTop);
      if (index === 1) {
        // this.$refs.getHeight.scrollTop = this.$refs.getHeight.offsetHeight;
        // window.scrollTo({
        //   top: this.$refs.getHeight.offsetHeight,
        //   behavior: "smooth"
        // });
        this.commentIf = !this.commentIf;
      }
      if (index === 2) {
        this.isCollection = !this.isCollection;
        if (this.isCollection) {
          saveCollection(postId, userId).then(response => {});
        } else {
          removeCollection(postId, userId).then(response => {});
        }
      }
      if (index === 3) {
        this.isSupport = !this.isSupport;
        if (this.isSupport) {
          console.log(postId);
          console.log(1);
          console.log(this.topicUser.userId);
          console.log(userId);
          saveSupport(
            postId,
            1,
            this.topicUser.userId,
            userId
          ).then(response => {});
        } else {
          removeSupport(
            postId,
            1,
            this.topicUser.userId,
            userId
          ).then(response => {});
        }
      }
    }
  }
};
</script>

<style scoped>
#main {
  height: 100%;
  width: 100%;
  background-color: var(--themeColor);
  position: relative;
  padding-bottom: 3000px;
  margin-bottom: 3000px;
  padding-left: 3.75rem /* 300/16 */;
  padding-top: 1.75rem /* 300/16 */;
}
/* 选择列数下拉框 */
.changeCol {
  position: absolute;
  right: 3.875rem /* 30/16 */;
  top: 3.125rem /* 50/16 */;
}
.search {
  /* z-index: 1; */
  /* position: fixed; */
  /* padding-left: 1.875rem ;
  padding-top: 3.125rem ;
  margin-bottom: 1.875rem ;
  height: 3.75rem ;
  width: 80%; */
  position: relative;
  margin-bottom: 1.875rem /* 30/16 */;
}

.cardlist {
  width: 95.25rem;
  position: relative;
}

.nine-box {
  width: 25rem;
  position: absolute;
}
.locker >>> .ant-drawer-content {
  width: 50%;
  height: 100%;
  position: relative;
  left: 400px;
  bottom: 100px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.95);
}
.locker >>> .ant-drawer-content-wrapper {
  box-shadow: none;
}
/* 作者 */
.user-button button {
  background-color: #fff;
  border-radius: 0.25rem /* 4/16 */;
  font-size: 1rem /* 10/16 */;
  padding: 0.5rem /* 3/16 */ 0.7rem /* 3/16 */;
  margin: 0 0.1875rem /* 3/16 */;
  border: none;
  outline: none;
}
.avatar {
  border-radius: 50%;
  border: 1px solid #fff;
}

.spanText {
  font-size: 0.875rem /* 14/16 */;
}
.span-num {
  font-size: 1rem /* 16/16 */;
  margin-top: 0.625rem /* 10/16 */;
}
.imgDiv {
  width: 12%;
}
.authorBox {
  position: relative;
}
.userInfo {
  position: absolute;
  left: 1.875rem /* 30/16 */;
}
.has-text-centered {
  position: absolute;
  right: 10.875rem /* 30/16 */;
  display: flex;
  width: 18.75rem /* 300/16 */;
}
.author-item {
  flex: 1;
}
/* 帖子内容样式 */
.topicContent {
  margin: 0 auto;

  width: 48.5rem /* 600/16 */;
  padding: 1.25rem /* 20/16 */;
  padding-top: 8.25rem /* 20/16 */;
}
.topicTitle {
  text-align: center;
}
.topicText {
  margin-bottom: 8.75rem /* 300/16 */;
  font-size: 18px;
  font-weight: 400;
}
/* 图片样式 */

.imageBox {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.col1 {
  width: 30rem /* 330/16 */;
  height: 30rem /* 300/16 */;
  display: block;
}
.col2 {
  width: 20rem /* 190/16 */;
  height: 20rem /* 190/16 */;
  display: block;
}
.col3 {
  width: 15rem /* 125/16 */;
  height: 15rem /* 115/16 */;

  display: block;
}
.image {
  height: 100%;
  width: 100%;
  border: 1px solid rgba(13, 24, 24, 0.1);
  border-radius: 0.3125rem /* 5/16 */;
}
/* 表情 */
.cc {
  display: inline-block;
}
/* 帖子详情侧边栏 */
.commendBar {
  position: absolute;
  right: 5.875rem /* 30/16 */;
  top: 10.75rem /* 60/16 */;
}
/* 评论 */
.showComment {
}
</style>