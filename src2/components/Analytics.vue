<template>
  <!-- <my-tree></my-tree> -->
  <div class="analytics">
    <div style="height:180px;background:#333;padding:1em 0em;">
      <div style="margin:0 auto;width:1100px;box-sizing:border-box">
        <div
          style="width:160px;float:left; text-align: center;"
          v-for="(value, name, index) in typeObj"
          :key="index"
        >
          <p style="font-size:18px;color:#247dd8;margin:1em 0">{{name}}</p>
          <div
            v-for="(cvalue,cname,cindex) in value"
            :key="cindex"
            style="margin:0"
          >
            <el-link
              type="info"
              @click="selectCanvas(cvalue)"
              :class="{active:canvasType==cvalue[0]}"
            >{{cname}}</el-link>
            <br>
          </div>

        </div>
        <!-- <div style="clear:both"></div> -->

      </div>

    </div>
    <div style="min-height:calc(100vh - 200px)">
      <div style="margin:0 auto;width:1100px;padding:20px">
        <div>
          <el-button
            @click="drawer = true"
            type="primary"
            style="margin-left: 16px;"
          >
            <i class="el-icon-folder-opened"></i>选择文件
          </el-button>
          <el-select
            style="width:700px"
            v-model="selectedFile"
            placeholder="请选择"
          >
            <el-option
              v-for="(item,index) in selectedTableData"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>

        <el-drawer
          size="1000"
          title="请选择数据"
          :visible.sync="drawer"
          direction="ltr"
          :with-header="false"
        >
          <el-scrollbar style="height:calc(100vh - 40px)">
            <my-index ref="index"></my-index>

          </el-scrollbar>
          <div style="height:40px;float:right;margin-right:2em">
            <el-button @click="drawer=false">取消</el-button>
            <el-button
              type="success"
              @click="querySelection"
            >确定</el-button>
          </div>

        </el-drawer>
        <!-- <span>我来啦!</span> -->

      </div>
      <div style="height:1px;background:#dddddd"></div>
      <div
        id="plotBody"
        style="padding:1em;min-height:300px"
        v-loading="canvasLoading"
      >

        <el-alert
          style="width:1100px;margin:0 auto;"
          v-if="alertShow"
          title="未找到对应图表！"
          type="warning"
          description="该图表需要的测量变量未采集。"
          show-icon
          
        >
        </el-alert>

        <!-- <canvas0 :options="canvasData"></canvas0> -->
        <component  v-show="!alertShow" v-bind:is="canvasIndex"></component>
      </div>

    </div>
  </div>

</template>

