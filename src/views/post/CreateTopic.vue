<template>
  <div class="creat-topic">
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
// import { post } from "@/network/post";

import { mapGetters } from "vuex";
export default {
  name: "CreateTpoic",

  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(fileList);
      console.log(this.dialogImageUrl);
    },
    handlePictureCardPreview(file, fileList) {
      console.log(this.dialogImageUrl);
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  created() {
    this.ruleForm.userId = this.$store.state.user.user.userId;
  }
};
</script>

<style>
</style>
