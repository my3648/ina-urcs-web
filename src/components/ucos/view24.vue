<template>
  <div>
    <form action="" ref="form24">
      <div class="row">
        <input type="hidden" name="projectNumber" v-model="projectNumber">
        <el-button type="primary" @click="transFile(1)">选择文件</el-button>
        <input ref="file24_1" type="file" multiple="multiple"
          accept=".dat,.DCM,.xlsx,.csv,.xlsb,.pdf,.xlsm,.xls,.txt,.mf4" name="plat24_file1" style="display: none"
          @change="fileChange($event,1)">
        <el-input style="width:450px;" placeholder="选择dat,DCM,xls,xlsx,xlsb,xlsm,pdf,csv文件" v-model="file24Name1"
          :disabled="true">
        </el-input>
        <span class="label">请填写实验车辆号</span>
        <el-input style="width:150px" v-model="plat24_num1" name="plat24_num1"></el-input>
      </div>
      <div class="row">
        <el-button type="primary" @click="transFile(2)">选择文件</el-button>
        <input ref="file24_2" type="file" multiple="multiple"
          accept=".dat,.DCM,.xlsx,.csv,.xlsb,.pdf,.xlsm,.xls,.txt,.mf4" name="plat24_file2" style="display: none"
          @change="fileChange($event,2)">
        <el-input style="width:450px;" placeholder="选择dat,DCM,xls,xlsx,xlsb,xlsm,pdf,csv文件" v-model="file24Name2"
          :disabled="true">
        </el-input>
        <span class="label">请填写实验车辆号</span>
        <el-input style="width:150px" v-model="plat24_num2" name="plat24_num2"></el-input>
      </div>
      <div class="row">
        <el-button type="primary" @click="transFile(3)">选择文件</el-button>
        <input ref="file24_3" type="file" multiple="multiple"
          accept=".dat,.DCM,.xlsx,.csv,.xlsb,.pdf,.xlsm,.xls,.txt,.mf4" name="plat24_file3" style="display: none"
          @change="fileChange($event,3)">
        <el-input style="width:450px;" placeholder="选择dat,DCM,xls,xlsx,xlsb,xlsm,pdf,csv文件" v-model="file24Name3"
          :disabled="true">
        </el-input>
        <span class="label">请填写实验车辆号</span>
        <el-input style="width:150px" v-model="plat24_num3" name="plat24_num3"></el-input>

      </div>
      <div class="row">
        <el-button type="primary" @click="transFile(4)">选择文件</el-button>
        <input ref="file24_4" type="file" multiple="multiple"
          accept=".dat,.DCM,.xlsx,.csv,.xlsb,.pdf,.xlsm,.xls,.txt,.mf4" name="plat24_file4" style="display: none"
          @change="fileChange($event,4)">
        <el-input style="width:450px;" placeholder="选择dat,DCM,xls,xlsx,xlsb,xlsm,pdf,csv文件" v-model="file24Name4"
          :disabled="true">
        </el-input>
        <span class="label">请填写实验车辆号</span>
        <el-input style="width:150px" v-model="plat24_num4" name="plat24_num4"></el-input>

      </div>
      <div class="row">
        <el-button type="primary" @click="transFile(5)">选择文件</el-button>
        <input ref="file24_5" type="file" multiple="multiple"
          accept=".dat,.DCM,.xlsx,.csv,.xlsb,.pdf,.xlsm,.xls,.txt,.mf4" name="plat24_file5" style="display: none"
          @change="fileChange($event,5)">
        <el-input style="width:450px;" placeholder="选择dat,DCM,xls,xlsx,xlsb,xlsm,pdf,csv文件" v-model="file24Name5"
          :disabled="true">
        </el-input>
        <span class="label">请填写实验车辆号</span>
        <el-input style="width:150px" v-model="plat24_num5" name="plat24_num5"></el-input>

      </div>
      <el-button style="float:right" @click="submit" type="success">上传文件
      </el-button>

    </form>
    <!-- GPF-CCF分析 -->

    <div id="container_24">

    </div>
    <el-dialog title="提交进度" :close-on-click-modal="false" :visible.sync="dialogVisible" width="20%">
      <p style="margin:0 0 1em 0" v-show="filePercent<100">当前进度为:</p>
      <div style="margin:0 0 1em 0" v-show="filePercent==100">
        <div style="display:inline-block;height:2em;line-height:2em">正在处理中:</div>
        <div v-loading="true" style="width:1.5em;height:1.5em;display:inline-block;margin:0 1em"></div>

      </div>

      <el-progress v-show="filePercent<100" :color="customColorMethod" :text-inside="true" :stroke-width="24"
        :percentage="filePercent">
      </el-progress>

    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      file24Name1: "",
      file24Name2: "",
      file24Name3: "",
      file24Name4: "",
      file24Name5: "",
      plat24_num1: "",
      plat24_num2: "",
      plat24_num3: "",
      plat24_num4: "",
      plat24_num5: "",
      chartWidth: 1,
      filePercent: 0,
      dialogVisible: false,
      customColorMethod: [
        { color: "#909399", percentage: 20 },

        // { color: "#e6a23c", percentage: 50 },
        { color: "#409eff", percentage: 100 },
        { color: "#67c23a" },
      ],
    };
  },
  methods: {
    transFile(index) {
      this.$refs["file24_" + index].dispatchEvent(new MouseEvent("click"));
    },
    fileChange(e, index) {
      console.log(e.target);
      var name = "";
      for (let i = 0; i < e.target.files.length; i++) {
        name = name + e.target.files[i].name + ";";
      }
      this["file24Name" + index] = name;
    },
    submit() {
      var formData = new FormData(this.$refs.form24);
      formData.append("email", this.email);

      if (this.projectNumber) {
        formData.append("projectNumber", this.projectNumber);
      } else {
        this.warnModal("请填写项目号。");
        return;
      }
      formData.append("index", 24);
      var config = {
        // headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          var complete =
            (progressEvent.loaded / progressEvent.total) * 100 || 0;
          this.filePercent = complete;
        },
      };
      this.dialogVisible = true;

      this.$http
        .post("http://139.196.196.221:8081/OnLineSim1", formData, config)
        .then((res) => {
          console.log(res);
          var { NormalDistribution, flg, info } = res.data;
          // var flg = "nok";
          // var info = "提交成功";
          // var NormalDistribution = {
          //   管路接反: {
          //     XAxis: [1, 2, 3],
          //     Frequent: [1, 2, 3],
          //     NormalData: [1, 2, 3],
          //   },
          //   后管脱落: {
          //     XAxis: [1, 2, 3],
          //     Frequent: [1, 2, 3],
          //     NormalData: [1, 2, 3],
          //   },
          //   GPF_all: {
          //     XAxis: [1, 2, 3],
          //     Frequent: [1, 2, 3],
          //     NormalData: [1, 2, 3],
          //   },
          // };
          this.dialogVisible = false;

          this.infoModal(flg, info);
          // this.chartWidth = NormalDistribution.length;
          this.renderNormalDistribution(NormalDistribution, 24);
        })
        .catch((res) => {
          this.dialogVisible = false;
          // this.$message({
          //   type: "error",
          //   message: "上传文件失败 !",
          // });
          this.infoModal("nok", "上传文件失败。");
        });
    },
    renderNormalDistribution(obj, renderIndex) {
      // var obj = data_signal_default['NormalDistribution'];
      console.log(obj);
      if (obj["GPF_all"]) {
        var allChart = obj["GPF_all"];
        delete obj["GPF_all"];
      }

      var htmlstr = ``;
      var width = 100 / Object.keys(obj).length;
      Object.keys(obj).forEach((item, index) => {
        htmlstr += `<div style="width:${width}%;height:420px;float:left" id="container_${renderIndex}_${index}"></div>`;
      });
      if (allChart) {
        console.log("allchart");
        htmlstr += `<div style="width:100%;height:420px;" id="container_${renderIndex}_all"></div>`;
      }

      $("#container_" + renderIndex).html(htmlstr);
      Object.keys(obj).forEach((item, index) => {
        var { XAxis, Frequent, NormalData } = obj[item];
        console.log(obj[item]);

        if (item != "GPF_all") {
        }
        Highcharts.chart("container_" + renderIndex + "_" + index, {
          chart: {
            // type: 'line',
            zoomType: "x",
            panning: true,
            panKey: "shift",
          },
          credits: {
            enabled: false,
          },
          title: {
            text: item,
          },
          xAxis: {
            categories: XAxis,
            // tickInterval: 0.1,
            title: {
              text: "CCF值",
            },
          },
          yAxis: [
            {
              title: {
                text: "频数(个)",
                style: {
                  // color: '#f15c80'
                },
              },
              labels: {
                format: "{value}",
                style: {
                  // color: '#f15c80'
                },
              },
            },
            {
              title: {
                text: "正态分布曲线",
                style: {
                  // color: '#7cb5ec'
                },
              },
              labels: {
                format: "{value}",
                style: {
                  // color: '#7cb5ec'
                },
              },
              opposite: true,
              // labels: {
              //   format: '{value}个',
              // },
            },
          ],
          // legend: {
          //   layout: 'vertical',
          //   align: 'right',
          //   verticalAlign: 'middle'
          // },
          tooltip: {
            headerFormat: "CCF值：{point.x} <br/>",
            crosshairs: true, //十字准信
            shared: true,
          },
          // plotOptions: {
          //   series: {
          //     marker: {
          //       enabled: false
          //     }
          //   }
          // },

          series: [
            {
              type: "column",

              yAxis: 0,
              name: "频数",
              data: Frequent,

              color: "#f15c80",
            },
            {
              type: "spline",
              yAxis: 1,
              name: "正态分布曲线",
              data: NormalData,
              color: "#7cb5ec",
            },
          ],
        });
      });
      if (allChart) {
        var { XAxis, Frequent, NormalData } = allChart;

        Highcharts.chart("container_" + renderIndex + "_all", {
          chart: {
            // type: 'line',
            zoomType: "x",
            panning: true,
            panKey: "shift",
          },
          credits: {
            enabled: false,
          },
          title: {
            text: "GPF_all",
          },
          xAxis: {
            categories: XAxis,
            // tickInterval: 0.1,
            title: {
              text: "CCF值",
            },
          },
          yAxis: [
            {
              title: {
                text: "频数(个)",
                style: {
                  // color: '#f15c80'
                },
              },
              labels: {
                format: "{value}",
                style: {
                  // color: '#f15c80'
                },
              },
            },
            {
              title: {
                text: "正态分布曲线",
                style: {
                  // color: '#7cb5ec'
                },
              },
              labels: {
                format: "{value}",
                style: {
                  // color: '#7cb5ec'
                },
              },
              opposite: true,
              // labels: {
              //   format: '{value}个',
              // },
            },
          ],
          // legend: {
          //   layout: 'vertical',
          //   align: 'right',
          //   verticalAlign: 'middle'
          // },
          tooltip: {
            headerFormat: "CCF值：{point.x} <br/>",
            crosshairs: true, //十字准信
            shared: true,
          },
          // plotOptions: {
          //   series: {
          //     marker: {
          //       enabled: false
          //     }
          //   }
          // },

          series: [
            {
              type: "column",

              yAxis: 0,
              name: "频数",
              data: Frequent,

              color: "#f15c80",
            },
            {
              type: "spline",
              yAxis: 1,
              name: "正态分布曲线",
              data: NormalData,
              color: "#7cb5ec",
            },
          ],
        });

        obj["GPF_all"] = allChart;
      }
    },
  },
  mounted() {
    console.log(Highcharts);
  },
  props: ["projectNumber", "email"],
};
</script>

<style scoped>
.row {
  margin-bottom: 0.5em;
}
.label {
  margin: 0 0.5em 0 1.5em;
}
</style>