<template>
  <div>
    <!-- {{allresult}}
  {{tableData}} -->
    <el-table :data="tableData" class="tb-edit" style="width: 100%" 
    
     @sort-change="sortTable"
      :row-class-name="tableRowClassName">
      <!-- highlight-current-row -->
      <!-- @row-click="handleCurrentChange" -->
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
      <el-table-column width="250" sortable="custom" prop="projectID" label="项目号">
        <template scope="scope">
          <el-input v-if="scope.row.editShow" v-focus="true" size="small"
            @keyup.enter.native="removeEdit(scope.$index, scope.row)" v-model="scope.row.projectID" placeholder="请输入内容">
          </el-input>
          <span v-if="!scope.row.editShow">{{ scope.row.projectID }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="PA" label="发动机 / PA">
        <template scope="scope">
          <el-input v-if="scope.row.editShow" size="small" @keyup.enter.native="removeEdit(scope.$index, scope.row)"
            v-model="scope.row.PA" placeholder="请输入内容"></el-input>
          <span v-if="!scope.row.editShow">{{ scope.row.PA }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="carType" label="车型">
        <template scope="scope">
          <el-input v-if="scope.row.editShow" size="small" @keyup.enter.native="removeEdit(scope.$index, scope.row)"
            v-model="scope.row.carType" placeholder="请输入内容"></el-input>
          <span v-if="!scope.row.editShow">{{ scope.row.carType }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="gearbox" label="变速箱">
        <template scope="scope">
          <el-input v-if="scope.row.editShow" size="small" @keyup.enter.native="removeEdit(scope.$index, scope.row)"
            v-model="scope.row.gearbox" placeholder="请输入内容"></el-input>
          <span v-if="!scope.row.editShow"> {{ scope.row.gearbox }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="special" label="特殊配置">
        <template scope="scope">
          <el-input v-if="scope.row.editShow" size="small" @keyup.enter.native="removeEdit(scope.$index, scope.row)"
            v-model="scope.row.special" placeholder="请输入内容"></el-input>
          <span v-if="!scope.row.editShow"> {{ scope.row.special }}</span>
        </template>
      </el-table-column>
      <el-table-column width="230" align="right">
        <template slot="header" slot-scope="scope">
          <!-- slot-scope="scope" 不加会出错？？原因未知 -->

          <el-input size="mini" v-model="searchTableVal" placeholder="搜索"></el-input>
        </template>
        <template slot-scope="scope">
          <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
          <el-button v-if="scope.row.editShow" size="small" @click.stop="removeEdit(scope.$index, scope.row)">确定
          </el-button>
          <el-button v-if="!scope.row.editShow" size="small" @click.stop="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button size="small" type="danger" @click.stop="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="small" @click.stop="handleAdd(scope.$index, scope.row)">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <my-page ref="page" :tableData.sync="tableData" :result="result"></my-page>
  </div>
</template>

<script>
import mypage from "./Page.vue";
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
      searchTableVal: "",
      // allresult:[],
      result: [],
      tableData: [],
      deviceForm:{
        sn:'',
        time:'',
      }
    };
  },
  props: { allresult: Array, warning: Boolean, xmhArr: Array },
  mounted() {
    // console.log(this.allresult);
  },
  computed: {
    // allresult(){
    //   console.log(this.allresult);
    // return this.allresult
    // }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (this.warning) {
          // console.log(this.xmhArr)
        if (this.xmhArr.includes(row.projectID)) {
        
          return "warning-row";
        } else {
          return "";
        }
      } else {
        return "";
      }

      //       if (rowIndex === 1) {
      //   return "warning-row";
      // } else if (rowIndex === 3) {
      //   return "success-row";
      // }
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
          // console.log(a > b);
          return a > b;
        };
      }
      function compareMin(p) {
        return function(m, n) {
          var a = m[p];
          var b = n[p];
          // console.log(b > a);
          return b > a;
        };
      }

      if (obj.order == "ascending") {
        this.result.sort(compare(prop));
      } else if (obj.order == "descending") {
        this.result.sort(compareMin(prop));
      } else {
        this.result = this.allresult.filter(
          data =>
            !this.searchTableVal ||
            data.id.toString().includes(this.searchTableVal.toLowerCase()) ||
            data.carType
              .toLowerCase()
              .includes(this.searchTableVal.toLowerCase()) ||
            data.special.toLowerCase().includes(this.searchTableVal.toLowerCase()) ||
            data.PA.toLowerCase().includes(this.searchTableVal.toLowerCase()) ||
            data.gearbox
              .toLowerCase()
              .includes(this.searchTableVal.toLowerCase()) ||
            data.projectID
              .toLowerCase()
              .includes(this.searchTableVal.toLowerCase())
        );
      }
    },
    //   handleCurrentChange(row, event, column) {
    //   console.log(
    //     "row",
    //     row,
    //     "event",
    //     event,
    //     "column",
    //     column,
    //     event.currentTarget
    //   );
    // },
    handleEdit(index, row) {
      var page=this.$refs.page.page.currentPage
      var pageSize=this.$refs.page.page.pageSize
      console.log(page,pageSize);
      var reIndex=(page-1)*pageSize+index
   
     
      // var reIndex = row.id - 1;
      console.log(reIndex);
      this.$set(this.result[reIndex],"editShow",true)
      // this.result[reIndex]["editShow"] = true;
      console.log(this.result);

      // var page=this.$refs.page.page.currentPage
      // var pageSize=this.$refs.page.page.pageSize
      // console.log(page,pageSize);
      // var reIndex=(page-1)*pageSize+index
      //  this.result[reIndex]["editShow"] = true;


    },
    handleDelete(index, row) {
      // var page=this.$refs.page.page.currentPage
      // var pageSize=this.$refs.page.page.pageSize
      // console.log(page,pageSize);
      // var reIndex=(page-1)*pageSize+index
            var reIndex = row.id - 1;


      this.allresult.splice(reIndex, 1);
      this.allresult.forEach((item, index) => {
        item.id = index + 1;
      });
    },
    removeEdit(index, row) {
      var page=this.$refs.page.page.currentPage
      var pageSize=this.$refs.page.page.pageSize
      console.log(page,pageSize);
      var reIndex=(page-1)*pageSize+index

            this.$set(this.result[reIndex],"editShow",false)

    },
    handleAdd(index, row) {
      // // this.searchTableVal=''
      // console.log(index, row);
      // var reIndex = row.id - 1;
      // var page=this.$refs.page.page.currentPage
      // var pageSize=this.$refs.page.page.pageSize
      // console.log(page,pageSize);
      // var reIndex=(page-1)*pageSize+index
                  var reIndex = row.id - 1;



      this.allresult.splice(reIndex + 1, 0, {
        id: row.id+1,
        carType: "carType",
        special: "special",
        PA: "PA",
        gearbox: "gearbox",
        projectID: "projectID",
        editShow: true
      });
      this.allresult.forEach((item, index) => {
        item.id = index + 1;
      });
      
      // this.handleEdit(reIndex, { id: reIndex + 2 });
      console.log(this.allresult.length);
    }
  },
  watch: {
    searchTableVal(val) {
      console.log(val);
      this.result = this.allresult.filter(
        data =>
          !val ||
          data.id.toString().includes(val.toLowerCase()) ||
          data.carType.toLowerCase().includes(val.toLowerCase()) ||
          data.special.toLowerCase().includes(val.toLowerCase()) ||
          data.PA.toLowerCase().includes(val.toLowerCase()) ||
          data.gearbox.toLowerCase().includes(val.toLowerCase()) ||
          data.projectID.toLowerCase().includes(val.toLowerCase())
      );
    },
    allresult(val) {
      console.log(val);
      this.result = val.filter(
        data =>
          !this.searchTableVal ||
          data.id.toString().includes(this.searchTableVal.toLowerCase()) ||
          data.carType
            .toLowerCase()
            .includes(this.searchTableVal.toLowerCase()) ||
          data.PA.toLowerCase().includes(this.searchTableVal.toLowerCase()) ||
          data.special.toLowerCase().includes(this.searchTableVal.toLowerCase()) ||
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
    "my-page": mypage
  }
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}
</style>
