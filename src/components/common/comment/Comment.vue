<template>
  <div class="hbl-fa">
    <div class="hbl-comm">
      <div class="comment-avatar" v-if="showAvatar">
        <avatar :avatar="avatar"></avatar>
      </div>
      <div class="comment" :style="{ width: commentWidth }">
        <el-input
          @focus="showButton(0)"
          type="textarea"
          :autosize="{ minRows: minRows, maxRows: maxRows }"
          :placeholder="placeholder"
          v-model="textareaMap[0]"
        >
        </el-input>

        <div v-if="buttonMap[0]" class="hbl-owo">
          <div
            :class="pBodyMap[0] ? 'OwO' : 'OwO OwO-open'"
            class="emoj publish"
            :style="{ width: emojiWidth }"
          >
            <div class="OwO-logo" @click="pBodyStatus(0)">
              <span>Emoji表情</span>
            </div>
            <div class="OwO-body">
              <ul class="OwO-items OwO-items-show">
                <li
                  class="OwO-item"
                  v-for="(oitem, index) in OwOlist"
                  :key="'oitem' + index"
                  @click="choseEmoji(0, oitem.title)"
                >
                  <img :src="require('./img/face/' + oitem.url)" alt="" />
                </li>
              </ul>
            </div>
          </div>

          <div class="publish publish-btn">
            <button class="btn" @click="doSend()">发送</button>
            <button @click="cancel(0)" class="btn btn-cancel">取消</button>
          </div>
        </div>
      </div>
    </div>

    <div class="comm">
      <div class="su com-rep"></div>
      <div class="com-rep com-title">
        评论<span class="com-span">({{ commentNum }})</span>
      </div>
    </div>

    <div v-for="(item, index) in commentList" class="hbl-child" :key="index">
      <div class="reply"></div>
      <div class="content">
        <div class="comment-f">
          <avatar :avatar="item.avatar ? item.avatar : avatar"></avatar>
        </div>

        <div class="comment-f">
          <div>
            <div class="nickname author">
              {{ item.username }}
            </div>
            <div v-if="item.userId === authorId" class="icon author">
              {{ label }}
            </div>
            <div class="date">
              {{ item.creatTime }}
              <div class="supportOrNonsupport">
                <span
                  class="support"
                  @click="supportComment(item.commentId, 0, item.userId)"
                >
                  <span class="icon iconfont">&#xe605;</span> {{ 5 }}</span
                >
                <span class="nonsupport"
                  ><span class="icon iconfont">&#xe612;</span> {{ 6 }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <!-- 内容 -->
        <div class="reply-content" v-html="analyzeEmoji(item.commentContents)">
          {{ analyzeEmoji(item.commentContents) }}
        </div>
        <div class="reply-content reply-fa">
          <div class="reply-font" @click="doReply(item.commentId)">
            <div>
              <img src="./img/icon/reply.png" class="icon-reply" /><font
                class="icon-reply icon-hf"
                >回复</font
              >
            </div>
          </div>

          <div
            class="comment"
            :style="{ width: commentWidth }"
            v-if="replyMap[item.commentId]"
            :showAvatar="showAvatar"
          >
            <el-input
              @focus="showButton(item.commentId)"
              type="textarea"
              :autosize="{ minRows: minRows, maxRows: maxRows }"
              :placeholder="placeholder"
              v-model="textareaMap[item.commentId]"
            >
            </el-input>

            <div v-if="buttonMap[item.commentId]" class="hbl-owo">
              <div
                :class="pBodyMap[item.commentId] ? 'OwO' : 'OwO OwO-open'"
                class="emoj publish"
                :style="{ width: emojiWidth }"
              >
                <div class="OwO-logo" @click="pBodyStatus(item.commentId)">
                  <span>Emoji表情</span>
                </div>
                <div class="OwO-body">
                  <ul class="OwO-items OwO-items-show">
                    <li
                      class="OwO-item"
                      v-for="(oitem, index) in OwOlist"
                      :key="'oitem' + index"
                      @click="choseEmoji(item.commentId, oitem.title)"
                    >
                      <img :src="require('./img/face/' + oitem.url)" alt="" />
                    </li>
                  </ul>
                </div>
              </div>

              <div class="publish publish-btn">
                <button
                  class="btn"
                  @click="doChidSendParent(item.commentId, item)"
                >
                  发送
                </button>
                <button @click="cancel(item.commentId)" class="btn btn-cancel">
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="children"
        v-for="(ritem, jndex) in item.children"
        :key="jndex"
      >
        <div class="reply"></div>
        <div class="content">
          <div class="comment-f">
            <avatar :avatar="ritem.avatar ? ritem.avatar : avatar"></avatar>
          </div>

          <div class="comment-f">
            <div>
              <div class="nickname author">
                {{ ritem.username }}
              </div>
              <!-- 如果是Id等于作者Id则显示作者二字 -->
              <div v-if="ritem.userId === authorId" class="icon author">
                {{ label }}
              </div>
              <div class="date">
                {{ ritem.creatTime }}
              </div>
            </div>
          </div>

          <div class="reply-content">
            <div class="cc cc-to">
              <a href="#" v-if="ritem.replyname == null"></a>
              <a href="#" v-else>@{{ ritem.replyname }}</a>
            </div>

            <div class="cc" v-html="analyzeEmoji(ritem.commentContents)">
              {{ analyzeEmoji(ritem.commentContents) }}
            </div>
          </div>

          <div class="reply-content reply-fa">
            <div class="reply-font" @click="doReply(ritem.commentId)">
              <div>
                <img src="./img/icon/reply.png" class="icon-reply" /><font
                  class="icon-reply icon-hf"
                  >回复</font
                >
              </div>
            </div>

            <div
              class="comment"
              :style="{ width: commentWidth }"
              v-if="replyMap[ritem.commentId]"
              :showAvatar="showAvatar"
            >
              <el-input
                @focus="showButton(ritem.commentId)"
                type="textarea"
                :autosize="{ minRows: minRows, maxRows: maxRows }"
                :placeholder="placeholder"
                v-model="textareaMap[ritem.commentId]"
              >
              </el-input>

              <div v-if="buttonMap[ritem.commentId]" class="hbl-owo">
                <div
                  :class="pBodyMap[ritem.commentId] ? 'OwO' : 'OwO OwO-open'"
                  class="emoj publish"
                  :style="{ width: emojiWidth }"
                >
                  <div class="OwO-logo" @click="pBodyStatus(ritem.commentId)">
                    <span>Emoji表情</span>
                  </div>
                  <div class="OwO-body">
                    <ul class="OwO-items OwO-items-show">
                      <li
                        class="OwO-item"
                        v-for="(oitem, index) in OwOlist"
                        :key="'oitem' + index"
                        @click="choseEmoji(ritem.commentId, oitem.title)"
                      >
                        <img :src="require('./img/face/' + oitem.url)" alt="" />
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="publish publish-btn">
                  <button
                    class="btn"
                    @click="doChidSend(ritem.commentId, ritem)"
                  >
                    发送
                  </button>
                  <but
                    ton
                    @click="cancel(ritem.commentId)"
                    class="btn btn-cancel"
                  >
                    取消
                  </but>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "./Avatar.vue";
