<template>
  <div class="columns">
    <div class="column is-full">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span><i class="fa fa fa-book"> 主题 / 发布主题</i></span>
        </div>
        <div>
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            class="demo-ruleForm"
          >
            <el-form-item prop="postTitle">
              <el-input
                v-model="ruleForm.postTitle"
                placeholder="输入主题名称"
              />
            </el-form-item>

            <!--Markdown-->
            <div id="vditor" />

            <b-taginput
              v-model="ruleForm.tags"
              class="my-3"
              maxlength="15"
              maxtags="3"
              ellipsis
              placeholder="请输入主题标签，限制为 15 个字符和 3 个标签"
            />

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >立即创建
              </el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { post } from "@/network/post";
import Vditor from "vditor";
import "vditor/dist/index.css";
import { mapGetters } from "vuex";
export default {
  name: "Create",

  data() {
    return {
      contentEditor: {},
      ruleForm: {
        userId: "", //发帖用户的id
        postTitle: "", // 标题
        tags: [], // 标签
        postContents: "" // 内容
      },
      rules: {
        postTitle: [
          { required: true, message: "请输入话题名称", trigger: "blur" },
          {
            min: 1,
            max: 25,
            message: "长度在 1 到 25 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.ruleForm.userId = this.$store.state.user.user.userId;
  },
  mounted() {
    this.contentEditor = new Vditor("vditor", {
      height: 600,
      placeholder: "此处为话题内容……",
      theme: "classic",
      counter: {
        enable: true,
        type: "markdown"
      },
      preview: {
        delay: 0,
        hljs: {
          style: "monokai",
          lineNumber: true
        }
      },
      tab: "\t",
      typewriterMode: true,
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      mode: "sv",
      upload: {
        accept: "image/*",
        url: "http://localhost:8030/file/b-upload",
        multiple: true,
        filename(name) {
          return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g);
        },
        success(editor, msg) {
          let succFileText = "";
          //   let responseData = JSON.parse(msg);
          console.log(msg);
          //   let res =
          //     "https://upload.jianshu.io/users/upload_avatars/16442330/5636fb80-f1ab-4dff-a2b5-0b6e0e31a125.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240";
          succFileText += `![](${msg})`;
          //   console.log(succFileText);
          document.execCommand("insertHTML", false, succFileText);
        },
        error(msg) {
          console.log(msg + "上传失败了");
        },
        // handler(files) {
        //   function callback(path) {
        //     console.log(path);
        //     let name = files[0] && files[0].name;
        //     let succFileText = "";
        //     if (vditor && vditor.vditor.currentMode === "wysiwyg") {
        //       succFileText += `\n <img alt=${name} src="${path}">`;
        //     } else {
        //       succFileText += ` \n![${name}](${path})`;
        //     }
        //     document.execCommand("insertHTML", false, succFileText);
        //   }
        //   handleImageUpload(files, callback);
        // },
        linkToImgCallback() {
          console.log("api处理");
        }
        // success(editor, msg) {
        //   //   let responseData = JSON.parse(msg);

        //   console.log(msg.url);
        //   //   editor.contentEditor.insertValue("Vditor");
        //   return true;
        // },
        // error(msg) {
        //   console.log(msg + "上传失败了");
        // }
      }
    });
  },
  methods: {
    submitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            this.contentEditor.getValue().length === 1 ||
            this.contentEditor.getValue() == null ||
            this.contentEditor.getValue() === ""
          ) {
            alert("话题内容不可为空");
            return false;
          }
          if (this.ruleForm.tags == null || this.ruleForm.tags.length === 0) {
            alert("标签不可以为空");
            return false;
          }
          this.ruleForm.postContents = this.contentEditor.getValue();
          post(this.ruleForm).then(response => {
            const { data } = response;
            console.log(data);
            // this.$router.push(`/topic/detail/` + data);
            this.$router.push(``);
            setTimeout(() => {
              this.$router.push({
                name: "post-detail",
                params: { id: data.id }
              });
            }, 800);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.contentEditor.setValue("");
      this.ruleForm.tags = "";
    }
  }
};
</script>

<style>
.columns {
  margin-top: 50px;
}
</style>
