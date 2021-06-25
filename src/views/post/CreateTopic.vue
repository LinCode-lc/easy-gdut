<template>
  <div id="creat">
    <!-- 标签开始 -->
    <div class="tags">
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput"
        >+ 添加标签</el-button
      >
      <button @click="showDrawer2" class="choose-tags">选择标签</button>
    </div>

    <!-- 标签结束 -->

    <!-- ===== -->
    <!-- 链接 -->
    <div class="ref-box" v-if="showLink">
      <span>链 接:</span
      ><input type="text" v-model="linkList.address" class="ref-input" />
      <span>提取码:</span
      ><input type="text" v-model="linkList.extractCode" class="ref-input" />
    </div>
    <!-- --- -->
    <div class="outer">
      <div class="create-content">
        <div>
          <div class="hbl-comm">
            <!-- 文字 -->
            <div
              class="comment"
              :style="{ width: commentWidth, height: commentHeight }"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: minRows, maxRows: maxRows }"
                :placeholder="placeholder"
                :style="{ border: '0px;' }"
                v-model="textareaMap"
              >
              </el-input>
              <!-- <div v-if="showFlag" class="hbl-owo">
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
                      <img
                        :src="
                          require('../../components/common/comment/img/face/' +
                            oitem.url)
                        "
                        alt=""
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div> -->
              <!-- 照片墙 -->
              <div class="creat-topic">
                <a-upload
                  action="http://112.74.182.209:80/api/post/edit/image-upload"
                  list-type="picture-card"
                  :file-list="fileList"
                  @preview="handlePreview"
                  @change="handleChange"
                  multiple
                >
                  <div v-if="fileList.length < 9">
                    <a-icon type="plus" />
                  </div>
                </a-upload>
                <a-modal
                  :visible="previewVisible"
                  :footer="null"
                  @cancel="handleCancel"
                >
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </div>
              <!-- ------- -->
              <div class="publish publish-btn">
                <button class="btn" @click="doSend()">发送</button>
                <button @click="cancel(0)" class="btn btn-cancel">取消</button>
              </div>
            </div>
          </div>
          <!-- 发送 -->
        </div>
        <!-- ---- -->
        <!-- 侧边栏 -->
        <div class="choose-img">
          <div @click="showButton(0)">
            <img src="@/assets/img/expression.svg" class="slide-img" alt="" />
            <span>表情</span>
          </div>
          <div @click="showDrawer">
            <img src="@/assets/img/file.svg" alt="" class="slide-img" />
            <span>文件</span>
          </div>
          <div>
            <img
              @click="showhref"
              src="@/assets/img/href.svg"
              alt=""
              class="slide-img"
            />
            <span>链接</span>
          </div>
        </div>
        <!-- --------- -->
      </div>
      <!-- 表情 -->
      <div v-if="showFlag" class="hbl-owo">
        <div
          :class="pBodyMap[0] ? 'OwO' : 'OwO OwO-open'"
          class="emoj publish"
          :style="{ width: emojiWidth }"
        >
          <div class="OwO-body">
            <ul class="OwO-items OwO-items-show">
              <li
                class="OwO-item"
                v-for="(oitem, index) in OwOlist"
                :key="'oitem' + index"
                @click="choseEmoji(oitem.title)"
              >
                <img
                  :src="
                    require('../../components/common/comment/img/face/' +
                      oitem.url)
                  "
                  alt=""
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- --- -->

    <!-- ==== -->
    <!-- 文件上传,抽屉 -->
    <div>
      <a-radio-group style="margin-right: 8px" :default-value="placement">
      </a-radio-group>

      <a-drawer
        title="文件上传"
        :placement="placement"
        :closable="false"
        :visible="visible"
        @close="onClose"
      >
        <!-- <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p> -->
        <!-- <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8030/post/edit/file-upload"
          multiple
          :show-file-list="true"
          :file-list="uploadList"
          @on-success="handleUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过?kb
          </div>
        </el-upload> -->
        <a-upload
          action="http://localhost:8030/post/edit/file-upload"
          :multiple="true"
          :file-list="fileList2"
          @change="handleChange2"
        >
          <a-button> <a-icon type="upload" /> Upload </a-button>
        </a-upload>
      </a-drawer>
    </div>
    <!-- 文件上传结束 -->
    <!-- 抽屉标签选择 -->
    <div>
      <a-radio-group style="margin-right: 8px" :default-value="placement2">
      </a-radio-group>

      <a-drawer
        title="标签选择"
        :placement="placement2"
        :closable="false"
        :visible="visible2"
        @close="onClose2"
      >
        <!-- <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p> -->
        <a-list item-layout="horizontal" :data-source="tagsData">
          <a-list-item
            slot="renderItem"
            slot-scope="item"
            @click="selectTag(item.topicName)"
          >
            <a-list-item-meta :description="item.topicStatement">
              <span slot="title">{{ item.topicName }}</span>
              <a-avatar slot="avatar" :src="item.topicImageSrc" />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-drawer>
    </div>
    <!-- -- -->
    <!-- 抽屉板块选择 -->
    <div>
      <a-radio-group style="margin-right: 8px" :default-value="placement3">
      </a-radio-group>

      <a-drawer
        title="板块选择"
        :placement="placement3"
        :closable="true"
        :visible="visible3"
        @close="onClose3"
      >
        <!-- <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p> -->
        <div>
          <div>
            <a-radio-group v-model="plateId" @change="onChange">
              <a-radio-button value="2">
                学习资料
              </a-radio-button>
              <a-radio-button value="3">
                跑腿服务
              </a-radio-button>
              <a-radio-button value="4">
                闲置交易
              </a-radio-button>
              <a-radio-button value="5">
                校园组队
              </a-radio-button>
              <a-radio-button value="1">
                其他
              </a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <button
          @click="onClose3"
          style="border:none;background-color:#fff;margin:30px 0 0 300px"
        >
          确定
        </button>
      </a-drawer>
    </div>
    <!-- ---------- -->
  </div>