<script>
  // import mytree from "./Tree";
  import index from "./Index";
  // import Highcharts from "highcharts";
  import { Chart } from "highcharts-vue";
  import { makePlot } from "@/assets/ReportUtilities.js";
  const canvas0 = () => import("./canvas/canvas0");
  const canvas1 = () => import("./canvas/canvas1");
  const canvas2 = () => import("./canvas/canvas2");
  const canvas3 = () => import("./canvas/canvas3");
  const canvas4 = () => import("./canvas/canvas4");
  // console.log(Highcharts);
  export default {
    data() {
      return {
        drawer: false,
        canvasIndex: "",
        canvasType: "",
        canvasData: [],
        alertShow: false,
        typeObj: {
          "Drive Info.": {
            "Drive Profile": ["fun_DriveCondition", "canvas0"],
            "Drive Environment": ["fun_Env", "canvas0"]
          },
          "Basic calibration": {
            EPM: ["fun_EPM", "canvas0"],
            LambdaCtrl: ["fun_LamCtrl", "canvas0"],
            HFM: ["fun_HFM", "canvas0"],
            Start: ["fun_Start", "canvas2"],
            "Idle OsciUation": ["fun_Idle", "canvas2"]
          },

          OBD: {
            "Fault Count": ["fun_FaultCount", "canvas1"],
            OSC: ["fun_OSC", "canvas3"],
            LSUdyn: ["fun_LSUdyn", "canvas0"],
            IUMPR: ["fun_IUMPR", "canvas4"],
            HPFS: ["fun_HPFS", "canvas0"],
            "Misf Dection": ["fun_Misf", "canvas3"]
          },
          "Safe Torque": { "Trq Monitoring": ["fun_TrqMonitoring", "canvas0"] },
          Knock: {
            Overview: ["fun_KR1Overview", "canvas4"],
            "Knock Sensor": ["fun_KR2Snsr", "canvas3"],
            "Ref Noise": ["fun_KR3NoiseRef", "canvas0"]
          }
        },
        selectedTableData: [],
        selectedFile: "",
        canvasLoading: false
      };
    },
    methods: {
      selectCanvas(cvalue) {
        this.canvasType = cvalue[0];
        console.log(this.canvasType);
        this.canvasIndex = cvalue[1];
        if (this.selectedFile != "" && this.canvasType != "") {
          this.renderCanvas();
        }
      },
      querySelection() {
        this.drawer = false;
        var data = this.$refs.index.selectedTableData;
        var arr = [];
        data.forEach((item, index) => {
          arr.push(item.filename);
        });
        // console.log();
        console.log(arr);
        this.selectedTableData = arr;
        this.selectedFile = this.selectedTableData[0];
        // if (this.selectedFile != "" && this.canvasType != "") {
        //   this.renderCanvas();
        // }
        // this.
      },
      renderCanvas() {
        console.log(this.selectedFile);
        console.log(this.canvasType);
        this.canvasLoading = true;

        this.$http
          .post(
            "http://47.116.135.144:30002/ina-urcs/common/v1.0.0/web/loadAnalysisDash",
            {
              fileName: this.selectedFile,
              module: this.canvasType
            },
            // {
            //   transformRequest: [
            //     data => {
            //       // data 就是你post请求传的值
            //       // 一下主要是吧数据拼接成 类似get格式
            //       let params = "";
            //       for (var index in data) {
            //         params += index + "=" + data[index] + "&";
            //       }
            //       return params;
            //     }
            //   ]
            // }
          )
          .then(res => {
            console.log(res);
            const { data } = res;
            this.canvasLoading = false;

            if (Object.keys(data).length != 0) {
              this.plotdata = data;
              this.alertShow = false;
            } else {
              this.alertShow = true;

              return;
            }

            console.log(this.plotdata);

            if (this.plotdata.charts.length != 0) {
              // for (var i = 0; i < this.plotdata.charts.length; i++) {

              makePlot(this.plotdata);
              // }
            } else {
            }
          })
          .catch(err => {
            console.log(err);
            this.canvasLoading = false;
            this.$message({
              type: "error",
              message: "请求失败!"
            });
          });
      }
    },

    mounted() {
      console.log(Highcharts);
      // window.Highcharts = Highcharts;
    },
    watch: {
      selectedFile(val) {
        if (val && this.canvasType) {
          this.renderCanvas();
        }
      }
    },
    components: {
      // "my-tree": mytree,
      "my-index": index,
      //  "highcharts": Chart,
      canvas0: canvas0,
      canvas1: canvas1,
      canvas2: canvas2,
      canvas3: canvas3,
      canvas4: canvas4
    }
  };
  // Vue.component('usernmae', {
  //   // 在 JavaScript 中使用 camelCase
  //   props: ['myMessage'],
  //   template: '<span>{{ myMessage }}</span>'
  // })
</script>

<style scoped>
  /* /deep/ .el-drawer.ltr{
              overflow-y:auto
            } */
  .analytics /deep/ .el-loading-spinner {
    top:20%;
  }
  .analytics /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-link.active {
    border-bottom: 1px solid #fff;
    color: #fff;
    /* display: block; */
  }
  .el-link.active:hover {
    border-bottom: 1px solid #fff;
    color: #fff;
    /* display: block; */
  }
  /* .el-drawer.ltr{
              width:1000px;
            } */

  .el-drawer__wrapper /deep/ .index {
    width: 800px;
    margin: 0 1em;
  }
  .analytics /deep/ #el-drawer__title {
    margin-bottom: 0;
  }
</style>