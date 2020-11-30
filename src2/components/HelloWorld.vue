<template>
  <el-container>
    <el-header style="z-index:100;" :style="{'background':menubgc}">
      <!-- style="text-align: right; font-size: 12px;" -->
      <div style="width:1100px;margin:0 auto;">
        <el-menu :default-active="activePath" class="el-menu-demo" mode="horizontal" :background-color="menubgc"
          text-color="#fff" active-text-color="#ffd04b" router style="position:relative">
          <!-- @select="handleSelect" -->
          <el-menu-item index="/home">Home</el-menu-item>
          <el-menu-item v-if="this.right.admin" index="/admin">Admin</el-menu-item>
          <el-menu-item v-if="this.right.overview" index="/overview">Overview</el-menu-item>
          <el-menu-item v-if="this.right.test" index="/test">Test</el-menu-item>
          <el-menu-item v-if="this.right.index" index="/index">Index</el-menu-item>
          <el-menu-item v-if="this.right.analytics_view" index="/analytics">Analytics</el-menu-item>
          <el-menu-item index="/datamining" v-if="false">DataMining</el-menu-item>
          <el-submenu index="" v-if="this.right.application_svw||this.right.application_investigate">
            <template slot="title">Application</template>
            <el-menu-item index="/svw" v-if="this.right.application_svw">SVW</el-menu-item>
            <el-menu-item index="/investigate" v-if="this.right.application_investigate">Investigate</el-menu-item>
          </el-submenu>

          <el-dropdown @command="logout" style="position:absolute;right:1em;top:50%;transform:translateY(-50%);">
            <el-button class="logout" :style="{background:menubgc}" style="border-width:2px" icon="el-icon-user-solid"
              type="info">{{username}}
            </el-button>

            <!-- <el-button type="primary">
    更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
  </el-button> -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">Log Out</el-dropdown-item>
              <el-dropdown-item command="b">Change Password</el-dropdown-item>
              <el-dropdown-item command="c">Change Email/Phone</el-dropdown-item>
              <el-dropdown-item command="d" v-if="this.right.admin">User List</el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>

        </el-menu>
      </div>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>

    <el-footer>
      <div style="width:1100px;margin:0.5em auto">
        <div style="display:inline-block">
          <h4>About URCS</h4>
          <p>About URCS</p>
          <p>Support/Contact Us</p>
          <p>FAQ</p>
          <p>URCS Weekly</p>
        </div>

        <el-divider direction="vertical"></el-divider>
        <div style="display:inline-block">
          <h4>INNOVATION</h4>
          <p>Infrastructure</p>
          <p>Technical</p>
          <p>Quality monitoring program</p>
          <p>Future programs</p>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div style="display:inline-block">
          <h4>INA GROUP</h4>
          <p style="width:40em">
            UAES 2020. All rights reserved, also regarding any disposal,
            exploitation, reproduction, editing, distribution, as well as in the
            event of applications for industrial property rights.
          </p>
        </div>
      </div>
    </el-footer>
    <!-- <component v-bind:is="menu"></component> -->

    <!-- <information></information> -->
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem("username"),
      right: JSON.parse(localStorage.getItem("urcs")),
    };
  },
  created() {},

  methods: {
    href() {
      window.open("http://47.101.67.237:5007");
    },
    logout(command) {
      if (command == "a") {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userGroup");

        this.$router.push("/login");
      } else if (command == "b") {
        this.$router.push("/changepsw");
      } else if (command == "c") {
        this.$router.push("/changeemail");
      } else if (command == "d") {
        this.$router.push("/userlist");
      }
    },
  },
  computed: {
    menubgc: function () {
      return this.$route.path == "/home" ? "rgba(1,1,1,0)" : "#333";
    },
    activePath() {
      var path = this.$route.path;
      if (path == "/application/analysis") {
        path = "/application";
      }

      // console.log(this.$route.path);
      return path;
    },
  },
};
</script>

<style scoped>
.el-footer {
  background: #333333;
  height: auto !important;
}
.el-footer h4 {
  color: #fff;
  /* font-size: 13px; */
}
.el-footer p {
  color: #bbb;
  font-size: 13px;
}
.el-menu-item {
  font-size: 16px;
  padding: 0 25px;
}
.el-menu-item:hover {
  background: rgba(1, 1, 1, 0) !important;
  color: #ffd04b !important;
  border-bottom-color: rgb(255, 208, 75) !important;
}
.el-divider--vertical {
  height: 11em;
  vertical-align: top;
  margin: 0 3em;
}
.el-main {
  min-height: calc(100vh - 220px);
  overflow: inherit;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
}
.el-menu /deep/ .el-icon-user-solid {
  float: left;
  margin-right: 12px;
}
.el-menu /deep/ .el-button:hover {
  border-color: #fff;
}
</style>