import { postComment } from "@/network/post.js";
import { getCommentList } from "@/network/detail.js";
export default {
  props: {
    emojiWidth: {
      type: String,
      default: "560px"
    },
    showAvatar: {
      type: Boolean,
      default: true
    },
    avatar: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "在此输入评论内容..."
    },
    minRows: {
      type: Number,
      default: 4
    },
    maxRows: {
      type: Number,
      default: 8
    },
    commentNum: {
      type: Number,
      default: 2
    },
    authorId: {
      type: Number,
      default: 1
    },
    label: {
      type: String,
      default: "作"
    },
    userId: {
      type: String
    },
    // commentList: {
    //   type: Array,
    //   // default: () => []
    //   default: () => [
    //     {
    //       commentId: "comment001",
    //       postId: "post001",
    //       replyId: "0",
    //       replyReplyId: "0",
    //       userId: "10081",
    //       commentContents: "这篇文章dsfsdfsdfsdf",
    //       creatTime: "2021-03-30T00:12:16",
    //       commentStatus: 0,
    //       commentImageSrc: "comment/image01",
    //       replyCount: 99,
    //       parseCount: 4,
    //       children: [
    //         {
    //           commentId: "comment006",
    //           postId: "post001",
    //           replyId: "comment001",
    //           replyReplyId: "0",
    //           userId: "10081",
    //           commentContents: "111",
    //           creatTime: "2021-03-30T00:34:50",
    //           commentStatus: 0,
    //           commentImageSrc: "comment/image01",
    //           replyCount: 0,
    //           parseCount: 2,
    //           children: null,
    //           username: "小红",
    //           avater: "image/plate01.jpg",
    //           replyname: null
    //         },
    //         {
    //           commentId: "comment007",
    //           postId: "post001",
    //           replyId: "comment001",
    //           replyReplyId: "0",
    //           userId: "10081",
    //           commentContents: "这篇文章很辣鸡",
    //           creatTime: "2021-03-30T00:12:16",
    //           commentStatus: 0,
    //           commentImageSrc: "comment/image01",
    //           replyCount: 0,
    //           parseCount: 2,
    //           children: null,
    //           username: "小明",
    //           avater: "image/plate01.jpg",
    //           replyname: null
    //         },
    //         {
    //           commentId: "comment008",
    //           postId: "post001",
    //           replyId: "comment001",
    //           replyReplyId: "0",
    //           userId: "10081",
    //           commentContents: "这篇文章很辣鸡",
    //           creatTime: "2021-03-30T00:12:16",
    //           commentStatus: 0,
    //           commentImageSrc: "comment/image01",
    //           replyCount: 0,
    //           parseCount: 1,
    //           children: null,
    //           username: "小明",
    //           avater: "image/plate01.jpg",
    //           replyname: null
    //         },
    //         {
    //           commentId: "comment009",
    //           postId: "post001",
    //           replyId: "comment001",
    //           replyReplyId: "comment006",
    //           userId: "10081",
    //           commentContents: "这篇文章很辣鸡",
    //           creatTime: "2021-03-30T00:12:16",
    //           commentStatus: 0,
    //           commentImageSrc: "comment/image01",
    //           replyCount: 0,
    //           parseCount: 1,
    //           children: null,
    //           username: "小明",
    //           avater: "image/plate01.jpg",
    //           replyname: "小明"
    //         },
    //         {
    //           commentId: "comment010",
    //           postId: "post001",
    //           replyId: "comment001",
    //           replyReplyId: "comment006",
    //           userId: "10081",
    //           commentContents: "这篇文章很辣鸡",
    //           creatTime: "2021-03-30T00:12:16",
    //           commentStatus: 0,
    //           commentImageSrc: "comment/image01",
    //           replyCount: 0,
    //           parseCount: 1,
    //           children: null,
    //           username: "小明",
    //           avater: "image/plate01.jpg",
    //           replyname: "小明"
    //         }
    //       ],
    //       username: "小明",
    //       avater: "image/plate01.jpg",
    //       replyname: null
    //     },
    //     {
    //       commentId: "comment002",
    //       postId: "post001",
    //       replyId: "0",
    //       replyReplyId: "0",
    //       userId: "10082",
    //       commentContents: "这篇文章很辣鸡",
    //       creatTime: "2021-03-30T00:12:16",
    //       commentStatus: 0,
    //       commentImageSrc: "comment/image01",
    //       replyCount: 0,
    //       parseCount: 1,
    //       children: [],
    //       username: "小王",
    //       avater: "image/plate01.jpg",
    //       replyname: null
    //     },
    //     {
    //       commentId: "comment003",
    //       postId: "post001",
    //       replyId: "0",
    //       replyReplyId: "0",
    //       userId: "10083",
    //       commentContents: "这篇文章很辣鸡",
    //       creatTime: "2021-03-30T00:12:16",
    //       commentStatus: 0,
    //       commentImageSrc: "comment/image01",
    //       replyCount: 0,
    //       parseCount: 1,
    //       children: [],
    //       username: "小刚",
    //       avater: "image/plate01.jpg",
    //       replyname: null
    //     },
    //     {
    //       commentId: "comment004",
    //       postId: "post001",
    //       replyId: "0",
    //       replyReplyId: "0",
    //       userId: "10084",
    //       commentContents: "这篇文章很辣鸡",
    //       creatTime: "2021-03-30T00:12:16",
    //       commentStatus: 0,
    //       commentImageSrc: "comment/image01",
    //       replyCount: 0,
    //       parseCount: 1,
    //       children: [],
    //       username: "小李",
    //       avater: "image/plate01.jpg",
    //       replyname: null
    //     },
    //     {
    //       commentId: "comment007",
    //       postId: "post001",
    //       replyId: "comment001",
    //       replyReplyId: "0",
    //       userId: "10081",
    //       commentContents: "这篇文章很辣鸡",
    //       creatTime: "2021-03-30T00:12:16",
    //       commentStatus: 0,
    //       commentImageSrc: "comment/image01",
    //       replyCount: 0,
    //       parseCount: 2,
    //       children: null,
    //       username: "小明",
    //       avater: "image/plate01.jpg",
    //       replyname: null
    //     },
    //     {
    //       commentId: "comment009",
    //       postId: "post001",
    //       replyId: "comment001",
    //       replyReplyId: "comment006",
    //       userId: "10081",
    //       commentContents: "这篇文章很辣鸡",
    //       creatTime: "2021-03-30T00:12:16",
    //       commentStatus: 0,
    //       commentImageSrc: "comment/image01",
    //       replyCount: 0,
    //       parseCount: 1,
    //       children: null,
    //       username: "小明",
    //       avater: "image/plate01.jpg",
    //       replyname: "小明"
    //     }
    //   ]
    //   // default: () => [
    //   //   {
    //   //     id: 1,
    //   //     commentUser: {
    //   //       id: 1,
    //   //       nickName: "花非花",
    //   //       avatar:
    //   //         "http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50"
    //   //     },
    //   //     content:
    //   //       "<a style='text-decoration:none;color: #409eff ' href='https://blog.csdn.net/abcwanglinyong/'>我的CSDN博客地址</a>[害羞][害羞][害羞]<br/>" +
    //   //       "我的微信公众号：<br/>" +
    //   //       "<img src=" +
    //   //       require("./img/hbl.jpg") +
    //   //       ">",
    //   //     createDate: "2019-9-23 17:36:02",
    //   //     childrenList: [
    //   //       {
    //   //         id: 2,
    //   //         commentUser: {
    //   //           id: 2,
    //   //           nickName: "坏菠萝",
    //   //           avatar: ""
    //   //         },
    //   //         targetUser: {
    //   //           id: 1,
    //   //           nickName: "花非花",
    //   //           avatar:
    //   //             "http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50"
    //   //         },
    //   //         content: "真的就很sha！很Nice!",
    //   //         createDate: "2019-9-23 17:45:26"
    //   //       },
    //   //       {
    //   //         id: 3,
    //   //         commentUser: {
    //   //           id: 3,
    //   //           nickName: "小草莓",
    //   //           avatar:
    //   //             "http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50"
    //   //         },
    //   //         targetUser: {
    //   //           id: 2,
    //   //           nickName: "坏菠萝",
    //   //           avatar:
    //   //             "http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50"
    //   //         },
    //   //         content: "这很菜",
    //   //         createDate: "2019-9-23 17:45:26"
    //   //       }
    //   //     ]
    //   //   },
    //   //   {
    //   //     id: 1,
    //   //     commentUser: {
    //   //       id: 1,
    //   //       nickName: "花非花",
    //   //       avatar:
    //   //         "http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50"
    //   //     },
    //   //     content:
    //   //       "<a style='text-decoration:none;color: #409eff ' href='https://blog.csdn.net/abcwanglinyong/'>我的CSDN博客地址</a>[害羞][害羞][害羞]<br/>" +
    //   //       "我的微信公众号：<br/>" +
    //   //       "<img src=" +
    //   //       require("./img/hbl.jpg") +
    //   //       ">",
    //   //     createDate: "2019-9-23 17:36:02",
    //   //     childrenList: [
    //   //       {
    //   //         id: 2,
    //   //         commentUser: {
    //   //           id: 2,
    //   //           nickName: "坏菠萝",
    //   //           avatar: ""
    //   //         },
    //   //         targetUser: {
    //   //           id: 1,
    //   //           nickName: "花非花",
    //   //           avatar:
    //   //             "http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50"
    //   //         },
    //   //         content: "真的就很sha！很Nice!",
    //   //         createDate: "2019-9-23 17:45:26"
    //   //       },
    //   //       {
    //   //         id: 3,
    //   //         commentUser: {
    //   //           id: 3,
    //   //           nickName: "小草莓",
    //   //           avatar:
    //   //             "http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50"
    //   //         },
    //   //         targetUser: {
    //   //           id: 2,
    //   //           nickName: "坏菠萝",
    //   //           avatar:
    //   //             "http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50"
    //   //         },
    //   //         content: "这很菜",
    //   //         createDate: "2019-9-23 17:45:26"
    //   //       }
    //   //     ]
    //   //   }

    //   // ]
    // },
    commentWidth: {
      type: String,
      default: "80%"
    }
  },
  data() {
    return {
      commentList: [],
      replyMap: [],
      buttonMap: [],
      pBodyMap: [],
      textareaMap: [],
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
      ]
    };
  },
  components: {
    avatar
  },
  created() {
    this.fetchTopic();
  },

  methods: {
    // 初始化
    async fetchTopic() {
      getCommentList(this.$route.params.id).then(response => {
        console.log("下面一行打印评论");
        const { data } = response;
        this.commentList = data;
        console.log(data);
        console.log("====================================");
        console.log(this.commentList);
      });
    },

    //事件处理器

    showButton(index) {
      //this.showFlag = true;
      console.log(index + "index");

      this.$set(this.buttonMap, index, true);
    },
    cancel(index) {
      this.$set(this.buttonMap, index, false);
      if (index !== 0) {
        this.$set(this.replyMap, index, false);
      }
      console.log(index + "index");
      //this.showFlag = false;
    },
    doSend() {
      console.log(this.textareaMap[0]);
      console.log(this.$route.params.id);
      console.log(this.$store.state.user.user.userId);
      postComment(
        this.textareaMap[0],
        this.$route.params.id,
        0,
        0,
        this.$store.state.user.user.userId
      ).then(response => {
        console.log("下面一行打印评论");
        const { data } = response;
        // console.log(data);
        // this.commentData = data;
        this.fetchTopic();
        // console.log(data);
        // console.log(this.commentData);
      });
      // this.$emit("doSend", this.textareaMap[0]);
      this.$set(this.textareaMap, 0, "");
      this.cancel(0);
    },
    doChidSendParent(index, item) {
      console.log(item.commentId);
      console.log(this.textareaMap[index]);
      console.log(item.replyId);
      console.log(item.replyReplyId);
      postComment(
        this.textareaMap[index],
        this.$route.params.id,
        item.commentId,
        0,

        this.$store.state.user.user.userId
      ).then(response => {
        this.fetchTopic();
      });

      // this.$emit("doChidSend", this.textareaMap[index], commentUserId, pid);
      this.$set(this.textareaMap, index, "");
      this.cancel(index);
    },

    doChidSend(index, item) {
      console.log(item.commentId);
      console.log(this.textareaMap[index]);
      console.log(item.replyId);
      console.log(item.replyReplyId);
      postComment(
        this.textareaMap[index],
        this.$route.params.id,
        item.replyId,
        item.commentId,
        this.$store.state.user.user.userId
      ).then(response => {
        this.fetchTopic();
      });

      // this.$emit("doChidSend", this.textareaMap[index], commentUserId, pid);
      this.$set(this.textareaMap, index, "");
      this.cancel(index);
    },

    //选择表情包
    choseEmoji: function(index, inner) {
      var con = "";
      if (!this.textareaMap[index]) {
        this.$set(this.textareaMap, index, "");
      }
      con = this.textareaMap[index] += "[" + inner + "]";
      this.$set(this.textareaMap, index, con);
    },
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
          var s = require("./img/face/" + src);
          var imoj = "<img src='" + s + "'/>";

          str = str.replace(pattern2, imoj);
        }
      }
      return str;
    },
    doReply(index) {
      this.$set(this.replyMap, index, true);
      console.log(this.replyMap);
      console.log(this.textareaMap[index]);
      console.log(index);
      console.log(this.replyMap[index]);
      // postComment(
      //   this.textareaMap[index],
      //   this.$route.params.id,
      //   0,
      //   0,
      //   this.$store.state.user.user.userId
      // ).then(response => {
      //   console.log("下面一行打印评论");
      //   const { data } = response;
      //   this.commentData = data;
      //   console.log(data);
      //   console.log(this.commentData);
      // });
    },

    pBodyStatus(index) {
      this.$set(this.pBodyMap, index, !this.pBodyMap[index]);
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    // '$route':'routeChange'
  }
};
</script>
<style type="text/css" scoped>
.supportOrNonsupport {
  display: inline;
  margin-left: 3.125rem /* 50/16 */;
  font-size: 1.4rem /* 16/16 */;
}
.comment {
  display: inline-block;
  vertical-align: top;
}
.comment-avatar {
  display: inline-block;
  vertical-align: top;
}
.emoj {
  /*width: 560px;*/
}
.publish {
  margin-top: 0.625rem /* 10/16 */;
  display: inline-block;
  vertical-align: top;
}
.publish-btn {
  float: right;
}
.btn {
  width: 4.375rem /* 70/16 */; /* 宽度 */
  margin-top: 0.1875rem /* 3/16 */;
  height: 1.875rem /* 30/16 */; /* 高度 */
  border-width: 0px; /* 边框宽度 */
  border-radius: 0.1875rem /* 3/16 */; /* 边框半径 */
  background: #3cb371; /* 背景颜色 */
  cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
  outline: none; /* 不显示轮廓线 */
  font-family: Microsoft YaHei; /* 设置字体 */
  color: white; /* 字体颜色 */
  font-size: 0.8125rem /* 13/16 */; /* 字体大小 */
  text-align: center;
  line-height: 1.875rem /* 30/16 */;
  border-radius: 0.3125rem /* 5/16 */;
  display: inline-block;
  margin-left: 0.3125rem /* 5/16 */;
  margin-right: 0.3125rem /* 5/16 */;
}
.btn-cancel {
  background: grey; /* 背景颜色 */
}

