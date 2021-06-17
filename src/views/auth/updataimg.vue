<template>
  <div class="updataimg">
    <!-- 修改头像 -->
    <a-button type="primary" @click="showModal">修改头像</a-button>
    <a-modal :visible="visible1" footer="" @cancel="handleCancel2()">
      <a-upload
        :action="action"
        list-type="picture-card"
        :file-list="fileList"
        @preview="handlePreview"
        @change="handleChange"
      >
        <div v-if="fileList.length < 1" style="margin:0 auto">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>

      <!-- <a-button
        type="primary"
        size="large"
        style="display:block;margin:0 auto;width: 75%;"
        @click="userlogin()"
        >更换头像
      </a-button> -->
    </a-modal>
    <!-- 修改头像 -->
  </div>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
import { mapGetters } from "vuex";
export default {
  name: "updataimg",
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      fileList: [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: ""
        }
      ],
      redirect: undefined,
      loading: false,
      visible1: false,
      option1: true,
      type: "用户名称",
      form: {
        username: "",
        password: "",
        remember: true
      }
    };
  },
  methods: {
    //显示登录模态框
    showModal() {
      this.visible1 = true;
    },
    //关闭登录模态框
    handleCancel2() {
      this.visible1 = false;
    },
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
    handleChange({ fileList }) {
      this.fileList = fileList;
      console.log(fileList);
    }
  },
  computed: {
    ...mapGetters(["token", "user"])
  },
  created() {
    console.log(this.$store.state.user.user.userId);
    this.action = `http://localhost:8030/user/updateavatar/${this.$store.state.user.user.userId}`;
  }
};
</script>
<style scoped>
.loginButton {
  background-color: var(--subjectColor);
  opacity: 0.8;
  border: none;
  color: aliceblue;
  padding: 0.625rem /* 10/16 */ 2rem;
  font-size: 15px;
  border-radius: 0.3125rem /* 5/16 */;
  margin-top: 0.9375rem /* 15/16 */;
}
.ant-btn-primary {
  background-color: var(--subjectColor);
  border-color: var(--subjectColor);
  opacity: 0.8;
}
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>