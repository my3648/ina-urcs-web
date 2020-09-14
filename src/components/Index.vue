<template>
  <div class="index">
    <h4>Index Condition</h4>

    <div style="margin-bottom:0.3em">
      <el-select
        clearable
        v-model="domains.projectNumber"
        filterable
        placeholder="project no."
      >
        <el-option
          v-for="item in projectNumberList"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-select
        clearable
        v-model="domains.carNumber"
        filterable
        placeholder="vehicle no."
      >
        <el-option
          v-for="item in carNumberList"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-select
        clearable
        v-model="domains.deviceNumber"
        filterable
        placeholder="device no."
      >
        <el-option
          v-for="item in deviceNumberList"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
    <div style="margin-bottom:0.3em">
      <el-select
        clearable
        v-model="domains.workPackage"
        filterable
        placeholder="package"
      >
        <el-option
          v-for="item in workPackageList"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-select
        clearable
        v-model="domains.testItem"
        filterable
        placeholder="test item"
      >
        <el-option
          v-for="item in testItemList"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
    <div
      class="block"
      style="margin-bottom:0.3em"
    >
      <el-date-picker
        v-model="dateValue"
        type="datetimerange"
        align="right"
        value-format="yyyy-MM-dd HH:mm:ss"
        :unlink-panels="true"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
    </div>
    <el-button
      type="primary"
      @click="clearData"
    >Clear</el-button>
    <el-button
      type="primary"
      @click="searchData"
    >Search</el-button>
    <el-divider></el-divider>

    <h4>Index Condition</h4>
    <el-button
      size="mini"
      type="primary"
      @click="downloadSelcted"
    >Batch Download</el-button>
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      row-key="fileName"
      @selection-change="handleSelectionChange"
      @sort-change="sortTable"
    >
      <!-- @selection-change="handleSelectionChange" -->
      <el-table-column
        type="selection"
        min-width="4.5%"
        :reserve-selection="true"
      >
        <template> </template>
      </el-table-column>
      <!-- <el-table-column label="日期" width="120">
              <template slot-scope="scope">
             
                {{ scope.row.date }}
                </template>
            </el-table-column> -->
      <el-table-column
        min-width="10%"
        sortable="custom"
        prop="no"
        label="no"
      >
        <!-- <template slot-scope="scope" >
          {{
            $refs.page.page.pageSize * ($refs.page.page.currentPage - 1) +
              scope.$index +
              1
          }}
        </template> -->
      </el-table-column>
      <el-table-column
        min-width="44%"
        sortable="custom"
        prop="fileName"
        label="filename"
      >
      </el-table-column>
      <!-- <el-table-column min-width="12%" prop="tags" label="tags"> </el-table-column> -->
      <el-table-column
        min-width="16%"
        sortable="custom"
        prop="createTime"
        label="time"
      >
      </el-table-column>
      <el-table-column
        min-width="8%"
        prop="fileSize"
        sortable="custom"
        label="size"
      >
        <!-- width="100" -->
      </el-table-column>
      <!-- <el-table-column prop="link" label="link">
                <template slot-scope="scope">
             <a href="scope.row.link">download</a>
               
                </template>
            </el-table-column> -->
      <el-table-column
        min-width="16%"
        align="right"
      >
        <template slot="header">
          <!-- slot-scope="scope" -->
          <el-input
            v-model="searchTableVal"
            size="mini"
            placeholder="请输入filename"
          />
        </template>
        <template slot-scope="scope">
          <a :href="scope.row.fileUrl">download</a>
          <!-- {{ scope.row.date }} -->
        </template>
      </el-table-column>
    </el-table>
    <my-page
      ref="page"
      :tableData.sync="tableData"
      :result="result"
    ></my-page>
    <!--  -->
  </div>
</template>