.tmsgBox {
  position: relative;
  background: #fff;
  padding: 0.9375rem /* 15/16 */;
  margin-bottom: 1.25rem /* 20/16 */;
  border-radius: 0.3125rem /* 5/16 */;
}
.tmsg-respond h3 {
  font-size: 1.125rem /* 18/16 */;
  font-weight: bold;
  margin-bottom: 0.5rem /* 8/16 */;
}
.tmsg-respond h3 small {
  font-size: smaller;
  cursor: pointer;
}
.tmsg-respond textarea {
  background: #f4f6f7;
  height: 6.25rem /* 100/16 */;
  margin-bottom: 0.625rem /* 10/16 */;
}

.OwO {
  position: relative;
  z-index: 1;
}
.OwO .OwO-logo {
  position: relative;
  border-radius: 0.25rem /* 4/16 */;
  color: #444;
  display: inline-block;
  background: #fff;
  border: 1px solid #ddd;
  font-size: 0.8125rem /* 13/16 */;
  padding: 0 0.375rem /* 6/16 */;
  cursor: pointer;
  height: 1.875rem /* 30/16 */;
  box-sizing: border-box;
  z-index: 2;
  line-height: 1.875rem /* 30/16 */;
}
.OwO .OwO-logo:hover {
  animation: a 5s infinite ease-in-out;
  -webkit-animation: a 5s infinite ease-in-out;
}
.OwO .OwO-body {
  position: absolute;
  background: #fff;
  border: 1px solid #ddd;
  z-index: 1;
  top: 1.8125rem /* 29/16 */;
  border-radius: 0 0.25rem /* 4/16 */ 0.25rem /* 4/16 */ 0.25rem /* 4/16 */;
  display: none;
}
.OwO-open .OwO-body {
  display: block;
}
.OwO-open .OwO-logo {
  border-radius: 0.25rem /* 4/16 */ 0.25rem /* 4/16 */ 0 0;
  border-bottom: none;
}
.OwO-open .OwO-logo:hover {
  animation: none;
  -webkit-animation: none;
}
.OwO .OwO-items {
  max-height: 12.3125rem /* 197/16 */;
  overflow: scroll;
  font-size: 0;
  padding: 0.625rem /* 10/16 */;
  z-index: 1;
}
.OwO .OwO-items .OwO-item {
  background: #f7f7f7;
  padding: 0.3125rem /* 5/16 */ 0.625rem /* 10/16 */;
  border-radius: 0.3125rem /* 5/16 */;
  display: inline-block;
  margin: 0 0.625rem /* 10/16 */ 0.75rem /* 12/16 */ 0;
  transition: 0.3s;
  line-height: 1.1875rem /* 19/16 */;
  font-size: 1.25rem /* 20/16 */;
  cursor: pointer;
}
.OwO .OwO-items .OwO-item:hover {
  background: #eee;
  box-shadow: 0 0.125rem /* 2/16 */ 0.125rem /* 2/16 */ 0 rgba(0, 0, 0, 0.14),
    0 0.1875rem /* 3/16 */ 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  animation: a 5s infinite ease-in-out;
  -webkit-animation: a 5s infinite ease-in-out;
}
.OwO .OwO-body .OwO-bar {
  width: 100%;
  height: 1.875rem /* 30/16 */;
  border-top: 1px solid #ddd;
  background: #fff;
  border-radius: 0 0 4px 4px;
  color: #444;
}
.OwO .OwO-body .OwO-bar .OwO-packages li {
  display: inline-block;
  line-height: 1.875rem /* 30/16 */;
  font-size: 0.875rem /* 14/16 */;
  padding: 0 0.625rem /* 10/16 */;
  cursor: pointer;
  margin-right: 3px;
  text-align: center;
}
.OwO .OwO-body .OwO-bar .OwO-packages li:first-of-type {
  border-radius: 0 0 0 3px;
}
@-webkit-keyframes a {
  2% {
    -webkit-transform: translateY(1.5px) rotate(1.5deg);
    transform: translateY(1.5px) rotate(1.5deg);
  }
  4% {
    -webkit-transform: translateY(-1.5px) rotate(-0.5deg);
    transform: translateY(-1.5px) rotate(-0.5deg);
  }
  6% {
    -webkit-transform: translateY(1.5px) rotate(-1.5deg);
    transform: translateY(1.5px) rotate(-1.5deg);
  }
  8% {
    -webkit-transform: translateY(-1.5px) rotate(-1.5deg);
    transform: translateY(-1.5px) rotate(-1.5deg);
  }
  10% {
    -webkit-transform: translateY(2.5px) rotate(1.5deg);
    transform: translateY(2.5px) rotate(1.5deg);
  }
  12% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  14% {
    -webkit-transform: translateY(-1.5px) rotate(1.5deg);
    transform: translateY(-1.5px) rotate(1.5deg);
  }
  16% {
    -webkit-transform: translateY(-0.5px) rotate(-1.5deg);
    transform: translateY(-0.5px) rotate(-1.5deg);
  }
  18% {
    -webkit-transform: translateY(0.5px) rotate(-1.5deg);
    transform: translateY(0.5px) rotate(-1.5deg);
  }
  20% {
    -webkit-transform: translateY(-1.5px) rotate(2.5deg);
    transform: translateY(-1.5px) rotate(2.5deg);
  }
  22% {
    -webkit-transform: translateY(0.5px) rotate(-1.5deg);
    transform: translateY(0.5px) rotate(-1.5deg);
  }
  24% {
    -webkit-transform: translateY(1.5px) rotate(1.5deg);
    transform: translateY(1.5px) rotate(1.5deg);
  }
  26% {
    -webkit-transform: translateY(0.5px) rotate(0.5deg);
    transform: translateY(0.5px) rotate(0.5deg);
  }
  28% {
    -webkit-transform: translateY(0.5px) rotate(1.5deg);
    transform: translateY(0.5px) rotate(1.5deg);
  }
  30% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  32%,
  34% {
    -webkit-transform: translateY(1.5px) rotate(-0.5deg);
    transform: translateY(1.5px) rotate(-0.5deg);
  }
  36% {
    -webkit-transform: translateY(-1.5px) rotate(2.5deg);
    transform: translateY(-1.5px) rotate(2.5deg);
  }
  38% {
    -webkit-transform: translateY(1.5px) rotate(-1.5deg);
    transform: translateY(1.5px) rotate(-1.5deg);
  }
  40% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  42% {
    -webkit-transform: translateY(2.5px) rotate(-1.5deg);
    transform: translateY(2.5px) rotate(-1.5deg);
  }
  44% {
    -webkit-transform: translateY(1.5px) rotate(0.5deg);
    transform: translateY(1.5px) rotate(0.5deg);
  }
  46% {
    -webkit-transform: translateY(-1.5px) rotate(2.5deg);
    transform: translateY(-1.5px) rotate(2.5deg);
  }
  48% {
    -webkit-transform: translateY(-0.5px) rotate(0.5deg);
    transform: translateY(-0.5px) rotate(0.5deg);
  }
  50% {
    -webkit-transform: translateY(0.5px) rotate(0.5deg);
    transform: translateY(0.5px) rotate(0.5deg);
  }
  52% {
    -webkit-transform: translateY(2.5px) rotate(2.5deg);
    transform: translateY(2.5px) rotate(2.5deg);
  }
  54% {
    -webkit-transform: translateY(-1.5px) rotate(1.5deg);
    transform: translateY(-1.5px) rotate(1.5deg);
  }
  56% {
    -webkit-transform: translateY(2.5px) rotate(2.5deg);
    transform: translateY(2.5px) rotate(2.5deg);
  }
  58% {
    -webkit-transform: translateY(0.5px) rotate(2.5deg);
    transform: translateY(0.5px) rotate(2.5deg);
  }
  60% {
    -webkit-transform: translateY(2.5px) rotate(2.5deg);
    transform: translateY(2.5px) rotate(2.5deg);
  }
  62% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  64% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  66% {
    -webkit-transform: translateY(1.5px) rotate(-0.5deg);
    transform: translateY(1.5px) rotate(-0.5deg);
  }
  68% {
    -webkit-transform: translateY(-1.5px) rotate(-0.5deg);
    transform: translateY(-1.5px) rotate(-0.5deg);
  }
  70% {
    -webkit-transform: translateY(1.5px) rotate(0.5deg);
    transform: translateY(1.5px) rotate(0.5deg);
  }
  72% {
    -webkit-transform: translateY(2.5px) rotate(1.5deg);
    transform: translateY(2.5px) rotate(1.5deg);
  }
  74% {
    -webkit-transform: translateY(-0.5px) rotate(0.5deg);
    transform: translateY(-0.5px) rotate(0.5deg);
  }
  76% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  78% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  80% {
    -webkit-transform: translateY(1.5px) rotate(1.5deg);
    transform: translateY(1.5px) rotate(1.5deg);
  }
  82% {
    -webkit-transform: translateY(-0.5px) rotate(0.5deg);
    transform: translateY(-0.5px) rotate(0.5deg);
  }
  84% {
    -webkit-transform: translateY(1.5px) rotate(2.5deg);
    transform: translateY(1.5px) rotate(2.5deg);
  }
  86% {
    -webkit-transform: translateY(-1.5px) rotate(-1.5deg);
    transform: translateY(-1.5px) rotate(-1.5deg);
  }
  88% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  90% {
    -webkit-transform: translateY(2.5px) rotate(-0.5deg);
    transform: translateY(2.5px) rotate(-0.5deg);
  }
  92% {
    -webkit-transform: translateY(0.5px) rotate(-0.5deg);
    transform: translateY(0.5px) rotate(-0.5deg);
  }
  94% {
    -webkit-transform: translateY(2.5px) rotate(0.5deg);
    transform: translateY(2.5px) rotate(0.5deg);
  }
  96% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  98% {
    -webkit-transform: translateY(-1.5px) rotate(-0.5deg);
    transform: translateY(-1.5px) rotate(-0.5deg);
  }
  0%,
  to {
    -webkit-transform: translate(0) rotate(0deg);
    transform: translate(0) rotate(0deg);
  }
}
@keyframes a {
  2% {
    -webkit-transform: translateY(1.5px) rotate(1.5deg);
    transform: translateY(1.5px) rotate(1.5deg);
  }
  4% {
    -webkit-transform: translateY(-1.5px) rotate(-0.5deg);
    transform: translateY(-1.5px) rotate(-0.5deg);
  }
  6% {
    -webkit-transform: translateY(1.5px) rotate(-1.5deg);
    transform: translateY(1.5px) rotate(-1.5deg);
  }
  8% {
    -webkit-transform: translateY(-1.5px) rotate(-1.5deg);
    transform: translateY(-1.5px) rotate(-1.5deg);
  }
  10% {
    -webkit-transform: translateY(2.5px) rotate(1.5deg);
    transform: translateY(2.5px) rotate(1.5deg);
  }
  12% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  14% {
    -webkit-transform: translateY(-1.5px) rotate(1.5deg);
    transform: translateY(-1.5px) rotate(1.5deg);
  }
  16% {
    -webkit-transform: translateY(-0.5px) rotate(-1.5deg);
    transform: translateY(-0.5px) rotate(-1.5deg);
  }
  18% {
    -webkit-transform: translateY(0.5px) rotate(-1.5deg);
    transform: translateY(0.5px) rotate(-1.5deg);
  }
  20% {
    -webkit-transform: translateY(-1.5px) rotate(2.5deg);
    transform: translateY(-1.5px) rotate(2.5deg);
  }
  22% {
    -webkit-transform: translateY(0.5px) rotate(-1.5deg);
    transform: translateY(0.5px) rotate(-1.5deg);
  }
  24% {
    -webkit-transform: translateY(1.5px) rotate(1.5deg);
    transform: translateY(1.5px) rotate(1.5deg);
  }
  26% {
    -webkit-transform: translateY(0.5px) rotate(0.5deg);
    transform: translateY(0.5px) rotate(0.5deg);
  }
  28% {
    -webkit-transform: translateY(0.5px) rotate(1.5deg);
    transform: translateY(0.5px) rotate(1.5deg);
  }
  30% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  32%,
  34% {
    -webkit-transform: translateY(1.5px) rotate(-0.5deg);
    transform: translateY(1.5px) rotate(-0.5deg);
  }
  36% {
    -webkit-transform: translateY(-1.5px) rotate(2.5deg);
    transform: translateY(-1.5px) rotate(2.5deg);
  }
  38% {
    -webkit-transform: translateY(1.5px) rotate(-1.5deg);
    transform: translateY(1.5px) rotate(-1.5deg);
  }
  40% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  42% {
    -webkit-transform: translateY(2.5px) rotate(-1.5deg);
    transform: translateY(2.5px) rotate(-1.5deg);
  }
  44% {
    -webkit-transform: translateY(1.5px) rotate(0.5deg);
    transform: translateY(1.5px) rotate(0.5deg);
  }
  46% {
    -webkit-transform: translateY(-1.5px) rotate(2.5deg);
    transform: translateY(-1.5px) rotate(2.5deg);
  }
  48% {
    -webkit-transform: translateY(-0.5px) rotate(0.5deg);
    transform: translateY(-0.5px) rotate(0.5deg);
  }
  50% {
    -webkit-transform: translateY(0.5px) rotate(0.5deg);
    transform: translateY(0.5px) rotate(0.5deg);
  }
  52% {
    -webkit-transform: translateY(2.5px) rotate(2.5deg);
    transform: translateY(2.5px) rotate(2.5deg);
  }
  54% {
    -webkit-transform: translateY(-1.5px) rotate(1.5deg);
    transform: translateY(-1.5px) rotate(1.5deg);
  }
  56% {
    -webkit-transform: translateY(2.5px) rotate(2.5deg);
    transform: translateY(2.5px) rotate(2.5deg);
  }
  58% {
    -webkit-transform: translateY(0.5px) rotate(2.5deg);
    transform: translateY(0.5px) rotate(2.5deg);
  }
  60% {
    -webkit-transform: translateY(2.5px) rotate(2.5deg);
    transform: translateY(2.5px) rotate(2.5deg);
  }
  62% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  64% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  66% {
    -webkit-transform: translateY(1.5px) rotate(-0.5deg);
    transform: translateY(1.5px) rotate(-0.5deg);
  }
  68% {
    -webkit-transform: translateY(-1.5px) rotate(-0.5deg);
    transform: translateY(-1.5px) rotate(-0.5deg);
  }
  70% {
    -webkit-transform: translateY(1.5px) rotate(0.5deg);
    transform: translateY(1.5px) rotate(0.5deg);
  }
  72% {
    -webkit-transform: translateY(2.5px) rotate(1.5deg);
    transform: translateY(2.5px) rotate(1.5deg);
  }
  74% {
    -webkit-transform: translateY(-0.5px) rotate(0.5deg);
    transform: translateY(-0.5px) rotate(0.5deg);
  }
  76% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  78% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  80% {
    -webkit-transform: translateY(1.5px) rotate(1.5deg);
    transform: translateY(1.5px) rotate(1.5deg);
  }
  82% {
    -webkit-transform: translateY(-0.5px) rotate(0.5deg);
    transform: translateY(-0.5px) rotate(0.5deg);
  }
  84% {
    -webkit-transform: translateY(1.5px) rotate(2.5deg);
    transform: translateY(1.5px) rotate(2.5deg);
  }
  86% {
    -webkit-transform: translateY(-1.5px) rotate(-1.5deg);
    transform: translateY(-1.5px) rotate(-1.5deg);
  }
  88% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  90% {
    -webkit-transform: translateY(2.5px) rotate(-0.5deg);
    transform: translateY(2.5px) rotate(-0.5deg);
  }
  92% {
    -webkit-transform: translateY(0.5px) rotate(-0.5deg);
    transform: translateY(0.5px) rotate(-0.5deg);
  }
  94% {
    -webkit-transform: translateY(2.5px) rotate(0.5deg);
    transform: translateY(2.5px) rotate(0.5deg);
  }
  96% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  98% {
    -webkit-transform: translateY(-1.5px) rotate(-0.5deg);
    transform: translateY(-1.5px) rotate(-0.5deg);
  }
  0%,
  to {
    -webkit-transform: translate(0) rotate(0deg);
    transform: translate(0) rotate(0deg);
  }
}
/*用户输入表单*/
.tmsg-r-info {
  margin: 10px 0;
}
.tmsg-r-info input {
  height: 30px;
  border-radius: 4px;
  background: #f4f6f7;
}
.tmsg-r-info .info-submit {
  margin: 10px 0;
  text-align: center;
}
.tmsg-r-info .info-submit p,
.tmsg-commentshow h1 {
  /*background: #97dffd;*/
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  /*transition: all .3s ease-in-out;*/
  height: 30px;
  line-height: 30px;
  text-align: center;
}
/*.tmsg-r-info .info-submit p:hover{
    background: #47456d;
}*/
/*评论列表*/
.tmsg-comments .tmsg-comments-tip {
  display: block;
  border-left: 2px solid #363d4c;
  padding: 0 10px;
  margin: 40px 0;
  font-size: 20px;
}
.tmsg-commentlist {
  margin-bottom: 20px;
}
.tmsg-commentshow > .tmsg-commentlist {
  border-bottom: 1px solid #e5eaed;
}
.tmsg-c-item {
  border-top: 1px solid #e5eaed;
}
.tmsg-c-item article {
  margin: 20px 0;
}
.tmsg-c-item article header {
  margin-bottom: 10px;
}
.tmsg-c-item article header img {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  float: left;
  transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  margin-right: 15px;
  object-fit: cover;
}
.tmsg-c-item article header img:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
}
.tmsg-c-item article header .i-name {
  font-size: 14px;
  margin: 5px 8px 7px 0;
  color: #444;
  font-weight: bold;
  display: inline-block;
}
.tmsg-c-item article header .i-class {
  display: inline-block;
  margin-left: 10px;
  background: #dff0d8;
  color: #3c763d;
  border-radius: 5px;
  padding: 3px 6px;
  font-size: 12px;
  font-weight: 400;
}
.tmsg-c-item article header .i-time {
  color: #aaa;
  font-size: 12px;
}
.tmsg-c-item article section {
  margin-left: 80px;
}
.tmsg-c-item article section p img {
  vertical-align: middle;
}
.tmsg-c-item article section .tmsg-replay {
  margin: 10px 0;
  font-size: 12px;
  color: #64609e;
  cursor: pointer;
}
.hbl-owo {
  text-align: left;
}
.comm {
  padding: 20px;
}
.su {
  margin-top: 2px;
  width: 5px;
  height: 23px;
  background: #3cb371; /*#1E90FF*/
}
.com-rep {
  display: inline-block;
  vertical-align: top;
}
.com-title {
  font-size: 20px;
  margin-left: 5px;
}
.com-span {
  font-size: 16px;
}
.hbl-fa {
  text-align: left;
}
.hbl-comm {
  padding: 40px;
}

