<template>
  <div class="login-container">
    <!-- <div style="position:absolute;top:0;left:0;right:0;bottom:0">
    <img src="@/assets/navigation2.png" style="width:100%;height:100%" alt="">

    </div> -->
    <div class="out">
      <h3 style="color:#fff;text-align:center;font-size:22px;text-shadow: 0 0 3px #cac6c6;">UAES Remote Calibration
        System</h3>

      <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-position="left" label-width="0px"
        class="demo-ruleForm login-page">
        <h3 class="title">修改密码</h3>
        <el-form-item prop="PA">
          <el-input type="text" disabled="" v-model="ruleForm.PA" auto-complete="off" placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <input type="password" style="display:none"> <!-- 为了去掉记住密码的功能  -->
        <el-form-item prop="oldpassword">
          <el-input type="password" @keyup.enter.native="handleSubmit" v-model="ruleForm.oldpassword"
            auto-complete="off" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item prop="newpassword">
          <el-input type="password" @keyup.enter.native="handleSubmit" v-model="ruleForm.newpassword"
            auto-complete="off" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPassword">
          <el-input type="password" @keyup.enter.native="handleSubmit" v-model="ruleForm.checkPassword"
            auto-complete="off" placeholder="确认新密码"></el-input>
        </el-form-item>

        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">修改</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.ruleForm.checkPassword !== "") {
          this.$refs.ruleForm.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.ruleForm.newpassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      logining: false,
      ruleForm: {
        PA: localStorage.getItem("username"),
        oldpassword: "",
        newpassword: "",
        checkPassword: ""
      },
      // rules: {
      //   username: [
      //     {
      //       required: true,
      //       message: "请输入账号",
      //       trigger: "blur"
      //     }
      //   ],
      //   oldpassword: [{ required: true, message: "请输入密码", trigger: "blur" }],
      //   password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      //   checkPassword: [{ required: true, message: "请输入密码", trigger: "blur" }],
      // },
      rules: {
        PA: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        oldpassword: [
          {
            required: true,
            message: "请输入旧密码",
            trigger: "blur"
          }
        ],

        newpassword: [{ validator: validatePass, trigger: "blur" }],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }]
      },
      checked: false
    };
  },

  methods: {
    handleSubmit(event) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.logining = true;
          this.$http
            .post("/admin/updatePersonalInfo", this.ruleForm)
            .then(res => {
              console.log(res);
              // var { data, status } = res;
              var { res, data, detail } = res.data;
              if (res == "V") {
                this.logining = false;
                localStorage.removeItem("username");
                localStorage.removeItem("token");
                localStorage.removeItem("group");

                this.$alert("修改密码成功", "修改成功", {
                  // confirmButtonText: "ok"
                  callback: () => {
                    this.$message({
                      type: "success",
                      message: "修改密码成功,请重新登录"
                    });
                    this.$router.push({ path: "/login" });
                  }
                });
                // this.$router.push({ path: "/" });
              } else {
                this.logining = false;
                this.$alert(detail, "修改失败", {
                  // confirmButtonText: "ok"
                });
              }
            })
            .catch(err => {
              console.log(err);
              this.logining = false;
              this.$message({
                type: "error",
                message: "修改失败!"
              });
            });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
/* html{

} */

.login-container {
  width: 100%;
  height: 100%;
  min-height: 700px;
  background-image: url(../assets/background.jpg);
  background-size: cover; /* 使图片平铺满整个浏览器（从宽和高的最大需求方面来满足，会使某些部分无法显示在区域中） */
  position: absolute;
  z-index: -1;
  background-repeat: no-repeat;
}

.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 8px #cac6c6;
  width: 350px;
  margin: 0 auto;
}
.out {
  margin: 100px auto 50px auto;

  /* width: 350px; */
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>