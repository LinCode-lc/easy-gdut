<template>
  <div class="login">
    <!-- 登录页面 -->
    <button class="loginButton" @click="showModal">
      登 &nbsp; &nbsp;入
    </button>
    <a-modal
      :visible="visible1"
      footer=""
      @cancel="handleCancel(), resetForm()"
    >
      <img
        style="width:130px;display:block;margin:0 auto"
        src="http://120.79.162.254:8030/resources/logo-name.jpg"
      />
      <br />
      <p style="text-align:center;font-size:18px">开始探索</p>
      <a-form-model ref="ruleForm" :model="form" :rules="rules">
        <a-form-model-item ref="username" prop="username">
          <a-input
            size="large"
            style="display:block;margin:0 auto;width: 75%"
            placeholder="用户名"
            v-model.trim="form.username"
          />
        </a-form-model-item>

        <a-form-model-item ref="password" prop="password">
          <a-input-password
            size="large"
            style="display:block;margin:0 auto;width: 75%"
            type="password"
            v-model.trim="form.password"
            placeholder="密码"
          />
        </a-form-model-item>

        <a-form-model-item>
          <a-checkbox
            type="checkbox"
            checked="checked"
            v-model="form.remember"
            style="color:#8D8D8D;display:inline;margin-top:4px;margin-left:60px"
          >
            保持登录状态
          </a-checkbox>
          <a
            href="javascript:false"
            style="font-size:16px;color:#BCBCBC;text-decoration:underline;display:inline;margin-left:155px"
            @click="handleCancel(), showModal3()"
            >忘记密码?</a
          >
        </a-form-model-item>
      </a-form-model>
      <p style="font-size:14px;color:#8D8D8D;text-align:center;">
        登录即表示您同意C-GDUT的隐私政策和使用条款。
      </p>
      <a-button
        type="primary"
        size="large"
        style="display:block;margin:0 auto;width: 75%;"
        @click="userlogin()"
        >登 入
      </a-button>
      <div style="text-align:center;margin-top:20px">
        <p style="display:inline;font-size:14px;color:#8D8D8D">非会员？</p>
        <a
          href="javascript:false"
          @click="handleCancel(), showModal2(), resetForm()"
          ><p
            style="color:black;display:inline;font-size:14px;text-decoration:underline"
          >
            加入我们
          </p></a
        >
      </div>
    </a-modal>
    <!-- 登录页面 -->

    <!-- 注册页面 -->
    <a-modal
      :visible="visible2"
      footer=""
      @cancel="handleCancel2(), resetForm2()"
    >
      <img
        style="width:130px;display:block;margin:0 auto"
        src="http://120.79.162.254:8030/resources/logo-name.jpg"
      />
      <br />
      <p style="text-align:center;font-size:18px">成为C-GDUT会员</p>
      <a-form-model ref="ruleForm2" :model="form2" :rules="rules2">
        <a-form-model-item ref="username" prop="username">
          <a-input
            size="large"
            style="display:block;margin:0 auto;width: 75%"
            placeholder="用户名"
            v-model.trim="form2.username"
          />
        </a-form-model-item>

        <a-form-model-item ref="password" prop="password">
          <a-input-password
            size="large"
            style="display:block;margin:0 auto;width: 75%"
            type="password"
            v-model.trim="form2.password"
            placeholder="密码(请设置为8-16个字符)"
          />
        </a-form-model-item>

        <a-form-model-item ref="checkpass" prop="checkpass">
          <a-input
            size="large"
            style="display:block;margin:0 auto;width: 75%"
            type="password"
            v-model.trim="form2.checkpass"
            placeholder="确认密码"
          />
        </a-form-model-item>

        <a-form-model-item ref="usercontact" prop="usercontact">
          <a-input
            size="large"
            style="display:block;margin:0 auto;width: 75%"
            placeholder="联系方式"
            v-model.trim="form2.usercontact"
          />
        </a-form-model-item>

        <a-form-model-item ref="usersex" prop="usersex">
          <a-button
            :type="statu1"
            size="large"
            icon="man"
            style="display:inline;margin-left:60px;width: 36%"
            @click="checkman"
          >
            男性
          </a-button>
          <a-button
            :type="statu2"
            size="large"
            icon="woman"
            style="display:inline;margin-left:11px;width: 36%"
            @click="checkwoman"
          >
            女性
          </a-button>
        </a-form-model-item>

        <a-form-model-item ref="useremail" prop="useremail">
          <a-input
            size="large"
            style="display:block;margin:0 auto;width: 75%"
            placeholder="用户邮箱"
            v-model.trim="form2.useremail"
          />
        </a-form-model-item>

        <a-form-model-item ref="usercode" prop="usercode">
          <a-input-search
            size="large"
            style="display:block;margin:0 auto;width: 75%"
            placeholder="邮箱验证码"
            v-model.trim="form2.usercode"
            @search="getCode"
          >
            <a-button
              slot="enterButton"
              type="primary"
              style="width:124px;"
              :disabled="canGet"
            >
              {{ btnText }}
            </a-button>
          </a-input-search>
        </a-form-model-item>

        <a-form-model-item>
          <a-checkbox
            type="checkbox"
            v-model="form2.remember2"
            style="color:#8D8D8D;display:inline;margin-top:4px;margin-left:60px"
          >
            同意C-GDUT的隐私政策和使用条款。
          </a-checkbox>
        </a-form-model-item>
      </a-form-model>
      <a-button
        type="primary"
        size="large"
        style="display:block;margin:0 auto;width: 75%;"
        :disabled="!form2.remember2"
        @click="userregister()"
        >加入我们
      </a-button>
      <div style="text-align:center;margin-top:20px">
        <p style="display:inline;font-size:14px;color:#8D8D8D">已经是会员？</p>
        <a
          href="javascript:false"
          @click="handleCancel2(), showModal(), resetForm2()"
          ><p
            style="color:black;display:inline;font-size:14px;text-decoration:underline"
          >
            登 入
          </p></a
        >
      </div>
    </a-modal>
    <!-- 注册页面 -->

    <!-- 忘记密码页面 -->
    <a-modal
      :visible="visible3"
      footer=""
      @cancel="handleCancel3(), resetForm3()"
    >
      <img
        style="width:130px;display:block;margin:0 auto"
        src="http://120.79.162.254:8030/resources/logo-name.jpg"
      />
      <br />
      <p style="text-align:center;font-size:18px">重设密码</p>
      <a-form-model ref="ruleForm3" :model="form3" :rules="rules3">
        <a-form-model-item>
          <a-input-group compact>
            <a-select
              size="large"
              style="margin-left:59px"
              v-model="type"
              @change="changeoption"
            >
              <a-select-option value="用户名称">
                用户名称
              </a-select-option>
              <a-select-option value="用户邮箱">
                用户邮箱
              </a-select-option>
            </a-select>
            <a-form-model-item ref="username" prop="username" v-if="option1">
              <a-input
                size="large"
                style="width: 119%"
                placeholder="用户名称"
                v-model="form3.username"
              />
            </a-form-model-item>
            <a-form-model-item ref="useremail" prop="useremail" v-if="option2">
              <a-input
                size="large"
                style="width: 119%"
                placeholder="用户邮箱"
                v-model="form3.useremail"
              />
            </a-form-model-item>

            <a-form-model-item ref="usercode" prop="usercode">
              <a-input-search
                size="large"
                style="display:block;margin-left:58.5px;width: 90%"
                placeholder="邮箱验证码"
                v-model.trim="form3.usercode"
                @search="getCode2"
              >
                <a-button
                  slot="enterButton"
                  type="primary"
                  style="width:124px;"
                  :disabled="canGet"
                >
                  {{ btnText }}
                </a-button>
              </a-input-search>
            </a-form-model-item>

            <a-form-model-item
              ref="newpassword"
              prop="newpassword"
              v-if="option3"
            >
              <a-input-password
                size="large"
                style="margin-left:58.5px;width: 122.1%"
                placeholder="请输入新密码"
                v-model="form3.newpassword"
              />
            </a-form-model-item>
          </a-input-group>
        </a-form-model-item>
      </a-form-model>
      <p style="font-size:14px;color:#8D8D8D;text-align:center;">
        输入您的电子邮件以接收有关重置密码的验证码。
      </p>
      <a-button
        type="primary"
        size="large"
        style="display:block;margin:0 auto;width: 75%;"
        @click="checkcode"
        v-if="!option3"
        >验证身份
      </a-button>
      <a-button
        type="primary"
        size="large"
        style="display:block;margin:0 auto;width: 75%;"
        @click="reset"
        v-if="option3"
        >重置密码
      </a-button>
      <div style="text-align:center;margin-top:20px">
        <p style="display:inline;font-size:14px;color:#8D8D8D">或返回？</p>
        <a
          href="javascript:false"
          @click="handleCancel3(), showModal(), resetForm3()"
          ><p
            style="color:black;display:inline;font-size:14px;text-decoration:underline"
          >
            登录
          </p></a
        >
      </div>
    </a-modal>
    <!-- 忘记密码页面 -->
  </div>
