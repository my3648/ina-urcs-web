<template>
  <div class="container">
    <el-container>
      <el-aside width="auto" style="overflow:visible;">
        <el-menu
          :collapse="isCollapse"
          :default-active="this.$route.path"
          router
          style="border-radius:10px;box-shadow:1px 0 10px 0 rgba(0,0,0,.1)"
          class="el-menu-vertical-demo"
        >
          <div style="text-align:center;margin-top:1em">
            <el-avatar :size="60" style="margin-bottom:1em"></el-avatar>

            <p v-show="!isCollapse">Calibration Big Data</p>
            <p v-show="!isCollapse">0.2.0</p>
            <el-divider style="width:90%;display:inline-block"></el-divider>
          </div>

          <el-menu-item index="/datamining/scheme">
            <i class="el-icon-menu"></i>

            <span slot="title">分析方案</span>
          </el-menu-item>
          <el-menu-item index="/datamining/dashboard" >
            <i class="el-icon-menu"></i>

            <span slot="title">dashboard</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>

            <span slot="title">最近使用</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>

            <span slot="title">探索发现</span>
          </el-menu-item>
          <div style="text-align:center;margin-top:2em">
            <el-button type="primary" icon="el-icon-setting">{{
              isCollapse ? "" : "设置"
            }}</el-button>
          </div>
          <div style="text-align:center;margin-top:2em">
            <el-button type="primary" @click="isCollapse = !isCollapse"
              >切换</el-button
            >
          </div>
        </el-menu>
        <!-- <el-menu
          :collapse="false"
          default-active="2"
          style="border-radius:10px;box-shadow:1px 0 10px 0 rgba(0,0,0,.1)"
          class="el-menu-vertical-demo"
        >
         

          <div style="text-align:center;margin-top:1em">
            <el-avatar :size="60" style="margin-bottom:1em"></el-avatar>

            <p>Calibration Big Data</p>
            <p>0.2.0</p>
            <el-divider style="width:90%;display:inline-block"></el-divider>
          </div>

          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <div>
              <p>&nbsp;</p>
              <h4>分析方案</h4>
              <p>定义模板和计算策略</p>
              <p></p>
            </div>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <div>
              <p>&nbsp;</p>
              <span>Dashboard</span>
              <p>分析结果仪表盘</p>
              <p></p>
            </div>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <div>
              <p>&nbsp;</p>
              <h4>最近使用</h4>
              <p>查看最近进行模板/方案</p>
              <p></p>
            </div>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <div>
              <p>&nbsp;</p>
              <h4>探索发现</h4>
              <p>方案搜寻和共享</p>
              <p></p>
            </div>
          </el-menu-item>
          <div style="text-align:center">
            <el-button type="primary" icon="el-icon-setting">设置</el-button>
          </div>
        </el-menu> -->
      </el-aside>
       <el-main style="background:#fff;">
      <router-view />

  </el-main>

      
      
    </el-container>
  </div>
</template>

<script>
// import {ContainerMixin, ElementMixin} from 'vue-slicksort';
import vuedraggable from "vuedraggable";
import programme from "./Programme.vue";
import calculation from "./Calculation.vue";
export default {
  data(){
    return{
      isCollapse: false,
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* *{
  margin:0;
  padding:0;
} */
html,
body {
}
.el-aside {
  min-height: calc(100vh - 16px);
}
i {
  cursor: pointer;
}
.el-aside ul {
  height: 100%;
}
/* .el-menu-item {
  height: 80px;
  line-height: 80px;
}
.el-menu-item > div {
  height: 100%;
  display: inline-block;
  line-height: 20px;
}
.el-menu-item > div > p {
  font-size: 12px;
}
.el-menu-item i {
  font-size: 30px;
  margin-right: 15px;
}
.el-menu-item h4,
p {
  margin: 0;
} */
.time {
  font-size: 13px;
  color: #999;
}
.el-main{
  height: calc(100vh - 16px);
  /* min-height: 520px; */

}
.el-main .el-divider--horizontal {
  margin: 1em 0 0 0;
  overflow: hidden;
}
.container {
  /* width:1140px; */
  margin: 0 auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 225px;
}
/* @media screen and (max-width: 1140px) and (min-width: 1024px) {
  .container {
    width: 1024px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 1024px) {
  .container {
    width: 960px;
    margin: 0 auto;
  }
  .el-aside {
    display: none;
  }
}
@media screen and (min-width: 1140px) {
  .container {
    width: 1140px;
    margin: 0 auto;
  }
} */

/* .el-menu-item p{
 
  color:#999;
} */
</style>