<script>
  import mypage from "./Page.vue";
  export default {
    data() {
      return {
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        dateValue: ["", ""],
        domains: {
          startTime: "",
          endTime: "",
          projectNumber: "",
          carNumber: "",
          workPackage: "",
          testItem: "",
          deviceNumber: ""
        },

        projectNumberList: [],
        carNumberList: [],
        deviceNumberList: [],
        workPackageList: [],
        testItemList: [],
        pickerOptions: {
          shortcuts: [
            {
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        },
        searchTableVal: "",
        tableData: [], //单页数据
        result: [], //总数据过滤后
        Allresult: [],
        loading: false
      };
    },
    mounted() {
      this.requestIndex();
    },
    methods: {
      async requestIndex() {
        const res = await this.$http.post(
          "http://dev-api-iot.uaes.com/uaes-intelligent-calibration/v1/wc/file/selectFilePrompt"
          // {
          //   user: this.username
          // }
        );
        console.log(res);
        const {
          projectNumberList,
          carNumberList,
          deviceNumberList,
          testItemList,
          workPackageList
        } = res.data.data;
        this.projectNumberList = projectNumberList.sort();
        this.carNumberList = carNumberList.sort();
        this.deviceNumberList = deviceNumberList.sort();
        this.workPackageList = workPackageList.sort();
        this.testItemList = testItemList.sort();
      },
      clearData() {
        for (var item in this.domains) {
          this.domains[item] = "";
        }
        this.dateValue = ["", ""];
        this.$refs.multipleTable.clearSelection();
        // this.selectedTableData=[]
        this.Allresult = [];
        this.result = [];
      },
      searchData() {
        this.domains.startTime = this.dateValue[0];
        this.domains.endTime = this.dateValue[1];
        console.log(this.domains);
        this.loading = true;
        this.$http
          .post(
            "http://dev-api-iot.uaes.com/uaes-intelligent-calibration/v1/wc/file/selectFile",
            { jsonParam: JSON.stringify(this.domains) },
            {
              transformRequest: [
                data => {
                  // data 就是你post请求传的值
                  // 一下主要是吧数据拼接成 类似get格式
                  let params = "";
                  for (var index in data) {
                    params += index + "=" + data[index] + "&";
                  }
                  return params;
                }
              ]
            }
          )
          .then(res => {
            console.log(res);
            const { data } = res.data;
            data.forEach((item, index) => {
              item.no = index + 1;
            });
            this.Allresult = data;

            this.result = JSON.parse(JSON.stringify(data)); //避免同指向  sort出错
            this.searchTableVal = "";
            this.selectedTableData = [];
            this.loading = false;
          })
          .catch(res => {
            this.loading = false;
          });
      },

      handleSelectionChange(val) {
        console.log(val);
        this.selectedTableData = val;

        // console.log(this.$refs.multipleTable);
      },
      sortTable(obj) {
        var { prop, order } = obj;
        console.log(order);
        console.log(prop);
        function compare(p) {
          if (p == "fileSize") {
               return function(m, n) {
              var a =  parseFloat(m[p]);
              var b = parseFloat(n[p]);
              // console.log(a , b);
              return a > b;
            };
          } else {
            return function(m, n) {
              var a = m[p];
              var b = n[p];
              // console.log(a > b);
              return a > b;
            };
          }
        }
        function compareMin(p) {
          if (p == "fileSize") {
               return function(m, n) {
              var a = parseFloat(m[p]);
              var b =parseFloat(n[p]);
              // console.log(b , a);
              return b > a;
            };
          } else {
            return function(m, n) {
              var a = m[p];
              var b = n[p];
              // console.log(b > a);
              return b > a;
            };
          }
        }

        if (obj.order == "ascending") {
          this.result.sort(compare(prop));
        } else if (obj.order == "descending") {
          this.result.sort(compareMin(prop));
        } else {
          this.result = this.Allresult.filter(
            data =>
              !this.searchTableVal ||
              data.fileName.toLowerCase().includes(val.toLowerCase()) ||
              data.createTime.toLowerCase().includes(val.toLowerCase())
          );
        }
      },
      downloadSelcted() {
        console.log(this.selectedTableData);
        this.selectedTableData.forEach((item, index) => {
          this.download(item.fileUrl);
        });
      },
      download(href) {
        //  console.log(href);
        // var a = document.createElement("a"), //创建a标签
        // e = document.createEvent("MouseEvents"); //创建鼠标事件对象
        // e.initEvent("click", false, false); //初始化事件对象
        // a.href = href; //设置下载地址
        // a.download = name; //设置下载文件名
        // a.dispatchEvent(e); //给指定的元素，执行事件click事件
        const iframe = document.createElement("iframe");
        iframe.style.display = "none"; // 防止影响页面
        iframe.style.height = 0; // 防止影响页面
        iframe.src = href;
        document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
        // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
        setTimeout(() => {
          iframe.remove();
        }, 5 * 60 * 1000);
      }
    },
    watch: {
      searchTableVal(val) {
        //search时修改页码总数
        // 不能直接给this.result赋值，会替换掉原来的数据 所以后面有result=this.result

        this.result = this.Allresult.filter(
          data =>
            !val ||
            data.fileName.toLowerCase().includes(val.toLowerCase()) ||
            data.createTime.toLowerCase().includes(val.toLowerCase())
        );
        // // console.log(this.$refs.page);
        // this.$refs.page.page.totalPage = searchResult.length;
        // console.log(this.$refs.page.page.totalPage);

        // console.log(searchResult);
        // this.$refs.page.nameCurrentChange(1, searchResult);
      }
    },
    components: {
      "my-page": mypage
    }
  };
</script>

<style scoped>
  .index {
    margin: 0 auto;
    width: 1100px;
  }
</style>
