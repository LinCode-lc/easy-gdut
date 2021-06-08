<template>
  <div class="columns">
    <!--文章详情-->

    <div class="column is-three-quarters middle">
      <!--主题-->
      <div ref="getHeight">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="has-text-centered">
            <h1 class="is-size-8 has-text-weight-bold">{{ postTitle }}</h1>
            <div class="has-text-grey is-size-7 mt-3">
              <span>{{
                dayjs(topic.createTime).format("YYYY/MM/DD HH:mm:ss")
              }}</span>
              <el-divider direction="vertical" />
              <span>发布者：{{ topicUser.alias }}</span>
              <el-divider direction="vertical" />
              <span>查看：{{ parseCount }}</span>
            </div>
          </div>

          <!--Markdown-->
          <div id="preview" />

          <!--标签-->
          <nav class="level has-text-grey is-size-7 mt-6">
            <div class="level-left">
              <p class="level-item">
                <b-taglist>
                  <router-link
                    v-for="(tag, index) in tags"
                    :key="index"
                    :to="{ name: 'tag', params: { name: tag.name } }"
                  >
                    <b-tag type="is-info is-light mr-1">
                      {{ "#" + tag.name }}
                    </b-tag>
                  </router-link>
                </b-taglist>
              </p>
            </div>
            <div v-if="token && user.id === topicUser.id" class="level-right">
              <router-link
                class="level-item"
                :to="{ name: 'topic-edit', params: { id: topic.id } }"
              >
                <span class="tag">编辑</span>
              </router-link>
              <a class="level-item">
                <span class="tag" @click="handleDelete(topic.id)">删除</span>
              </a>
            </div>
          </nav>
        </el-card>
      </div>

      <!-- <lv-comments :slug="topic.id" />  -->
      <!-- <Comment :commentList="commentData"></Comment> -->
      <Comment
        :postId="topicId"
        :userId="this.$store.state.user.user.userId"
      ></Comment>
    </div>

    <div class="column">
      <!--作者-->
      <Author v-if="flag" :user="topicUser" />
      <div ref="commend">
        <CommendBar
          @clickItem="doClick"
          :isCollection="isCollection"
          :isSupport="isSupport"
        ></CommendBar>
      </div>

      <!--推荐-->
      <!-- <CommendBar :commentList="commentData" /> -->
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
  removeSupport
} from "@/network/detail.js";
import Vditor from "vditor";
import { mapGetters } from "vuex";
import Author from "@/components/content/Author";
import CommendBar from "@/components/common/CommendBar";
import Comment from "@/components/common/comment/Comment";

export default {
  name: "TopicDetail",
  components: {
    Author,
    CommendBar,
    Comment
  },
  data() {
    //设置flag初始值为false,当子组件挂载完后再显示
    return {
      flag: false,
      topic: {
        content: "",
        id: this.$route.params.id
      },
      topicId: this.$route.params.id,
      tags: [],
      topicUser: {},
      commentData: [],
      parseCount: 0,
      postTitle: "",
      isCollection: false,
      isSupport: false
    };
  },
  created() {
    console.log(this.$route.params.id);
    //请求评论内容
    // getCommentList(this.$route.params.id).then(response => {
    //   console.log("下面一行打印评论");
    //   const { data } = response;
    //   this.commentList = data;
    //   console.log(data);
    // });
  },
  computed: {
    ...mapGetters(["token", "user"])
  },
  mounted() {
    this.fetchTopic();
  },
  methods: {
    renderMarkdown(md) {
      Vditor.preview(document.getElementById("preview"), md, {
        hljs: { style: "github" }
      });
    },
    // 初始化
    async fetchTopic() {
      getTopic(this.$route.params.id).then(response => {
        const { data } = response;
        console.log(data);
        // console.log(data.postContents);
        // console.log(data.user);
        document.title = data.topicTitle;
        this.parseCount = data.parseCount;
        console.log(this.parseCount);
        this.postTitle = data.postTitle;
        this.topic = data;
        this.tags = data.tags;
        this.topicUser = data.user;
        // this.comments = data.comments
        this.renderMarkdown(data.postContents);
        this.flag = true;
      });

      // getCommentList(this.$route.params.id).then(response => {
      //   console.log("下面一行打印评论");
      //   const { data } = response;
      //   this.commentData = data;
      //   console.log(data);
      //   console.log(this.commentData);
      // });
      //判断该用户是否已经对该帖子点过赞
      hasSupport(
        this.$route.params.id,
        this.$store.state.user.user.userId
      ).then(result => {
        console.log(result);
        this.isSupport = result;
      });
    },

    handleDelete(id) {
      deleteTopic(id).then(value => {
        const { code, message } = value;
        alert(message);

        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: "/" });
          }, 500);
        }
      });
    },
    //处理右侧边栏图标的点击事件
    doClick(index) {
      // console.log(this.$refs.getHeight.offsetHeight);
      // console.log(index);
      // console.log(this.$refs.commend);
      // console.log(this.$refs.commend.offsetTop);
      let postId = this.topicId;
      let userId = this.$store.state.user.user.userId;
      if (index === 1) {
        window.scrollTo({
          top: this.$refs.getHeight.offsetHeight,

          behavior: "smooth"
        });
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
/* #preview {
  height: 500px;
} */
.columns {
  margin-top: 10px;
}
.middle {
  padding: 30px;
}
</style>