<template>
  <div class="columns py-6">
    <div class="column is-half is-offset-one-quarter">
      <el-card>
        <div
          slot="header"
          class="has-text-centered has-text-weight-bold"
          style="font-size:20px"
        >
          用户信息修改
        </div>
        <div>
          <el-form
            v-loading="loading"
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="name">
              <el-input
                v-model="ruleForm.name"
                id="name"
                placeholder="UserName"
              ></el-input>
            </el-form-item>

            <el-form-item label="性别" prop="sex">
              <a-select
                v-model="ruleForm.sex"
                style="width: 120px"
                @change="handleChange"
              >
                <a-select-option value="1">
                  男
                </a-select-option>
                <a-select-option value="0">
                  女
                </a-select-option>
              </a-select>
            </el-form-item>

            <el-form-item label="绑定邮箱" prop="email">
              <el-input
                v-model="ruleForm.email"
                autocomplete="off"
                placeholder="E-mail"
              />
            </el-form-item>

            <el-form-item label="用户电话" prop="number">
              <el-input autocomplete="off" placeholder="Number" />
            </el-form-item>

            <el-form-item label="用户地址" prop="adress">
              <el-input autocomplete="off" placeholder="Adress" />
            </el-form-item>

            <el-form-item>
              <b-button
                type="btn-primary"
                @click="onSubmit('ruleForm'), updatesuccess()"
                class="mr-5"
                >提交修改</b-button
              >
              <b-button @click="resetForm('ruleForm'), resetForm('ruleForm2')"
                >重置</b-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>


<script>
import { userRegister } from "@/network/auth";
export default {
  name: "test",
  data() {
    return {
      canGet: false,
      time: 0,
      timer: null,
      redirect: undefined,
      loading: false,

      ruleForm: {
        name: "",
        email: "",
        sex: "男"
      },

      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur"
          }
        ],
        sex: [
          { required: true, message: "请选择性别", trigger: "blur" },
          {
            message: "请选择性别",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },

  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },

    updatesuccess() {
      this.$message.success("用户信息修改成功！", 1);
    },

    // onSubmit() {
    //   let formData = new FormData();
    //   for(var key in this.ruleForm){
    //     formData.append(key,this.ruleForm[key]);
    //   }
    // axios({
    //        method:"post",
    //        url:"/test",
    //        headers: {
    //        "Content-Type": "multipart/form-data"},
    //        withCredentials:true,
    //        data:formData
    //        }).then(res=>{
    //     if(res.data.code === 0){
    //       localStorage.setItem("token",res.data.data.token)
    //       this.$router.push('/me')
    //       console.log("登录成功")
    //     }else{
    //       console.log("登录失败")
    //     }
    //   })
    // },

    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          userRegister(this.ruleForm)
            .then(value => {
              const { code, message } = value;
              if (code === 200) {
                this.$message({
                  message: "账号注册成功",
                  type: "success"
                });
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({ path: this.redirect || "/login" });
                }, 0.1 * 1000);
              } else {
                this.$message.error("注册失败，" + message);
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
</style>