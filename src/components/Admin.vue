<template>
  <div class="admin" style="margin:0 auto;width:1100px;">
    <div>
      <h3>项目池:</h3>
      <!-- <el-input size="mini" width='120' v-model="searchTableVal"></el-input> -->
      <div v-loading="protableLoading" element-loading-text="正在加载...">
        <my-protable :allresult="allresult" :xmhArr="xmhArr" :warning="false"></my-protable>

      </div>

      <div style="overflow:hidden;">
        <!-- <el-dropdown  size="mini" @click="transExcel()" split-button type="primary">
          上传EXCEL文件
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click="excelTable()">打开表格</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        <el-button @click="sumitTable()" style="float:right;" type="primary" size="small">提交更改</el-button>

        <el-button @click="excelTable()" style="float:right;margin:0 1em" type="primary" size="small">上传EXCEL文件
        </el-button>
        <el-button @click="downloadTable()" style="float:right;" type="primary" size="small">下载模板
        </el-button>
      </div>
    </div>
    <div class="packageDiv">
      <el-divider></el-divider>
      <h3>Package标签</h3>
      <div class="package" v-for="(item, pindex) in package" :key="pindex">
        <!-- <span style="font-weight:600">&nbsp;&nbsp;{{item.groupName}}:</span> -->
        <!-- <el-input placeholder="请输入标签分组名"   v-focus="true"  v-if="editPackage" v-model="input"
      size="mini"></el-input> -->
        <!-- <div > -->
          <div v-for="(tag, index) in item.packageItems" :key="index" style="display:inline-block">
            <!-- v-if="!editPackage[pindex][index]" -->

            <my-tag :ref="'pactag_' + pindex" @delete="deletePackage(pindex, index)"
              :tag.sync="package[pindex]['packageItems'][index]" :name.sync="package[pindex]['groupName']"
              :index="index" :tagDict.sync="tagDict[tag]" :enshow="true" style="display:inline-block"></my-tag>
            <!-- 可能是因为input值是双向绑定的 tagDict[input]自动会改变 无需再双向绑定tagDict的值 -->
          </div>
          <i class="el-icon-plus" @click="addPackage(pindex)"></i>
          <div style="position:absolute;right:0;bottom:8px">
            <i @click="minPackageRow(pindex)" style="font-size:32px;line-height:37px;"
              class="el-icon-remove-outline"></i>
            <i @click="addPackageRow(pindex)" style="font-size:32px;line-height:37px;"
              class="el-icon-circle-plus-outline"></i>
          </div>

        <!-- </div> -->

        <!-- <div style="border-bottom:1px dashed #ccc;margin:0.5em 0"></div> -->
      </div>
      <div style="overflow:hidden;margin-top:1em">
        <el-button @click="sumitPackage()" style="float:right" type="primary" size="small">提交更改</el-button>
      </div>
    </div>
    <div class="packageDiv">
      <el-divider></el-divider>
      <h3>Task标签</h3>
      <div class="package" v-for="(item, pindex) in task" :key="pindex">
        <div v-for="(tag, index) in item.taskItems" :key="index" style="display:inline-block">
          <!-- v-if="!editPackage[pindex][index]" -->
          <my-tag :ref="'tasktag_' + pindex" @delete="deleteTask(pindex, index)"
            :tag.sync="task[pindex]['taskItems'][index]" :name.sync="task[pindex]['groupName']" :index="index"
            :enshow="false" style="display:inline-block"></my-tag>
          <!-- <el-tag @click="showEditPackage(pindex, index)" closable type="">
            {{ tag }}
          </el-tag> -->
          <!-- v-if="editPackage[pindex][index]" -->
          <!-- <el-input v-model="package[pindex][index]" size="mini"></el-input> -->
        </div>
        <i class="el-icon-plus" @click="addTask(pindex)"></i>
        <div style="position:absolute;right:0;bottom:8px">
          <i @click="minTaskRow(pindex)" style="font-size:32px;line-height:37px;" class="el-icon-remove-outline"></i>
          <i @click="addTaskRow(pindex)" style="font-size:32px;line-height:37px;"
            class="el-icon-circle-plus-outline"></i>
        </div>
      </div>
      <div style="overflow:hidden;margin-top:1em">
        <el-button @click="sumitTask()" style="float:right" type="primary" size="small">提交更改</el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <div>
      <h3 style="position:relative">设备借用申请
        <el-input size="mini" style="position:absolute;width:150px;top:0;right:0" v-model="searchValEqu"
          placeholder="搜索"></el-input>

      </h3>

      <el-table @sort-change="sortTable" :data="tableDataEqu" style="width: 100%">
       
        <el-table-column sortable="custom" prop="sn" label="sn">
        </el-table-column>
        <el-table-column sortable="custom" prop="applier" label="事件（借/还）">
          <template scope="scope">
           {{scope.row.applier=="admin"?'归还':'借用'}}
          </template>

        </el-table-column>
        <el-table-column sortable="custom" prop="applier" label="借用人">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" :content="'电话: '+scope.row.applierPhone" placement="top-start">
              <el-tag style="font-size:14px" v-if="scope.row.applier" type="info">{{ scope.row.applier }}</el-tag>
              <!-- <span style="color:orange"></span> -->
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column sortable="custom" prop="applyTime" label="申请时间">
        </el-table-column>
        <el-table-column label="同意/拒绝">
          <template slot="header" slot-scope="scope">
            <span style="float:right">同意&nbsp;&nbsp;/&nbsp;&nbsp;拒绝&nbsp;</span>
          </template>
          <template scope="scope">
            <!-- <el-input
            v-if="scope.row.editShow"
            v-focus="true"
            size="small"
            @keyup.enter.native="removeEdit(scope.$index, scope.row)"
            v-model="scope.row.id"
            placeholder="请输入内容"
          ></el-input> -->
            <!-- <span>{{ scope.row.isLocked }}</span> -->
            <div style="float:right">
              <el-button type="success" @click="approveEqu(scope.row)" size="small" style="font-size:20px;padding:6px"
                icon="el-icon-s-check pointer" circle></el-button>
              <el-button type="danger" @click="unApproveEqu(scope.row.uid)" size="small"
                style="font-size:20px;padding:6px" icon="el-icon-s-check" circle></el-button>
              <!-- <el-button type="success" icon="el-icon-s-release pointer" v-if="scope.row.isAppliedFor" circle></el-button>
               <el-button type="success" style="opacity:0.35" icon="el-icon-s-release" v-if="!scope.row.isAppliedFor" circle></el-button> -->

              <!-- <i style="font-size:30px;color:#E6A23C" v-if="scope.row.isAppliedFor" class="el-icon-s-check pointer"></i>
              <i style="font-size:30px;color:#E6A23C;opacity:0.35" v-if="!scope.row.isAppliedFor"
                class="el-icon-s-check"></i>
              <i style="font-size:30px;color:#67C23A" v-if="scope.row.applier" class="el-icon-s-release  pointer"></i>
              <i style="font-size:30px;color:#67C23A;opacity:0.35" v-if="!scope.row.applier"
                class="el-icon-s-release"></i> -->

            </div>

          </template>
        </el-table-column>
      </el-table>
      <!-- <el-table @sort-change="sortTable" :data="tableDataEqu" style="width: 100%">
       
        <el-table-column sortable="custom" prop="sn" label="sn">
        </el-table-column>
        <el-table-column sortable="custom" prop="deviceKeeper" label="deviceKeeper">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" :content="'电话: '+scope.row.deviceKeeperPhone" placement="top-start">
              <span>{{ scope.row.deviceKeeper }}</span>
            </el-tooltip>
          </template>

        </el-table-column>
        <el-table-column sortable="custom" prop="lockOwner" label="lockOwner">
          <template scope="scope">
            <i style="font-size:20px;" v-if="scope.row.isLocked" @click="removeLock()" class="el-icon-lock pointer"></i>
            <i style="font-size:20px;" v-if="!scope.row.isLocked" class="el-icon-unlock"></i>
            <el-tooltip class="item" effect="dark" :content="'电话: '+scope.row.lockOwnerPhone" placement="top-start">
              <span> {{scope.row.lockOwner}}</span>
            </el-tooltip>

          </template>
        </el-table-column>
        <el-table-column sortable="custom" prop="applier" label="申请人">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" :content="'电话: '+scope.row.applierPhone" placement="top-start">
              <el-tag style="font-size:14px" v-if="scope.row.applier" type="info">{{ scope.row.applier }}</el-tag>
             
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column sortable="custom" prop="applyTime" label="申请时间">
        </el-table-column>
        <el-table-column label="同意/拒绝">
          <template slot="header" slot-scope="scope">
            <span style="float:right">同意&nbsp;&nbsp;/&nbsp;&nbsp;拒绝&nbsp;</span>
          </template>
          <template scope="scope">
          
            <div style="float:right">
              <el-button type="success" @click="approveEqu(scope.row)" size="small" style="font-size:20px;padding:6px"
                icon="el-icon-s-check pointer" circle></el-button>
              <el-button type="danger" @click="unApproveEqu(scope.row.uid)" size="small"
                style="font-size:20px;padding:6px" icon="el-icon-s-check" circle></el-button>
              

            </div>

          </template>
        </el-table-column>
      </el-table> -->

      <my-page ref="page" :tableData.sync="tableDataEqu" :result="resultEqu"></my-page>
    </div>
    <el-divider></el-divider>
    <div>
      <h3>历史借用记录</h3>
      <el-tabs type="card" v-model="deviceMenu">
        <!-- v-model="activeName" @tab-click="handleClick" -->
        <el-tab-pane label="Query One Device" name="first">
          <el-form ref="deviceFormName" :rules="deviceRules" :inline="true" :model="deviceForm"
            class="demo-form-inline">
            <el-form-item label="SN Number" prop="sn">
              <el-input v-model="deviceForm.sn" placeholder="请填写sn号"></el-input>
            </el-form-item>
            <el-form-item label="Time Selection">
              <el-date-picker v-model="deviceDate" type="datetimerange" align="right" value-format="yyyy-MM-dd HH-mm-ss"
                :unlink-panels="true" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>

            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitDevice">搜索</el-button>
            </el-form-item>
          </el-form>

          <el-table @sort-change="sortTableDev" :data="tableDataDev" style="width: 100%">
            <el-table-column width="150" sortable="custom" prop="id" label="id">
            </el-table-column>
            <el-table-column sortable="custom" prop="sn" label="sn">
            </el-table-column>
            <el-table-column sortable="custom" prop="borrower" label="借用人">
              <!-- <template scope="scope">
            <el-tooltip class="item" effect="dark" :content="'电话: '+scope.row.currentUserPhone" placement="top-start">
              <span>{{ scope.row.borrower }}</span>
            </el-tooltip>
          </template> -->

            </el-table-column>
            <el-table-column sortable="custom" prop="updateTime" label="上传时间">
            </el-table-column>
            <!-- <el-table-column width="150">
              <template slot="header" slot-scope="scope">
                <el-input size="mini" v-model="searchValDev" placeholder="搜索"></el-input>
              </template>
            </el-table-column> -->
          </el-table>

          <my-page ref="page" :tableData.sync="tableDataDev" :result="resultDev"></my-page>

        </el-tab-pane>
        <el-tab-pane label="Query All Device" name="second">

          <el-form ref="allDeviceFormName" :rules="allDeviceRules" :inline="true" class="demo-form-inline"
            :model="allDeviceForm">

            <el-form-item prop="time" label="Time Selection">
              <el-date-picker v-model="allDeviceForm.time" type="datetimerange" align="right"
                value-format="yyyy-MM-dd HH-mm-ss" :unlink-panels="true" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期" :picker-options="pickerOptions">
              </el-date-picker>

            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="downloadDevice">download</el-button>
            </el-form-item>
          </el-form>

        </el-tab-pane>

      </el-tabs>

    </div>

    <el-dialog title="excel表格数据：" :allresult="allresultExcel" :visible.sync="dialogVisible" width="1200px">
      <el-button type="primary" size="small" @click="transExcel()">点击上传文件</el-button>
      <input v-show="false" type="file" ref="excel" @change="submitExcel($event)" />

      <my-protable :allresult="allresultExcel" :xmhArr="xmhArr" :warning="true"></my-protable>

      <!-- :before-close="handleClose" -->

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="mergeTable()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <form id="downloadForm" method="POST" action="/admin/downloadDeviceLendingHistoryBySN">
      <input type="hidden" name="startTime" v-model="this.allDeviceForm.time[0]">
      <input type="hidden" name="endTime" v-model="this.allDeviceForm.time[2]">
    </form> -->
  </div>