</template>
<script>
import {
  login,
  userRegister,
  sendRegEmail,
  forget1,
  resetpassword,
  sentforget1
} from "@/network/auth";
export default {
  name: "login",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form2.password) {
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
      visible1: false,
      visible2: false,
      visible3: false,
      statu1: "primary",
      statu2: "dashed",
      email: "",
      option1: true,
      option2: false,
      option3: false,
      type: "用户名称",
      form: {
        username: "",
        password: "",
        remember: true
      },
      form2: {
        username: "",
        password: "",
        checkpass: "",
        usersex: true,
        usercontact: "",
        useremail: "",
        usercode: "",
        remember2: false
      },
      form3: {
        type: 1,
        username: "",
        useremail: "",
        usercode: "",
        newpassword: ""
      },
      rules: {
        username: [
          { required: true, message: "请填写登录用户名!", trigger: "submit" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请填写登录密码!", trigger: "submit" },
          { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
        ]
      },
      rules2: {
        username: [
          { required: true, message: "请填写登录用户名!", trigger: "submit" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请填写登录密码!", trigger: "submit" },
          { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
        ],
        checkpass: [
          { required: true, message: "请再次输入密码", trigger: "submit" },
          {
            min: 8,
            max: 16,
            message: "长度在 8 到 16 个字符",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        usercontact: [
          { required: true, message: "请填写联系方式!", trigger: "submit" },
          {
            min: 11,
            max: 11,
            message: "请输入11位数的联系号码",
            trigger: "blur"
          }
        ],
        useremail: [
          { required: true, message: "请输入邮箱地址", trigger: "submit" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "blur"]
          }
        ],
        usercode: [
          { required: true, message: "请输入验证码", trigger: "submit" },
          { min: 6, max: 6, message: "请输入6位数的验证码", trigger: "blur" }
        ]
      },
      rules3: {
        username: [
          { required: true, message: "请填写用户名", trigger: "submit" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        useremail: [
          { required: true, message: "请输入邮箱地址", trigger: "submit" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "blur"]
          }
        ],
        usercode: [
          { required: true, message: "请输入验证码", trigger: "submit" },
          { min: 6, max: 6, message: "请输入6位数的验证码", trigger: "blur" }
        ],
        newpassword: [
          { required: true, message: "请填写新密码!", trigger: "submit" },
          { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //显示登录模态框
    showModal() {
      this.visible1 = true;
    },
    //显示注册模态框
    showModal2() {
      this.visible2 = true;
      this.canGet = false;
      this.time = 0;
      this.btnText = "获取验证码";
      this.timer = null;
    },
    //显示忘记密码模态框
    showModal3() {
      this.visible3 = true;
      this.canGet = false;
      this.time = 0;
      this.btnText = "获取验证码";
      this.timer = null;
    },
    //关闭登录模态框
    handleCancel() {
      this.visible1 = false;
    },
    //关闭注册模态框
    handleCancel2() {
      this.visible2 = false;
      this.form2.remember2 = false;
    },
    //关闭忘记密码模态框
    handleCancel3() {
      this.visible3 = false;
    },
    show() {
      console.log(this.form3);
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    resetForm2() {
      this.$refs.ruleForm2.resetFields();
    },
    resetForm3() {
      this.$refs.ruleForm3.resetFields();
    },
    checkman() {
      this.form2.usersex = true;
      this.statu1 = "primary";
      this.statu2 = "dashed";
    },
    checkwoman() {
      this.form2.usersex = false;
      this.statu2 = "primary";
      this.statu1 = "dashed";
    },
    changeoption() {
      if (this.type == "用户名称") {
        this.option1 = true;
        this.option2 = false;
        this.form3.type = 1;
        this.form3.useremail = "";
      } else if (this.type == "用户邮箱") {
        this.option1 = false;
        this.option2 = true;
        this.form3.type = 2;
        this.form3.username = "";
      }
    },
    //获取注册验证码
    getCode(ruleForm2) {
      this.$refs.ruleForm2.validateField("useremail", valid => {
        if (valid == "请输入邮箱地址" || valid == "请输入正确的邮箱地址") {
          this.$Message.error("Fail!");
        } else {
          this.canGet = true;
          this.time = 60;
          if (this.canGet == true) {
            sendRegEmail(this.form2.useremail).then(res => {
              if (res.data == "该邮箱已注册") {
                this.$message.success("该邮箱已注册！", 0.1);
                this.canGet = false;
              } else if (res.data == "验证码已发送") {
                this.timer1();
                this.$message.success("验证码已发送！", 0.1);
              } else if (res.data == "您的邮箱可能已经失效,验证码发送失败！") {
                this.$message.success(
                  "您的邮箱可能已经失效,验证码发送失败！",
                  0.1
                );
                this.canGet = false;
              }
              console.log(res.data);
            });
          }
        }
      });
    },

    //获取忘记密码验证码
    getCode2(ruleForm3) {
      if (this.form3.type == "" || this.form3.type == "1") {
        this.$refs.ruleForm3.validateField("username", valid => {
          console.log(valid);
          if (valid == "请填写用户名" || valid == "长度在 2 到 10 个字符") {
            this.$Message.error("Fail!");
          } else {
            this.canGet = true;
            this.time = 60;
            if (this.canGet == true) {
              forget1(this.form3.username, this.form3.type).then(res => {
                if (res.data == "验证码已发送") {
                  this.timer1();
                  this.$message.success("验证码已发送！", 0.1);
                } else if (res.data == "用户不存在") {
                  this.$message.success("用户不存在！", 0.1);
                  this.canGet = false;
                }
                console.log(res.data);
              });
            }
          }
        });
      } else {
        this.$refs.ruleForm3.validateField("useremail", valid => {
          console.log(valid);
          if (valid == "请输入邮箱地址" || valid == "请输入正确的邮箱地址") {
            this.$Message.error("Fail!");
          } else {
            this.canGet = true;
            this.time = 60;
            if (this.canGet == true) {
              forget1(this.form3.useremail, this.form3.type).then(res => {
                if (res.data == "验证码已发送") {
                  this.timer1();
                  this.$message.success("验证码已发送！", 0.1);
                } else if (res.data == "该邮箱未注册") {
                  this.$message.success("该邮箱未注册！", 0.1);
                  this.canGet = false;
                }
                console.log(res.data);
              });
            }
          }
        });
      }
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
    //用户登录
    userlogin(ruleForm) {
      console.log(ruleForm);

      console.log(0);
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("user/login", this.form).then(res => {
            this.visible1 = false;
            this.resetForm();
          });
          // .catch(res => {
          //   if ((res = 0)) {
          //     this.$message.success("用户不存在！", 0.1);
          //   } else if ((res = 1)) {
          //     this.$message.success("用户名或密码错误！", 0.1);
          //   }
          // });
          // login(this.form.username, this.form.password).then(response => {
          //   if (response.data == "用户不存在") {
          //     this.$message.success("用户不存在！", 0.1);
          //   } else if (response.data == "用户名或密码错误") {
          //     this.$message.success("用户名或密码错误！", 0.1);
          //   } else {
          //     this.$message.success("登入成功！", 0.1);
          //     this.visible1 = false;
          //     this.resetForm();
          //   }
          // });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    //用户注册
    userregister(ruleForm2) {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          userRegister(this.form2).then(response => {
            if (response.data == "注册成功") {
              this.$message.success("您已成为C-GDUT会员！", 0.1);
              this.visible2 = false;
              this.resetForm2();
            } else if (response.data == "该用户名已存在") {
              this.$message.success("该用户名已存在，请重新选择用户名！", 0.1);
            } else if (response.data == "验证码错误") {
              this.$message.success("验证码错误，请重新确认！", 0.1);
            }
            console.log(response.data);
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    //  验证用户找回密码资格
    checkcode(ruleForm3) {
      this.$refs.ruleForm3.validate(valid => {
        if (valid) {
          if (this.form3.type == "1" || this.form3.type == "0") {
            sentforget1(
              this.form3.usercode,
              this.form3.username,
              this.form3.type
            ).then(response => {
              if (response.data) {
                this.$message.success("身份验证成功，请输入新密码！", 0.1);
                this.option3 = true;
              } else {
                this.$message.success("身份验证失败！", 0.1);
              }
            });
          } else {
            sentforget1(
              this.form3.usercode,
              this.form3.useremail,
              this.form3.type
            ).then(response => {
              if (response.data) {
                this.$message.success("身份验证成功，请输入新密码！", 0.1);
                this.option3 = true;
              } else {
                this.$message.success("身份验证失败！", 0.1);
              }
            });
          }
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    // 找回密码
    reset(ruleForm3) {
      this.$refs.ruleForm3.validate(valid => {
        if (valid) {
          if (this.form3.type == "1" || this.form3.type == "0") {
            resetpassword(
              this.form3.usercode,
              this.form3.type,
              this.form3.username,
              this.form3.newpassword
            ).then(response => {
              if (response.data) {
                this.$message.success("重置密码成功！", 0.1);
                this.visible3 = false;
                this.visible1 = true;
                this.option3 = false;
                this.resetForm3();
              } else {
                this.$message.success("重置密码失败，请联系管理员！", 0.1);
              }
            });
          } else {
            resetpassword(
              this.form3.usercode,
              this.form3.type,
              this.form3.useremail,
              this.form3.newpassword
            ).then(response => {
              if (response.data) {
                this.$message.success("重置密码成功！", 0.1);
                this.visible3 = false;
                this.visible1 = true;
                this.option3 = false;
                this.resetForm3();
              } else {
                this.$message.success("重置密码失败，请联系管理员！", 0.1);
              }
            });
          }
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
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
</style>