</template>

<script>
// import { post } from "@/network/post";

import { mapGetters } from "vuex";
import { getTagList, postTopic, removeImg } from "@/network/post";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  name: "CreateTpoic",

  data() {
    return {
      //板块
      plateId: "0",
      //标签列表
      tagsData: ["后端数据库", "fmcdsl"],

      //链接内容
      // linkCode: "",
      // linkInput: `http://www.baidu.kkkaaa.com`,
      linkList: {
        address: ``,
        extractCode: ""
      },
      showLink: false,
      //文件上传
      visible: false,
      placement: "right",
      fileList2: [
        {
          uid: "-1",
          name: "xxx.png",
          status: "done",
          url: "http://www.baidu.com/xxx.png"
        }
      ],
      //标签选择
      placement2: "right",
      visible2: false,
      //板块选择
      placement3: "top",
      visible3: true,

      //antDesign的图片上传
      previewVisible: false,
      previewImage: "",
      fileList: [],

      //板块选择
      radio: 3,
      //上传链接
      input1: "",
      input2: "",
      input3: "",
      select: "",
      // 标签
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      //评论

      showFlag: false,
      pBodyMap: [],
      textareaMap: "",
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
      dialogImageUrl: "",
      dialogVisible: false,
      //
      postId: "123"
      // postUrl: "http://localhost:8030/file"
    };
  },
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
      default: "在此分享你的想法..."
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

    commentWidth: {
      type: String,
      default: "100%"
    },
    commentHeight: {
      type: String,
      default: "80%"
    }
  },
  computed: {
    postPath: function() {
      return this.postUrl + `?postId=${this.postId}`;
    }
  },
  methods: {
    //发布
    doSend() {
      let fileList = this.fileList;
      let fileList2 = this.fileList2;

      let imgList = [];
      for (let item of fileList) {
        imgList.push(item.response);
      }
      let uploadList = [];
      for (let item of fileList2) {
        uploadList.push(item.response);
      }
      console.log(imgList);
      console.log(uploadList);
      console.log(this.linkList);
      console.log(this.plateId);
      console.log(this.$store.state.user.user.userId);

      console.log(this.dynamicTags);
      let allMessage = {
        imageUriList: imgList,
        link: this.linkList,
        plateId: this.plateId,
        postContents: this.textareaMap,
        topicNameList: this.dynamicTags,
        userId: this.$store.state.user.user.userId,
        fileUriList: uploadList
      };
      console.log(allMessage);
      postTopic(allMessage).then(res => {
        console.log(res);
        this.$router.go(-1);
      });
    },
    //板块选择
    onChange(e) {
      console.log(`checked = ${e.target.value}`);
    },
    onClose3() {
      this.visible3 = false;
    },
    //选择标签
    selectTag(name) {
      this.dynamicTags.push(name);
    },
    //显示链接框
    showhref() {
      this.showLink = !this.showLink;
    },
    //文件上传
    handleChange2(info) {
      let fileList = [...info.fileList];

      // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-2);

      // 2. read from response and show file link
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });

      this.fileList2 = fileList;
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    //选择标签
    showDrawer2() {
      this.visible2 = true;
    },
    onClose2() {
      this.visible2 = false;
    },

    //antDesign图片上传的方法
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      this.fileList = fileList;
      if (file.status === "removed") {
        removeImg(file.response).then(res => {
          console.log(res);
        });
      }
    },

    //标签
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    //-----------

    handlePictureCardPreview(file, fileList) {
      console.log(this.dialogImageUrl);
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //选择表情包
    choseEmoji: function(inner) {
      var con = "";
      if (!this.textareaMap) {
        this.textareaMap = "";
        // this.$set(this.textareaMap,  "");
      }
      con = this.textareaMap += "[" + inner + "]";
      this.textareaMap = con;
      // this.$set(this.textareaMap, index, con);
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
          var s = require("../../components/common/comment/img/face/" + src);
          var imoj = "<img src='" + s + "'/>";

          str = str.replace(pattern2, imoj);
        }
      }
      return str;
    },
    showButton() {
      this.showFlag = !this.showFlag;
    },
    cancel(index) {
      this.showFlag = false;
    }
  },
  created() {
    //获取标签列表
    getTagList().then(res => {
      console.log(res.data);
      this.tagsData = res.data;
    });
    // this.ruleForm.userId = this.$store.state.user.user.userId;
  }
};
</script>


