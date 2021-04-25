<template>
  <div class="columns py-6">
    <div class="column is-half is-offset-one-quarter">
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
          <el-card>
            <div
              slot="header"
              class="has-text-centered has-text-weight-bold"
              style="font-size:20px"
            >
              <label
                ><a-icon @click="back" type="rollback" style="margin-left:500px"
              /></label>
              密码找回
            </div>

            <el-tabs
              v-model="activeName"
              @tab-click="
                handleClick();
                reset();
              "
            >
              <el-tab-pane label="用户名找回" name="first">
                <el-form-item label="用户名" prop="name">
                  <el-input
                    v-model="ruleForm.name"
                    id="name"
                    placeholder="请输入您的用户名"
                  ></el-input>
                </el-form-item>

                <el-form
                  :inline="true"
                  ref="ruleForm2"
                  :model="ruleForm"
                  :rules="rules"
                  class="demo-form-inline"
                  label-width="100px"
                >
                  <el-form-item label="验证码" prop="authcode">
                    <el-input
                      v-model="ruleForm.authcode"
                      autocomplete="off"
                      style="width:265px"
                      placeholder="6位数验证码"
                    />
                  </el-form-item>
                  <el-form-item>
                    <b-button
                      style="padding:8px"
                      class="btn-primary"
                      size="mini"
                      :disabled="canGet"
                      @click="getCode1()"
                      >{{ btnText }}</b-button
                    >
                  </el-form-item>
                  <el-form-item>
                    <b-button
                      type="btn-primary"
                      @click="onSubmit1('ruleForm')"
                      style="margin-left:100px"
                      class="mr-5"
                      >提交</b-button
                    >
                    <b-button
                      @click="resetForm('ruleForm'), resetForm('ruleForm2')"
                      >重置</b-button
                    >
                  </el-form-item>
                </el-form>
              </el-tab-pane>

              <el-tab-pane label="邮箱找回" name="second">
                <el-form-item label="邮箱" prop="email">
                  <el-input
                    v-model="ruleForm.email"
                    autocomplete="off"
                    placeholder="请输入您的邮箱号"
                  />
                </el-form-item>

                <el-form
                  :inline="true"
                  ref="ruleForm2"
                  :model="ruleForm"
                  :rules="rules"
                  class="demo-form-inline"
                  label-width="100px"
                >
                  <el-form-item label="验证码" prop="authcode">
                    <el-input
                      v-model="ruleForm.authcode"
                      autocomplete="off"
                      style="width:265px"
                      placeholder="6位数验证码"
                    />
                  </el-form-item>
                  <el-form-item>
                    <b-button
                      style="padding:8px"
                      class="btn-primary"
                      size="mini"
                      :disabled="canGet"
                      @click="getCode2()"
                      >{{ btnText }}</b-button
                    >
                  </el-form-item>
                  <el-form-item>
                    <b-button
                      type="btn-primary"
                      @click="onSubmit2('ruleForm')"
                      style="margin-left:100px"
                      class="mr-5"
                      >提交</b-button
                    >
                    <b-button
                      @click="resetForm('ruleForm'), resetForm('ruleForm2')"
                      >重置</b-button
                    >
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script>
import {
  userRegister,
  forget1,
  forget2,
  sentforget1,
  sentforget2
} from "@/network/auth";
export default {
  name: "Forget",
  data() {
    return {
      canGet: false,
      time: 0,
      btnText: "获取验证码",
      timer: null,
      redirect: undefined,
      loading: false,
      activeName: "first",

      ruleForm: {
        name: "",
        authcode: "",
        email: ""
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
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        authcode: [
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
    getCode1() {
      this.canGet = true;
      console.log(this.ruleForm, 1);
      this.time = 60;
      this.timer1();
      forget1(this.ruleForm.name, 1)
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
    },
    getCode2() {
      this.canGet = true;
      this.time = 60;
      this.timer1();
      forget2(this.ruleForm.email, 2)
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
    },
    onSubmit1() {
      sentforget1(this.ruleForm.authcode, this.ruleForm.name, 1)
        .then(value => {
          console.log(value);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    onSubmit2() {
      sentforget1(this.ruleForm.authcode, this.ruleForm.email, 2)
        .then(value => {
          console.log(value);
        })
        .catch(() => {
          this.loading = false;
        });
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

    // sendsuccess1() {
    //   this.$message.success("验证码已发送到该邮箱！", 1);
    // },

    sendsuccess2() {
      this.$message.success("验证码已发送到该用户名绑定的邮箱！", 1);
    },

    back() {
      window.history.back(-1);
    },

    reset() {
      this.time = 0;
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },

    onSubmit(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          forget(this.ruleForm)
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