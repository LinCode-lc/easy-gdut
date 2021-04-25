<template>
  <div class="columns py-6">
    <div class="column is-half is-offset-one-quarter">
      <el-card shadow="never">
        <div
          slot="header"
          class="has-text-centered has-text-weight-bold"
          style="font-size:20px"
        >
          新用户入驻
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
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="ruleForm.userName" id="userName"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="userPassword">
              <el-input
                type="password"
                id="pwd"
                v-model="ruleForm.userPassword"
                autocomplete="off"
              />
            </el-form-item>

            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                v-model="ruleForm.checkPass"
                type="password"
                autocomplete="off"
              />
            </el-form-item>

            <el-radio v-model="ruleForm.userSex" label="true">男</el-radio>
            <el-radio v-model="ruleForm.userSex" label="false">女</el-radio>


            <el-form-item label="联系方式" prop="userContact">
              <el-input v-model="ruleForm.userContact" id="userContact"></el-input>
            </el-form-item>

            <el-form
              :inline="true"
              ref="ruleForm2"
              :model="ruleForm"
              :rules="rules"
              class="demo-form-inline"
              label-width="100px"
            >
              <el-form-item label="邮箱" prop="email">
                <el-input
                  v-model="ruleForm.email"
                  autocomplete="off"
                  style="width:280px"
                />
              </el-form-item>
              <el-form-item>
                <b-button
                  style="padding:8px"
                  class="btn-primary"
                  size="mini"
                  :disabled="canGet"
                  @click="getCode"
                  >{{ btnText }}</b-button
                >
              </el-form-item>
            </el-form>

            <el-form-item label="验证码" prop="usercode">
              <el-input v-model="ruleForm.usercode" autocomplete="off" />
            </el-form-item>

            <el-form-item>
              <b-button
                type="btn-primary"
                @click="onSubmit('ruleForm')"
                class="mr-5"
                >提交</b-button
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
import { userRegister, sendRegEmail } from "@/network/auth";
export default {
  name: "test",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.userPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      canGet: false,
      time: 0,
      btnText: "获取验证码",
      timer: null,
      redirect: undefined,
      loading: false,

      ruleForm: {
        userName: "",
        userPassword: "",
        checkPass: "",
        usercode: "",
        email: "",
        userSex: 'true',
        userContact:'',
        userEmail:''
      },

      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur"
          }
        ],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
          }
        ],
        checkPass: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        usercode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            min: 6,
            max: 6,
            message: "请输入6位数的验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    getCode() {
      this.canGet = true;
      this.time = 60;
      this.ruleForm.userEmail = this.ruleForm.email
      console.log(this.ruleForm.email);
       console.log(this.ruleForm.sex);
       console.log(this.ruleForm.userContact);
      if (this.canGet == true) {
        sendRegEmail(this.ruleForm.email).then(res => {
          console.log(res);
        });
      }
      this.timer1();
    },

    timer1() {
      if (this.time > 0) {
        this.time--;
        this.btnText = this.time + "s后重新获取";
        this.timer = setTimeout(this.timer1, 1000);
      } else {
        this.time = 0;
        this.btnText = "获取验证码";
        this.canGet = false;
        clearTimeout(this.timer);
      }
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

    onSubmit(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.loading = true;
          userRegister(this.ruleForm)
            .then(value => {
              console.log(value)
              // const { code, message } = value;
              // if (code === 200) {
              //   this.$message({
              //     message: "账号注册成功",
              //     type: "success"
              //   });
              //   setTimeout(() => {
              //     this.loading = false;
              //     this.$router.push({ path: this.redirect || "/login" });
              //   }, 0.1 * 1000);
              // } else {
              //   this.$message.error("注册失败，" + message);
              // }
            })
            .catch(() => {
             
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