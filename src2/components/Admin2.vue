<template>
  <div style="margin:0 auto;width:1100px;">
    <div>
      <h3>项目池:</h3>
      <!-- <el-input size="mini" width='120' v-model="searchTableVal"></el-input> -->
      <el-table
        :data="tableData"
        class="tb-edit"
        style="width: 100%"
        highlight-current-row
        @row-click="handleCurrentChange"
        @sort-change="sortTable"
      >
        <el-table-column sortable="custom" prop="id" label="序号">
          <template scope="scope">
            <!-- <el-input
            v-if="scope.row.editShow"
            v-focus="true"
            size="small"
            @keyup.enter.native="removeEdit(scope.$index, scope.row)"
            v-model="scope.row.id"
            placeholder="请输入内容"
          ></el-input> -->
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable="custom" prop="projectID" label="项目号">
          <template scope="scope">
            <el-input
              v-if="scope.row.editShow"
              v-focus="true"
              size="small"
              @keyup.enter.native="removeEdit(scope.$index, scope.row)"
              v-model="scope.row.projectID"
              placeholder="请输入内容"
            ></el-input>
            <span v-if="!scope.row.editShow">{{ scope.row.projectID }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable="custom" prop="engineer" label="发动机">
          <template scope="scope">
            <el-input
              v-if="scope.row.editShow"
              size="small"
              @keyup.enter.native="removeEdit(scope.$index, scope.row)"
              v-model="scope.row.engineer"
              placeholder="请输入内容"
            ></el-input>
            <span v-if="!scope.row.editShow">{{ scope.row.engineer }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable="custom" prop="carType" label="车型">
          <template scope="scope">
            <el-input
              v-if="scope.row.editShow"
              size="small"
              @keyup.enter.native="removeEdit(scope.$index, scope.row)"
              v-model="scope.row.carType"
              placeholder="请输入内容"
            ></el-input>
            <span v-if="!scope.row.editShow">{{ scope.row.carType }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable="custom" prop="gearbox" label="变速箱">
          <template scope="scope">
            <el-input
              v-if="scope.row.editShow"
              size="small"
              @keyup.enter.native="removeEdit(scope.$index, scope.row)"
              v-model="scope.row.gearbox"
              placeholder="请输入内容"
            ></el-input>
            <span v-if="!scope.row.editShow"> {{ scope.row.gearbox }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable="custom" prop="special" label="特殊配置">
          <template scope="scope">
            <el-input
              v-if="scope.row.editShow"
              size="small"
              @keyup.enter.native="removeEdit(scope.$index, scope.row)"
              v-model="scope.row.special"
              placeholder="请输入内容"
            ></el-input>
            <span v-if="!scope.row.editShow"> {{ scope.row.special }}</span>
          </template>
        </el-table-column>
        <el-table-column width="230" align="right">
          <template slot="header" slot-scope="scope">
            <!-- slot-scope="scope" 不加会出错？？原因未知 -->

            <el-input
              size="mini"
              v-model="searchTableVal"
              placeholder="搜索"
            ></el-input>
          </template>
          <template slot-scope="scope">
            <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
            <el-button
              v-if="scope.row.editShow"
              size="small"
              @click.stop="removeEdit(scope.$index, scope.row)"
              >确定</el-button
            >
            <el-button
              v-if="!scope.row.editShow"
              size="small"
              @click.stop="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click.stop="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              size="small"
              @click.stop="handleAdd(scope.$index, scope.row)"
              >添加</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <my-page
        ref="page"
        :tableData.sync="tableData"
        :result="result"
      ></my-page>
      <el-button
        @click="excelTable()"
        style="float:right"
        type="primary"
        size="small"
        >打开EXCEL表格</el-button
      >
      <el-button
        @click="sumitTable()"
        style="float:right"
        type="primary"
        size="small"
        >提交更改</el-button
      >
    </div>
    <div class="packageDiv">
      <el-divider></el-divider>
      <h3>Package标签</h3>
      <div class="package" v-for="(item, pindex) in package" :key="pindex">
        <!-- <span style="font-weight:600">&nbsp;&nbsp;{{item.groupName}}:</span> -->
        <!-- <el-input placeholder="请输入标签分组名"   v-focus="true"  v-if="editPackage" v-model="input"
      size="mini"></el-input> -->

        <div
          v-for="(tag, index) in item.packageItems"
          :key="index"
          style="display:inline-block"
        >
          <!-- v-if="!editPackage[pindex][index]" -->

          <my-tag
            :ref="'pactag_' + pindex"
            @delete="deletePackage(pindex, index)"
            :tag.sync="package[pindex]['packageItems'][index]"
            :name.sync="package[pindex]['groupName']"
            :index="index"
            :tagDict="tagDict"
            style="display:inline-block"
          ></my-tag>
          <!-- 可能是因为input值是双向绑定的 tagDict[input]自动会改变 无需再双向绑定tagDict的值 -->
        </div>
        <i class="el-icon-plus" @click="addPackage(pindex)"></i>
        <div style="float:right">
          <i
            @click="minPackageRow(pindex)"
            style="font-size:32px;line-height:37px;"
            class="el-icon-remove-outline"
          ></i>
          <i
            @click="addPackageRow(pindex)"
            style="font-size:32px;line-height:37px;"
            class="el-icon-circle-plus-outline"
          ></i>
        </div>

        <!-- <div style="border-bottom:1px dashed #ccc;margin:0.5em 0"></div> -->
      </div>
    </div>
    <div class="packageDiv">
      <el-divider></el-divider>
      <h3>Task标签</h3>
      <div class="package" v-for="(item, pindex) in task" :key="pindex">
        <div
          v-for="(tag, index) in item.taskItems"
          :key="index"
          style="display:inline-block"
        >
          <!-- v-if="!editPackage[pindex][index]" -->
          <my-tag
            :ref="'tasktag_' + pindex"
            @delete="deleteTask(pindex, index)"
            :tag.sync="task[pindex]['taskItems'][index]"
            :name.sync="task[pindex]['groupName']"
            :index="index"
            style="display:inline-block"
          ></my-tag>
          <!-- <el-tag @click="showEditPackage(pindex, index)" closable type="">
            {{ tag }}
          </el-tag> -->
          <!-- v-if="editPackage[pindex][index]" -->
          <!-- <el-input v-model="package[pindex][index]" size="mini"></el-input> -->
        </div>
        <i class="el-icon-plus" @click="addTask(pindex)"></i>
        <div style="float:right">
          <i
            @click="minTaskRow(pindex)"
            style="font-size:32px;line-height:37px;"
            class="el-icon-remove-outline"
          ></i>
          <i
            @click="addTaskRow(pindex)"
            style="font-size:32px;line-height:37px;"
            class="el-icon-circle-plus-outline"
          ></i>
        </div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible">
      <el-table
        :data="tableData"
        class="tb-edit"
        style="width: 100%"
        @sort-change="sortTable"
      >
        <el-table-column sortable="custom" prop="id" label="序号">
          <template scope="scope">
            <!-- <el-input
            v-if="scope.row.editShow"
            v-focus="true"
            size="small"
            @keyup.enter.native="removeEdit(scope.$index, scope.row)"
            v-model="scope.row.id"
            placeholder="请输入内容"
          ></el-input> -->
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable="custom" prop="projectID" label="项目号">
          <template scope="scope">
            <el-input
              v-if="scope.row.editShow"
              v-focus="true"
              size="small"
              @keyup.enter.native="removeEdit(scope.$index, scope.row)"
              v-model="scope.row.projectID"
              placeholder="请输入内容"
            ></el-input>
            <span v-if="!scope.row.editShow">{{ scope.row.projectID }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable="custom" prop="engineer" label="发动机">
          <template scope="scope">
            <el-input
              v-if="scope.row.editShow"
              size="small"
              @keyup.enter.native="removeEdit(scope.$index, scope.row)"
              v-model="scope.row.engineer"
              placeholder="请输入内容"
            ></el-input>
            <span v-if="!scope.row.editShow">{{ scope.row.engineer }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable="custom" prop="carType" label="车型">
          <template scope="scope">
            <el-input
              v-if="scope.row.editShow"
              size="small"
              @keyup.enter.native="removeEdit(scope.$index, scope.row)"
              v-model="scope.row.carType"
              placeholder="请输入内容"
            ></el-input>
            <span v-if="!scope.row.editShow">{{ scope.row.carType }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable="custom" prop="gearbox" label="变速箱">
          <template scope="scope">
            <el-input
              v-if="scope.row.editShow"
              size="small"
              @keyup.enter.native="removeEdit(scope.$index, scope.row)"
              v-model="scope.row.gearbox"
              placeholder="请输入内容"
            ></el-input>
            <span v-if="!scope.row.editShow"> {{ scope.row.gearbox }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable="custom" prop="special" label="特殊配置">
          <template scope="scope">
            <el-input
              v-if="scope.row.editShow"
              size="small"
              @keyup.enter.native="removeEdit(scope.$index, scope.row)"
              v-model="scope.row.special"
              placeholder="请输入内容"
            ></el-input>
            <span v-if="!scope.row.editShow"> {{ scope.row.special }}</span>
          </template>
        </el-table-column>
        <el-table-column width="230" align="right">
          <template slot="header" slot-scope="scope">
            <!-- slot-scope="scope" 不加会出错？？原因未知 -->

            <el-input
              size="mini"
              v-model="searchTableVal"
              placeholder="搜索"
            ></el-input>
          </template>
          <template slot-scope="scope">
            <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
            <el-button
              v-if="scope.row.editShow"
              size="small"
              @click.stop="removeEdit(scope.$index, scope.row)"
              >确定</el-button
            >
            <el-button
              v-if="!scope.row.editShow"
              size="small"
              @click.stop="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click.stop="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              size="small"
              @click.stop="handleAdd(scope.$index, scope.row)"
              >添加</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mypage from "./Page.vue";
import mytag from "./Tag.vue";
export default {
  directives: {
    focus: {
      inserted: function(el, { value }) {
        if (value) {
          console.log(value);
          el.children[0].focus();
        }
      }
    }
  },
  data() {
    return {
      tableData: [], //单页数据
      result: [], //总数据过滤后
      Allresult: [],
      searchTableVal: "",
      package: [],
      task: [],
      tagDict: {},
      dialogVisible: false
      // editPackage:[]
    };
  },
  computed: {
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
    // var formData=new formData()
    // this.$http
    //   .post("/login", {
    //     username: "admin",
    //     password: "admin"
    //   })
    //   .then(res => {
    //     console.log(res);

    //     var { res, group, token } = res.data;
    //     if (res == "V") {
    //       localStorage.setItem("token", token);
    //       localStorage.setItem("group", group);
    //       localStorage.setItem("username", "admin");
    //     } else {
    //       alert("登录失败");
    //     }
    //   }).catch(res=>{
    //     alert('登录错误')
    //   });
    this.$http.post("/certStatus").then(res => {
      console.log(res);
      var { projectNumberData, Package, Task, tagDict } = res.data;
      // this.package = Package;
      console.log(JSON.stringify(this.package));
      // console.log(JSON.stringify(tagDict));
      this.tagDict = tagDict;
      this.tagDict = {
        package1: "中文1",
        package2: "中文2",
        package3: "中文3",
        package4: "中文4"
      };
      this.task = [
        ["cold start -10C", "cold start 0C"],
        ["0m", "4000m", "4700m"],
        ["Shanghai", "baoding"],
        ["ok test", "fault simulation", "road", "emission", "roller"],
        ["basic check", "signal check", "calibration", "validation check"],
        ["hot start 1", "hot start 3", "OSC", "tipin and out"]
      ];
      this.package = [
        ["发动机台架基本匹配", "基本匹配油路控制", "充气模型&扭矩模型"],
        ["台架爆震和早燃识别与控制", "车辆爆震和早燃控制(动态和诊断)"],

        ["冷起动匹配<15度", "发动机位置管理匹配"],
        ["前级氧传感器闭环控制", "氧传感器加热控制(常温)", "炭罐冲洗控制"],

        ["新鲜催化器常温排放优化(20℃)", "老化催化器常温排放优化"],
        ["怠速控制(静态和动态)", "巡航控制", "驾驶性"],

        ["诊断:驱动级诊断", "诊断:故障路径管理"],
        ["诊断:失火检测(基础标定)", "诊断:综合性零部件诊断"],

        ["诊断:氧传感器诊断", "诊断:催化器监测"],
        ["诊断:发动机冷却系统", "诊断:OBD 演示"],

        ["常规夏季试验", "常规冬季试验"]
      ];
      this.package = [
        {
          groupName: "groupnam1",
          packageItems: ["package1", "package2"]
        },
        {
          groupName: "groupnam2",
          packageItems: ["package3", "package4"]
        }
      ];
      this.task = [
        {
          groupName: "groupnam1",
          taskItems: ["task1", "task2"]
        },
        {
          groupName: "groupnam2",
          taskItems: ["task3", "task4"]
        }
      ];
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

      var data = [
        {
          id: 1,
          carType: "H2",
          engineer: "4G15F",
          special: "NOTHING",
          gearbox: "df",
          projectID: "CH071",
          editShow: false
        },
        {
          id: 2,
          carType: "H2",
          engineer: "4G15F",
          special: "NOTHING",
          gearbox: "df",
          projectID: "CH072",
          editShow: false
        },
        {
          id: 3,
          carType: "H2",
          engineer: "4G15F",
          special: "NOTHING",
          gearbox: "df",
          projectID: "CH073",
          editShow: false
        },
        {
          id: 4,
          carType: "H2",
          engineer: "4G15F",
          special: "NOTHING",
          gearbox: "df",
          projectID: "CH074",
          editShow: false
        },
        {
          id: 5,
          carType: "H2",
          engineer: "4G15F",
          special: "NOTHING",
          gearbox: "df",
          projectID: "CH075",
          editShow: false
        },
        {
          id: 6,
          carType: "H2",
          engineer: "4G15F",
          special: "NOTHING",
          gearbox: "df",
          projectID: "CH076",
          editShow: false
        },
        {
          id: 7,
          carType: "H2",
          engineer: "4G15F",
          special: "NOTHING",
          gearbox: "df",
          projectID: "CH077",
          editShow: false
        },
        {
          id: 8,
          carType: "H2",
          engineer: "4G15F",
          special: "NOTHING",
          gearbox: "df",
          projectID: "CH078",
          editShow: false
        },
        {
          id: 9,
          carType: "H2",
          engineer: "4G15F",
          special: "NOTHING",
          gearbox: "df",
          projectID: "CH079",
          editShow: false
        },
        {
          id: 10,
          carType: "H2",
          engineer: "4G15F",
          special: "NOTHING",
          gearbox: "df",
          projectID: "CH080",
          editShow: false
        },
        {
          id: 11,
          carType: "H2",
          engineer: "4G15F",
          special: "NOTHING",
          gearbox: "df",
          projectID: "CH081",
          editShow: false
        }
      ];
      data.forEach((item, index) => {
        item.id = index + 1;
      });
      this.Allresult = data;

      // this.result = JSON.parse(JSON.stringify(data)); //避免同指向  sort出错
    });
  },
  methods: {
    dfdf() {
      console.log(this.editPackage);
    },
    handleCurrentChange(row, event, column) {
      console.log(
        "row",
        row,
        "event",
        event,
        "column",
        column,
        event.currentTarget
      );
    },
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
      var reIndex = row.id - 1;
      this.Allresult[reIndex]["editShow"] = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
      var reIndex = row.id - 1;

      this.Allresult.splice(reIndex, 1);
      this.Allresult.forEach((item, index) => {
        item.id = index + 1;
      });
    },
    removeEdit(index, row) {
      console.log(index);
      var reIndex = row.id - 1;

      this.Allresult[reIndex]["editShow"] = false;
    },
    handleAdd(index, row) {
      console.log(index, row);
      var reIndex = row.id - 1;

      this.Allresult.splice(reIndex + 1, 0, {
        id: 13,
        carType: "sdf",
        engineer: "sdf",
        special: "sdf",
        gearbox: "sdf",
        projectID: "sdf",
        editShow: false
      });
      this.Allresult.forEach((item, index) => {
        item.id = index + 1;
      });
      this.handleEdit(reIndex + 1, { id: reIndex + 2 });
    },
    sumitTable() {
      console.log(this.tagDict);
      // 提交更改时提交清空搜索框来还原result, result和tableData已同步，AllResult没有
      this.searchTableVal = "";
      console.log(this.result);
      this.$confirm("确定要提交项目号吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // type: 'warning'
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "提交成功!"
          });
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '取消提交'
          // });
        });
    },
    sortTable(obj) {
      console.log(obj);
      var { prop, order } = obj;
      console.log(order);
      console.log(prop);
      function compare(p) {
        return function(m, n) {
          var a = m[p];
          var b = n[p];
          console.log(a > b);
          return a > b;
        };
      }
      function compareMin(p) {
        return function(m, n) {
          var a = m[p];
          var b = n[p];
          console.log(b > a);
          return b > a;
        };
      }

      if (obj.order == "ascending") {
        this.result.sort(compare(prop));
      } else if (obj.order == "descending") {
        this.result.sort(compareMin(prop));
      } else {
        this.result = this.Allresult.filter(
          data =>
            !this.searchTableVal ||
            data.id.toString().includes(this.searchTableVal.toLowerCase()) ||
            data.carType
              .toLowerCase()
              .includes(this.searchTableVal.toLowerCase()) ||
            data.engineer
              .toLowerCase()
              .includes(this.searchTableVal.toLowerCase()) ||
            data.special
              .toLowerCase()
              .includes(this.searchTableVal.toLowerCase()) ||
            data.gearbox
              .toLowerCase()
              .includes(this.searchTableVal.toLowerCase()) ||
            data.projectID
              .toLowerCase()
              .includes(this.searchTableVal.toLowerCase())
        );
      }
    },
    addPackage(pindex) {
      console.log(this.package);
      this.package[pindex].packageItems.push("");
      // this.$nextTick相当于定时器或者promise 等dom操作全部结束时再执行操作
      this.$nextTick(function() {
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
        packageItems: [""]
      });
    },

    deletePackage(pindex, index) {
      this.package[pindex].packageItems.splice(index, 1);
    },
    addTask(pindex) {
      this.task[pindex].taskItems.push("");
      // this.$nextTick相当于定时器或者promise 等dom操作全部结束时再执行操作
      this.$nextTick(function() {
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
        taskItems: [""]
      });
      console.log(this.task);
    },
    excelTable() {
      this.dialogVisible = true;
    }
  },
  watch: {
    searchTableVal(val) {
      console.log(val);
      this.result = this.Allresult.filter(
        data =>
          !val ||
          data.id.toString().includes(val.toLowerCase()) ||
          data.carType.toLowerCase().includes(val.toLowerCase()) ||
          data.engineer.toLowerCase().includes(val.toLowerCase()) ||
          data.special.toLowerCase().includes(val.toLowerCase()) ||
          data.gearbox.toLowerCase().includes(val.toLowerCase()) ||
          data.projectID.toLowerCase().includes(val.toLowerCase())
      );
    },
    Allresult(val) {
      console.log(val);
      this.result = val.filter(
        data =>
          !this.searchTableVal ||
          data.id.toString().includes(this.searchTableVal.toLowerCase()) ||
          data.carType
            .toLowerCase()
            .includes(this.searchTableVal.toLowerCase()) ||
          data.engineer
            .toLowerCase()
            .includes(this.searchTableVal.toLowerCase()) ||
          data.special
            .toLowerCase()
            .includes(this.searchTableVal.toLowerCase()) ||
          data.gearbox
            .toLowerCase()
            .includes(this.searchTableVal.toLowerCase()) ||
          data.projectID
            .toLowerCase()
            .includes(this.searchTableVal.toLowerCase())
      );
    }
  },
  components: {
    "my-page": mypage,
    "my-tag": mytag
  }
};
</script>

<style>
.el-pagination {
  display: inline-block;
}
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
