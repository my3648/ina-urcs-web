<template>
  <div>
    <!-- <el-button @click="set()">setcookie</el-button> -->
    <div style="width: 1101px;margin:3em auto 0 auto;">
      <el-row :gutter="12">
        <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8" v-for="(item,index) in cardArr" :key="index">
          <el-card shadow="hover">
            <div @click="href(item.name)" style="text-align:center;width:100%;cursor:pointer" ref="img">
              <!-- :style="{'height':imgHeight}" -->
              <img :src="require(`@/../static/${item.src}`)" alt="" style="width:80%;height:250px;">
            </div>
            <h1>{{item.name}}</h1>

            <!-- <div style="width:100%"> -->
            <p class="n label" v-html="item.description"></p>
            <!-- style="min-height:10em"  -->
            <div style="text-align:center">
              <el-button @click="href(item.name)" type="primary" style="padding:12px 40px;font-size:14px">
                进入{{item.name}}</el-button>

            </div>
            <!-- </div> -->

          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-dropdown @command="logout" style="position:absolute;right:1em;top:1em;">
      <el-button class="logout" style="border-width:1px" icon="el-icon-user-solid">{{username}}
      </el-button>

      <!-- <el-button type="primary">
    更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
  </el-button> -->
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">Log Out</el-dropdown-item>
        <el-dropdown-item command="b">Change Password</el-dropdown-item>
        <el-dropdown-item command="c">Change Email/Phone</el-dropdown-item>
        <el-dropdown-item command="d" v-if="right.admin">User List</el-dropdown-item>

      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { cardArr } from "../../static/cardList.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      cardArr: [],
      imgHeight: 300,
      username: localStorage.getItem("username"),
      right: JSON.parse(localStorage.getItem("urcs")) || "",
    };
  },
  created() {
    this.$http.post("http://139.196.196.221:3000/certStatus").then((res) => {
      console.log(res);
    });
    this.cardArr = cardArr;
    // console.log(this.$refs.img[0].offsetHeight);
  },
  mounted() {
    // console.log(this.$refs.img[0].offsetHeight);
    this.imgHeight = this.$refs.img[0].offsetHeight;
  },

  computed: {
    // imgHeight:function(){
    // return this.$refs.img[0].offsetHeight
    // }
  },

  methods: {
    set() {
      this.setCookie("token", "value", 7);
      this.setCookie("username", "user", 7);
      localStorage.setItem("token", "value");
      localStorage.setItem("username", "user");
    },
    setCookie(key, value, t) {
      var oDate = new Date();
      oDate.setDate(oDate.getDate() + t);
      document.cookie = key + "=" + value + "; expires=" + oDate.toDateString();
    },
    href(name) {
      // location.href = locationHref;
      if (name == "UCDM") {
        if (localStorage.getItem("ucdm")=='true') {
          location.href = "http://139.196.196.221:3001/";
        }
      } else if (name == "UCOS") {
        this.$router.push({ path: "/ucos" });
      } else if (name == "URCS") {
        this.$router.push({ path: "/home" });
      }
    },
    logout(command) {
      if (command == "a") {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userGroup");
        localStorage.removeItem("urcs");
        localStorage.removeItem("ucos");
        localStorage.removeItem("ucdm");

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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-col {
  /* height: 580px; */
  padding: 10px 0;
}
.el-card {
  height: 100%;
  background: "rgba(255,255,255,0.8)";
}
.el-card h1 {
  text-align: center;
}
.el-card p {
  font-size: 14px;
  line-height: 2em;
  padding: 0 20px;
}
h2 {
  text-align: center;
}
.n.label {
  min-height: 3em;
  text-align: center;
  color: rgb(158, 158, 158);
  font-size: 15px;
  /* font-weight: 520; */
}
</style>
