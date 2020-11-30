<template>
  <div>
    <el-container>
      <el-header>
        <div></div>
        <!-- :default-active="" -->
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64"
          text-color="#fff" active-text-color="#ffd04b">

          <el-submenu style="width:7.14%" :disabled="!item.module" v-for="(item,g) in subMenuArr" :key="g"
            :index="String(g)">
            <template slot="title">{{item.group}}</template>

            <!-- <el-menu-item v-for="(value,m) in item.module" :key="m" :index='g+"-"+m'>{{value.name}}</el-menu-item> -->
            <template v-if="item.module">

              <el-submenu v-for="(value,m) in item.module" :key="m" :index='g+"-"+m'>
                <template slot="title">{{value.name}}</template>
                <el-menu-item @click="selectMenu(func,item.group,value.name)" v-for="(func,f) in value.func" :key="f"
                  :index='g+"-"+m+"-"+f'>{{func[0]}}</el-menu-item>

              </el-submenu>
            </template>

          </el-submenu>
          <el-dropdown @command="logout" style="width:7.14%">
            <el-button class="logout" style="border-width:2px;background-color: rgb(84, 92, 100);"
              icon="el-icon-user-solid" type="info">{{username}}
            </el-button>

            <!-- <el-button type="primary">
    更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
  </el-button> -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">Log out</el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>

        </el-menu>

      </el-header>
      <el-main>

        <div style="width:1280px;margin:0 auto;position:relative">
          <div v-show="!mainArea">
            <img id="hostPic" src="@/../static/hostPic.png" alt="" style="width: 100%;margin: 0px auto;">

          </div>
          <div v-show="mainArea">
            <div style="position:absolute;right:0;top:-1em" v-if="projectNumerShow">
              <el-select v-model="projectNumber" filterable placeholder="请选择">
                <el-option label="请选择项目号" value="" style="display:none"></el-option>
                <el-option v-for="item in projectNumberArr" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>

            </div>
            <div style="margin:1em 0">
              <el-breadcrumb separator-class="el-icon-arrow-right" style="display:inline-block;">
                <el-breadcrumb-item>{{this.breadFir}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{this.breadSec}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{this.breadThi}}</el-breadcrumb-item>
              </el-breadcrumb>

            </div>
            <!-- :description="this.alertDes" -->
            <!-- <el-alert v-if="this.alertShow" title="操作提示" type="info" v-html="this.alertDes"  show-icon>
          </el-alert> -->
            <!-- <div v-if="this.alertShow" role="alert" class="el-alert el-alert--info is-light"><i class="el-alert__icon el-icon-info"></i>
            <div class="el-alert__content"><span class="el-alert__title" v-html="this.alertDes"></span>
              <i class="el-alert__closebtn el-icon-close"></i>
            </div>
          </div> -->
            <div role="alert" style="margin:1em 0" v-if="this.alertShow" class="el-alert el-alert--success is-light">
              <div class="el-alert__content"><span class="el-alert__title" v-html="this.alertDes"
                  style="line-height:1.7em"></span>
                <i class="el-alert__closebtn el-icon-close" @click="alertShow=false"></i>
              </div>
            </div>
            <!-- 通用的提交（会更新表格）task -->
            <form ref="taskForm">
              <div>
                <input type="text" v-model="email" name="email" class="userselect" style="display: none">
                <input type="text" v-model="dataType" name="datatype" style="display: none" />

              </div>
              <div class="shareSubmit" v-if="currentFileArea">
                <el-button type="primary" @click="transTask()">选择文件</el-button>
                <input ref="taskFile" type="file" multiple="multiple"
                  accept=".dat,.DCM,.xlsx,.csv,.xlsb,.pdf,.xlsm,.xls,.txt,.mf4" name="datDCM" style="display: none"
                  @change="taskChange($event)">
                <el-input style="width:450px;" :placeholder="currentplaceholder" v-model="taskFileName"
                  :disabled="true">
                </el-input>
                <el-button @click="submitTask()" type="success">上传文件
                </el-button>

              </div>
              <!-- <div v-if="!currentFileArea"> -->
              <component @submit="submitTask" v-bind:is="currentView">

              </component>

              <!-- </div> -->

            </form>

            <!-- 单个组件 -->
            <component @infoModal="infoChange" @progressModal="progressChange" :email="email"
              :projectNumber="projectNumber" v-bind:is="areaView"></component>
            <div style="margin-top:2em" v-if="taskTableShow">

              <el-table :data="taskTableData" style="width: 100%">

                <el-table-column type="index" width="150">
                  <template slot="header">
                    ID
                  </template>
                </el-table-column>
                <el-table-column property="user" label="User">
                </el-table-column>
                <el-table-column property="tskkind" label="TaskType">
                </el-table-column>
                <el-table-column property="state" label="State">
                </el-table-column>
              </el-table>

            </div>
          </div>

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
        <el-dialog title="信息" :close-on-click-modal="false" :visible.sync="infoVisible" width="20%">
          <p style="margin:0 0 1em 0">正在处理...</p>
        </el-dialog>

      </el-main>
    </el-container>

  </div>
