<template>
  <div class="login-container">
    <!-- <div style="position:absolute;top:0;left:0;right:0;bottom:0">
    <img src="@/assets/navigation2.png" style="width:100%;height:100%" alt="">

    </div> -->
    <div class="out">
          <h3 style="color:#fff;text-align:center;font-size:22px;text-shadow: 0 0 3px #cac6c6;">UAES Remote Calibration System</h3>

    <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-position="left" label-width="0px"
      class="demo-ruleForm login-page">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="ruleForm.username" auto-complete
        ="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" @keyup.enter.native="handleSubmit" v-model="ruleForm.password" auto-complete="off"
          placeholder="密码"></el-input>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox> -->
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      logining: false,
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: false
    };
  },
  methods: {
    handleSubmit(event) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.logining = true;
          this.$http.post("/login", this.ruleForm).then(res => {
            console.log(res);
            // var { data, status } = res;
            var {res,token,group}=res.data
            if (res == 'V') {
              this.logining = false;
              localStorage.setItem('username', this.ruleForm.username)
              localStorage.setItem('token', token)
              localStorage.setItem('group', group)
              this.$router.push({ path: "/" });
             

            } else {
              this.logining = false;
              this.$alert("账号或密码错误，请重试", "登录失败", {
                confirmButtonText: "ok"
              });
            }
          });
          // if (
          //   this.ruleForm.username === "admin" &&
          //   this.ruleForm.password === "123456"
          // ) {
          //   this.logining = false;
          //   sessionStorage.setItem("user", this.ruleForm.username);
          //   this.$router.push({ path: "/" });
          // } else {
          //   this.logining = false;
          //   this.$alert("账号或密码错误，请重试", "登录失败", {
          //     confirmButtonText: "ok"
          //   });
          // }
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
.out{
  /* margin: 180px auto; */

}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 8px #cac6c6;
   width: 350px;
   margin:0 auto;

}
.out{
    margin: 180px auto;

  /* width: 350px; */

}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>