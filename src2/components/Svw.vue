<template>
<!--  临时版 -->
  <div>
    <div style="margin:0em auto;width:1100px;height:100%;" v-if="step==0">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="id">
          <!-- <template slot-scope="scope"  slot="header">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template> -->
        </el-table-column>
        <el-table-column label="task" prop="task">

        </el-table-column>
        <el-table-column label="datetime">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.datetime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="submit_by" prop="submit_by">

        </el-table-column>
        <el-table-column label="load">
          <template slot-scope="scope">
            <el-button size="mini" @click="loadTask(scope.$index, scope.row)">加载</el-button>

          </template>
        </el-table-column>
      </el-table>
      <my-page ref="page" :tableData.sync="tableData" :result="result"></my-page>

      <!-- <el-divider></el-divider> -->

    </div>
     <!-- <el-button icon="el-icon-zoom-in" type="info" plain size="mini"></el-button> -->
<!-- background:#545c64; -->
    <el-container  v-if="step==1" class="svwchart" style="margin-bottom:-20px;display:flex;position:relative">
      <el-aside style="width:220px;border-right:1px solid #e6e6e6;min-height: calc(100vh - 220px);position:absolute;top:0;left:0;bottom:0">
        <el-scrollbar style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);height:100%">
           <el-button plain size="mini" style="margin:0.5em 0 0 0.5em" @click="step=0">reselect task</el-button>
          <el-menu default-active="0" class="el-menu-vertical-demo" @select="selectSection" 
      text-color="#333"
      active-text-color="#2ca9e1">
          <!-- <el-menu-item>reselect task</el-menu-item> -->
            <el-submenu v-for="(item,index) in chapterSections" :index="String(index)" :key="item.chapterName">
              <template slot="title">
                <span>{{item.chapterName}}</span>
              </template>
              <el-menu-item-group  v-if="section.sectionName"  v-for="(section,cindex) in item.sections" :key="section.sectionName">
                <el-menu-item :index="index+'-'+cindex">{{section.sectionName}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main ref="main" v-loading="mainLoading" class="main" style="margin-left:220px">
        <div>
          <h3 v-if="taskTitle" style="color: #2ca9e1;margin-top:0">{{task}}</h3>
          <div id="mainContents">
            <h3 style="margin-top:0">{{chapter}}</h3>
            <h4 style="color: #2ca9e1;margin-left:1em">{{section}}</h4>
            <div id="thisTbody"></div>

          </div>

        </div>
        <div>

        </div>

      </el-main>
    </el-container>

    <el-dialog :visible.sync="dialogVisible" width="1020px">
      <div id="zoomChart">图</div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>
    

  </div>

</template>

<script>
// import { makeScatterPlot} from "@/../static/ReportUtilitiessvw.js";


// import { this.plotdata } from "@/../static/Knock Rumble counters.js";
import mypage from "./Page";

export default {

  data() {
    return {
      dialogVisible: false,
      // mainHeight: "600px",
      step: 0,
      tableData: [
        // {
        //   task: "xxxx",
        //   datetime: "2016-05-02",
        //   submit_by: "user",
        // },
      ],
      result:[],
      mainLoading:false,
      chapterSections: [
        // {
        //   chapterName: "DFES",
        //   sections: [
        //     {
        //       sectionName: "FaultCount",
        //     },
        //   ],
        // },
        // {
        //   chapterName: "Drivingprofile",
        //   sections: [
        //     {
        //       sectionName: "Drivingprofile1",
        //     },
        //     {
        //       sectionName: "Drivingprofile2",
        //     },
        //     {
        //       sectionName: "Drivingprofile3",
        //     },
        //   ],
        // },
        // {
        //   chapterName: "EPM",
        //   sections: [
        //     {
        //       sectionName: "EPM1",
        //     },
        //     {
        //       sectionName: "EPM2",
        //     },
        //     {
        //       sectionName: "EPM3",
        //     },
        //   ],
        // },
      ],
      task: "",
      taskTitle: true,
      chapter: "",
      section: "",
      plotdata:{},
    };
  },
  created() {
    this.$http
      .post(
        "http://47.116.135.144:30002/urcs/svw/service/1.0.0/loadCalcResults"
      )
      .then((res) => {
        console.log(res);
        var { res } = res.data;
        // this.tableData = res;
        this.result=res;
      });
  },
  mounted() {
  // console.log(makeScatterPlot);
  },
  methods: {
    evil(str) {
     var script = document.createElement("script");
    script.type="text/javascript";
    script.text=str;
    document.getElementsByTagName("head")[0].appendChild(script);
    document.head.removeChild(document.head.lastChild);
},
    loadTask(index, row) {
      this.$http
        .post(
          "http://47.116.135.144:30002/urcs/svw/service/1.0.0/loadChapterSections",
          { task: row.task }
        )
        .then((res) => {
          console.log(res);
          var { res } = res.data;
          this.chapterSections = res;
        });
      this.step = 1;
      this.task = row.task;
    },
   
    selectSection(index, path) {
      console.log(index);
      var arr = index.split("-");

      this.chapter = this.chapterSections[arr[0]].chapterName;
      this.section = this.chapterSections[arr[0]].sections[arr[1]].sectionName;
      this.taskTitle = false;
      this.mainLoading=true;
      // console.log(text);
      this.$http
        .post("http://47.116.135.144:30002/urcs/svw/service/1.0.0/loadPlots", { task:this.task,sectionName: this.section })
        .then((res) => {
          console.log('23')
          console.log(res);
          var {datajsstr,divstr,jsstr}=res.data;
          // console.log(datajsstr);
          this.evil(datajsstr);
          // eval(datajsstr);
          console.log('plotdata',plotdata);

          this.plotdata=this.plotdata;
          $('#thisTbody').html(divstr)
          // console.log(jsstr);
          this.evil(`

function makeScatterPlot(_divname, _title, _xtitle, _ytitle, _enableLgend, _tooltipNamex, _tooltipNamey, _seriesData, _dispRange, _threshold, _filemapping) {
    
    // console.log(_filemapping)

    var colorPlan = {
        border: "#c5c5c5",
        title: "#7f7f7f",
        seriesColorList: ["#3c78d8", "#6aa84f"],
        warning: "#f1c232",
        danger: "#ff4444"
    };

    var option = {
        chart: {
            type: "scatter",
            borderWidth: 1,
            borderColor: colorPlan["border"],
            zoomType: "xy",
            panning: true,
            panKey: "shift"
        },
        title: {
            text: _title,
            style: {
                color: colorPlan["title"],
                fontWeight: "bold",
                fontSize: "12px"
            }
        },
        xAxis: { title: { text: _xtitle } },
        yAxis: {
            title: {
                text: _ytitle
            }
        },
        legend: { enabled: _enableLgend },
        credits: { enabled: false },
        tooltip: {
            formatter: function () {
                var s = "<b>" + _tooltipNamex + ": " + this.point.x + "</b>";
                s += "<br/><b>" + _tooltipNamey + ": " + this.point.y + "</b>";
                s += "<br/><b>time: " + this.point.time + "</b>";
                if (_filemapping!=undefined){
                    s += "<br/><b>filename: " + _filemapping[this.point.filename] + "</b>";

                }else{
                    s += "<br/><b>filename: " + this.point.filename + "</b>";

                }
                return s;
            }
        },
        series: []
    };

    // display range
    var displayRage = [["xmin", "min", "xAxis"], ["xmax", "max", "xAxis"], ["ymin", "min", "yAxis"], ["ymax", "max", "yAxis"]];
    for (i=0;i<4;i++){
        try {
            if (!_dispRange[displayRage[i][0]] == "") {
                option[displayRage[i][2]][displayRage[i][1]] = parseFloat(_dispRange[displayRage[i][0]]);
            }
        } catch (err) { }
    }

    // threshold
    var thresholdOption = [];
    var thresholdRng = [["low", "warning"],["min", "danger"],["high", "warning"],["max", "danger"]];
    for (i=0;i<4;i++){
        try {
            if (!_threshold[thresholdRng[i][0]] == "") {
                thresholdOption.push({
                    color: colorPlan[thresholdRng[i][1]],
                    width: 2,
                    value: parseFloat(_threshold[thresholdRng[i][0]])
                });
            }
        } catch (err) { }

    }
    option["yAxis"]["plotLines"] = thresholdOption;
    
    // seriesOpiotn
    var seriesOption = [];

    for (i = 0; i < _seriesData.length; i++) {
        seriesOption.push({
            name: _seriesData[i]["name"],
            data: _seriesData[i]["data"],
            color: _seriesData[i]["color"],
            turboThreshold: 0,
            marker: { radius: 3, symbol: "circle" }
        });
    }

    option["series"] = seriesOption;

    Highcharts.chart(_divname, option);
}

function makeColumnPlot(_divname, _title, _xtitle, _ytitle, _enableLgend, _tooltipNamex, _seriesDataX, _seriesData, _threshold) {
    var colorPlan = {
        border: "#c5c5c5",
        title: "#7f7f7f",
        seriesColorList: ["rgba(60,120,216,1)", "rgba(106,168,79,1)"],
        warning: "#f1c232",
        danger: "#ff4444"
    };

    var option = {
        chart: {
            type: "column",
            borderWidth: 1,
            borderColor: colorPlan["border"],
            zoomType: "xy",
            panning: true,
            panKey: "shift"
        },
        title: {
            text: _title,
            style: {
                color: colorPlan["title"],
                fontWeight: "bold",
                fontSize: "12px"
            }
        },
        xAxis: {
            title: { text: _xtitle },
            categories: _seriesDataX
        },
        yAxis: {
            title: {
                text: _ytitle
            }
        },
        legend: { enabled: _enableLgend },
        credits: { enabled: false },
        tooltip: {
            formatter: function () {
                var s = "<b>" + _tooltipNamex + ": " + _seriesDataX[this.point.x] + "</b>";
                s += "<br /><b>per: " + this.point.y + "%</b>";
                return s;
            }
        },
        plotOptions:{
            series:{
                dataLabels:{
                    enabled:true
                }
            }
        },
        series: []
    };

    // threshold
    var thresholdOption = [];
    var thesholdRng = [["low","warning"], ["min","danger"], ["high","warning"],["max","danger"]];
    for(i=0;i<4;i++){
        try {
            if (!_threshold[thesholdRng[i][0]] == "") {
                thresholdOption.push({
                    color: colorPlan[thesholdRng[i][1]],
                    width: 2,
                    value: (_seriesDataX.length - 1) / (_seriesDataX[_seriesDataX.length - 1] - _seriesDataX[0]) * (parseFloat(_threshold[thesholdRng[i][0]]) - _seriesDataX[0])
                });
            }
        } catch (err) { }
    }

    option["xAxis"]["plotLines"] = thresholdOption;
    
    var seriesOption = [];
    for (i = 0; i < _seriesData.length; i++) {
        seriesOption.push({
            name: _seriesData[i]["name"],
            data: _seriesData[i]["data"],
            color: _seriesData[i]["color"]
        });
    }

    option["series"] = seriesOption;

    Highcharts.chart(_divname, option);
}

function makeHeatmapPlot(_divname, _title, _xtitle, _ytitle, _enableLgend, _tooltipNamex, _tooltipNamey, _seriesDataX, _seriesDataY, _seriesData) {
    var colorPlan = {
        border: "#c5c5c5",
        title: "#7f7f7f",
        seriesColorList: ["#6e9eeb", "#6aa84f"],
        warning: "#f6b26b",
        danger: "#ea9999"
    };

    var option = {
        chart: {
            type: "heatmap",
            borderWidth: 1,
            borderColor: colorPlan["border"]
        },
        title: {
            text: _title,
            style: {
                color: colorPlan["title"],
                fontWeight: "bold",
                fontSize: "12px"
            }
        },
        xAxis: {
            min: 0,
            max: _seriesDataX.length - 1,
            title: { text: _xtitle },
            categories: _seriesDataX
        },
        yAxis: {
            min: 0,
            max: _seriesDataY.length - 1,
            categories: _seriesDataY,
            title: { text: _ytitle }
        },
        legend: { enabled: _enableLgend },
        credits: { enabled: false },
        colorAxis: {
            min: 0,
            maxColor: "#ff4f4f",
            reversed: false
        },
        legend: {
            align: "right",
            layout: "vertical",
            margin: 0,
            verticalAlign: "top",
            y: 26,
            symbolHeight: 200
        },
        credits: {
            enabled: false
        },
        tooltip: {
            formatter: function () {
                var s = "<b>" + _tooltipNamex + ": " + _seriesDataX[this.point.x] + "</b>";
                s += "<br/><b>" + _tooltipNamey + ": " + _seriesDataY[this.point.y] + "</b>";
                s += "<br/><b>count: " + this.point.value + "</b>";
                return s;
            }
        },
        series: []
    };

    var seriesOption = [];

    for (i = 0; i < _seriesData.length; i++) {
        seriesOption.push({
            data: _seriesData,
            borderWidth: 0,
            turboThreshold: 0
        });
    }

    option["series"] = seriesOption;

    Highcharts.chart(_divname, option);
}

// bubble chart
function makeScatterDistr(_divname, _title, _xtitle, _ytitle, _enableLgend, _tooltipNamex, _tooltipNamey, _tooltipNamez, _seriesData) {
    var colorPlan = {
        border: "#c5c5c5",
        title: "#7f7f7f"
    };

    var option = {
        chart: {
            type: "scatter",
            borderWidth: 1,
            borderColor: colorPlan["border"],
            zoomType: "xy",
            panning: true,
            panKey: "shift"
        },
        title: {
            text: _title,
            style: {
                color: colorPlan["title"],
                fontWeight: "bold",
                fontSize: "12px"
            }
        },
        xAxis: {
            title: { text: _xtitle }
        },
        yAxis: {
            title: {
                text: _ytitle
            }
        },
        legend: { enabled: _enableLgend },
        credits: { enabled: false },
        tooltip: {
            formatter: function () {
                var s = "<b>" + _tooltipNamex + ": " + this.point.x + "</b>";
                s += "<br/><b>" + _tooltipNamey + ": " + this.point.y + "</b>";
                s += "<br/><b>" + _tooltipNamez + ": " + this.point.z + "</b>";
                return s;
            }
        },
        series: []
    };
    var seriesOption = [];
    for (i = 0; i < _seriesData.length; i++) {
        seriesOption.push({
            name: _seriesData[i]["name"],
            data: _seriesData[i]["data"],
            color: _seriesData[i]["color"],
            turboThreshold: 0,
            marker: { radius: 3, symbol: "circle" }
        });
    }

    option["series"] = seriesOption;

    Highcharts.chart(_divname, option);
}


function makeScatterPlotDualAxis(_divname, _title, _xtitle, _ytitle1, _ytitle2, _enableLgend, _tooltipNamex, _tooltipNamey, _seriesData, _dispRange, _threshold){
    var colorPlan = {
        border: "#c5c5c5",
        title: "#7f7f7f",
        seriesColorList: ["#3c78d8", "#6aa84f"],
        warning: "#f1c232",
        danger: "#ff4444"
    };

    var option = {
        chart: {
            type: "scatter",
            borderWidth: 1,
            borderColor: colorPlan["border"],
            zoomType: "xy",
            panning: true,
            panKey: "shift"
        },
        title: {
            text: _title,
            style: {
                color: colorPlan["title"],
                fontWeight: "bold",
                fontSize: "12px"
            }
        },
        xAxis: { title: { text: _xtitle } },
        yAxis: [
            {
                title: {
                    text: _ytitle1
                }
            },
            {
                title: {
                    text: _ytitle2
                },
                opposite: true
            }
        ],
        legend: { enabled: _enableLgend },
        credits: { enabled: false },
        tooltip: {
            formatter: function () {
                var s = "<b>" + _tooltipNamex + ": " + this.point.x + "</b>";
                s += "<br/><b>" + _tooltipNamey + ": " + this.point.y + "</b>";
                s += "<br/><b>time: " + this.point.time + "</b>";
                s += "<br/><b>filename: " + this.point.filename + "</b>";
                return s;
            }
        },
        series: []
    };

    // display range
    var displayRage = [["xmin", "min", "xAxis"], ["xmax", "max", "xAxis"], ["ymin", "min", "yAxis"], ["ymax", "max", "yAxis"]];
    for (i=0;i<4;i++){
        try {
            if (!_dispRange[displayRage[i][0]] == "") {
                option[displayRage[i][2]][displayRage[i][1]] = parseFloat(_dispRange[displayRage[i][0]]);
            }
        } catch (err) { }
    }

    // threshold
    var thresholdOption = [];
    var thresholdRng = [["low", "warning"],["min", "danger"],["high", "warning"],["max", "danger"]];
    for (i=0;i<4;i++){
        try {
            if (!_threshold[thresholdRng[i][0]] == "") {
                thresholdOption.push({
                    color: colorPlan[thresholdRng[i][1]],
                    width: 2,
                    value: parseFloat(_threshold[thresholdRng[i][0]])
                });
            }
        } catch (err) { }

    }
    option["yAxis"]["plotLines"] = thresholdOption;
    
    // seriesOpiotn
    var seriesOption = [];

    for (i = 0; i < _seriesData.length; i++) {
        
        seriesOption.push({
            name: _seriesData[i]["name"],
            data: _seriesData[i]["data"],
            color: _seriesData[i]["color"],
            turboThreshold: 0,
            yAxis: _seriesData[i]["yAxis"],
            marker: { radius: 3, symbol: "circle" }
        });
    }

    option["series"] = seriesOption;

    Highcharts.chart(_divname, option);
}`)
          this.evil(jsstr)
          // eval(jsstr)
          

      //     this.plotdata  = res.data;
      this.mainLoading=false;

      // makePlotLayout("thisTbody", this.plotdata);
      // makePlot("thisTbody", this.plotdata.plots, this.plotdata.filenameMapping);
      // if (this.plotdata.sectionName == "FaultCount") {
      //   makeDfcReported(
      //     this.plotdata.dfesTable_order,
      //     this.plotdata.dfesTable,
      //     this.plotdata.filenameMapping
      //   );
      //   makeDfcHistory(
      //     this.plotdata.historyDFC_order,
      //     this.plotdata.historyDFC,
      //     this.plotdata.filenameMapping
      //   );
      // }
      // console.log(this.$refs.main.$el.clientHeight);

      // this.mainHeight = this.$refs.main.$el.clientHeight + 40 + "px";
      var that=this;
        $("#mainContents").on("click", ".zoomclass", function () {
      // $(".ui.modal").modal("show")
      var value=$(this).attr("myvalue")
      that.showModal(value);
    });
      }).catch((err)=>{
         this.mainLoading=false;

      })
      // console.log(path);
    },
    showModal(value) {
      this.dialogVisible = true;
      this.$nextTick(function () {
        var subplot = JSON.parse(JSON.stringify(this.plotdata));

        subplot["layout"] = "layout1";

        var plotindex = parseInt(value);
        var plotitem = subplot["plots"][plotindex];

        subplot["plots"] = [];
        subplot["plots"].push(plotitem);
        console.log(subplot);

        makePlotLayout("zoomChart", subplot, 700, 1000);
        makePlot("zoomChart", subplot.plots, subplot.filenameMapping);
      });
    },
  },
   components: {
  
    "my-page": mypage,
  },
};
</script>

<style scoped>

.main /deep/ .RPheader {
    width: 1120px;
    height: 35px;
    background: -webkit-linear-gradient(top, rgb(182, 182, 182), rgb(240, 240, 240));
    font-size: 15px;
    font-weight: bold;
    font-family: helvetica, verdana, sans-serif;
    color: rgb(102, 102, 102);
    padding-left: 15px;
    padding-top: 9px;
    margin-right: 20px;
    border-top: 1px solid rgb(197, 197, 197);
    border-left: 1px solid rgb(197, 197, 197);
    border-right: 1px solid rgb(197, 197, 197);
    box-sizing: border-box;
}

.main /deep/ .RPcontent {
    width: 1120px;
    height: 707px;
    margin-right: 20px;
    border-left: 1px solid rgb(197, 197, 197);
    border-right: 1px solid rgb(197, 197, 197);
    box-sizing: border-box;
}

.main /deep/ .RPlogocontainer {
    width: 1120px;
    align-items: left;
    margin-right: 20px;
    border-left: 1px solid rgb(197, 197, 197);
    border-right: 1px solid rgb(197, 197, 197);
    border-bottom: 1px solid rgb(197, 197, 197);
    box-sizing: border-box;
}

.main /deep/ .RPuaeslogo {
    width: 25%;
    background-repeat: no-repeat;
    float: left;
}

.main /deep/ .RPlogocontainerAnnounce {
    line-height: 10px;
    width: 60%;
    float: left;
    padding-top: 3px;
    font-size: 10px;
    font-family: helvetica, verdana, sans-serif;
    color: rgb(158, 158, 158);
    overflow: hidden;
    box-sizing: border-box;
}

.main /deep/ .RPboschlogo {
    width: 15%;
    float: right;
    background-repeat: no-repeat;
    box-sizing: border-box;
}

.main /deep/ .RPuaesimg {
    height: 20px;
    width: 80%;
    margin-left: 15px;
    margin-top: 5px;
    box-sizing: border-box;
}

.main /deep/ .RPboschimg {
    height: 20px;
    width: 80%;
    margin-left: 5px;
    margin-top: 5px;
    box-sizing: border-box;
}

.main /deep/ .RPfooter {
    width: 1120px;
    height: 16px;
    margin-right: 20px;
    box-sizing: border-box;
}

.main /deep/ .RPfooterimg {
    height: 16px;
    width: 100%;

    box-sizing: border-box;
}


.main /deep/ .circle_O {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid rgb(65, 65, 65);
}

.main /deep/ .circle_RF {
    width: 16px;
    height: 16px;
    background: -webkit-linear-gradient(top, rgb(255, 129, 129), rgb(194, 51, 51));
    border-radius: 50%;
    border: 2px solid rgb(194, 51, 51);
}

.main /deep/ .circle_GF {
    width: 16px;
    height: 16px;
    background: -webkit-linear-gradient(top, rgb(155, 255, 167), rgb(44, 158, 95));
    border-radius: 50%;
    border: 2px solid rgb(44, 158, 95);
}

.main /deep/ .circle_YF {
    width: 16px;
    height: 16px;
    background: -webkit-linear-gradient(top, rgb(255, 228, 161), rgb(255, 183, 0));
    border-radius: 50%;
    border: 2px solid rgb(255, 183, 0);
}

.main /deep/ table {
    padding: 0px;
    margin: 0px;
    table-layout: fixed;
    width:100%;
    font-size: 10px;
    color: #3f3f3f;
    box-sizing: border-box;
}

.main /deep/ table th {
    text-align: left;
    padding-left: 4px;
    padding-top: 2px;
}

.main /deep/ table td {
    text-align: left;
    word-wrap: break-word;
    padding-left: 4px;
    padding-top: 2px;
}


.main /deep/ .row_per_20{
    height: 20%;
}

.main /deep/ .row_per_25{
    height: 25%;
}


.main /deep/ .row_per_33{
    height: 33%;
}

.main /deep/ .row_per_50{
    height: 50%;
}

.main /deep/ .row_per_100{
    height: 100%;
}

.main /deep/ .col_33{
    width: 33%;
}

.main /deep/ .col_35{
    width: 35%;
}

.main /deep/ .col_50{
    width: 50%;
}

.main /deep/ .col_65{
    width: 65%;
}

.main /deep/ .col_100{
    width: 100%;
}

.main /deep/ .mychart{
    float: left;
    font-family: helvetica, verdana, sans-serif;
    box-sizing: border-box;
}

/* .svwchart /deep/ .el-scrollbar__wrap { */
  /* overflow-x: hidden; */
/* } */
.svwchart /deep/ .el-menu {
  border-right: none;
}
/deep/ .el-dialog__body{
  padding:10px
}
/* .el-menu-item, .el-submenu__title{
  height:30px;
} */
/deep/ .el-menu-item {
  height: 28px;
  line-height: 28px;
  font-size: 12px;
}
/deep/ .el-submenu__title{
  height: 42px;
  line-height: 42px;
  font-size: 14px;
}
.el-header /deep/ ul{
  border-bottom:none !important;
}
</style>  