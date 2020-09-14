<template>
  <div style="margin: auto;width:1100px" class="overview">
    <div @click="linkToAna($event)" style="margin-top:0.5em">
      <highcharts style="" :options="bableChart"></highcharts>

    </div>
    <el-divider></el-divider>
    <div>
      <!-- <h3>历史借用记录</h3> -->
      <div style="margin-bottom:1em">
        <el-checkbox v-model="undeterChecked">To be confirm</el-checkbox>
        <el-checkbox v-model="confirmChecked">Confirmed</el-checkbox>

      </div>
      <!-- :rules="deviceRules" -->
      <el-form ref="deviceFormName" :inline="true" :model="deviceForm" class="demo-form-inline">
        <el-form-item label="ProjectId" prop="projectId">
          <el-select size="medium" clearable v-model="deviceForm.projectId" filterable>
            <el-option v-for="(item,index) in projectIdList" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="DeviceSN" prop="sn">
          <el-select size="medium" clearable v-model="deviceForm.sn" filterable>
            <el-option v-for="(item,index) in snList" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Problem/DFC" prop="DFC">
          <el-select size="medium" clearable v-model="deviceForm.DFC" filterable>
            <el-option v-for="(item,index) in DFCList" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="medium" label="Time Selection">
          <el-date-picker v-model="deviceForm.timeRange" type="datetimerange" align="right"
            value-format="yyyy-MM-dd HH-mm-ss" :unlink-panels="true" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>

        </el-form-item>
        <br>
        <el-form-item>
          <el-button type="primary" size="medium" @click="searchQue">Search Problem List</el-button>
          <el-button type="primary" size="medium">Create New Instance</el-button>
          <!-- @click="createdQue" -->
        </el-form-item>
      </el-form>

    </div>

    <div>
      <el-table :data="tableDataQue" style="width: 100%">
        <el-table-column prop="id" label="id">
        </el-table-column>
        <el-table-column prop="projectId" label="projectId">
        </el-table-column>
        <el-table-column prop="problem" label="problem">
        </el-table-column>
        <el-table-column prop="deviceSN" label="deviceSN">
        </el-table-column>
        <el-table-column prop="fileName" label="fileName">
        </el-table-column>
        <el-table-column prop="fileTime" label="fileTime">
        </el-table-column>

        <el-table-column prop="status" label="status">
          <template slot-scope="scope">
            <!-- <el-input size="mini" v-model="searchValDev" placeholder="搜索"></el-input> -->
            <div :class="scope.row.status==1?'circle_GF':'circle_RF'"></div>
          </template>
        </el-table-column>
        <el-table-column label="action">
          <template slot-scope="scope">
            <el-button size="medium" @click="analyticQue(scope.row.id)">navigate</el-button>
          </template>
        </el-table-column>
      </el-table>
      <my-page ref="page" :tableData.sync="tableDataQue" :result="resultQue"></my-page>

    </div>
    <el-divider></el-divider>
    <!-- <div>
      <span>捕获问题：</span>
      <span>{{question}}</span>
      <br>
      <br>
      
      <span>测量数据：</span>
      <span>{{measure}}</span>
      <br>
      <br>
     
      <span>时间：</span>
            <span>{{time}}</span>
             <br>
      <br>
      <span>问题现象展示：</span>
            <span>{{explain}}</span>

      
    </div> -->

  </div>
</template>

<script>
import more from "highcharts/highcharts-more.js";

import { Chart } from "highcharts-vue";
more(Highcharts);

import mypage from "./Page";