<style type="text/css" scoped >
#creat {
  height: 100%;
  width: 100%;
  background-color: var(--themeColor);
  position: relative;
  padding-bottom: 3000px;
  margin-bottom: 3000px;
  padding-left: 3.75rem /* 300/16 */;
  padding-top: 1.75rem /* 300/16 */;
}
.outer {
  display: flex;
}
.create-content {
  display: flex;
  margin-left: 18.75rem /* 300/16 */;
}
/* 发送，取消样式 */
.publish {
  position: absolute;
  bottom: 1.25rem /* 20/16 */;
  right: 1.25rem /* 20/16 */;
}
/* 选择标签 */
.choose-tags {
  margin-left: 6.25rem /* 100/16 */;
  border: none;
  background-color: var(--themeColor);
  position: absolute;
  right: 1.25rem /* 20/16 */;
}
.button-new-tag[data-v-3188e09e] {
  background-color: var(--themeColor);
}
.el-tag--light {
  background-color: var(--createColor) !important;
  border: 1px solid rgb(167, 159, 159) !important;
}
.choose-tags::after {
  content: ">";
  font-size: 15px;
  padding-left: 0.625rem /* 10/16 */;
}
/* 文件上传样式 */
.upload-demo >>> .el-upload-dragger {
  width: 18.75rem; /* 300/16 */
  font-size: 15px;
}
/* 链接样式 */
.ref-input {
  padding: 0.625rem /* 10/16 */;
  border: none;
  outline: none;
  background-color: var(--createColor);
}

