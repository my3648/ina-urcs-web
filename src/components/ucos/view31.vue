<template>
  <div>
    <div>
      <div style="width:60%;float:left">
        <!-- @tab-click="handleClick" -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="排放分析" name="排放分析">
            <!-- 待分析的排放清单 -->
            <div style="height:40px"></div>

          </el-tab-pane>
          <el-tab-pane label="导出排放登记表" name="导出排放登记表">
            <div style="margin:0.5em 0">
              <el-select v-model="projectNumVal" filterable placeholder="请选择项目号">
                <el-option v-for="item in projectNum" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
              <el-button type="primary" @click="emissionAjax()" style="width:90px">提交</el-button>

            </div>

          </el-tab-pane>
          <el-tab-pane label="导出项目报告" name="导出项目报告">
            <div style="margin:0.5em 0">
              <el-select v-model="projectNumVal" filterable placeholder="请选择项目号">
                <el-option v-for="item in projectNum" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
              <el-button type="primary" @click="emissionAjax()" style="width:90px">提交</el-button>

            </div>

          </el-tab-pane>
          <el-tab-pane label="项目查询" name="项目查询">
            <div style="margin:0.5em 0">
              <el-select v-model="projectNumVal" filterable placeholder="请选择项目号">
                <el-option v-for="item in projectNum" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
              <el-button type="primary" @click="emissionAjax()" style="width:90px">提交</el-button>

            </div>

          </el-tab-pane>
          <el-tab-pane label="工程师查询" name="工程师查询">
            <div style="margin:0.5em 0">
              <el-select v-model="engineerNameVal" filterable placeholder="请选择用户名">
                <el-option v-for="item in engineerName" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
              <el-button type="primary" @click="emissionAjax()" style="width:90px">提交</el-button>

            </div>

          </el-tab-pane>
          <el-tab-pane label="统计信息" name="统计信息">
            <div style="margin:0.5em 0">
              <span class="label">开始日期：</span>
              <el-input name="startTime" v-model="startTime" type="date" style="margin-right:2em;width:150px">
              </el-input>
              <span class="label">结束日期：</span>
              <el-input style="width:150px" name="endTime" v-model="endTime" type="date"></el-input>
              <el-button type="primary" @click="emissionAjax()" style="width:90px">提交</el-button>

            </div>

          </el-tab-pane>
        </el-tabs>

      </div>

      <div style="width:40%;float:left">
        <highcharts style="height:200px" :options="emissionChart"></highcharts>

      </div>
      <div style="overflow:hidden;clear:both;height:0"></div>

    </div>
    <el-divider></el-divider>
    <div style="margin:0.8em 0" v-if="activeName=='导出排放登记表'">
      <span class="require label">DAT备份路径：</span>
      <el-input name="backupPath" v-model="backupPath" style="width:450px" placeholder="请填写备份路径">
      </el-input>
      <el-button type="primary" @click="report31()" style="margin-left:0.5em">导出登记表</el-button>
      <div style="overflow:hidden;margin:1em 0">
        <h4 style="float:left;margin:0;line-height:40px;height:40px">本项目已标注登记排放统计表的清单：</h4>
        <el-button style="float:right" type="primary" @click="EmissionSubmit()">查询信息</el-button>

      </div>
    </div>
    <div v-if="activeName=='导出项目报告'">

      <div style="overflow: hidden; margin: 1em 0px;">
        <h4 style="float:left;margin:0;line-height:40px;height:40px">本项目已标注登记排放统计表的清单：</h4>
        <el-button style="float:right" type="primary" @click="EmissionSubmit()">查询信息</el-button>
        <el-button style="float:right;margin:0 1em" type="primary" @click="report31()">生成报告</el-button>

      </div>
    </div>

    <h4 v-if="activeName!='导出排放登记表'&&activeName!='导出项目报告'">待分析的排放清单（emissionID）:</h4>
    <div>
      <el-table :data="EmissionIDList" style="width: 100%" @row-click="selectList">
        <el-table-column label="序号" type="index" width="180">
          <!-- <template slot-scope="scope">
        
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template> -->
        </el-table-column>
        <el-table-column label="排放ID" prop="discharge">
          <template slot-scope="scope">

            <span :class="{cursor:true,listSel:scope.row.discharge==emissionID}">{{ scope.row.discharge }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="activeName!='导出排放登记表'&&activeName!='导出项目报告'" label="分析状态" prop="status" width="180">
          <template slot-scope="scope">
            <span style="color: #21ba45;" v-if="scope.row.status=='Y'">已分析</span>
            <span style="color: #db2828;" v-else>未分析</span>

          </template>
        </el-table-column>
        <el-table-column v-if="activeName=='导出排放登记表'||activeName=='导出项目报告'" label="是否选择" prop="status" width="180">
          <template slot-scope="scope">
            <!-- <span style="color: #21ba45;" v-if="scope.row.check=='Y'">已分析</span>
            <span style="color: #db2828;" v-else>未分析</span> -->
            <el-checkbox v-model="scope.row.checked"></el-checkbox>

          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:right;margin:1em 0" v-show="analy">
        <el-button type="primary" style="width:90px" @click="EmissionSubmit()">提交</el-button>
      </div>
    </div>

    <div style="display:flex" v-show="plat31Area">
      <div style="width:calc(100% - 275px);float:left">
        <el-tabs v-model="tabVal">
          <el-tab-pane label="排放结果" name="first">
            <div style="min-height:750px;padding-right:10px">
              <div
                class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition">
                <div class="el-table__body-wrapper is-scrolling-none">
                  <table class="el-table__body" v-html="table31Second" style="width: 100%;" cellspacing="0"
                    cellpadding="0" border="0">

                  </table>
                </div>
              </div>
            </div>

          </el-tab-pane>
          <el-tab-pane label="参数信息" name="second">
            <div style="min-height:750px;padding-right:10px">
              <div
                class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition">
                <div class="el-table__body-wrapper is-scrolling-none">
                  <table class="el-table__body" v-html="table31First" style="width: 100%;" cellspacing="0"
                    cellpadding="0" border="0">

                  </table>
                </div>
              </div>

            </div>

          </el-tab-pane>
          <el-tab-pane label="排放秒采" name="third">

            <highcharts style="height:500px;" :options="container31"></highcharts>

          </el-tab-pane>

        </el-tabs>

      </div>
      <div v-show="analy" style="height:755px;width:275px;float:left;">

        <el-scrollbar style="height:100%">

          <el-card style="min-height:750px">
            <div class="cardrow">
              <el-checkbox v-model="regRecord">登记排放记录</el-checkbox>
            </div>
            <div class="cardrow">
              <el-checkbox v-model="MinInjPlusCheck">最小脉宽限值</el-checkbox>
            </div>
            <div class="cardrow">
              <el-input size="mini" v-model="MinInjPlus"></el-input>
            </div>
            <div class="cardrow">
              <el-checkbox v-model="ExpiryDateCheck">绿标有效期</el-checkbox>
            </div>
            <div class="cardrow">
              <el-input size="mini" v-model="ExpiryDate"></el-input>
            </div>
            <div class="cardrow">
              <el-checkbox v-model="usedforReportType">用于报告</el-checkbox>
            </div>
            <div class="cardrow">
              <el-checkbox v-model="EmissionType31">排放类型</el-checkbox>
            </div>
            <div class="cardrow">
              <el-radio-group v-model="EmissionType">
                <el-radio label="新催">新催</el-radio>
                <el-radio label="老催">老催</el-radio>
                <el-radio label="-7度">-7度</el-radio>
              </el-radio-group>
            </div>
            <el-divider></el-divider>
            <el-button @click="OPTDefault()">启用推荐配置</el-button>

            <my-checkbox :title="key" :config="value" :OPTValue="OPTMethodUpdate[key]" @OPTUpdate="OPTUpdate"
              v-for="(value,key,index) in OPTMethod" :key="index"></my-checkbox>

          </el-card>
        </el-scrollbar>
        <el-button type="primary" style="margin:1em 0" @click="calc31()">提交</el-button>
      </div>
      <div style="overflow:hidden;height:0;clear:both"></div>
    </div>
  </div>
</template>

<script>
import view31checkbox from "./view31checkbox";
export default {
  data() {
    return {
      activeName: "排放分析",
      username: localStorage.getItem("username"),
      EmissionIDList: [],
      projectNum: [],
      engineerName: [],
      pieChart: [],
      projectNumVal: "",
      engineerNameVal: "",
      startTime: "",
      endTime: "",
      backupPath: "",
      emissionID: "", //表格中已选择的排放id
      container31: {
        chart: {
          type: "line",
          zoomType: "x",
          panning: true,
          panKey: "shift",
        },

        credits: {
          enabled: false,
        },
        title: {
          text: "",
        },
        xAxis: {
          title: {
            text: "时间(s)",
          },
        },
        yAxis: [],
        tooltip: {
          headerFormat: "时间：<b>{point.x} s</b><br/>",
          crosshairs: true, //十字准信
          shared: true,
        },
        plotOptions: {
          series: {
            marker: {
              enabled: false,
            },
          },
        },
        legend: {},
        series: [],
      },
      table31First: "",
      table31Second: "",
      tabVal: "first",

      regRecord: true,
      MinInjPlusCheck: false,
      MinInjPlus: "",
      ExpiryDateCheck: false,
      ExpiryDate: "",
      usedforReportType: true,
      // EmissionType31: true,
      EmissionType: "新催",
      OPTMethod: {},
      OPTMethodAuto: {},
      OPTMethodUpdate: {},
      analy: true,
      plat31Area: true,
    };
  },
  created() {
    this.FA7AnalysisReadDB1();
  },

  methods: {
    // emissionProSubmit() {

    // },
    emissionAjax() {
      var formData = new FormData();
      formData.append("type", this.type);
      formData.append("username", this.username);

      if (this.activeName == "导出排放登记表") {
        if (this.projectNumVal) {
          formData.append("value", this.projectNumVal);
        } else {
          return;
        }
      } else if (this.activeName == "导出项目报告") {
        if (this.projectNumVal) {
          formData.append("value", this.projectNumVal);
        } else {
          return;
        }
      } else if (this.activeName == "项目查询") {
        if (this.projectNumVal) {
          formData.append("value", this.projectNumVal);
        } else {
          return;
        }
      } else if (this.activeName == "工程师查询") {
        if (this.engineerNameVal) {
          formData.append("value", this.engineerNameVal);
        } else {
          return;
        }
      } else if (this.activeName == "统计信息") {
        formData.append("startTime", this.startTime);
        formData.append("endTime", this.endTime);
      }
      for (var [a, b] of formData.entries()) {
        console.log(a, b);
      }
      this.$http
        .post("http://139.196.196.221:8081/FA7AnalysisReadDB3", formData)
        .then((res) => {
          console.log(res);
          var { flg, info, EmissionIDList } = res.data;
          if (this.type == "FA7EmsStatisticalInfor") {
            this.infoModal(flg, info);
          } else {
            this.infoModal(flg, info);
            this.EmissionIDList = EmissionIDList.map((item, index) => {
              var obj = {
                id: item[0],
                discharge: item[1],
                status: item[2],
                checked: false,
              };
              return obj;
            });
          }
        });
    },
    FA7AnalysisReadDB1() {
      this.$http
        .post(
          "http://139.196.196.221:8081/FA7AnalysisReadDB1",
          JSON.stringify({
            username: this.username,
          })
        )
        .then((res) => {
          console.log(res);
          var { EmissionIDList, projectNum, engineerName, pieChart } = res.data;
          this.EmissionIDList = EmissionIDList.map((item, index) => {
            var obj = {
              id: item[0],
              discharge: item[1],
              status: item[2],
              checked: false,
            };
            return obj;
          });
          // console.log(EmissionIDList);
          // this.EmissionIDList = EmissionIDList;
          this.projectNum = projectNum;
          this.engineerName = engineerName;
          this.pieChart = pieChart;
        });
    },
    handleClick() {
      console.log(this.activeName);
      if (this.activeName == "排放分析") {
        this.FA7AnalysisReadDB1();
        this.plat31Area = true;
        this.analy = true;
      } else {
        this.EmissionIDList = [];
        this.plat31Area = false;
        this.analy = false;
      }
    },

    report31() {
      console.log(this.type);
      var formData = new FormData();

      if (this.projectNumVal) {
        formData.append("value", this.projectNumVal);
      } else {
        this.warnModal("请选择项目号。");
        return;
      }

      formData.append("type", this.type);
      formData.append("username", this.username);
      var arr = [];
      this.EmissionIDList.forEach((item, index) => {
        if (item["checked"]) {
          arr.push(item.discharge);
        }
      });
      formData.append("emissionIDs", arr);

      if (this.type == "emissionListEXP") {
        formData.append("typeSub", "exportXlsx");
        if (this.backupPath) {
          formData.append("backupPath", this.backupPath);
        } else {
          this.warnModal("请填写备份路径");
          return;
        }
      } else if (this.type == "emissionReport") {
        formData.append("typeSub", "emissionInfoReq");
      }

      for (var [a, b] of formData.entries()) {
        console.log(a, b);
      }
      this.$emit("infoModal", true);
      this.$http
        .post("http://139.196.196.221:8081/FA7AnalysisReadDB4", formData)
        .then((res) => {
          console.log(res);
          var { flg, info } = res.data;
          this.$emit("infoModal", false);

          this.infoModal(flg, info);
        })
        .catch((err) => {
          this.$emit("infoModal", false);
          this.infoModal("nok", "提交失败!");
        });
    },
    EmissionSubmit() {
      var ajaxData = {
        username: this.username,
        emissionID: this.emissionID,
        type: this.type,
        value: this.projectNumVal,
        typeSub: "emissionInfoReq",
      };
      if (this.type == "emissionListEXP") {
        ajaxData.backupPath = this.backupPath;
      }
      this.$emit("infoModal", true);
      this.$http
        .post(
          "http://139.196.196.221:8081/FA7AnalysisReadDB2",
          JSON.stringify(ajaxData)
        )
        .then((res) => {
          console.log(res);
          var {
            signals,
            parameters,
            OPTMethod,
            EmissionLimits,
            OPTMethodAuto,
            emissionRemark,
            flg,
            info,
          } = res.data;
          this.plat31Area = true;
          if (this.type == "emissionAnalysis") {
            this.analy = true;
          } else {
            this.analy = false;
          }
          this.$emit("infoModal", false);

          this.infoModal(flg, info);
          this.OPTMethod = OPTMethod;
          this.OPTMethodAuto = OPTMethodAuto;
          // this.OPTMethodUpdate = {}; //?????赋值之后 会影响子组件的watch??
          // var OPTMethodUpdate={}
          for (var item in OPTMethod) {
            this.$set(this.OPTMethodUpdate, item, []);
          }
          // this.OPTMethodUpdate=OPTMethodUpdate

          var yAxisArr = [];
          var chart31Arr = [];
          var colorArr = ["black", "#ffac38", "red"];

          Object.keys(signals).forEach((item, index) => {
            var obj = {
              yAxis: index,
              name: item,
              data: signals[item],
            };
            yAxisArr.push({
              title: {
                text: null, //
              },
              labels: {
                format: "{value}", //°C
                style: {
                  color: Highcharts.getOptions().colors[index],
                },
              },
            });
            chart31Arr.push(obj);
          });
          this.container31 = {
            chart: {
              type: "line",
              zoomType: "x",
              panning: true,
              panKey: "shift",
            },

            credits: {
              enabled: false,
            },
            title: {
              text: "",
            },
            xAxis: {
              // categories: [1,2,3,4,5,6,7,8,9,10],
              // tickInterval: 0.1,
              title: {
                text: "时间(s)",
              },
            },
            yAxis: yAxisArr,
            tooltip: {
              headerFormat: "时间：<b>{point.x} s</b><br/>",
              crosshairs: true, //十字准信
              shared: true,
            },
            plotOptions: {
              series: {
                marker: {
                  enabled: false,
                },
              },
            },
            legend: {},
            series: chart31Arr,
          };

          var table31Str = `<thead><tr class="el-table__row">`;
          Object.keys(parameters).forEach((item, index) => {
            table31Str += `<th colspan="2">
            <div class="cell">
             ${item}
            </div>
           
            </th>`;
          });

          table31Str += `</tr></thead><tbody>`;
          // console.log(parameters);
          // console.log(Object.keys(parameters));
          //  for(var key in parameters){
          //    key
          //  }
          var maxNum = 0;
          Object.values(parameters).forEach((item, index) => {
            if (maxNum < Object.keys(item).length) {
              maxNum = Object.keys(item).length;
            }
          });
          console.log(maxNum);
          for (var j = 0; j < maxNum; j++) {
            table31Str += `<tr class="el-table__row">`;
            for (var i = 0; i < Object.keys(parameters).length; i++) {
              var obj = parameters[Object.keys(parameters)[i]];
              // if(Object.keys[obj][j]){
              if (Array.isArray(Object.values(obj)[j])) {
                table31Str += `<td>
                 <div class="cell">
                ${Object.keys(obj)[j] || ""}
                </div>
               </td><td style="color:${colorArr[Object.values(obj)[j][1]]}">
               <div class="cell">
                ${Object.values(obj)[j][0] || ""}
               </div>
              </td>`;
              } else {
                table31Str += `<td>
                <div class="cell">
                ${Object.keys(obj)[j] || ""}
                </div>
                </td><td>
                <div class="cell">
                ${Object.values(obj)[j] || ""}
                </div>
                </td>`;
              }
            }
            table31Str += `</tr>`;
          }

          table31Str += "</tbody>";
          // console.log(table31Str);
          // $("#table31First").html(table31Str);
          this.table31First = table31Str;
          // --

          var table31Str = `<thead>`;
          JSON.parse(JSON.stringify(EmissionLimits)).forEach((item, index) => {
            if (index == 0) {
              table31Str += `<tr class="el-table__row">`;
              item.forEach((value, cindex) => {
                table31Str += `<th>
                <div class="cell">
                ${value}</div>
                
                </th>`;
              });
              table31Str += `</tr></thead>`;
              table31Str += `<tbody>`;
            } else {
              table31Str += `<tr class="el-table__row">`;
              item.forEach((value, cindex) => {
                table31Str += `<td>
                <div class="cell">
                  ${value}
                </div>
                </td>`;
              });
              table31Str += `</tr>`;
            }
          });
          table31Str += `</tbody></tbody>`;
          // $("#table31Second").html(table31Str);
          this.table31Second = table31Str;
        })
        .catch((err) => {
          this.$emit("infoModal", false);
          this.infoModal("nok", "提交失败!");
        });
    },
    selectList(row, column, event) {
      console.log(row);
      console.log(column);
      console.log(event);
      this.emissionID = row.discharge;
    },
    OPTUpdate(key, value) {
      // [key] = value;
      this.$set(this.OPTMethodUpdate, key, value);
      // console.log("OPTMethodUpdate", this.OPTMethodUpdate);
    },
    OPTDefault() {
      console.log(this.OPTMethodAuto);
      for (var item in this.OPTMethodAuto) {
        // this.OPTMethodUpdate[item]=[]
        this.$set(this.OPTMethodUpdate, item, []);
        this.OPTMethodAuto[item].forEach((value, index) => {
          if (value) {
            this.OPTMethodUpdate[item].push(this.OPTMethod[item][index]);
          }
        });
      }
      // this.OPTMethodUpdate={}
      console.log(this.OPTMethodUpdate);
    },
    calc31() {
      var formData = new FormData();
      formData.append("emissionRemark", $("#emissionRemark textarea").val());
      formData.append("username", this.username);
      formData.append("emissionID", this.emissionID);
      var emissionArr = [];
      this.EmissionIDList.forEach((item, index) => {
        if (item["checked"]) {
          emissionArr.push(item.discharge);
        }
      });
      formData.append("emissionArr", emissionArr);

      formData.append("regRecord", this.regRecord);

      if (this.MinInjPlusCheck) {
        formData.append("MinInjPlus", this.MinInjPlus);
      }
      if (this.ExpiryDateCheck) {
        formData.append("ExpiryDate", this.ExpiryDate);
      }
      formData.append("usedforReportType", this.usedforReportType);
      formData.append("EmissionType", this.EmissionType);
      formData.append("OPTMethodUpdate", JSON.stringify(this.OPTMethodUpdate));

      for (var [a, b] of formData.entries()) {
        console.log(a, b);
      }
      this.$emit("infoModal", true);
      this.$http
        .post("http://139.196.196.221:8081/FA7AnalysisAssistant", formData)
        .then((res) => {
          console.log(res);
          var { flg, info } = res.data;
          this.plat31Area = true;
          if (this.type == "emissionAnalysis") {
            this.analy = true;
          } else {
            this.analy = false;
          }
          this.$emit("infoModal", false);

          this.infoModal(flg, info);
          this.FA7AnalysisReadDB1();
        })
        .catch((err) => {
          this.$emit("infoModal", false);
          this.infoModal("nok", "提交失败!");
        });
    },
  },
  computed: {
    EmissionType31: {
      set(val) {
        if (val) {
          this.EmissionType = "新催";
        } else {
          this.EmissionType = "";
        }
      },
      get(val) {
        return Boolean(this.EmissionType);
      },
    },
    emissionChart() {
      var obj = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
        credits: {
          enabled: false,
        },
        title: {
          text: "排放总数" + this.pieChart[2],
        },
        tooltip: {
          pointFormat: "<b>{point.percentage:.1f}%</b>",
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} %",
              distance: -30,
              style: {
                fontWeight: "bold",
                color: "white",
                textShadow: "0px 1px 2px black",
              },
            },
            // showInLegend: true
          },
        },
        series: [
          {
            name: "Brands",
            colorByPoint: true,
            data: [
              {
                name: "未分析",
                y: this.pieChart[0],
                color: "#f15c80",
              },
              {
                name: "已分析",
                y: this.pieChart[1],
                color: "#90ed7d",
              },
            ],
          },
        ],
      };

      return obj;
    },
    type() {
      var obj = {
        排放分析: "emissionAnalysis",
        导出排放登记表: "emissionListEXP",
        导出项目报告: "emissionReport",
        项目查询: "projectChkout",
        工程师查询: "engineerChkout",
        统计信息: "FA7EmsStatisticalInfor",
      };
      return obj[this.activeName];
    },
  },
  components: {
    "my-checkbox": view31checkbox,
  },
};
</script>

<style scoped>
.listSel {
  color: #409eff;
}
.cursor {
  cursor: pointer;
}
.cardrow {
  margin: 0.8em 0;
}
.el-radio {
  margin-right: 15px;
}
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
/* .tablemy .cell {
  padding-left: 5px !important;
  padding-right: 5px !important;
 
} */
</style>