export default {
  data() {
    return {
      deviceMenu: "first",
      undeterChecked: false,
      confirmChecked: false,
      deviceForm: {
        projectId: "",
        sn: "",
        DFC: "",
        timeRange: []
      },
      bableChart: {
        chart: {
          type: "packedbubble",
          height: "600px"
        },
        title: {
          text: "Calibration Problem DataPool"
        },
        tooltip: {
          useHTML: true,
          pointFormat:
            "{point.name}<br/>{point.filename}<br/><button data-value={point.name} class='quickNavi'>quickNaviTo</button>",
          style: {
            pointerEvents: "auto"
          }
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          packedbubble: {
            minSize: "30%",
            maxSize: "120%",
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
              gravitationalConstant: 0.05,
              splitSeries: true,
              seriesInteraction: false,
              dragBetweenSeries: true,
              parentNodeLimit: true
            },
            dataLabels: {
              enabled: true,
              format: "{point.name}",
              //   filter: {
              //       property: 'value',
              //       operator: '>',
              //       value: 0
              //   },
              style: {
                color: "black",
                textOutline: "none",
                fontWeight: "normal"
              }
            }
          }
        },
        series: [
          {
            name: "720-4420 ET.10 DI 0",
            data: [
              {
                name: "start01",
                filename: "xx1.dat",
                opl: 1,
                value: 1
              },
              {
                name: "Misf_Cyl0",
                filename: "xx2.dat",
                opl: 1,
                value: 1
              },
              {
                name: "MD_Cyl1",
                filename: "xx3.dat",
                opl: 1,
                value: 1
              }
            ]
          },
          {
            name: "720-4420 ET.12 DI 0",
            data: [
              {
                name: "start01",
                filename: "xx1.dat",
                opl: 1,
                value: 1
              },
              {
                name: "Misf_Cyl0",
                filename: "xx2.dat",
                opl: 1,
                value: 1
              },
              {
                name: "MD_Cyl1",
                filename: "xx3.dat",
                opl: 1,
                value: 1
              }
            ]
          },
          {
            name: "720-4420 ET.10 DI 4",
            data: [
              {
                name: "start01",
                filename: "xx1.dat",
                opl: 1,
                value: 1
              },
              {
                name: "Misf_Cyl0",
                filename: "xx2.dat",
                opl: 1,
                value: 1
              },
              {
                name: "MD_Cyl1",
                filename: "xx3.dat",
                opl: 1,
                value: 1
              }
            ]
          }
        ]
      },
      projectIdList: [],
      DFCList: [],
      snList: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      resultQue: [],
      allresultQue: [],
      tableDataQue: [],
      question: "",
      measure: "",
      time: ""
    };
  },
  methods: {
    linkToAna(e) {
      var dom = e.target;
      var name = $(dom).attr("data-value");
      if ($(dom).attr("class") == "quickNavi") {
        this.$router.push({
          path: "/application/analysis",
          query: {
            id: name
          }
        });
      }
    },
    getInformation() {
      // this.$http.get("/certStatus").then(res => {
      //   console.log(res);

      var res = {
        data: {
          projectIdList: [23, 12, 233],
          DFCList: [343434, 342321],
          snList: [6001, 6002]
        }
      };

      var { projectIdList, DFCList, snList } = res.data;
      this.projectIdList = projectIdList;
      this.DFCList = DFCList;
      this.snList = snList;
      //   });
    },
    searchQue() {
      // this.$http.post("/certStatus", this.deviceForm).then(res => {
      // console.log(res);
      // console.log
      var res = {
        data: [
          {
            id: 1,
            projectId: "projectId",
            problem: "问题",
            deviceSN: "sn号",

            fileName: "文件名",
            fileTime: "filetime",
            status: 1
            // action: 0
          },
          {
            id: 2,
            projectId: "projectId",
            problem: "问题",
            deviceSN: "sn号",

            fileName: "文件名",
            fileTime: "filetime",
            status: 0
          }
        ]
      };
      this.allresultQue = res.data;
      this.resultQue = this.allresultQue;
      // });
    },
    analyticQue(id) {
      console.log(id);
      // this.$http.post("/ddd", { id: id }).then(res => {

      // });
      this.$router.push({
        path: "/application/analysis",
        query: { id: id }
      });
    }
  },
  created() {
    this.$http.post("/admin/getallUsers").then(res => {
      console.log(res);
    });
    this.getInformation();
  },
  components: {
    "my-page": mypage,
    highcharts: Chart
  }
};
</script>

<style scoped>
.overview /deep/ .circle_RF {
  width: 16px;
  height: 16px;
  background: -webkit-linear-gradient(
    top,
    rgb(255, 129, 129),
    rgb(194, 51, 51)
  );
  border-radius: 50%;
  border: 2px solid rgb(194, 51, 51);
}

.overview /deep/ .circle_GF {
  width: 16px;
  height: 16px;
  background: -webkit-linear-gradient(
    top,
    rgb(155, 255, 167),
    rgb(44, 158, 95)
  );
  border-radius: 50%;
  border: 2px solid rgb(44, 158, 95);
}
</style>