.reply {
  border-top: solid 1px #d9d9d9;
}
.content {
  margin-top: 20px;
  margin-bottom: 20px;
}
.comment-f {
  display: inline-block;
  vertical-align: top;
}
.nickname {
  font-size: 14px;
}
.author {
  display: inline-block;
}
.icon {
  background: #dff0d8;
  color: #3c763d;
  border-radius: 5px;
  padding: 3px 6px;
  font-size: 12px;
  font-weight: 400px;
}
.date {
  font-size: 12px;
  margin-top: 5px;
  color: grey;
}
.reply-content {
  word-wrap: break-word;
  width: 90%;
  font-size: 15px;
  line-height: 25px;
  margin-left: 56px;
}

.reply-fa {
  margin-top: 5px;
}
.reply-font {
  margin-bottom: 5px;
  color: grey;
  cursor: pointer;
}
.children {
  padding-left: 40px;
}
.cc {
  display: inline-block;
}
.cc-to a {
  text-decoration: none;
  color: #409eff;
}
.icon-reply {
  display: inline-block;
  vertical-align: top;
}

.icon-hf {
  margin-top: 2px;
}
.hbl-child {
  padding: 20px;
}
.btn[data-v-fbaf820a] {
  height: 40px;
}
.iconfont {
  background: none;
  color: none;
  font-size: 1.5rem /* 16/16 */;
}
.support {
  margin-right: 0.3125rem /* 5/16 */;
}
</style>