</template>

<script>
import mytag from "./Tag.vue";
import myprotable from "./ProTable";
import mypage from "./Page";
export default {
  directives: {
    focus: {
      inserted: function (el, { value }) {
        if (value) {
          console.log(value);
          el.children[0].focus();
        }
      },
    },
  },
  data() {
    return {
      // tableData: [], //单页数据  移到子组件了
      // result: [], //总数据过滤后  移到子组件了
      // searchTableVal: "",
      protableLoading: false,
      allresult: [],
      allresultExcel: [],
      excelData: [],

      package: [],
      task: [],
      tagDict: {},
      dialogVisible: false,
      allresultEqu: [],
      resultEqu: [],
      tableDataEqu: [],
      searchValEqu: "",
      deviceMenu: "first",
      deviceForm: {
        sn: "",
        startTime: "",
        endTime: "",
      },
      allDeviceForm: {
        time: [],
      },
      deviceDate: ["", ""],
      // allDeviceDate: ["", ""],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      deviceRules: {
        sn: [{ required: true, message: "请输入sn号", trigger: "blur" }],
      },
      allDeviceRules: {
        time: [{ required: true, message: "请输入时间段", trigger: "blur" }],
      },
      // searchValDev: "",
      allresultDev: [],
      resultDev: [],
      tableDataDev: [],
      
    };
  },
  computed: {
    xmhArr: function () {
      var arr = [];
      this.allresult.forEach((item, index) => {
        arr.push(item.projectID);
      });
      console.log(arr);
      return arr;
    },
    // editPackage: function() {
    //   var arr = [];
    //   this.package.forEach((item, pindex) => {
    //     arr.push([]);
    //     item.forEach((value, cindex) => {
    //       arr[pindex].push([]);
    //       value.forEach((tag, index) => {
    //         arr[pindex][cindex].push(false);
    //       });
    //     });
    //   });
    //   return arr;
    // }
  },
  mounted() {
    //   this.$http
    // .post("/login", {
    //   username: "admin",
    //   password: "admin"
    // })
    // .then(res => {
    //   console.log(res);

    //   var { res, group, token } = res.data;
    //   if (res == "V") {
    //     localStorage.setItem("token", token);
    //     localStorage.setItem("group", group);
    //     localStorage.setItem("username", "admin");
    //   } else {
    //     alert("登录失败");
    //   }
    // }).catch(res=>{
    //   alert('登录错误')
    // });

    // this.$http
    //   .post("/admin/addNewUser", {
    //     user: "li.gao",
    //     email: "li.gao@uaes.com",
    //     password: "gaoli",
    //     phoneNumber: "123456789"
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(res => {
    //     // alert('登录错误')
    //   });
    this.protableLoading = true;
    this.$http
      .get("/admin/getProjectID")
      .then((res) => {
        this.protableLoading = false;

        console.log(res);
        var { projectIDList } = res.data;
        //   var data=[
        //     {
        //         "groupName": "groupnam1",
        //         "packageItems": ["package1","package2"]
        //     },
        //     {
        //         "groupName": "groupnam2",
        //         "packageItems": ["package3","package4"]
        //     }
        // ]

        var data = projectIDList;

        data.forEach((item, index) => {
          item.id = index + 1;
          item.editShow = false;
        });
        this.allresult = data;
        console.log(this.allresult);

        // this.result = JSON.parse(JSON.stringify(data)); //避免同指向  sort出错
      })
      .catch(() => {
        this.protableLoading = false;
        this.$message({
          type: "error",
          message: "载入项目号失败!",
        });
      });
    this.$http.get("/admin/getPackage").then((res) => {
      console.log(res);
      // this.package = Package;
      // console.log(JSON.stringify(this.package));
      // console.log(JSON.stringify(tagDict));
      this.package = res.data.package;
      this.tagDict = res.data.translate;

      // this.tagDict = tagDict;
      // this.tagDict = {
      //   package1: "中文1",
      //   package2: "中文2",
      //   package3: "中文3",
      //   package4: "中文4"
      // };

      // this.package = [
      //   {
      //     groupName: "groupnam1",
      //     packageItems: ["package1", "package2"]
      //   },
      //   {
      //     groupName: "groupnam2",
      //     packageItems: ["package3", "package4"]
      //   }
      // ];
      // this.task = [
      //   {
      //     groupName: "groupnam1",
      //     taskItems: ["task1", "task2"]
      //   },
      //   {
      //     groupName: "groupnam2",
      //     taskItems: ["task3", "task4"]
      //   }
      // ];
    });
    this.$http.get("/admin/getTask").then((res) => {
      this.task = res.data.task;
    });
    this.$http.get("/admin/getDeviceRequest").then((res) => {
      console.log(res);
      this.allresultEqu = res.data.data;
      // this.allresultEqu = [
      // {
      //   uid: "qw21423",
      //   sn: "6001",
      //   deviceKeeper: "san.zhang",
      //   deviceKeeperPhone: "2234234",
      //   lockOwner: "san.zhang",
      //   lockOwnerPhone: "2234234",
      //   isLocked: true,
      //   applier: "si.li",
      //   applierPhone: "7654321",
      //   applyTime: "2020-04-20 16:33:33"
      // },
      //   {
      //     uid: "qw21423",
      //     sn: "6001",
      //     deviceKeeper: "san.zhang",
      //     deviceKeeperPhone: "2234234",
      //     lockOwner: "san.zhang",
      //     lockOwnerPhone: "2234234",
      //     isLocked: true,
      //     applier: "si.li",
      //     applierPhone: "7654321",
      //     applyTime: "2020-04-20 16:33:33"
      //   },
      //   {
      //     uid: "qw21423",
      //     sn: "6001",
      //     deviceKeeper: "san.zhang",
      //     deviceKeeperPhone: "2234234",
      //     lockOwner: "san.zhang",
      //     lockOwnerPhone: "2234234",
      //     isLocked: true,
      //     applier: "si.li",
      //     applierPhone: "7654321",
      //     applyTime: "2020-04-20 16:33:33"
      //   },
      //   {
      //     uid: "qw21423",
      //     sn: "6001",
      //     deviceKeeper: "san.zhang",
      //     deviceKeeperPhone: "2234234",
      //     lockOwner: "san.zhang",
      //     lockOwnerPhone: "2234234",
      //     isLocked: true,
      //     applier: "si.li",
      //     applierPhone: "7654321",
      //     applyTime: "2020-04-20 16:33:33"
      //   },
      //   {
      //     uid: "qw21423",
      //     sn: "6001",
      //     deviceKeeper: "san.zhang",
      //     deviceKeeperPhone: "2234234",
      //     lockOwner: "san.zhang",
      //     lockOwnerPhone: "2234234",
      //     isLocked: true,
      //     applier: "si.li",
      //     applierPhone: "7654321",
      //     applyTime: "2020-04-20 16:33:33"
      //   },
      //   {
      //     uid: "qw21423",
      //     sn: "6001",
      //     deviceKeeper: "san.zhang",
      //     deviceKeeperPhone: "2234234",
      //     lockOwner: "san.zhang",
      //     lockOwnerPhone: "2234234",
      //     isLocked: true,
      //     applier: "si.li",
      //     applierPhone: "7654321",
      //     applyTime: "2020-04-20 16:33:33"
      //   },
      //   {
      //     uid: "qw21423",
      //     sn: "6001",
      //     deviceKeeper: "san.zhang",
      //     deviceKeeperPhone: "2234234",
      //     lockOwner: "san.zhang",
      //     lockOwnerPhone: "2234234",
      //     isLocked: true,
      //     applier: "si.li",
      //     applierPhone: "7654321",
      //     applyTime: "2020-04-20 16:33:33"
      //   },
      //   {
      //     uid: "qw21423",
      //     sn: "6001",
      //     deviceKeeper: "san.zhang",
      //     deviceKeeperPhone: "2234234",
      //     lockOwner: "san.zhang",
      //     lockOwnerPhone: "2234234",
      //     isLocked: true,
      //     applier: "si.li",
      //     applierPhone: "7654321",
      //     applyTime: "2020-04-20 16:33:33"
      //   },
      //   {
      //     uid: "qw21423",
      //     sn: "6001",
      //     deviceKeeper: "san.zhang",
      //     deviceKeeperPhone: "2234234",
      //     lockOwner: "san.zhang",
      //     lockOwnerPhone: "2234234",
      //     isLocked: true,
      //     applier: "si.li",
      //     applierPhone: "7654321",
      //     applyTime: "2020-04-20 16:33:33"
      //   },
      //   {
      //     uid: "qw21423",
      //     sn: "6001",
      //     deviceKeeper: "san.zhang",
      //     deviceKeeperPhone: "2234234",
      //     lockOwner: "san.zhang",
      //     lockOwnerPhone: "2234234",
      //     isLocked: true,
      //     applier: "si.li",
      //     applierPhone: "7654321",
      //     applyTime: "2020-04-20 16:33:33"
      //   },
      //   {
      //     uid: "qw21423",
      //     sn: "6001",
      //     deviceKeeper: "san.zhang",
      //     deviceKeeperPhone: "2234234",
      //     lockOwner: "san.zhang",
      //     lockOwnerPhone: "2234234",
      //     isLocked: true,
      //     applier: "si.li",
      //     applierPhone: "7654321",
      //     applyTime: "2020-04-20 16:33:33"
      //   },
      //   {
      //     uid: "qw21423",
      //     sn: "6001",
      //     deviceKeeper: "san.zhang",
      //     deviceKeeperPhone: "2234234",
      //     lockOwner: "san.zhang",
      //     lockOwnerPhone: "2234234",
      //     isLocked: true,
      //     applier: "si.li",
      //     applierPhone: "7654321",
      //     applyTime: "2020-04-20 16:33:33"
      //   },
      // {
      //   uid: "qw21423",
      //   sn: "6001",
      //   deviceKeeper: "san.zhang",
      //   deviceKeeperPhone: "2234234",
      //   lockOwner: "san.zhang",
      //   lockOwnerPhone: "2234234",
      //   isLocked: true,
      //   applier: "si.li",
      //   applierPhone: "7654321",
      //   applyTime: "2020-04-20 16:33:33"
      // }
      // ];
      // this.resultEqu = this.allresultEqu.filter(
      //   data =>
      //     !this.searchValEqu ||
      //     data.sn.toLowerCase().includes(this.searchValEqu.toLowerCase()) ||
      //     data.deviceKeeper.toLowerCase().includes(this.searchValEqu.toLowerCase()) ||
      //     data.lockOwner.toLowerCase().includes(this.searchValEqu.toLowerCase()) ||
      //     data.applyTime.toLowerCase().includes(this.searchValEqu.toLowerCase()) ||
      //     data.applier.toLowerCase().includes(this.searchValEqu.toLowerCase())
      // );
    });
  },
  methods: {
    transExcel() {
      this.$refs.excel.dispatchEvent(new MouseEvent("click"));
    },
    sumitTable() {
      // console.log(this.tagDict);
      // 提交更改时提交清空搜索框来还原result, result和tableData已同步，allresult没有
      this.searchTableVal = "";
      console.log(this.allresult);

      this.$confirm("确定要提交项目号吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // type: 'warning'
      })
        .then(() => {
          this.$http
            .post("/admin/changeProjectID", {
              projectNumberData: this.allresult,
            })
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: "提交成功!",
              });
            })
            .catch((res) => {
              this.$message({
                type: "error",
                message: "提交失败!",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消提交",
          });
        });
    },
    sumitPackage() {
      // console.log(this.tagDict);
      // 提交更改时提交清空搜索框来还原result, result和tableData已同步，allresult没有

      this.searchTableVal = "";
      console.log(this.allresult);
      this.$confirm("确定要提交Package吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // type: 'warning'
      })
        .then(() => {
          this.$http
            .post("/admin/changePackage", {
              package: this.package,
              translate: this.tagDict,
            })
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: "提交成功!",
              });
            })
            .catch((res) => {
              this.$message({
                type: "error",
                message: "提交失败!",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消提交",
          });
        });
    },
    sumitTask() {
      // console.log(this.tagDict);
      // 提交更改时提交清空搜索框来还原result, result和tableData已同步，allresult没有
      this.searchTableVal = "";
      console.log(this.allresult);
      this.$confirm("确定要提交Task吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // type: 'warning'
      })
        .then(() => {
          this.$http
            .post("/admin/changeTask", { task: this.task })
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: "提交成功!",
              });
            })
            .catch((res) => {
              this.$message({
                type: "error",
                message: "提交失败!",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消提交",
          });
        });
    },

    addPackage(pindex) {
      console.log(this.package);
      this.package[pindex].packageItems.push("");
      // this.$nextTick相当于定时器或者promise 等dom操作全部结束时再执行操作
      this.$nextTick(function () {
        var length = this.$refs["pactag_" + pindex].length;
        console.log(this.$refs["pactag_" + pindex][length - 1]);
        this.$refs["pactag_" + pindex][length - 1].showEditPackage();
      });
    },
    minPackageRow(pindex) {
      console.log(this.package);
      this.package.splice(pindex, 1);
    },
    addPackageRow(pindex) {
      console.log(this.package);
      this.package.splice(pindex + 1, 0, {
        groupName: "name",
        packageItems: [""],
      });
    },

    deletePackage(pindex, index) {
      this.package[pindex].packageItems.splice(index, 1);
    },
    addTask(pindex) {
      this.task[pindex].taskItems.push("");
      // this.$nextTick相当于定时器或者promise 等dom操作全部结束时再执行操作
      this.$nextTick(function () {
        var length = this.$refs["tasktag_" + pindex].length;
        console.log(this.$refs["tasktag_" + pindex][length - 1]);
        this.$refs["tasktag_" + pindex][length - 1].showEditPackage();
      });
    },

    deleteTask(pindex, index) {
      this.task[pindex].taskItems.splice(index, 1);
    },
    minTaskRow(pindex) {
      console.log(this.task);
      this.task.splice(pindex, 1);
    },
    addTaskRow(pindex) {
      console.log(this.task);
      this.task.splice(pindex + 1, 0, {
        groupName: "name",
        taskItems: [""],
      });
      console.log(this.task);
    },
    excelTable() {
      this.dialogVisible = true;
      // this.$nextTick(function() {
      //   this.allresultExcel = JSON.parse(JSON.stringify(this.excelData)); //不改变指向会导致无法编辑？ 原因未知
      // });
    },
    submitExcel(e) {
      console.log(e.target.files[0]);
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("filename", e.target.files[0].name);
      formData.append("additionalArgs", JSON.stringify({}));

      this.$http
        .post("/upload/ProjectIDDataFile", formData)
        .then((res) => {
          //  this.dialogVisible = true;
          console.log(res);
          if (res.data.res == "V") {
            this.excelData = res.data.projectIDList;
            // this.excelData = JSON.parse(JSON.stringify(this.allresult));
            this.excelData.forEach((item, index) => {
              item.id = index + 1;
              item.editShow = false;
            });
            console.log(this.excelData);

            this.$message({
              type: "success",
              message: "提交成功!",
            });
            // this.excelTable();
            // this.$nextTick(function() {

            this.allresultExcel = JSON.parse(JSON.stringify(this.excelData)); //不改变指向会导致无法编辑？ 原因未知
            // });
          } else {
            this.$message({
              type: "error",
              message: res.data.detail,
            });
          }
        })
        .catch((res) => {
          this.$message({
            type: "error",
            message: "提交失败!",
          });
        });
    },
    mergeTable() {
      this.dialogVisible = false;

      this.allresultExcel.forEach((item, index) => {
        if (this.xmhArr.includes(item.projectID)) {
          var index = this.xmhArr.indexOf(item.projectID);
          this.allresult[index] = item;
        } else {
          this.allresult.push(item);
        }
      });
      this.allresult.forEach((item, index) => {
        item.id = index + 1;
      });

      this.excelData = [];
      this.allresultExcel = [];
    },
    sortTable(obj) {
      console.log(obj);
      var { prop, order } = obj;
      function compare(p) {
        return function (m, n) {
          var a = m[p];
          var b = n[p];
          // console.log(a > b);
          return a > b;
        };
      }
      function compareMin(p) {
        return function (m, n) {
          var a = m[p];
          var b = n[p];
          // console.log(b > a);
          return b > a;
        };
      }

      if (obj.order == "ascending") {
        this.resultEqu.sort(compare(prop));
      } else if (obj.order == "descending") {
        this.resultEqu.sort(compareMin(prop));
      } else {
        this.resultEqu = this.allresultEqu.filter(
          (data) =>
            !this.searchValEqu ||
            // data.uid.toString().includes(this.searchValEqu.toLowerCase()) ||
            data.sn.toLowerCase().includes(this.searchValEqu.toLowerCase()) ||
            // data.currentUser
            //   .toLowerCase()
            //   .includes(this.searchValEqu.toLowerCase()) ||
            data.applyTime
              .toLowerCase()
              .includes(this.searchValEqu.toLowerCase()) ||
            data.applier.toLowerCase().includes(this.searchValEqu.toLowerCase())
        );
      }
    },
    sortTableDev(obj) {
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
        this.resultDev.sort(compare(prop));
      } else if (obj.order == "descending") {
        this.resultDev.sort(compareMin(prop));
      } else {
        this.resultDev = JSON.parse(JSON.stringify(this.allresultDev));
      }
    },
    submitDevice() {
      this.deviceForm.startTime = this.deviceDate[0];
      this.deviceForm.endTime = this.deviceDate[1];
      console.log(this.deviceForm);

      this.$refs.deviceFormName.validate((valid) => {
        if (valid) {
          this.$http
            .post("/admin/getDeviceLendingHistoryBySN", this.deviceForm)
            .then((res) => {
              if (res.data.res == "V") {
                console.log(res);
                this.allresultDev = res.data.data;
                this.allresultDev.forEach((item, index) => {
                  console.log((item.id = index + 1));
                });
                this.resultDev = JSON.parse(JSON.stringify(this.allresultDev));
              } else {
                this.$message({
                  type: "warning",
                  message: res.data.detail,
                });
              }
            })
            .catch((res) => {
              console.log(res);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    downloadTable() {
      this.$http
        .post(
          "/admin/projectNumberDataDemo",

          { responseType: "arraybuffer" }
        )
        .then((res) => {
          let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
          let objectUrl = URL.createObjectURL(blob); // 创建URL
          location.href = objectUrl;
          URL.revokeObjectURL(objectUrl); // 释放内存
          // console.log(res);

          // // if (res.data.res == "V") {
          // let url = window.URL.createObjectURL(new Blob([res.data]));
          // let link = document.createElement("a");
          // let fileName =
          //   this.allDeviceForm.time[0] + "~" + this.allDeviceForm.time[1];
          // var random = (Math.random() * 100000).toFixed(0);
          // link.style.display = "none";
          // link.href = url;
          // link.setAttribute("download", fileName + "%" + random + ".xlsx"); // 自定义下载文件名（如exemple.txt）
          // document.body.appendChild(link);
          // link.click();
          // // } else {
          // //   this.$message({
          // //     type: "warning",
          // //     message: res.data.detail
          // //   });
          // // }
        })
        .catch((res) => {
          console.log(res);
        });
    },

    downloadDevice() {
      this.$refs.allDeviceFormName.validate((valid) => {
        console.log(valid);
        console.log(this.allDeviceForm);
        if (valid) {
          this.$http
            .post(
              "/admin/downloadDeviceLendingHistoryBySN",
              {
                startTime: this.allDeviceForm.time[0],
                endTime: this.allDeviceForm.time[1],
              },
              {
                responseType: "blob", // 设置响应数据类型
              }
            )
            .then((res) => {
              console.log(res);

              // if (res.data.res == "V") {
              let url = window.URL.createObjectURL(new Blob([res.data]));
              let link = document.createElement("a");
              let fileName =
                this.allDeviceForm.time[0] + "~" + this.allDeviceForm.time[1];
              var random = (Math.random() * 100000).toFixed(0);
              link.style.display = "none";
              link.href = url;
              link.setAttribute("download", fileName + "%" + random + ".xlsx"); // 自定义下载文件名（如exemple.txt）
              document.body.appendChild(link);
              link.click();
              // } else {
              //   this.$message({
              //     type: "warning",
              //     message: res.data.detail
              //   });
              // }
            })
            .catch((res) => {
              console.log(res);
            });

          // var submit = document.querySelector("#downloadForm");
          // submit.submit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    approveEqu(row) {
      // /admin/updateDeviceBorrower
      // /admin/deleteApplyRequest

      this.$confirm("确定要通过此设备的借用吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
      })
        .then(() => {
          this.$http
            .post("/admin/updateDeviceBorrower", {
              sn: row.sn,
              borrower: row.applier,
              uid: row.uid,
            })
            .then((res) => {
              console.log(res);
              if (res.data.res == "V") {
                this.allresultEqu = res.data.data;

                this.$message({
                  type: "success",
                  message: "已通过借用",
                });
              } else {
                this.$message({
                  type: "error",
                  message: res.data.detail,
                });
              }
            })
            .catch((res) => {
              this.$message({
                type: "error",
                message: "请求失败",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作",
          });
        });
    },
    unApproveEqu(uid) {
      this.$confirm("确定要拒绝此设备的借用吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http
            .post("/admin/deleteApplyRequest", { uid: uid })
            .then((res) => {
              console.log(res);
              if (res.data.res == "V") {
                this.allresultEqu = res.data.data;

                this.$message({
                  type: "success",
                  message: "已拒绝借用",
                });
              } else {
                this.$message({
                  type: "error",
                  message: res.data.detail,
                });
              }
            })
            .catch((res) => {
              this.$message({
                type: "error",
                message: "请求失败",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作",
          });
        });
    },
  },
  watch: {
    // searchTableVal(val) {
    //   console.log(val);
    //   this.result = this.allresult.filter(
    //     data =>
    //       !val ||
    //       data.id.toString().includes(val.toLowerCase()) ||
    //       data.carType.toLowerCase().includes(val.toLowerCase()) ||
    //       data.PA.toLowerCase().includes(val.toLowerCase()) ||
    //       data.special.toLowerCase().includes(val.toLowerCase()) ||
    //       data.gearbox.toLowerCase().includes(val.toLowerCase()) ||
    //       data.projectID.toLowerCase().includes(val.toLowerCase())
    //   );
    // },

    // allresult(val) {
    //   console.log(val);
    //   this.result = val.filter(
    //     data =>
    //       !this.searchTableVal ||
    //       data.id.toString().includes(this.searchTableVal.toLowerCase()) ||
    //       data.carType
    //         .toLowerCase()
    //         .includes(this.searchTableVal.toLowerCase()) ||
    //       data.PA
    //         .toLowerCase()
    //         .includes(this.searchTableVal.toLowerCase()) ||
    //       data.special
    //         .toLowerCase()
    //         .includes(this.searchTableVal.toLowerCase()) ||
    //       data.gearbox
    //         .toLowerCase()
    //         .includes(this.searchTableVal.toLowerCase()) ||
    //       data.projectID
    //         .toLowerCase()
    //         .includes(this.searchTableVal.toLowerCase())
    //   );
    // }
    allresultEqu(val) {
      this.resultEqu = this.allresultEqu.filter(
        (data) =>
          !this.searchValEqu ||
          data.sn.toLowerCase().includes(this.searchValEqu.toLowerCase()) ||
          // data.deviceKeeper
          //   .toLowerCase()
          //   .includes(this.searchValEqu.toLowerCase()) ||
          // data.lockOwner
          //   .toLowerCase()
          //   .includes(this.searchValEqu.toLowerCase()) ||
          data.applyTime
            .toLowerCase()
            .includes(this.searchValEqu.toLowerCase()) ||
          data.applier.toLowerCase().includes(this.searchValEqu.toLowerCase())
      );
    },
    searchValEqu(val) {
      console.log(val);
      this.resultEqu = this.allresultEqu.filter(
        (data) =>
          !val ||
          data.sn.toLowerCase().includes(this.searchValEqu.toLowerCase()) ||
          // data.deviceKeeper
          //   .toLowerCase()
          //   .includes(this.searchValEqu.toLowerCase()) ||
          // data.lockOwner
          //   .toLowerCase()
          //   .includes(this.searchValEqu.toLowerCase()) ||
          data.applyTime
            .toLowerCase()
            .includes(this.searchValEqu.toLowerCase()) ||
          data.applier.toLowerCase().includes(this.searchValEqu.toLowerCase())
      );
    },
    // searchValDev(val) {
    //   console.log(val);
    //   this.resultDev = this.allresultDev.filter(
    //     data =>
    //       !val ||
    //       data.id.toString().includes(val.toLowerCase()) ||
    //       data.sn.toLowerCase().includes(val.toLowerCase()) ||
    //       data.borrower.toLowerCase().includes(val.toLowerCase()) ||
    //       data.updateTime.toLowerCase().includes(val.toLowerCase())
    //   );
    // }
  },
  components: {
    "my-tag": mytag,
    "my-protable": myprotable,
    "my-page": mypage,
  },
};
</script>

<style scoped>
.el-pagination {
  display: inline-block;
}
.admin .pointer {
  cursor: pointer;
}
.el-table_2_column_11 {
  border-left: 1px dashed #111;
}
.package{
  position:relative;padding-right:70px;
}
/* .admin /deep/ .el-dropdown .el-button {
  line-height: inherit;
} */
/* .el-tag {
  margin: 0.2em 0.4em;
}
i {
  cursor: pointer;

}
.packageDiv .el-input {
  display: inline-block;
  width: 200px;
}
  .package{
    
    border-bottom:1px dashed #ccc;
    padding:0.5em 0;
    min-height:32px;
  } */

/* .tb-edit .el-input {
    display: none
}
.tb-edit .current-row .el-input {
    display: block
}
.tb-edit .current-row .el-input+span {
    display: none
} */
</style>
