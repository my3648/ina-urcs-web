<template>
  <div class="overview" style="margin:0 auto;width:1100px;">
    <div>
      <h3>Device
        <!-- <el-input size="small" style="position:absolute;width:150px;top:0;right:0" v-model="searchValDevice"
          placeholder="搜索"></el-input> -->

      </h3>
      <!-- <el-row :gutter="20" style="text-align:center">
        <el-col :span="6" v-for="(value,key) in progressArr" :key="key">
          <el-progress type="circle" :percentage="value" v-if="value!=100"></el-progress>
          <el-progress type="circle" :percentage="value" v-else status="success"></el-progress>
          <div style="padding:1em 0">{{key}}</div>
        </el-col>
      </el-row> -->

    </div>
    <el-table @sort-change="sortTableDevice" :data="tableDataDevice" style="width: 100%">
      <el-table-column label="sn" prop="sn" width="150" sortable="custom">
      </el-table-column>
      <el-table-column label="运行的配置文件名" prop="Latest_Upload_Cfg_Name" sortable="custom">
        <template scope="scope">
          {{scope.row.Latest_Upload_Cfg_Name||'-'}}
        </template>
      </el-table-column>
      <el-table-column label="是否在线" prop="deviceOnline" width="250" sortable="custom">
        <template scope="scope">
          {{scope.row.deviceOnline?'在线':'离线'}}
        </template>
      </el-table-column>
      <el-table-column label="最后在线时间" prop="onlineTime" sortable="custom">
        <template scope="scope">
          {{scope.row.onlineTime||'-'}}
        </template>
      </el-table-column>
    </el-table>
    <my-page :tableData.sync="tableDataDevice" :result="resultDevice"></my-page>
    <el-divider></el-divider>

    <!-- <div style="margin:1em 0"></div> -->
    <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" class="amap-demo"
      style="height:450px">
      <!-- :plugin="plugin" :events="events" -->
      <el-amap-polyline :editable="polyline.editable" :path="polyline.path" :events="polyline.events">
      </el-amap-polyline>
      <el-amap-marker v-for="(item,index) in markerArr" :key="index" vid="marker" :position="item.center"
        :icon="item.icon" :label="item.label">
      </el-amap-marker>
      <!-- :label="label" -->

    </el-amap>
    <!-- <div>
      <h3>记录仪当前状态:</h3>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item, index) in boxData" :key="index">
          <my-box :boxData="item"></my-box>
        </el-col>
      </el-row>
    </div> -->

    <div v-if="username!='admin'">
      <h3 style="position:relative">
        设备借用申请
        <el-input size="small" style="position:absolute;width:150px;top:0;right:0" v-model="searchValBor"
          placeholder="搜索"></el-input>
      </h3>

      <el-table @sort-change="sortTable" :data="tableDataBor" style="width: 100%">
        <!-- <el-table-column sortable="custom" prop="uid" label="uid">
        </el-table-column> -->
        <!-- <el-table-column prop="date" label="日期" width="150">
        </el-table-column> -->
        <el-table-column label="设备">
          <el-table-column prop="sn" label="sn">
          </el-table-column>
          <el-table-column prop="deviceKeeper" label="设备持有者">
            <template scope="scope">
              {{scope.row.deviceKeeper=="admin"?"管理员":scope.row.deviceKeeper}}
            </template>
          </el-table-column>
          <el-table-column label="申请借用">
            <template scope="scope">
              <!-- {{scope.row.deviceApply}} -->
   <el-tooltip v-if="username==scope.row.deviceKeeper" class="item" effect="dark"
                :content="'当前申请人: '+(scope.row.deviceApply['name']||'无')"
                
                placement="top-start">
              <el-button plain @click="applyForDevice(scope.row,'admin')" 
                type="success" >归还</el-button>
   </el-tooltip>
                <!-- +', 电话:'+(scope.row.deviceApply['phone']||'无') -->
              <el-tooltip v-else class="item" effect="dark"
                :content="'当前申请人: '+(scope.row.deviceApply['name']||'无')"
                
                placement="top-start">

                <div>
                  <el-button plain @click="applyForDevice(scope.row,'')"
                    v-if="scope.row.deviceKeeper=='admin'&&!scope.row.deviceApply.name" type="primary">借用</el-button>

                  <el-button v-else plain disabled>借用</el-button>

                </div>
              </el-tooltip>

            </template>
          </el-table-column>

          <!-- <el-table-column  label="lockStatus">
             <template scope="scope">
            <i style="font-size:20px;" v-if="scope.row.islocked"  class="el-icon-lock pointer"></i>
            <i style="font-size:20px;" v-if="!scope.row.islocked" class="el-icon-unlock"></i>

            
            </template>
          </el-table-column> -->

        </el-table-column>
        <!-- <el-table-column label="外借申请">
          <el-table-column width="150" prop="borrow_date" label="借用时间/归还时间">

          </el-table-column>
        </el-table-column> -->
        <el-table-column label="项目">
          <el-table-column prop="deviceUser" label="当前使用人">
            <template scope="scope">
              {{comDeviceUser(scope.row.deviceUser)}}
              <!-- {{scope.row.deviceUser||'-'}} -->
            </template>
          </el-table-column>
          <el-table-column prop="vehNum" label="车号">
          </el-table-column>
          <el-table-column prop="xmh" label="项目号">
          </el-table-column>
          <!-- <el-table-column label="lockStatus">
            <template scope="scope">
              <i style="font-size:20px;" v-if="scope.row.islocked" class="el-icon-lock pointer"></i>
              <i style="font-size:20px;" v-if="!scope.row.islocked" class="el-icon-unlock"></i>

            </template>
          </el-table-column> -->
          <el-table-column label="调用">
            <template scope="scope">

              <el-button plain @click="releaseDevice(scope.row)" v-if="username==scope.row.deviceUser" type="success">
                使用结束
              </el-button>
              <div v-else>
                <el-popover title="申请队列" placement="top-start" width="200" trigger="hover">
                  <div>
                    <div v-for="(item,index) in scope.row.useApply" :key="index">
                      申请人:{{item.applicant}}</div>
                      <!-- , 电话:{{item.phone}} -->

                  </div>
                  <el-button plain disabled
                    v-if="(scope.row.deviceUser&&scope.row.deviceUser!='-')||scope.row.deviceKeeper=='admin'||inLockApply(scope.row.useApply)"
                    slot="reference">申请使用</el-button>

                  <el-button v-else plain @click="applyForLock(scope.row)" slot="reference" type="primary">申请使用
                  </el-button>
                </el-popover>

              </div>
              <!-- <el-tooltip v-else class="item" effect="dark" :content="'当前申请人:<br> '+scope.row.useApply[0]['name']+',电话:'+scope.row.useApply[0]['phone']" placement="top-start">
               <el-button  disabled>申请</el-button>

               </el-tooltip> -->

            </template>

          </el-table-column>
        </el-table-column>
      </el-table>

      <my-page ref="page" :tableData.sync="tableDataBor" :result="resultBor"></my-page>
    </div>
    <!-- <el-divider></el-divider> -->
    <div>
      <div style="float:left;width:70%;" @mousemove="highchartMove($event)" @touchmove="highchartMove($event)"
        @touchstart="highchartMove($event)">
        <!-- <h4>{{canvas[0].title}}</h4>
        <p>{{canvas[0].description}}</p> -->
        <div style="width:100%;float:left" v-for="(pitem, pindex) in signalData" :key="pindex">
          <div style="text-align:center">{{ canvas[pindex].title }}</div>
          <div style="text-align:center;font-size:12px;color:#888">
            {{ canvas[pindex].description }}
          </div>
          <!-- <div style="font-size:12px;color:#888;display:inline-block">a2lname:{{canvas[pindex].a2lname}}</div>
        <div style="font-size:12px;color:#888;display:inline-block">hexname:{{canvas[pindex].hexname}}</div> -->

          <!-- <div style="margin-left:1em">
            a2lname:<el-tag type="info">{{ canvas[pindex].a2lname }}</el-tag>
            hexname:<el-tag type="info">{{ canvas[pindex].hexname }}</el-tag>
          </div> -->

          <highcharts style="height:300px;margin-bottom:-20px" :options="pitem.physical"></highcharts>

          <highcharts style="height:50px;" v-for="(item, index) in pitem.boolean" :key="index" :options="item">
          </highcharts>
          <el-divider></el-divider>
        </div>

        <!-- <highcharts style="height:50px;" :options="boolean0"> </highcharts>

     
   
        <highcharts style="height:50px;" :options="boolean1"> </highcharts> -->
      </div>

      <el-scrollbar style="float:left;width:30%;height:450px;">
        <!-- <div style="height:36px;line-height:36px;font-size:20px;color:#67C23A">
        <i class="el-icon-location-information"></i><span>6002</span> -->
        <el-collapse accordion>
          <my-coll v-for="(item,index) in collList" :key="index" :sn="item.sn" :tableData="item.tableData" :canvas.sync="canvas"></my-coll>
          <!-- <el-collapse-item>
            <template slot="title">
              <div style="line-height:18px;font-size:18px">
                <i class="el-icon-location-information"></i>6002
              </div>
            </template>
            <el-table
              :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">

              <el-table-column label="Name" prop="name">
                <template slot="header" slot-scope="scope">
                  <el-input v-model="search" size="mini" style="width:100px" placeholder="搜索" />
                </template>
              </el-table-column>
              <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                 操作
                </template>
                <template slot-scope="scope">
                  <el-button circle size="mini" @click="handleEdit(scope.$index, scope.row)">&nbsp;P&nbsp;</el-button>
                  <el-button circle size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">B</el-button>
                  <el-button circle size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">S</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              <div style="line-height:18px;font-size:18px">
                <i class="el-icon-location-information"></i>6002
              </div>
            </template>
            <el-table
              :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">

              <el-table-column label="Name" prop="name">
                <template slot="header" slot-scope="scope">
                  <el-input v-model="search" size="mini" style="width:100px" placeholder="搜索" />
                </template>
              </el-table-column>
              <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                 操作
                </template>
                <template slot-scope="scope">
                  <el-button circle size="mini" @click="handleEdit(scope.$index, scope.row)">&nbsp;P&nbsp;</el-button>
                  <el-button circle size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">B</el-button>
                  <el-button circle size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">S</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item> -->
        </el-collapse>

      </el-scrollbar>

    </div>
  </div>
