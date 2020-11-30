<template>
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
    <el-container  v-if="step==1" class="svwchart" style="margin-bottom:-20px">
      <el-aside style="width:220px;border-right:1px solid #e6e6e6;min-height: calc(100vh - 220px);" :style="{height:mainHeight}">
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
      <el-main ref="main" v-loading="mainLoading">
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
import { makePlot, makePlotLayout } from "@/../static/ReportUtilities.js";
// import { this.plotdata } from "@/../static/Knock Rumble counters.js";
import mypage from "./Page";
export default {
  data() {
    return {
      dialogVisible: false,
      mainHeight: "600px",
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
  
  },
  methods: {
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
          console.log(res);
          this.plotdata  = res.data;
      this.mainLoading=false;

      makePlotLayout("thisTbody", this.plotdata);
      makePlot("thisTbody", this.plotdata.plots, this.plotdata.filenameMapping);
      if (this.plotdata.sectionName == "FaultCount") {
        makeDfcReported(
          this.plotdata.dfesTable_order,
          this.plotdata.dfesTable,
          this.plotdata.filenameMapping
        );
        makeDfcHistory(
          this.plotdata.historyDFC_order,
          this.plotdata.historyDFC,
          this.plotdata.filenameMapping
        );
      }
      console.log(this.$refs.main.$el.clientHeight);

      this.mainHeight = this.$refs.main.$el.clientHeight + 40 + "px";
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