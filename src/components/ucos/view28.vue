<template>
  <div>
    <form action="" ref="form28">
      <input type="hidden" name="projectNumber" v-model="projectNumber">
      <input type="hidden" name="email" v-model="email">
      <div style="margin:0.4em 0">
        <el-button type="primary" style="width:100px" @click="transdcm()">选择DCM</el-button>
        <input ref="dcm28" type="file" multiple="multiple" accept=".DCM," name="plat28DCM" style="display: none"
          @change="dcmChange($event)">
        <el-input size="medium" @keyup.native="onlyNumber" style="width:450px;" placeholder="请选择DCM文件"
          v-model="dcmFileName" :disabled="true">
        </el-input>
      </div>
      <div style="margin:0.4em 0">
        <el-button type="primary" style="width:100px" @click="transdat()">选择dat</el-button>
        <input ref="dat28" type="file" multiple="multiple" accept=".dat,.mf4" name="plat28dat" style="display: none"
          @change="datChange($event)">
        <el-input size="medium" @keyup.native="onlyNumber" style="width:450px;" placeholder="请选择dat文件"
          v-model="datFileName" :disabled="true">
        </el-input>
        <el-button @click="submit()" type="success">上传文件
        </el-button>
      </div>

    </form>
    <highcharts style="height:500px;margin-top:1em" :options="options"></highcharts>

    <form ref="selectForm28">
      <div style="min-width:1100px">
        <el-card :body-style="{ padding: '0px' }">
          <el-container style="height:700px;">
            <el-aside style="border-right:1px solid #eee;width:450px;padding:1em">
              <el-row :gutter="20">
                <el-col :span="12" v-for="(item,index) in cttlist" :key="index">
                  <div class="label">{{item[0]}}</div>
                  <el-popover placement="top-start" trigger="hover" :content="item[1]">
                    <el-input size="medium" @keyup.native="onlyNumber" slot="reference" v-model="item[2]"
                      :placeholder="item[1]" :name="item[0]">
                    </el-input>
                  </el-popover>
                </el-col>
                <!-- <el-col :span="12">
                <div class="label">CtT_tDsTMinusFirstStrtEntryThres_C</div>
                <el-input size="medium" @keyup.native="onlyNumber" placeholder="诊断开始的流量积分阀值"></el-input>

              </el-col> -->
              </el-row>
              <el-button type="primary" size="medium" @click="calc('saveDCM')" style="margin:1em 0">保存为DCM</el-button>
              <!-- <div class="row">
         
         

          </div> -->

            </el-aside>
            <el-main style="padding:1em">
              <h4 style="margin-top:0">主水温和二路水温面积比</h4>
              <el-row :gutter="20" style="display:flex">
                <el-col :span="8">
                  <el-card>
                    <el-radio v-model="radio" label="Original" name="ratioCalType">基于原数据计算</el-radio>
                  </el-card>

                </el-col>
                <el-col :span="8">
                  <el-card>
                    <el-radio v-model="radio" label="offset" name="ratioCalType">基于传感器偏差值计算</el-radio>
                    <el-form :disabled="radio!='offset'">
                      <div style="margin-top:1em">
                        <div class="label">主水温偏差</div>
                        <el-input size="medium" @keyup.native="onlyNumber" name="tmotOff" v-model="tmotOff"></el-input>
                      </div>
                      <div style="">
                        <div class="label">二路水温偏差</div>
                        <el-input size="medium" @keyup.native="onlyNumber" name="tmot2Off" v-model="tmot2Off">
                        </el-input>
                      </div>
                    </el-form>

                  </el-card>

                </el-col>
                <el-col :span="8">
                  <el-card>
                    <el-radio v-model="radio" label="setValue" name="ratioCalType">基于预置调节计算</el-radio>
                    <el-form :disabled="radio!='setValue'">
                      <div style="margin-top:1em">
                        <div class="label">PC底板电阻:</div>
                        <el-input size="medium" @keyup.native="onlyNumber" name="r1Val" v-model="r1Val" value="2150">
                        </el-input>
                      </div>
                      <div style="">
                        <div class="label">温度偏移 预置:</div>
                        <div>
                          <el-input size="medium" @keyup.native="onlyNumber" :disabled="r0Val!=''" name="tmotStd" v-model="tmotStd"
                            style="width:40%"></el-input>
                          <i class="el-icon-right"></i>
                          <el-input size="medium" @keyup.native="onlyNumber" :disabled="r0Val!=''" name="tmotLow" v-model="tmotLow"
                            style="width:40%"></el-input>

                        </div>
                      </div>
                      <div>
                        <div class="label">附加电阻偏移 预置:
                        </div>
                        <el-input size="medium" @keyup.native="onlyNumber" :disabled="tmotStd!=''||tmotLow!=''" name="r0Val" v-model="r0Val"></el-input>
                      </div>
                      <div>
                        <div class="label">预置温度偏移对应的附加电阻值:
                        </div>
                        <el-input size="medium" @keyup.native="onlyNumber" readonly="readonly" name="r0Cal"
                          v-model="r0Cal"></el-input>
                      </div>
                    </el-form>
                  </el-card>

                </el-col>
                <!-- <el-col :span="12">
                <div class="label">CtT_tDsTMinusFirstStrtEntryThres_C</div>
                <el-input size="medium" @keyup.native="onlyNumber" placeholder="诊断开始的流量积分阀值"></el-input>

              </el-col> -->
              </el-row>
              <div style="margin:1em 0">
                <el-button type="primary" @click="calc('percent')" :loading="percentLoading" size="medium">计算
                </el-button>
                <span class="label" style="margin-left:1em">面积比：</span>
                <el-input size="medium" v-model="areaRatio" readonly="readonly" style="width:150px">
                  <template slot="append">%</template>
                </el-input>
                <span class="label" style="margin-left:1em">备注：</span>
                <el-input size="medium" name="areaRatio_info" v-model="areaRatio_info" readonly="readonly"
                  style="width:400px">

                </el-input>

              </div>
              <el-divider>

              </el-divider>
              <div>
                <h4 style="margin-top:0">转速超限值的累计时间</h4>
                <span class="label">转速限定阀值</span>
                <el-input size="medium" @keyup.native="onlyNumber" name="nmotLimit" v-model="nmotLimit"
                  style="width:150px;margin-left:1em">
                </el-input>
                <el-button size="medium" type="primary" @click="calc('time')" :loading="timeLoading">计算</el-button>
                <div style="margin:1em 0">
                  <span class="label">累计时间：</span>
                  <el-input size="medium" v-model="nmotLimit_time" readonly="readonly" style="width:150px">
                   
                  </el-input>
                  <span class="label" style="margin-left:1em">备注：</span>
                  <el-input size="medium" readonly="readonly" style="width:400px">
                  </el-input>
                </div>

              </div>

            </el-main>
          </el-container>
        </el-card>

      </div>

    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dcmFileName: "",
      datFileName: "",
      options: {
        chart: {
          type: "line",
        },
        credits: {
          enabled: false,
        },
        title: {
          text: "",
        },
        xAxis: {
          categories: [],
          title: {
            text: "时间(s)",
          },
        },
        yAxis: [
          {
            tickInterval: 1,
            title: {
              text: "温度",
              align: "high",
            },
            labels: {
              format: "{value}°C",
            },
          },
          {
            tickInterval: 1,
            title: {
              text: "百分比",
              align: "high",
              style: {
                color: Highcharts.getOptions().colors[5],
              },
            },
            labels: {
              format: "{value}%",
              rotation: 270,
              style: {
                color: Highcharts.getOptions().colors[5],
              },
            },
          },
          {
            tickInterval: 1,
            title: {
              text: "statFlag",
              align: "high",
              style: {
                color: Highcharts.getOptions().colors[4],
              },
            },
            labels: {
              style: {
                color: Highcharts.getOptions().colors[4],
              },
            },
          },
        ],
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
        series: [
          {
            name: "CEngDsT_t_Sim",

            yAxis: 0,
            data: [],
            tooltip: {
              valueSuffix: "°C",
            },
          },
          {
            name: "CEngDsT_t",
            // color: '#f15c80',
            yAxis: 0,
            data: [],
            tooltip: {
              valueSuffix: "°C",
            },
          },
          {
            name: "CEngUsT_t_Sim",
            // color: '#f15c80',
            yAxis: 0,
            data: [],
            tooltip: {
              valueSuffix: "°C",
            },
          },
          {
            name: "CEngUsT_t",
            // color: '#f15c80',
            yAxis: 0,
            data: [],
            tooltip: {
              valueSuffix: "°C",
            },
          },

          {
            name: "statFlag",
            // color: '#7cb5ec',
            yAxis: 2,
            data: [],
            tooltip: {},
          },
          {
            name: "ratio",
            // color: '#7cb5ec',
            yAxis: 1,
            data: [],
            tooltip: {
              valueSuffix: "%",
            },
          },
        ],
      },
      cttlist: [
        ["CtT_tDsTMinusFirstStrtEntryThres_C", "主水温相对起动时的温升", ""],
        ["CtT_mlAccumThresEntry_C", "诊断开始的流量积分阀值", ""],
        [
          "CtT_tDsTMinusUsTEntryThres_C",
          "诊断开始条件中主水温与二路水温的差值",
          "",
        ],
        ["CtT_tEngDsTDiagExit1_C", "诊断结束条件中主水温的阀值1", ""],
        ["CtT_mlAccumThresExit_C", "诊断结束的流量积分阀值", ""],
        [
          "CtT_tDsTMinusUsTExitThres_C",
          "诊断结束条件中主水温与二路水温的差值",
          "",
        ],
        ["CtT_tEngDsTDiagExit2_C", "诊断结束条件中主水温的阀值2", ""],
        ["CtT_tiEngRunng_C", "运行延时时间", ""],
      ],
      tmotStd: "",
      tmotLow: "",

      radio: "Original",
      tmotOff: "",
      tmot2Off: "",
      r1Val: "",
      r0Val: "",
      r0Cal: "",
      areaRatio: "",
      areaRatio_info: "",
      nmotLimit: "",
      nmotLimit_time: "",
      nmotLimit_info: "",
      percentLoading: false,
      timeLoading: false,
    };
  },
  props: ["projectNumber", "email"],
  methods: {
    transdcm() {
      this.$refs["dcm28"].dispatchEvent(new MouseEvent("click"));
    },
    dcmChange(e) {
      console.log(e.target);
      var name = "";
      for (let i = 0; i < e.target.files.length; i++) {
        name = name + e.target.files[i].name + ";";
      }
      this.dcmFileName = name;
    },
    transdat() {
      this.$refs["dat28"].dispatchEvent(new MouseEvent("click"));
    },
    datChange(e) {
      console.log(e.target);
      var name = "";
      for (let i = 0; i < e.target.files.length; i++) {
        name = name + e.target.files[i].name + ";";
      }
      this.datFileName = name;
    },
    submit() {
      if (!this.dcmFileName || !this.datFileName) {
        this.warnModal("请至少选择一个文件。");
        return;
      }
      var formData = new FormData(this.$refs.form28);
      if (this.projectNumber) {
      } else {
        this.warnModal("请填写项目号。");
        return;
      }

      var config = {
        // headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          var complete =
            (progressEvent.loaded / progressEvent.total) * 100 || 0;
          // this.$refs.progress.filePercent = complete;
          this.$emit("progressModal", true, Math.floor(complete));
        },
      };
      this.$http
        .post("http://139.196.196.221:8081/submitTask28", formData, config)
        .then((res) => {
          this.$emit("progressModal", false, 0);

          console.log(res);
          const {
            CtT_tDsTMinusFirstStrtEntryThres_C,
            CtT_mlAccumThresEntry_C,
            CtT_tDsTMinusUsTEntryThres_C,
            CtT_tEngDsTDiagExit1_C,
            CtT_mlAccumThresExit_C,
            CtT_tDsTMinusUsTExitThres_C,
            CtT_tEngDsTDiagExit2_C,
            CtT_tiEngRunng_C,
            tmotCharacteristicName,
            info,
            flg,
            CEngDsT_t_Sim,
            CEngDsT_t,
            CEngUsT_t_Sim,
            CEngUsT_t,
            statFlag,
            ratio,
            sampleTime,
          } = res.data;
          var chart28XArr = sampleTime;
          var chart28YArr1 = CEngDsT_t_Sim;
          var chart28YArr2 = CEngDsT_t;
          var chart28YArr3 = CEngUsT_t_Sim;
          var chart28YArr4 = CEngUsT_t;
          var chart28YArr5 = statFlag;
          var chart28YArr6 = ratio;

          if (flg) {
            this.infoModal(flg, info);
          }
          this.options = {
            chart: {
              type: "line",
            },
            credits: {
              enabled: false,
            },
            title: {
              text: "",
            },
            // subtitle: {
            //   text: '数据来源: Wikipedia.org'
            // },
            xAxis: {
              categories: chart28XArr,
              title: {
                text: "时间(s)",
              },
            },
            // yAxis: {
            //   // min: 0,
            //   tickInterval: 1,
            //   title: {
            //     text: '温度(°C)',
            //     align: 'high'
            //   },
            //   labels: {
            //     // overflow: 'justify'
            //   }
            // },
            yAxis: [
              {
                tickInterval: 1,
                title: {
                  text: "温度",
                  align: "high",
                  // style: {
                  //   color: '#f15c80'
                  //   // margin:20

                  // }
                },
                labels: {
                  format: "{value}°C",
                  // style: {
                  // 		color: Highcharts.getOptions().colors[2]
                  // }
                },
              },
              {
                // gridLineWidth: 0,
                tickInterval: 1,
                title: {
                  text: "百分比",
                  align: "high",
                  style: {
                    color: Highcharts.getOptions().colors[5],
                  },
                },
                labels: {
                  format: "{value}%",
                  rotation: 270,
                  style: {
                    color: Highcharts.getOptions().colors[5],
                  },
                },
              },

              {
                // gridLineWidth: 0,
                tickInterval: 1,
                title: {
                  text: "statFlag",
                  align: "high",
                  style: {
                    color: Highcharts.getOptions().colors[4],
                  },
                },
                labels: {
                  style: {
                    color: Highcharts.getOptions().colors[4],
                  },
                },
              },
            ],
            tooltip: {
              headerFormat: "时间：<b>{point.x} s</b><br/>",
              crosshairs: true, //十字准信
              shared: true,
              // valueSuffix: '°C'
              // // pointFormat: '{point.x} V: {point.y}°C'
            },
            plotOptions: {
              // line: {
              //   dataLabels: {
              //     enabled: true,
              //     allowOverlap: true // 允许数据标签重叠
              //   }
              // }
              series: {
                marker: {
                  enabled: false,
                },
              },
            },
            legend: {
              // enabled: false
            },
            series: [
              {
                name: "CEngDsT_t_Sim",
                // color: '#f15c80',
                yAxis: 0,
                data: chart28YArr1,
                tooltip: {
                  // headerFormat: '温度：<b>{point.x} mv</b><br/>',
                  valueSuffix: "°C",
                },
              },
              {
                name: "CEngDsT_t",
                // color: '#f15c80',
                yAxis: 0,
                data: chart28YArr2,
                tooltip: {
                  // headerFormat: '温度：<b>{point.x} mv</b><br/>',
                  valueSuffix: "°C",
                },
              },
              {
                name: "CEngUsT_t_Sim",
                // color: '#f15c80',
                yAxis: 0,
                data: chart28YArr3,
                tooltip: {
                  // headerFormat: '温度：<b>{point.x} mv</b><br/>',
                  valueSuffix: "°C",
                },
              },
              {
                name: "CEngUsT_t",
                // color: '#f15c80',
                yAxis: 0,
                data: chart28YArr4,
                tooltip: {
                  // headerFormat: '温度：<b>{point.x} mv</b><br/>',
                  valueSuffix: "°C",
                },
              },

              {
                name: "statFlag",
                // color: '#7cb5ec',
                yAxis: 2,
                data: chart28YArr5,
                tooltip: {
                  // headerFormat: '值：<b>{point.x} min</b><br/>',
                  // valueSuffix: '%'
                  // pointFormat: '{point.x} V: {point.y}°C'
                },
              },
              {
                name: "ratio",
                // color: '#7cb5ec',
                yAxis: 1,
                data: chart28YArr6,
                tooltip: {
                  // headerFormat: '百分比：<b>{point.x} min</b><br/>',
                  valueSuffix: "%",
                  // pointFormat: '{point.x} V: {point.y}°C'
                },
              },
            ],
          };
        })
        .catch((err) => {
          console.log(err);
          this.$emit("progressModal", false, 0);
          // this.$message({
          //   type: "error",
          //   message: "上传文件失败 !",
          // });
          this.infoModal("nok", "上传文件失败。");
        });
    },
    calc(type) {
      var formData = new FormData(this.$refs.selectForm28);
      formData.append("type", type);
      if (type == "percent") {
        this.percentLoading = true;
      } else if (type == "time") {
        this.timeLoading = true;
      }

      this.$http
        .post("http://139.196.196.221:8081/calculateResult", formData)
        .then((res) => {
          console.log(res);
          var {
            areaRatio,
            nmotLimit,
            info,
            flg,
            saveResult,
            r0Cal,
            nmotLimit_time,
          } = res.data;
          var {
            sampleTime,
            CEngDsT_t_Sim,
            CEngDsT_t,
            CEngUsT_t_Sim,
            CEngUsT_t,
            statFlag,
            ratio,
          } = res.data;
          if (type == "saveDCM") {
            this.infoModal(flg, saveResult);
          }
          if (type == "percent") {
            this.r0Cal = r0Cal;
            this.areaRatio = areaRatio;
            this.areaRatio_info = info;
          } else if (type == "time") {
            this.nmotLimit_time = nmotLimit_time;
            this.nmotLimit_info = info;
          }
          if (sampleTime) {
            this.options.xAxis.categories = sampleTime;
          }
          var chartNameArr = [
            CEngDsT_t_Sim,
            CEngDsT_t,
            CEngUsT_t_Sim,
            CEngUsT_t,
            statFlag,
            ratio,
          ];
          chartNameArr.forEach((item, index) => {
            console.log(item);
            this.options.series[index].data = item;
          });
          this.percentLoading = false;
          this.timeLoading = false;
        })
        .catch((err) => {
          this.percentLoading = false;
          this.timeLoading = false;
          this.infoModal("nok", "提交失败！");
        });
    },
  },
};
</script>

<style scoped>
.el-input {
  width: 100%;
}
.label {
  margin: 0.5em 0;
  font-size: 13px;
}
.r28 {
}
.el-card {
  height: 100%;
}
.el-row {
  /* display: flex; */
}
</style>