</template>

<script>
import { projectID } from "@/../static/ProjectID.js";
import view1 from "./view1";
import view2 from "./view2";
// import view4 from "./view4";
// import view6 from "./view6";
import view7 from "./view7";
import view11 from "./view11";
import view12 from "./view12";
import view19 from "./view19";
import view20 from "./view20";
import view21 from "./view21";
import view23 from "./view23";
import view24 from "./view24";
import view25 from "./view25";
import view26 from "./view26";
import view37 from "./view37";
import view42 from "./view42";
import view43 from "./view43";
import view46 from "./view46";
import view48 from "./view48";
import view50 from "./view50";
import view29 from "./view29";
import view18 from "./view18";
import view8 from "./view8";
import view15 from "./view15";
import view47 from "./view47";
import view22 from "./view22";
import view34 from "./view34";
import view27 from "./view27";
import view35 from "./view35";
import view52 from "./view52";
import view53 from "./view53";
import view54 from "./view54";
import view55 from "./view55";
import view28 from "./view28";
import view31 from "./view31";
import view41 from "./view41";

export default {
  name: "HelloWorld",
  data() {
    return {
      mainArea: false,
      username: localStorage.getItem("username"),
      // defaultIndex: "1-0-0",
      email: "",
      dataType: "FA2ATMRollDataMeanValue",
      currentplaceholder: "选择dat,DCM,xls,xlsx,xlsb,xlsm,pdf,csv文件",
      //dataTypeArr 内为空的即是不在通用FORM之内，独立的plat
      dataTypeArr: {
        1: "FA3TATEMSN",
        2: "FA3KFAFTE",
        3: "FA3KFDLAQHOM",
        4: "FA3LRAEB_CAL",
        5: "FA3LRA_PICTURE_OUT",
        6: "FA3TWCCPriEnaRange",
        7: "FA4DewPointAnalysis",
        8: "FA7ColdEngScan",
        9: "FA3OxyStorage",
        10: "",
        11: "FA7EmsRepMergeToUAEStool",
        12: "FA3ESUKOPT",
        13: "ST-SIM",
        14: "FA3UEGO_LamsoniCrt",
        15: "FA7EMISSION_VAPOS_RPA",
        16: "FA3MSTEFLUSH",
        17: "FA7DATXLSB_MRG",
        18: "FA7MULTIXLSB_MRG",
        19: "FA4ColdStartReport",
        20: "FA4DewPointReport",
        21: "FA7InjSys_tiInj_Scan",
        22: "UCOSProjUsedCollection",
        23: "FA4ColdStarDatAnalysis",
        24: "",
        25: "FA3MixtrueReport",
        26: "FA4DPColdDownCal",
        27: "UCOSProjUsedShow",
        28: "FA6DTemotModalSim",
        29: "FA6DTmotModelDiagAnalysis",
        30: "",
        31: "FA7AnalysisAssistant",
        32: "",
        33: "",
        34: "UCOSUserUsedCollection",
        35: "UCOSAdviceFeedback",
        36: "FA7RDESlopeCal",
        37: "FA2ATMRollDataMeanValue",
        38: "",
        39: "",
        40: "", //暂无
        41: "",
        42: "GeneralTwoThreeDimScatter",
        43: "FA4EngSpdFromDGTooth",
        44: "",
        45: "",
        46: "FA4ATMCalDewPointAutoFit",
        47: "FA7RDEPNemission",
        48: "",
        49: "FA3MixLrnRange3DimPicture",
        50: "FA6BDDYLSUAnalysis",
        51: "",
        52: "",
        53: "",
        54: "FA4EPMCalGenerate",
        55: "",
      },
      breadFir: "爆震+排温",
      breadSec: "数据传输助手",
      breadThi: "ATM扫描平均值",
      projectNumberArr: [],
      projectNumber: "",
      projectNumerShow: true,
      msg: "Welcome to Your Vue.js App",
      taskTableShow: true,
      currentView: "",

      areaView: "",

      subMenuArr: [
        {
          group: "台架",
          module: [{ name: "画图助手", func: [["等高线图", 53]] }],
        },
        {
          group: "爆震+排温",
          module: [
            { name: "数据处理助手", func: [["ATM扫描平均值", 37]] },
            // {
            //   name: "离线仿真",
            //   func: [["ATM动态程序离线仿真", 45]],
            // },
          ],
        },
        {
          group: "FA3混合气",
          module: [
            {
              name: "闭环控制",
              func: [
                ["ORA&FRA自学习设定", 4],
                ["ORA&FRA区间图形输出", 5],
                ["后氧闭环条件设置", 6],
                ["储氧量计算标定", 9],
                ["基于老催的后氧窗口修正", 3],
                ["基于新催的空燃比信号修正", 14],
                ["基于网络训练的自学习区间三维呈现", 49],
                ["基于网络训练的自学习区间绘图评估", 55],
              ],
            },
            {
              name: "碳罐标定",
              func: [
                ["碳罐流量标定", 1],
                ["碳罐流量修正", 2],
                ["碳罐总冲洗量计算", 16],
              ],
            },
            { name: "过渡工况", func: [["过渡工况离线优化", 12]] },
            { name: "FA3助手", func: [["混合气自动报告", 25]] },
          ],
        },
        {
          group: "FA4起动",
          module: [
            {
              name: "起动标定",
              func: [
                ["露点标定", 7],
                ["降温特性标定", 26],
                ["起动统计分析", 23],
                ["排温模型数据变更后露点自适应", 46],
                ["EPM数据预设工具", 54],
              ],
            },
            // {
            //   name: "起动优化",
            //   func: [
            //     ["ESNSWL优化", 13],
            //     ["ESNSWL离线仿真", 30],
            //   ],
            // },
            {
              name: "FA4助手",
              func: [
                ["FA4起动报告", 19],
                ["FA4露点报告", 20],
                ["DG齿转速计算", 43],
              ],
            },
          ],
        },
        { group: "FA5监控" },
        {
          group: "FA6诊断",
          module: [
            {
              name: "FA6 A组",
              func: [
                ["GPF-CCF分析", 24],
                // ["GPF-CCF离线模拟计算", 39],
                ["GPF流阻特性分析", 48],
              ],
            },
            {
              name: "FA6 B组",
              func: [
                ["DDYLSU老化因子计算", 50],
                // ["TWCD MAP标定及OSC测量", 51],
                ["DTESK标定分析", 52],
              ],
            },
            {
              name: "FA6 D组",
              func: [
                ["面积法节温器诊断离线仿真", 28],
                ["面积法节温器诊断批量分析", 29],
                // ["替代水温离线仿真", 32],
                // ["水温低边模型离线仿真", 33],
                // ["HSC离线仿真", 44],
                // ["环境温度模型离线仿真", 38],
                // ["环境温度模型离线标定", 40],
              ],
            },
          ],
        },
        {
          group: "FA7排放",
          module: [
            {
              name: "排放分析",
              func: [
                ["排放DAT和秒采文件合并", 17],
                ["多排放秒采文件合并对比 ", 18],
                ["客户排放报告誊写汇总", 11],
                ["台架冷机排放扫描分析", 8],
                ["最小喷油脉宽检查", 21],
                ["排放分析助手", 31],
              ],
            },
            // { name: "排放优化", func: [["起动优化", null]] },
          ],
        },
        { group: "GPF" },
        {
          group: "PA和客户体验",
          module: [{ name: "道路试验", func: [["道路试验报告", 41]] }],
        },
        {
          group: "道路排放",
          module: [
            {
              name: "RDE分析",
              func: [
                ["排放窗口&VaposRPA计算", 15],
                ["坡度计算", 36],
                ["原排PN计算", 47],
              ],
            },
          ],
        },
        {
          group: "其他",
          module: [
            {
              name: "应用统计",
              func: [
                ["UCOS平台应用统计－项目", 22],
                ["UCOS平台应用统计－用户", 34],
                ["UCOS平台应用统计－图显", 27],
              ],
            },
            { name: "UCOS建议", func: [["使用建议反馈", 35]] },
            { name: "便捷工具", func: [["二维三维散点图", 42]] },
          ],
        },
        {
          group: "用户",
        },
      ],
      // 42 已被归为通用
      areaList: [24, 48, 28, 13, 30, 31, 40, 41, 18, 51, 52, 53], //单独的Area 序号  （与通用currentView区分）
      currentFileList: {
        //通用上传文件区域是否存在
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: false,
        8: false, //因为使用通用上传文件区域，校验比较麻烦，改成使用另外的提交区域
        9: true,
        10: true,
        11: true,
        12: true,
        13: false,
        14: true,
        15: true,
        16: true,
        17: true,
        18: true,
        19: false,
        20: false,
        21: false,
        22: false,
        23: false,
        24: false,
        25: true,
        26: true,
        27: false,
        28: false,
        29: false,
        30: false,
        31: false,
        32: false,
        33: false,
        34: false,
        35: false,
        36: true,
        37: true,
        38: false,
        39: false,
        40: false,
        41: false,
        42: false,
        43: false,
        44: false,
        45: false,
        46: false,
        47: false,
        48: false,
        49: true,
        50: false,
        51: false,
        52: false,
        53: false,
        54: false,
        55: false,
      }, //是否显示通用的上传区域
      currentFileArea: true,
      taskFileName: "",
      alertShow: true,
      alertDes:
        "适用平台：全平台\r\n功能：计算ATM转毂扫描不同工况段的平均值 <br>输入：dat文件，内部包含“暂停”操作的测试dat文件<br>输出：xlsx文件，各段测试参数的平均值。",
      alertModalArr: {
        1: "适用平台：UP8,UD8,MED17810,MED17810.1<br>功能：由dat生成碳罐流量的三个标定数据，并触发邮件推送结果<br>输入：碳罐流量标定测试的dat文件（IncaFlow或人工测试，可为多个dat全部选中-上传），需包含1.占空比0%时的流量、2.tatesoll_w、3.流量信号名称中包含AD字符<br>输出：标定DCM，1.TATEMSN,2.MSNTATE, 3.MSNTEVO 4.散点和流量特性图\n\n",
        2: "适用平台：UP8,UD8,MED17810,MED17810.1，且项目不带冲洗泵<br>功能：由dat生成碳罐流量修正标定数据（KFAFTE）,并触发邮件推送结果<br>输入：碳罐流量修正标定测试的dat文件（IncaFlow或人工测试，可为多个dat全部选中-上传），需包含(不必等于)mssgin,phtevpu,AD字符。包含本项目TATEMSN的DCM<br>输出：标定DCM，KFAFTE.DCM",
        3: "适用平台：UP8, UD8, MED17810, MED17810.1 <br>功能：由dat生成 “老化催化器” 窗口标定数据（KFDLAx,不同平台MAP不同）,并触发邮件推送结果<br>输入：老化催化器窗口标定的转毂测试dat文件（IncaFlow或人工测试，可为多个dat全部选中-上传），基础DCM（用于确定X、Y轴的选点），需包含(不必等于)CO,NHC,NO,ushk（例）,kfdlaxx(例)字符<br>输出：催化器窗口DCM，KFDLAxxx.DCM\n\n",
        4: "适用平台：UP8,UD8,MED17810,MED17810.1<br>功能：由WLTC测试的dat生成ORA-FRA自学习区间的标定数据,并触发邮件推送结果<br>输入：上传的参考dat文件需包含(只能是一个dat)转速、负荷、车速、档位、气路扭矩需求<br>输出：ORA-FRA自学习区间的标定DCM",
        5: "适用平台：UP8,UD8,MED17810,MED17810.1<br>功能：由DCM文件生成ORA和FRA的自学习区间-图形化,并触发邮件推送结果<br>输入：1.上传的DCM需要包含KFORAMILL,KFORAMILHF, KFORAMILH， KFFRAMILL, KFFRAMILHY, KFFRAMILH<br>输出：ORA-FRA自学习区间的图形化显示.jpg文件",
        6: "适用平台：UP8,UD8,MED17810,MED17810.1<br>功能：由dat生成后氧闭环工况区间推荐的DCM,并触发邮件推送结果<br>输入：上传的参考dat文件需包含(只能是一个dat)车速、档位、转速、负荷<br>输出：后氧闭环的工况限制条件范围DCM/CSV文件",
        7: "适用：UP8, UD8, MED17810, MED17810.1 <br>功能：导入露点测试dat，生成露点DCM和xlsx文件（dat内的信息，包括：dat名称对应的前后氧热电偶分组，拐点时刻，拐点温度，启动温度等）。 <br>输入：一次性上传同项目露点标定的所有dat文件，热偶信号不规范的（非D11---D33)需录入热偶名称。dat中需包含热偶名称、转速、加速踏板开度、起动温度、热量积分值等。<br>输出：露点DCM和识别信息xlsx文件。\n",
        8: "平台：UD8,MED17810,MED17810.1<br>功能：从台架原始冷机扫描的txt数据分析出标定DCM<br>输入：存放在网盘的txt路径（可以是总文件夹: 其内包含的子文件夹和内容也将被分析） <br>输出：冷机标定参数，数据排放等高图，txt对应的扫描xlsx数据<br>",
        9: "适用：UP8, UD8, MED17810, MED17810.1 <br>功能：导入储氧量测试dat文件分析计算后生成储氧量DCM。<br>输入：一次性上传同项目各温度点测试获得的所有dat文件。dat中需包含前催排气温度、前催排气流量、空燃比、后氧电压、流量等参数。<br>输出：储氧量DCM、实测的温度点~储氧量图示。<br>",
        10: "功能暂未开放", //没有此index
        11: "适用：向INA提出自动化誊写汇总需求的客户国六排放测试报告。<br>功能：将客户的排放报告（非标准联电模板）整理换算成联电汇总表的Excel格式，后由工程师复制到联电汇总表中。<br>输入：客户排放报告（可一次性提交同客户的多份报告），选择客户名称、试验车辆类型和试验条件。<br>输出：联电排放报告汇总表格式的排放汇总信息。<br>",
        12: "适用平台：UP8,UD8,MED17810,MED17810.1 <br>功能：软件自动优化％ESUK主要的标定数据，邮件推送优化后的DCM <br>输入：过渡工况的dat测试文件、测试使用的dcm；后台提供推荐的标定量取值范围。 <br>输出：DCM输出%ESUK模块的主要标定参数",
        13: "功能暂未开放", //暂未开放
        14: "适用平台：UP8, UD8, MED17810, MED17810.1 的LSU氧传<br>功能：由dat生成 “新鲜催化器” 时空燃比信号修正数据（UEGO_rIntfrCorrnHomMod_MAP）,并触发邮件推送结果<br>输入：新鲜催化器Lamsoni修正的转毂测试dat文件（IncaFlow或人工测试，可为多个dat全部选中-上传），基础DCM（用于确定X、Y轴的选点），需包含(不必等于)CO,NHC,NO,ushk（例）等字符<br>输出：催化器窗口DCM，UEGO_rIntfrCorrnHomMod_MAP.DCM ",
        15: "适用：RDE实验结果的行程动力学结果分析，RDE移动平均窗口法污染物排放结果分析。<br>功能：导入RDE实验结果源数据，分别生成带冷启动和不带冷启动行程动力学和移动窗口法污染物结果分析报告， docx和pdf两种格式，共四份报告。<br>输入：一次性上传秒采排放RDE实验结果和窗口信息（WLTC实验结果），或者上传PEMS软件导出源数据（内含窗口信息）；输入文件格式非联合电子版本时，须在本界面手动输入窗口信息。<br>输出：docx和pdf版带冷启动和不带冷启动行程动力学和移动窗口法污染物结果分析报告。",
        16: "适用平台：UP8,UD8,MED17810,MED17810.1,UP6(1) <br>功能： 计算＆输出DAT工况中碳罐总冲洗量（对只有低中高三段的测试将会模拟成低中高高四段计算）<br>输入： 碳罐IV型实验或WLTC的测量文件(DAT)，DAT内需要包含：车速和mste_w(或mste_w_msg/mste/mste_msg)信号<br>输出： 包含“车速、流量、总冲洗量、首次冲洗时间的图片”<br>",
        17: "适用平台：UP8,UD8,MED17810,MED17810.1,UP6(1)<br>\n功能： 合并排放时测试的DAT数据文件和秒采xlsb文件，并对齐车速的时间轴<br>输入： 排放测试DAT和对应的秒采xlsb文件，DAT内须包含车速信号<br>输出：合并DAT和秒采后生成.mdf文件（与.dat用法相同），邮件推送结果",
        18: "适用：用于排放室多个秒采文件的合并对比分析。<br>功能：导入待合并的所有秒采.xlsb文件,提交后，服务器将推送合并后的对比图示，分析数据更改带来的效果和影响。<br>输入：多个秒采.xlsb文件放在一个文件夹下，一次性选中和上传。<br>输出：与车速同轴的PN，CO，NO和THC的对比图示。",
        19: "适用：UP8,UD8,MED17810.1 <br>功能: 自动生成FA4 2020版本的起动报告 <br>输入: Web页项目信息，用于生成起动报告的dat文件。<br>命名格式：文件名具有+20％,-20％,RST,KHON/KHOFF,LPST,STSP,EOL,SKTM,TMFWHL,ENGSTATE,,Txxxx,xxxxKM关键字<br>输出: FA4-V04版本的起动报告（Word和PDF）",
        21: "适用平台：UD8,MED17810,MED17810.1 <br>功能：分析多个dat中喷油脉宽小于限制（CVO3的为0.35，其它为0.6ms） <br>输入：存放在“网盘”的DAT路径 <br>输出：汇总了dat文件名 -限值以下的时刻点-信号名称-基本工况信息等 <br>",
        23: "适用: 所有ECU平台<br>功能: 统计和分析起动DAT相关参数到统一格式的报表<br>输入: 1.DAT文件的网盘路径（可包含n个DAT）；2.统计模板（某项目首次统计请上传空模板，追加统计请上传本项目原模板）<br>注：请在生成报告需要用到的DAT文件名末尾追加report/rep等字眼，写成如：xxx_report.dat <br>输出: 起动测量文件分析汇总模板.xlsx",
        24: "适用平台：UP8,UD8, MED17810.1 <br>功能：从dat中获取'PFltSig_ratPCorrlnActB1:CCP1','PFltSig_ratPCorrlnB1:CCP1','PPfilDif_ratEgyPDsB1:CCP1'三个信号的变化值和其对应的时间 <br>输入：上传dat文件需包含'PFltSig_ratPCorrlnActB1:CCP1','PFltSig_ratPCorrlnB1:CCP1','PPfilDif_ratEgyPDsB1:CCP1'三个信号；如果命名不同，请联系INA <br>输出：信号获取结果的excel文件",
        25: "适用平台：UP8, UD8, MED17810.1, MED17810 <br>功能: 根据网页录入的信息,生成FA3的开发报告. <br>输入: 根据命名规则书写的DAT文件名, 205表, 网盘路径以及项目信息等<br>输出: FA3混合气开发报告(LR+ESUK+TEV)",
        26: "适用平台：UP8, UD8, MED17810.1, MED17810, ME17U6.1 <br>功能: 根据DAT数据自动分析输出降温特性的DCM <br>输入: DAT文件（DPCDxxx.dat）, 热偶名称（不输入则默认为T04，T20）<br>输出: 项目的降温特性DCM",
        29: "适用平台： UP8,UD8, MED17810.1 <br>功能: 根据DAT数据自动分析水温模型面积比和时间等参数 <br>输入: DAT文件的P盘路径 <br>输出: 包含面积比等相关参数的分析报告<br>",
        31: "适用平台： UP8,UD8, MED17810.1 <br>功能: 分析排放数据，提示优化方向，车辆信息提醒，排放结果登记和自动报告 <br>",
        37: "适用平台：全平台\r\n功能：计算ATM转毂扫描不同工况段的平均值 <br>输入：dat文件，内部包含“暂停”操作的测试dat文件<br>输出：xlsx文件，各段测试参数的平均值。",
      },
      filePercent: 0,
      customColorMethod: [
        { color: "#909399", percentage: 20 },

        // { color: "#e6a23c", percentage: 50 },
        { color: "#409eff", percentage: 100 },
        { color: "#67c23a" },
      ],
      dialogVisible: false,
      infoVisible: false,
      taskTableData: [],
    };
  },
  created() {
    this.projectNumberArr = projectID;
    this.email = localStorage.getItem("username") + "@uaes.com";
    this.$http.post("http://139.196.196.221:8081/taskList").then((res) => {
      console.log(res);
      var data = res.data;
      this.renderTaskTable(data);
    });
    // this.$http.post("http://139.224.24.175:8001/certStatus").then((res) => {
    //   console.log(res);
    //   // var data = res.data;
    //   // this.renderTaskTable(data);
    // });
    // this.renderTaskTable([{
    //         "tskkind": ['radcm', 'esuksim', 'esuksim', 'esuksim', 'esuksim', 'esuksim', 'iraarea', 'kfdlaso'],
    //         "user": ['radcm', 'esuksim', 'esuksim', 'esuksim', 'esuksim', 'esuksim', 'iraarea', 'kfdlaso'],
    //         "state": ["unfinish", "unfinish", "unfinish", "unfinish", "unfinish", "unfinish", "unfinish", "unfinish"],
    //     }])
  },
  mounted() {
    this.selectMenu([, 41]);
    // var arr = [24, 28, 13, 30, 31, 40, 41, 42, 48, 15, 18];
    // var new1 = {};
    // for (var i = 1; i < 50; i++) {
    //   if (arr.includes(i)) {
    //   } else {
    //     // new1.push(i)
    //     new1[i] = true;
    //   }
    // }
    // console.log(JSON.stringify(new1));
  },
  methods: {
    progressChange(view, percent) {
      this.dialogVisible = view;
      this.filePercent = percent;
    },
    infoChange(view) {
      this.infoVisible = view;
    },
    logout(command) {
      if (command == "a") {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("group");
        localStorage.removeItem("urcs");
        localStorage.removeItem("ucos");
        localStorage.removeItem("ucdm");

        this.$router.push("/login");
      }
    },
    handleSelect(index) {},
    selectMenu(func, group, name) {
      this.mainArea = true;
      this.breadFir = group;
      this.breadSec = name;
      this.breadThi = func[0];
      var index = func[1];
      // console.log(this.alertModalArr[index]);
      if (this.alertModalArr[index]) {
        this.alertDes = this.alertModalArr[index];
        this.alertShow = true;
      } else {
        // this.alertDes = this.alertModalArr[index];
        this.alertShow = false;
      }
      if (index == 25) {
        this.currentplaceholder = "请上传具体项目205表";
      } else {
        this.currentplaceholder =
          "请选择dat,DCM,xls,xlsx,xlsb,xlsm,pdf,csv,txt,mf4文件";
      }

      this.dataType = this.dataTypeArr[index];
      if (this.areaList.includes(index)) {
        //如果是单独的Area
        console.log("独立view", index);

        this.areaView = "view" + index;
        this.currentView = "";
      } else {
        //通用Area
        console.log("通用view", index);
        this.areaView = "";

        this.currentView = "view" + index;
      }

      this.currentFileArea = this.currentFileList[index]; //显示或隐藏通用的传输文件区域
      console.log(this.currentFileArea);
      // console.log();
      var noNumber = [22, 34, 27, 35];
      if (noNumber.includes(index)) {
        this.projectNumerShow = false;
      } else {
        this.projectNumerShow = true;
      }
      var noTaskTable = [31];
      if (noTaskTable.includes(index)) {
        this.taskTableShow = false;
      } else {
        this.taskTableShow = true;
      }
    },
    transTask() {
      this.$refs["taskFile"].dispatchEvent(new MouseEvent("click"));
    },
    taskChange(e) {
      console.log(e.target);
      var name = "";
      for (let i = 0; i < e.target.files.length; i++) {
        name = name + e.target.files[i].name + ";";
      }
      this.taskFileName = name;
    },
    submitTask() {
      console.log(this.$refs.taskForm);
      var formData = new FormData(this.$refs.taskForm);
      if (this.projectNumber) {
        formData.append("projectNumber", this.projectNumber);
      } else {
        if (this.projectNumerShow) {
          this.warnModal("请填写项目号。");
          return;
        }
      }

      if (
        this.currentFileArea &&
        this.$refs.taskFile &&
        !this.$refs.taskFile.files[0]
      ) {
        this.warnModal("请至少选择一个文件。");
        return;
      }

      for (var [a, b] of formData.entries()) {
        console.log(a, b);
      }
      var config = {
        // headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          var complete =
            (progressEvent.loaded / progressEvent.total) * 100 || 0;
          this.filePercent = Math.floor(complete);
        },
      };
      this.dialogVisible = true;

      this.$http
        .post("http://139.196.196.221:8081/submitTask", formData, config)
        .then((res) => {
          console.log(res);

          var { flg, info, tasklist } = res.data;
          if (flg) {
            this.infoModal(flg, info);
          }
          if (tasklist) {
            this.taskTableData = tasklist;
          }

          this.dialogVisible = false;
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
    renderTaskTable(tasklist) {
      var arr = [];
      tasklist[0].state.forEach((item, index) => {
        var obj = {
          state: item,
          tskkind: tasklist[0].tskkind[index],
          user: tasklist[0].user[index],
        };
        arr.push(obj);
      });
      this.taskTableData = arr;
    },
  },
  components: {
    view1: view1,
    view2: view2,
    // view4: view4,
    // view6: view6,
    view7: view7,
    view11: view11,
    view12: view12,
    view19: view19,
    view20: view20,
    view21: view21,
    view23: view23,
    view24: view24,
    view25: view25,
    view26: view26,
    view37: view37,
    view42: view42,
    view43: view43,
    view46: view46,
    view48: view48,
    view50: view50,
    view29: view29,
    view18: view18,
    view8: view8,
    view15: view15,
    view47: view47,
    view22: view22,
    view34: view34,
    view27: view27,
    view35: view35,
    view52: view52,
    view53: view53,
    view54: view54,
    view55: view55,
    view28: view28,
    view31: view31,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0 !important;
}

.el-main {
  background-color: #fff;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.label {
  color: #606266;
  font-size: 15px;
  font-weight: 550;
  display: inline-block;
}
.label.require::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.el-form-item__label {
  font-size: 15px;
  font-weight: 550;
}
.cell.require::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>