.ref-box :nth-child(2) {
  display: inline-block;
  width: 30rem /* 80/16 */;
}
.ref-box {
  margin-left: 18.75rem /* 300/16 */;
  font-size: 14px;
  border: var(--createBorder);
  width: 58.5rem /* 400/16 */;
  background-color: var(--createColor);
  padding-left: 1.25rem /* 20/16 */;
}
/* 侧边选择栏的样式 */

.slide-img {
  height: 2.5rem /* 40/16 */;
  width: 2.5rem /* 40/16 */;
}

.choose-img {
  height: 46.25rem /* 200/16 */;
  width: 8.5rem /* 80/16 */;
  border: var(--createBorder);
  background-color: var(--createColor);
}
.choose-img div {
  height: 2.5rem /* 40/16 */;
  width: 2.5rem /* 40/16 */;
  margin: 50px auto;
}
/* 使输入框边框变无 */
.comment >>> .el-textarea__inner {
  border: none;
  background-color: var(--createColor);
}
/* --- */
.upload-demo {
  width: 220px;
}

/* antdesign图片上传的样式 */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
/* 照片强+号的样式 */
.creat-topic >>> .ant-upload-select-picture-card {
  background-color: var(--createColor);
}
/* .creat {
  display: flex;
} */
/* 标签样式 */
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.tags {
  position: relative;
  margin-left: 17.8125rem /* 45/16 */ /* 50/16 */ /* 65/16 */ /* 60/16 */
    /* 50/16 */;
  margin-top: 2.8125rem /* 45/16 */ /* 50/16 */;
  width: 58.75rem /* 300/16 */;
}
.el-tag {
  background-color: #fff;
  color: #000;
  border-color: cornsilk;
}

/* 标签样式 */
.creat-topic {
  position: absolute;
  width: 37.5rem /* 600/16 */;
  bottom: 0;
  left: 0;
  margin-top: 3.125rem /* 50/16 */;
}
.supportOrNonsupport {
  display: inline;
  margin-left: 3.125rem /* 50/16 */;
  font-size: 1.4rem /* 16/16 */;
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
  height: 3rem /* 30/16 */; /* 高度 */
  border-width: 0px; /* 边框宽度 */

  cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
  outline: none; /* 不显示轮廓线 */
  font-family: Microsoft YaHei; /* 设置字体 */
  color: black; /* 字体颜色 */
  font-size: 0.8125rem /* 13/16 */; /* 字体大小 */
  text-align: center;
  line-height: 1.875rem /* 30/16 */;
  border-radius: 0.3125rem /* 5/16 */;
  display: inline-block;
  margin-left: 0.3125rem /* 5/16 */;
  margin-right: 0.3125rem /* 5/16 */;
  border: var(--createBorder);
}
.btn-cancel {
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
  width: 80%;
}

.OwO {
  position: relative;
  z-index: 1;
}
.OwO .OwO-items[data-v-3188e09e] {
  max-width: 25.3125rem;
}
.el-textarea__inner {
  border: 0px solid var(--createColor);
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
  background: var(--themeColor);
  border: 1px solid #ddd;
  z-index: 1;
  top: 1.8125rem /* 29/16 */;
  border-radius: 0 0.25rem /* 4/16 */ 0.25rem /* 4/16 */ 0.25rem /* 4/16 */;
  display: none;
  left: 1.25rem /* 20/16 */;
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
  position: relative;
  width: 50rem /* 800/16 */;
  height: 46.25rem /* 900/16 */;
  border: var(--createBorder);
  background-color: var(--createColor);
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

.el-textarea__inner {
  background-color: black !important;
}
</style>
