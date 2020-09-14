<template>
  <div class="application" style="margin:1em">
    <h2>problem:DFC_MDCyl_0</h2>
    <div style="width:49.5%;float:left">
      <el-card style="margin-bottom:1em" class="box-card">
        <div slot="header" class="clearfix">
          <span class="title">问题描述和解释</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <div>
          <p>故障代码：{{problem.code}}</p>
          <p>故障代码定义：{{problem.code}}</p>
          <p>故障代码报码条件：{{problem.code}}</p>
          <p>故障可能的原因：</p>
          <ol>
            <li v-for="(item,index) in problem.reason" :key="index">{{item}}</li>

          </ol>
          <img src="@/assets/workflow.jpg" alt="">

        </div>
      </el-card>
      <el-card style="margin-bottom:1em" class="box-card">
        <div slot="header" class="clearfix">
          <span class="title">filename:{{file.filename}} / filetime:{{file.filetime}}</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <div>
          <highcharts style="height:300px;" :options="file.chart"></highcharts>

        </div>
      </el-card>
      <el-card style="margin-bottom:1em" class="box-card">
        <div slot="header" class="clearfix">
          <span class="title">问题发生所处发动机运行工况</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <div>
          <highcharts style="height:300px;" :options="condition.chart"></highcharts>

        </div>
      </el-card>
      <!-- <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="title">基于该问题的数据挖掘结果</span>
        </div>
        <div>
          highchart

        </div>
      </el-card> -->

    </div>
    <div style="width:1%;height:100px;float:left"></div>
    <div style="width:49.5%;float:left">
      <el-card style="margin-bottom:1em" class="box-card">
        <div slot="header" class="clearfix">
          <span class="title">基于经验的匹配标定排查</span>
        </div>
        <div v-for="(item,index) in troubleshooting" :key="index">
          <span>{{item.direction}}</span>
          <el-button size="mini" :type="item.status=='finished'?'success':'danger'">{{item.status}}</el-button>
          <el-alert style="margin:0.5em 0" :title="item.info" type="info" :closable="false" plain show-icon>
          </el-alert>

          <el-button @click="showTest(item)" type="primary" plain>test</el-button>
          <el-button @click="showResult(item)" type="primary" plain>result</el-button>
          <el-divider></el-divider>
        </div>
      </el-card>
      <el-card style="margin-bottom:1em" class="box-card">
        <div slot="header" class="clearfix">
          <span class="title">基于知识图谱的匹配标定排查</span>
        </div>
        <div @click="testTree($event)">
          <highcharts :options="tree"></highcharts>
        </div>
        <el-divider></el-divider>
        <el-tag style="margin:0 0.2em" :key="index" v-for="(tag,index) in myparam" closable effect="plain"
          @close="closeParam(index)">
          {{tag}}
        </el-tag>
             <br>  <el-button style="margin-top:0.5em" type="primary">Apply To Test</el-button>

      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="title">问题结论</span>
        </div>
        <div>
            <p v-for="(item,index) in conclusion" :key="index">{{item}}</p>
              <el-input size="small" v-model="newConclusion" style="width:60%"></el-input> <el-button @click="addConclusion" size="small">添加</el-button>
       <el-divider></el-divider>
       <el-button type="success">Close The Case</el-button>
        </div>
        <div>

        </div>
      </el-card>

    </div>

    <el-dialog title="Test Guide" :visible.sync="testDialog" width="40%">
      <p>test requirements:</p>
      <p>{{testDialogData.testRequirements}}</p>
      <p>test requirements:</p>
      <p>{{testDialogData.testVariables}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="testDialog = false">No</el-button>
        <el-button type="success" @click="applyTest(testDialogData.testVariables)">Apply Test</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Test Result" :visible.sync="resultDialog" width="1100px">
      <img style="width:100%" src="@/assets/chart.png" alt="">

      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="testDialog = false">No</el-button> -->
        <el-button type="success" @click="resultDialog=false">OK</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
// import "@/../node_modules/highcharts/highcharts-more.js";
import netWork from "highcharts/modules/networkgraph.js";
import { Chart } from "highcharts-vue";
netWork(Highcharts);

export default {
  data() {
    return {
      id: "",
      myparam: [],
      problem: {},
      file: {},
      condition: {},
      tree: {},
      newConclusion:'',

      troubleshooting: [],

      testDialog: false,
      testDialogData: {},
      resultDialog: false,
      conclusion:[],
    };
  },

  created() {
    this.id = this.$route.query.id;
    this.analyticQue();
  },
  methods: {
    addConclusion(){
      this.conclusion.push(this.newConclusion)
    },
    showTest(item) {
      this.testDialog = true;
      this.testDialogData = item;
    },
    showResult(item) {
      this.resultDialog = true;
      // this.testDialogData=item
    },
    testTree(e) {
      //  console.log(e.target);
      var dom = e.target;
      if ($(dom).attr("class") == "testTree") {
        var value = $(dom).attr("data-value");
        if (!this.myparam.includes(value)) {
          this.myparam.push(value);
        }
      } else if ($(dom).attr("class") == "testTree2") {
        console.log(2);
      }
    },
    closeParam(index) {
      this.myparam.splice(index, 1);
    },
    analyticQue() {
      // this.$http.post("/certStatus", { id: this.id }).then(res => {
      var res = {
        data: {
          res: "V",
          data: {
            problem: {
              code: "P030100",
              definition: "检测到物理一缸失火故障",
              reason: [
                "喷油器电路故障",
                "点火线圈电路故障",
                "ECU相对应的喷油器控制引脚或点火线圈引脚故障"
              ]
            },
            condition: {
              chart: {
                chart: {
                  type: "scatter",
                  zoomType: "xy"
                },
                credits: {
                  enabled: false
                },
                title: {
                  text: "engine condition for problem occurance"
                },
                xAxis: {
                  min: 0,
                  max: 6000,
                  title: {
                    enabled: true,
                    text: "nmot_w"
                  },
                  startOnTick: true,
                  endOnTick: true,
                  showLastLabel: true
                },
                yAxis: {
                  min: 0,
                  max: 120,
                  title: {
                    text: "rl_w"
                  }
                },
                legend: {
                  layout: "vertical",
                  align: "left",
                  verticalAlign: "top",
                  x: 100,
                  y: 70,
                  floating: true,
                  backgroundColor:
                    (Highcharts.theme &&
                      Highcharts.theme.legendBackgroundColor) ||
                    "#FFFFFF",
                  borderWidth: 1
                },
                plotOptions: {
                  scatter: {
                    marker: {
                      radius: 5,
                      states: {
                        hover: {
                          enabled: true,
                          lineColor: "rgb(100,100,100)"
                        }
                      }
                    },
                    states: {
                      hover: {
                        marker: {
                          enabled: false
                        }
                      }
                    },
                    tooltip: {
                      // headerFormat: "<b>{series.name}</b><br>",
                      // pointFormat: "{point.x} cm, {point.y} kg",
                    }
                  }
                },
                series: [
                  {
                    name: "xxx5.dat",
                    color: "#bf242a",
                    data: [
                      [2000, 66.4],
                      [2043, 67.3]
                    ]
                  },
                  {
                    name: "xxx6.dat",
                    color: "#96514d",
                    data: [
                      [2013, 63.4],
                      [2020, 56.3]
                    ]
                  }
                ]
              }
            },

            file: {
              filename: "xxx.dat",
              filetime: "12.03s",
              chart: {
                title: {
                  text: "DFC Profile"
                },
                credits: {
                  enabled: false
                },
                // subtitle: {
                //   text: "",
                // },
                xAxis: {
                  // ... 省略代码
                  categories: [
                    "xxx1.dat",
                    "xxx2.dat",
                    "xxx3.dat",
                    "xxx4.dat",
                    "xxx5.dat",
                    "xxx6.dat",
                    "xxx7.dat",
                    "xxx8.dat"
                  ],
                  plotBands: [
                    {
                      from: 0, // 标示带开始值
                      to: 1, // 标示带结束值
                      label: {
                        // 标示带文字标签配置，详见API
                        text: "A1111.hex"
                      },
                      color: "#c1e4e9", // 标示带背景颜色
                      borderWidth: 1, // 标示带边框宽度
                      borderColor: "#89c3eb" // 标示带边框颜色
                    },
                    {
                      from: 1, // 标示带开始值
                      to: 4, // 标示带结束值
                      label: {
                        // 标示带文字标签配置，详见API
                        text: "A1112.hex"
                      },
                      color: "#dcd3b2", // 标示带背景颜色
                      borderWidth: 1, // 标示带边框宽度
                      borderColor: "#94846a" // 标示带边框颜色
                    },
                    {
                      from: 4, // 标示带开始值
                      to: 7, // 标示带结束值
                      label: {
                        // 标示带文字标签配置，详见API
                        text: "A1113.hex"
                      },
                      color: "#c1e4e9", // 标示带背景颜色
                      borderWidth: 1, // 标示带边框宽度
                      borderColor: "#89c3eb" // 标示带边框颜色
                    }
                  ]
                },
                yAxis: {
                  title: {
                    text: "dfc count"
                  }
                },
                // legend: {
                //   layout: "vertical",
                //   align: "right",
                //   verticalAlign: "middle",
                // },
                plotOptions: {
                  series: {
                    label: {
                      connectorAllowed: false
                    }
                    // pointStart: 2010,
                  }
                },
                series: [
                  {
                    name: "DFC_MDCyl_0",
                    data: [0, 0, 0, 0, 1, 1, 0, 0]
                  }
                ]
              }
            },
            troubleshooting: [
              {
                direction: "当前车辆状态道路测试,重现问题",
                status: "unfinished",
                info: "相似发动机条件的捕捉到问题样本不足",
                testRequirements:
                  "在2400~2600转速范围内自由驾驶,进行少量断油、滑行和起动",
                testVariables: ["nmot_w, midmd_w, lutsk_w, lurs_w"]
              },
              {
                direction:
                  "插拔xcp或者修改标定清自学习值,重新学习自学习,在相似的发动机条件下重复测试 ",
                status: "unfinished",
                info: "未重新进行过自学习、相似发动机条件的捕捉到问题样本不足 ",
                testRequirements:
                  "在2400~2600转速范围内自由驾驶,进行少量断油、滑行和起动",
                testVariables: ["nmot_w, midmd_w, lutsk_w, lurs_w"]
              },
              {
                direction: "分别更换0\\1\\2\\3号火花塞,重复步骤2",
                status: "finished",
                info: "0\\1\\2\\3缸相似发动机条件的捕捉到问题样本不足 ",
                testRequirements:
                  "在2400~2600转速范围内自由驾驶,进行少量断油、滑行和起动",
                testVariables: ["nmot_w, midmd_w, lutsk_w, lurs_w"]
              },
              {
                direction:
                  "观察步骤3拆卸的火花塞,拆卸发动机,观察气门积碳情况/内窥镜检查",
                status: "finished",
                info:
                  "观察步骤3拆卸的火花塞,拆卸发动机,观察气门积碳情况/内窥镜检查",
                testRequirements:
                  "在2400~2600转速范围内自由驾驶,进行少量断油、滑行和起动",
                testVariables: ["nmot_w, midmd_w, lutsk_w, lurs_w"]
              }
            ],
            tree: {
              chart: {
                type: "networkgraph",
                height: "100%"
              },
              credits: {
                enabled: false
              },
              title: {
                text: "Misfire Related Investigation KG"
              },
              plotOptions: {
                networkgraph: {
                  keys: ["from", "to"],
                  layoutAlgorithm: {
                    enableSimulation: true
                  }
                }
              },
              tooltip: {
                useHTML: true,
                style: {
                  padding: 0,
                  pointerEvents: "auto"
                },
                formatter: function() {
                  var value = this.point.id;
                  // this.myparam.push(this.point.id);
                  // console.log(this.myparam);
                  //    function testTree2(){
                  //   console.log('tree');
                  //   this.testTree();
                  // }
                  // var that=this;
                  // const h = this.$createElement;
                  // var html= h('button',null,'branch to test')

                  //   return html
                  return (
                    "<button data-value='" +
                    value +
                    "' class='testTree'>branch to test</button><br/><button class='testTree2'>test result</button>"
                  );
                },
                // pointFormat: "<button onclick='testAlert(point)'>quickNaviTo</button>",
                style: {
                  pointerEvents: "auto"
                }
              },
              series: [
                {
                  dataLabels: {
                    enabled: true
                  },
                  data: [
                    ["MisfDet", "check_FuelCutOff_Adap"],
                    ["MisfDet", "check_FuelComb_Adap"],
                    ["MisfDet", "check_InletAirFlow"],
                    ["MisfDet", "check_IgnitionAngle"],
                    ["MisfDet", "check_VVTAngle"],
                    ["MisfDet", "check_KnockRetardAngle"],
                    ["check_FuelCutOff_Adap", "finished"],
                    ["check_FuelCutOff_Adap", "engineCondition"]
                  ]
                }
              ]
            },
            conclusion:[
              '0缸火花塞积碳',
              '1缸火花塞积碳',
              '1缸气门关闭不严',
            ]
          }
        }
      };
      var { res, data, detail } = res.data;
      if (res == "V") {
        // this.$router.push('/')
        var { problem, file, condition, troubleshooting, tree,conclusion } = data;
        this.problem = problem;
        this.file = file;
        this.condition = condition;
        this.troubleshooting = troubleshooting;
        this.tree = tree;
        this.conclusion= conclusion;
        // this.$nextTick(function(){
        // $('#treeChart').on('click','.testTree',function(){
        //   console.log(1);
        // })

        // })
      } else {
        this.$message({
          type: "warning",
          message: detail
        });
      }
      // });
    },
    applyTest(data) {
      this.testDialog = false;
      // window.eventBus = new Vue();
       
      // eventBus.$emit('lab',data);
       this.$router.push({
        path:'/test',
        query:{lab:data}
      })

    }
  },
  components: {
    highcharts: Chart
  }
};
</script>

<style scoped>
.application .box-card .title {
  font-weight: 650;
}
</style>