</template>

<script>
import Box from "./Box.vue";
import mypage from "./Page";
// import Highcharts from "highcharts";
import { Chart } from "highcharts-vue";
// const iot = require("alibabacloud-iot-device-sdk");
import { AMapManager } from "vue-amap";
import mycoll from "./Coll.vue";
let amapManager = new AMapManager();

// var Highcharts=Highchart;

export default {
  data() {
    return {
      username: localStorage.getItem("username"),
      boxData: [],
      allresultDevice: [],
      resultDevice: [],

      tableDataDevice: [],
      allresultBor: [],
      resultBor: [],
      tableDataBor: [],
      searchValDevice: "",
      searchValBor: "",
      amapManager: amapManager,
      markerArr: [],

      // hcInstance: Highcharts,
      colorList: [
        "#a22041",
        "#b28c6e",
        "#e5abbe",
        "#f08300",
        "#d4dcda",
        "#b8d200",
        "#59b9c6",
        "#00a381",
        "#1e50a2",
        "#884898",
      ],
      canvas: [],
      // AmapManager,
      zoom: 5,
      center: [121.63063049316406, 31.27289199829102],
      polyline: {
        // path: [
        //   [121.5389385, 31.21515044],
        //   [121.5389385, 31.29615044],
        //   [121.5273285, 31.21515044],
        // ],
        // events: {
        //   click(e) {
        //     alert("click polyline");
        //   },
        //   end: (e) => {
        //     let newPath = e.target
        //       .getPath()
        //       .map((point) => [point.lng, point.lat]);
        //     console.log(newPath);
        //   },
        // },
        // editable: false,
      },
      collList: [
        {
          sn: 6001,
          tableData: [
            {
              name: "nmot_1",
              data: [],
              boolean: [],
            },
            {
              name: "nmot_2",
              data: [],
            },
            {
              name: "nmot_3",
              data: [],
            },
            {
              name: "nmot_4",
              data: [],
            },
          ],
        },
      ],
      // hackReset: true
    };
  },
  computed: {
    inLockApply() {
      return function (useApply) {
        console.log(useApply);

        var flag = 0;
        if (useApply.length != 0) {
          useApply.forEach((item, index) => {
            console.log(index);
            if (item.applicant == this.username) {
              flag++;
            }
          });
        }
        if (flag > 0) {
          return true;
        } else {
          return false;
        }
      };
    },
    signalData() {
      var arr = [];

      for (var i = 0; i < this.canvas.length; i++) {
        // this.canvas[i] = {
        //   title: "AAA",
        //   description: "BBB",
        //   a2lname: "xxx",
        //   hexname: "xxxxx",
        //   // physical:[],
        //   plotdata: {
        //     x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99],
        //     physical: [
        //       { name: "signal1", data: [2, 3, 4, 5, 6] },
        //       { name: "signal2", data: [6, 5, 4, 3, 2] },
        //       { name: "signal3", data: [6, 5, 4, 3, 2] },
        //       { name: "signal3", data: [6, 5, 4, 3, 2] },
        //       { name: "signal3", data: [6, 5, 4, 3, 2] },
        //       { name: "signal3", data: [6, 5, 4, 3, 2] },
        //       { name: "signal3", data: [6, 5, 4, 3, 2] },
        //     ]
        //   },
        //   boolean: [
        //     {
        //       name: "sig3",
        //       data: [0, 0, 0, 1, 1]
        //     },
        //     {
        //       name: "sig3",
        //       data: [0, 0, 0, 1, 1]
        //     }
        //   ]
        // };
        var {
          title,
          description,
          a2lname,
          hexname,
          plotdata,
          boolean,
        } = this.canvas[i];
        var yAxis = [];
        plotdata.physical.forEach((item, index) => {
          yAxis.push({
            lineWidth: 1,
            title: {
              text: item.name,
              style: {
                // color: this.colorList[index]

                color: Highcharts.getOptions().colors[index],
              },
              offset: 25 * index + 10,
            },
            offset: 0,
            labels: {
              align: "left",
              x: -25 * index,
              rotation: -90,
              style: {
                // color: this.colorList[index]
                color: Highcharts.getOptions().colors[index],
              },

              reserveSpace: false, //x:-5 // 轴标签不占用空间
            },
            showEmpty: false,
          });
        });
        var series = [];
        plotdata.physical.forEach((item, index) => {
          series.push({
            // color: this.colorList[index],
            yAxis: index,
            data: item.data,
            name: item.name,
          });
        });
        var myphysical = {
          chart: {
            // marginLeft: 40, // Keep all charts left aligned
            spacingTop: 20,
            // spacingBottom: 20,
            zoomType: "x",
            panning: true,
            panKey: "shift",
          },
          title: {
            // userHTML:true,
            text: null,
          },
          // description: {
          //   text: description
          // },
          credits: {
            enabled: false,
          },
          legend: {
            enabled: false,
          },
          xAxis: {
            title: {
              text: "time[s]",
            },
            categories: plotdata.x,
            crosshair: true,
            events: {
              setExtremes: this.syncExtremes,
            },
            labels: {
              format: "{value}",
            },
          },
          yAxis: yAxis,
          plotOptions: {
            series: {
              marker: {
                enabled: false,
                states: {
                  hover: {
                    fillColor: "rgba(255,255,255,0)",
                    lineColor: "rgba(255,255,255,0)",
                  },
                },
              },
            },

            line: {
              point: {
                events: {
                  mouseOver: function () {
                    var series = this.series.chart.series;
                    Highcharts.each(series, function (s) {
                      s.setState("");
                    });
                  },
                },
              },
            },
          },
          tooltip: {
            shared: true,
          },
          // tooltip: {
          //   positioner: function() {
          //     // console.log(this.chart);
          //     return {
          //       x: this.chart.chartWidth - this.label.width, // right aligned
          //       y: -1 // align to title
          //     };
          //   },
          //   borderWidth: 0,
          //   backgroundColor: "none",
          //   pointFormat: "{point.y}",
          //   headerFormat: "",
          //   shadow: false,
          //   style: {
          //     fontSize: "18px"
          //   },
          //   valueDecimals: 1
          // },
          series: series,
        };
        var myboolean = [];
        boolean.forEach((item, index) => {
          var obj = {
            chart: {
              // marginLeft: 40, // Keep all charts left aligned
              // spacingTop: 5,
              // spacingBottom: 5,
              // zoomType: "x"
              // type:'step'
            },
            title: null,
            credits: {
              enabled: false,
            },
            legend: {
              enabled: false,
            },
            plotOptions: {
              series: {
                marker: {
                  enabled: false,
                  states: {
                    hover: {
                      fillColor: "rgba(255,255,255,0)",
                      lineColor: "rgba(255,255,255,0)",
                    },
                  },
                },
              },
            },

            xAxis: {
              categories: plotdata.x,

              visible: false,
              crosshair: true,
              events: {
                setExtremes: this.syncExtremes,
              },
              labels: {
                format: "{value}",
              },
            },
            yAxis: [
              {
                lineWidth: 1,
                title: {
                  text: item.name,
                  style: {
                    color: Highcharts.getOptions().colors[0],
                  },

                  offset: 25 * (myphysical.yAxis.length - 1) + 10,
                  // x:25 * (myphysical.yAxis.length - 1)+10-25,
                  // rotation:0
                },
                offset: 0,
                max: 1,

                // labels: {
                //   align: "left",
                //   // rotation:-90,
                //   x: (myphysical.yAxis.length - 1) *-25,
                //   reserveSpace: false //x:-5 // 轴标签不占用空间
                // }
                // tickInterval: 0.01
              },
            ],
            // tooltip: {
            //   positioner: function() {
            //     // console.log(this.chart);
            //     return {
            //       x: this.chart.chartWidth - this.label.width, // right aligned
            //       y: -1 // align to title
            //     };
            //   },
            //   borderWidth: 0,
            //   backgroundColor: "none",
            //   pointFormat: "{point.y}",
            //   headerFormat: "",
            //   shadow: false,
            //   style: {
            //     fontSize: "18px"
            //   },
            //   valueDecimals: 1
            // },
            series: [
              {
                step: true,
                data: item.data,
                name: item.name,
                type: "line",
                color: Highcharts.getOptions().colors[0],
                fillOpacity: 0.3,
                // tooltip: {
                //   valueSuffix: " " + "km/h"
                // }
              },
            ],
          };

          myboolean.push(obj);
        });

        var obj = {};
        obj.physical = myphysical;
        obj.boolean = myboolean;
        arr.push(obj);

        // arr[i].physical=physical
        // arr[i].physical=physical
      }

      return arr;
    },
    comDeviceUser() {
      return function (value) {
        if (value == "admin") {
          return "管理员";
        } else if (value) {
          return value;
        } else {
          return "-";
        }
      };
    },
  },
  methods: {
    sortTable(obj) {
      console.log(obj);
      var { prop, order } = obj;
      function compare(p) {
        return function (m, n) {
          var a = m[p];
          var b = n[p];
          console.log(a > b);
          return a > b;
        };
      }
      function compareMin(p) {
        return function (m, n) {
          var a = m[p];
          var b = n[p];
          console.log(b > a);
          return b > a;
        };
      }

      if (obj.order == "ascending") {
        this.resultBor.sort(compare(prop));
      } else if (obj.order == "descending") {
        this.resultBor.sort(compareMin(prop));
      } else {
        this.resultBor = this.allresultBor.filter(
          (data) =>
            !this.searchValBor ||
            data.sn.toLowerCase().includes(this.searchValBor.toLowerCase()) ||
            data.vehNum
              .toLowerCase()
              .includes(this.searchValBor.toLowerCase()) ||
            data.xmh.toLowerCase().includes(this.searchValBor.toLowerCase()) ||
            data.deviceKeeper
              .toLowerCase()
              .includes(this.searchValBor.toLowerCase()) ||
            data.deviceUser
              .toLowerCase()
              .includes(this.searchValBor.toLowerCase())
          //    ||
          // data.borrow_date
          //   .toLowerCase()
          //   .includes(this.searchValBor.toLowerCase())
        );
      }
    },
    sortTableDevice(obj) {
      console.log(obj);
      var { prop, order } = obj;
      function compare(p) {
        return function (m, n) {
          var a = m[p];
          var b = n[p];
          console.log(a > b);
          return a > b;
        };
      }
      function compareMin(p) {
        return function (m, n) {
          var a = m[p];
          var b = n[p];
          console.log(b > a);
          return b > a;
        };
      }

      if (obj.order == "ascending") {
        this.resultDevice.sort(compare(prop));
      } else if (obj.order == "descending") {
        this.resultDevice.sort(compareMin(prop));
      } else {
        this.resultDevice = this.allresultDevice.filter(function () {
          return true;
        });
        // .filter(
        //   (data) =>
        //     !this.searchValDevice ||
        //     data.sn
        //       .toLowerCase()
        //       .includes(this.searchValDevice.toLowerCase()) ||
        //     data.vehNum
        //       .toLowerCase()
        //       .includes(this.searchValDevice.toLowerCase()) ||
        //     data.xmh
        //       .toLowerCase()
        //       .includes(this.searchValDevice.toLowerCase()) ||
        //     data.deviceKeeper
        //       .toLowerCase()
        //       .includes(this.searchValDevice.toLowerCase()) ||
        //     data.deviceUser
        //       .toLowerCase()
        //       .includes(this.searchValDevice.toLowerCase())
        // );
      }
    },
    releaseDevice(row) {
      this.$http
        .post("/BorrowingManagement/releaseLock", { sn: row.sn, applier: this.username }) //开锁 owner username=deviceUser
        .then((res) => {
          console.log(res);
          var { res, data, detail } = res.data;
          if (res == "V") {
            data.forEach((item, index) => {
              if (item.deviceApply.length > 0) {
                item.deviceApply = item.deviceApply[0];
              }
            });

            this.allresultBor = data;
            this.$message({
              type: "success",
              message: "释放成功!",
            });
          } else {
            this.$message({
              type: "warning",
              message: detail,
            });
          }
        })
        .catch((res) => {
          console.log(res);
          this.$message({
            type: "error",
            message: "释放失败!",
          });
        });
    },
    applyForLock(row) {
      this.$http
        .post("/BorrowingManagement/applyForLock", { sn: row.sn, applier: this.username }) //锁申请
        .then((res) => {
          console.log(res);
          var { res, data, detail } = res.data;
          if (res == "V") {
            this.$message({
              type: "success",
              message: "申请成功!",
            });
            // if (data) {
            data.forEach((item, index) => {
              if (item.deviceApply.length > 0) {
                item.deviceApply = item.deviceApply[0];
              }
            });
            this.allresultBor = data;
            // }
            // console.log(tableDataBor);
            // tableDataBor.forEach((item,index)=>{

            // })
          } else {
            this.$message({
              type: "error",
              message: "申请失败!" + detail,
            });
          }
        })
        .catch((res) => {
          console.log(res);
          this.$message({
            type: "error",
            message: "申请失败!",
          });
        });
    },
    applyForDevice(row, user) {
      if (user == "admin") {
        var applier = "admin";
      } else {
        var applier = this.username;
      }
      this.$http
        .post("/BorrowingManagement/applyForDevice", { sn: row.sn, applier: applier }) //外借申请 归还applier admin
        .then((res) => {
          console.log(res);
          var { res, data, detail } = res.data;
          if (res == "V") {
            this.$message({
              type: "success",
              message: "申请成功!",
            });

            data.forEach((item, index) => {
              if (item.deviceApply.length > 0) {
                // console.log("device", item.deviceApply);
                // if(item.deviceApply[0].name=='admin'){
                //   item.deviceApply=[]
                // }else{
                item.deviceApply = item.deviceApply[0];

                // }
              }
            });

            this.allresultBor = data;
            console.log(this.allresultBor);
          } else {
            this.$message({
              type: "error",
              message: "申请失败!" + detail,
            });
          }
        })
        .catch((res) => {
          console.log(res);
          this.$message({
            type: "error",
            message: "申请失败!",
          });
        });
    },

    randomArr() {
      var arr = [];
      for (var i = 0; i < 100; i++) {
        var index = 10 * Math.random().toFixed(2);
        arr.push(index);
      }
      return arr;
    },
    randomBoolean() {
      var arr = [];
      for (var i = 0; i < 100; i++) {
        var index = Math.round(Math.random());
        arr.push(index);
      }
      return arr;
    },
    syncExtremes(e) {
      console.log("methods");
      var thisChart = this.chart;
      if (e.trigger !== "syncExtremes") {
        Highcharts.each(Highcharts.charts, function (chart) {
          if (chart !== thisChart) {
            if (chart.xAxis[0].setExtremes) {
              chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {
                trigger: "syncExtremes",
              });
            }
          }
        });
      }
    },
    highchartMove(e) {
      // this.$nextTick(function(){

      // console.log(Highcharts.charts);

      // var Highchart=Highcharts.charts.slice(-3)
      // Highcharts.charts=Highcharts.charts.slice(-3) //每次切换页面都会多出undefined，不能去掉它，一修改就清空了。。

      var chart, point, event, i;

      for (i = 0; i < Highcharts.charts.length; i = i + 1) {
        chart = Highcharts.charts[i];
        if (chart) {
          event = chart.pointer.normalize(e); // Find coordinates within the chart
          point = chart.series[0].searchPoint(event, true); // Get the hovered point
          // console.log(point);
          if (point) {
            point.highlight(e);
          }
        }
      }
      // })
    },
  },
  created() {
    this.collList = [
      {
        sn: 6001,
        tableData: [
          {
            name: "nmot_1",
            data: this.randomArr(),
            boolean: this.randomBoolean(),
          },
          {
            name: "nmot_2",
            data: this.randomArr(),
            boolean: this.randomBoolean(),
          },
          {
            name: "nmot_3",
            data: this.randomArr(),
            boolean: this.randomBoolean(),
          },
          {
            name: "nmot_4",
            data: this.randomArr(),
            boolean: this.randomBoolean(),
          },
        ],
      },
    ];
    this.progressArr = { AAAA: 25, BBBB: 50, CCCC: 75, DDDD: 100 };

    this.canvas = [
      {
        title: "AAA",
        description: "BBB",
        a2lname: "xxx",
        hexname: "xxxxx",
        // physical:[],
        plotdata: {
          x: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            46,
            47,
            48,
            49,
            50,
            51,
            52,
            53,
            54,
            55,
            56,
            57,
            58,
            59,
            60,
            61,
            62,
            63,
            64,
            65,
            66,
            67,
            68,
            69,
            70,
            71,
            72,
            73,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            82,
            83,
            84,
            85,
            86,
            87,
            88,
            89,
            90,
            91,
            92,
            93,
            94,
            95,
            96,
            97,
            98,
            99,
          ],
          physical: [
            { name: "signal1", data: this.randomArr() },
            { name: "signal2", data: this.randomArr() },
            { name: "signal3", data: this.randomArr() },

            // { name: "signal1", data: this.randomArr() },
            // { name: "signal2", data: this.randomArr() },
            // { name: "signal3", data: this.randomArr() },

            // { name: "signal1", data: this.randomArr() },
            // { name: "signal2", data: this.randomArr() },
            // { name: "signal3", data: this.randomArr() }
          ],
        },
        boolean: [
          {
            name: "sig3",
            data: this.randomBoolean(),
          },
          {
            name: "sig3",
            data: this.randomBoolean(),
          },
        ],
      },
    ];
    // var markerArr = [];
    this.$http
      .get("/BorrowingManagement/devicePosition")
      .then((res) => {
        console.log(res);
        var { data } = res.data;
        this.allresultDevice = data;
        this.resultDevice = this.allresultDevice.filter(function () {
          return true;
        });
        // console.log(957, this.allresultDevice);

        data.forEach((item) => {
          var { deviceOnline, GPS_Longitude, GPS_Latitude, sn } = item;

          // if (deviceOnline) {
          // var marker = new AMap.Marker({
          //   position: new AMap.LngLat(GPS_Longitude, GPS_Latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          //   title: sn,
          // });
          var marker = {
            center: [GPS_Longitude, GPS_Latitude],
            label: {
              // content: `<div class="${textClass}">${sn}</div>`,
              content: sn,
              offset: [-5, -15],
            },
          };
          if (deviceOnline) {
          } else {
            marker.icon = require("../assets/download/map-marker.png");
          }
          this.markerArr.push(marker);
          // }
        });
        // map.add(markerArr);
      })
      .catch(() => {
        this.$message({
          type: "error",
          message: "获取盒子信息失败!",
        });
      });
  },
  beforeDestroy() {
    console.log("end");
    // const device = iot.device({
    //   ProductKey: "a131J7vEuTA",
    //   DeviceName: "device-05",
    //   DeviceSecret: "ImCy6Ep2Q0stw56fSAjMMEY5Wtd4Ex4Q",
    // });

    // device.end();
  },
  // destroyed() {
  //   // this.hackReset=false;
  //   console.log(Highcharts.charts);
  //   // Highcharts.charts=[]
  // },
  // beforeMount() {
  //   console.log(Highcharts.charts);
  // },
  mounted() {
    // const device = iot.device({
    //   ProductKey: "a131J7vEuTA",
    //   DeviceName: "device-05",
    //   DeviceSecret: "ImCy6Ep2Q0stw56fSAjMMEY5Wtd4Ex4Q",
    // });

    //监听connect事件
    // device.on("connect", () => {
    //   //将<productKey> <deviceName>修改为实际值
    //   device.subscribe("/<productKey>/<deviceName>/user/get");
    //   console.log("connect successfully!");
    //   device.publish("/<productKey>/<deviceName>/user/update", "hello world!");
    // });

    //监听message事件
    // device.on("message", (topic, payload) => {
    //   console.log(topic, payload.toString());
    // });

    // this.$http.post('/').then(res=>{
    //   var {data}=res;
    // this.allresultBor=data.data

    // })
    this.$http
      .get("/BorrowingManagement/getDeviceAndLockRequest")
      .then((res) => {
        console.log(res);
        var { data } = res.data;

        data.forEach((item, index) => {
          if (item.deviceApply.length > 0) {
            // console.log("device", item.deviceApply);
            // if(item.deviceApply[0].name=='admin'){
            //   item.deviceApply=[]
            // }else{
            item.deviceApply = item.deviceApply[0];

            // }
          }
        });

        this.allresultBor = data;
        console.log(this.allresultBor);

        //      this.allresultBor = [
          // {
          //   sn: "6000",
          //   islocked: true,
          //   vehNum: "san.zhang",
          //   xmh: "2234234",
          //   deviceKeeper: "san.zhang",
          //   deviceApply: [{ name: "li.gao", phone: "132132354" }],
          //   deviceUser: "yang.mei",
          //   useApply: [
          //     { name: "li.gao", phone: "132132354" },
          //     { name: "li.gao", phone: "132132354" }
          //   ],
          //   borrow_date: "Sun, 26 Apr 2020 16:16:46 GMT"
          // },
        //   {
        //     sn: "6000",
        //     islocked: true,
        //     vehNum: "san.zhang",
        //     xmh: "2234234",
        //     deviceKeeper: "admin",
        //     deviceApply: [{ name: "li.gao", phone: "132132354" }],
        //     deviceUser: "",
        //     useApply: [
        //       { name: "li.gao", phone: "132132354" },
        //       { name: "li.gao", phone: "132132354" }
        //     ],
        //     borrow_date: "Sun, 26 Apr 2020 16:16:46 GMT"
        //   },
        //   {
        //     sn: "6000",
        //     islocked: true,
        //     vehNum: "san.zhang",
        //     xmh: "2234234",
        //     deviceKeeper: "admin",
        //     deviceApply: [{ name: "li.gao", phone: "132132354" }],
        //     deviceUser: "admin",
        //     useApply: [
        //       { name: "li.gao", phone: "132132354" },
        //       { name: "li.gao", phone: "132132354" }
        //     ],
        //     borrow_date: "Sun, 26 Apr 2020 16:16:46 GMT"
        //   },
        // ];

        // this.resultBor = this.allresultBor.filter(
        //   data =>
        //     !this.searchValBor ||
        //     // data.uid.toString().includes(val.toLowerCase()) ||
        //     data.sn.toLowerCase().includes(this.searchValBor.toLowerCase()) ||
        //     data.vehNum.toLowerCase().includes(this.searchValBor.toLowerCase()) ||
        //     data.xmh.toLowerCase().includes(this.searchValBor.toLowerCase()) ||
        //     data.deviceKeeper.toLowerCase().includes(this.searchValBor.toLowerCase()) ||
        //     data.deviceUser.toLowerCase().includes(this.searchValBor.toLowerCase()) ||
        //     data.borrow_date.toLowerCase().includes(this.searchValBor.toLowerCase())
        // );
      })
      .catch((res) => {
        console.log(res);
      });

    var arr = [];
    for (var i = 1; i < 100; i++) {
      arr.push(i);
    }
    console.log(JSON.stringify(arr));
    var arr = [];
    for (var i = 1; i < 100; i++) {
      Math.random();
      arr.push(i);
    }

    console.log(this.signalData);
    // this.hackReset = false
    // this.$nextTick(() => {
    // this.hackReset = true

    // })
    // Highcharts.charts=[]

    // this.$http
    //   .get("/getOnlineDevice")
    //   .then(res => {
    //     console.log(res);
    //     var { detialDevice } = res.data;
    //     this.boxData = detialDevice;
    //     // console.log(JSON.stringify(this.boxData));
    //     this.boxData = [
    //       {
    //         "4gOnline": false,
    //         LockStatus: true,
    //         Recording_Status: "4G不在线",
    //         administrativeArea: { city: [], district: [], province: [] },
    //         deviceId: "7019d830-5c5c-11ea-ac3c-794784c289ac",
    //         gpsOnline: false,
    //         rcdLatitude: null,
    //         rcdLongitude: null,
    //         snNumber: "6020",
    //         user: "emstest@cn.bosch.com",
    //         xmh: "xxxx"
    //       },
    //       {
    //         "4gOnline": false,
    //         LockStatus: true,
    //         Recording_Status: "4G不在线",
    //         administrativeArea: { city: [], district: [], province: [] },
    //         deviceId: "7019d830-5c5c-11ea-ac3c-794784c289ac",
    //         gpsOnline: false,
    //         rcdLatitude: null,
    //         rcdLongitude: null,
    //         snNumber: "6020",
    //         user: "emstest@cn.bosch.com",
    //         xmh: "xxxx"
    //       },
    //       {
    //         "4gOnline": false,
    //         LockStatus: true,
    //         Recording_Status: "4G不在线",
    //         administrativeArea: { city: [], district: [], province: [] },
    //         deviceId: "7019d830-5c5c-11ea-ac3c-794784c289ac",
    //         gpsOnline: false,
    //         rcdLatitude: null,
    //         rcdLongitude: null,
    //         snNumber: "6020",
    //         user: "emstest@cn.bosch.com",
    //         xmh: "xxxx"
    //       },
    //       {
    //         "4gOnline": false,
    //         LockStatus: true,
    //         Recording_Status: "4G不在线",
    //         administrativeArea: { city: [], district: [], province: [] },
    //         deviceId: "7019d830-5c5c-11ea-ac3c-794784c289ac",
    //         gpsOnline: false,
    //         rcdLatitude: null,
    //         rcdLongitude: null,
    //         snNumber: "6020",
    //         user: "emstest@cn.bosch.com",
    //         xmh: "xxxx"
    //       },
    //       {
    //         "4gOnline": false,
    //         LockStatus: true,
    //         Recording_Status: "4G不在线",
    //         administrativeArea: { city: [], district: [], province: [] },
    //         deviceId: "7019d830-5c5c-11ea-ac3c-794784c289ac",
    //         gpsOnline: false,
    //         rcdLatitude: null,
    //         rcdLongitude: null,
    //         snNumber: "6020",
    //         user: "emstest@cn.bosch.com",
    //         xmh: "xxxx"
    //       },
    //       {
    //         "4gOnline": false,
    //         LockStatus: true,
    //         Recording_Status: "4G不在线",
    //         administrativeArea: { city: [], district: [], province: [] },
    //         deviceId: "7019d830-5c5c-11ea-ac3c-794784c289ac",
    //         gpsOnline: false,
    //         rcdLatitude: null,
    //         rcdLongitude: null,
    //         snNumber: "6020",
    //         user: "emstest@cn.bosch.com",
    //         xmh: "xxxx"
    //       },
    //       {
    //         "4gOnline": false,
    //         LockStatus: true,
    //         Recording_Status: "4G不在线",
    //         administrativeArea: { city: [], district: [], province: [] },
    //         deviceId: "7019d830-5c5c-11ea-ac3c-794784c289ac",
    //         gpsOnline: false,
    //         rcdLatitude: null,
    //         rcdLongitude: null,
    //         snNumber: "6020",
    //         user: "emstest@cn.bosch.com",
    //         xmh: "xxxx"
    //       },
    //       {
    //         "4gOnline": false,
    //         LockStatus: true,
    //         Recording_Status: "4G不在线",
    //         administrativeArea: { city: [], district: [], province: [] },
    //         deviceId: "7019d830-5c5c-11ea-ac3c-794784c289ac",
    //         gpsOnline: false,
    //         rcdLatitude: null,
    //         rcdLongitude: null,
    //         snNumber: "6020",
    //         user: "emstest@cn.bosch.com",
    //         xmh: "xxxx"
    //       }
    //     ];
    //   })
    //   .catch(error => {});

    Highcharts.Pointer.prototype.reset = function () {
      return undefined;
    };
    /**
     * 高亮当前的数据点，并设置鼠标滑动状态及绘制十字准星线
     */
    Highcharts.Point.prototype.highlight = function (event) {
      this.onMouseOver(); // 显示鼠标激活标识
      // console.log(this.series.chart.tooltip)
      // this.series.chart.tooltip.refresh(this); // 显示提示框
      // this.series.chart.xAxis[0].drawCrosshair(event, this); // 显示十字准星线
      // this.series.chart.xAxis[1].drawCrosshair(event, this); // 显示十字准星线
    };
  },

  watch: {
    // allresultDevice() {
    //   this.resultDevice = this.allresultDevice.filter(
    //     (data) =>
    //       !this.searchValDevice ||
    //       // data.uid.toString().includes(this.searchValDevice.toLowerCase()) ||
    //       data.sn.toLowerCase().includes(this.searchValDevice.toLowerCase()) ||
    //       data.Latest_Upload_Cfg_Name.toLowerCase().includes(
    //         this.searchValDevice.toLowerCase()
    //       ) ||
    //       data.onlineTime
    //         .toLowerCase()
    //         .includes(this.searchValDevice.toLowerCase())
    //   );
    // },
    // searchValDevice(val) {
    //   console.log(val);
    //   this.resultDevice = this.allresultDevice.filter(
    //     (data) =>
    //       !val ||
    //       data.sn.toLowerCase().includes(val.toLowerCase()) ||
    //       data.Latest_Upload_Cfg_Name.toLowerCase().includes(
    //         val.toLowerCase()
    //       ) ||
    //       data.onlineTime.toLowerCase().includes(val.toLowerCase())
    //     // ||
    //   );
    // },
    allresultBor() {
      this.resultBor = this.allresultBor.filter(
        (data) =>
          !this.searchValBor ||
          // data.uid.toString().includes(this.searchValBor.toLowerCase()) ||
          data.sn.toLowerCase().includes(this.searchValBor.toLowerCase()) ||
          data.vehNum.toLowerCase().includes(this.searchValBor.toLowerCase()) ||
          data.xmh.toLowerCase().includes(this.searchValBor.toLowerCase()) ||
          data.deviceKeeper
            .toLowerCase()
            .includes(this.searchValBor.toLowerCase()) ||
          data.deviceUser
            .toLowerCase()
            .includes(this.searchValBor.toLowerCase())
        //    ||
        // data.borrow_date
        //   .toLowerCase()
        //   .includes(this.searchValBor.toLowerCase())
      );
    },
    searchValBor(val) {
      console.log(val);
      this.resultBor = this.allresultBor.filter(
        // data => {
        //   if (!val) {
        //     return false;
        //   } else {
        //     var flag = false;
        //     for (var item in data) {
        //       if (data[item].toLowerCase().includes(val.toLowerCase())) {
        //         flag = true;
        //         return;
        //       }
        //     }
        //     return flag;
        //   }
        // }
        (data) =>
          !val ||
          data.sn.toLowerCase().includes(val.toLowerCase()) ||
          data.vehNum.toLowerCase().includes(val.toLowerCase()) ||
          data.xmh.toLowerCase().includes(val.toLowerCase()) ||
          data.deviceKeeper.toLowerCase().includes(val.toLowerCase()) ||
          data.deviceUser.toLowerCase().includes(val.toLowerCase())
        // ||
        // data.borrow_date.toLowerCase().includes(val.toLowerCase())
      );
    },
  },
  components: {
    "my-box": Box,
    "my-page": mypage,
    highcharts: Chart,
    "my-coll": mycoll,
  },
};
</script>

<style scoped>
.el-tag {
  height: 20px;
  line-height: 20px;
  margin: 1em;
}
.overview /deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
.overview /deep/ .el-collapse-item__wrap {
  border-bottom: none;
}
.overview /deep/ .el-collapse-item__content {
  padding-bottom: 0;
}
/* .overview /deep/ .offlinePoint {
  color: #666;
} */
/* .el-table /deep/ thead tr:first-child .cell{
text-align: center;
} */
</style>
