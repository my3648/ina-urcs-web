<template>
  <div>

    <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
      style="width: 100%;">
     
      <div class="el-table__body-wrapper is-scrolling-none">
        <table class="el-table__body" style="width: 100%;" cellspacing="0" cellpadding="0" border="0">
          <colgroup>
            <col name="el-table_3_column_7" width="160">
            <col name="el-table_3_column_8">
            <col name="el-table_3_column_9">
          </colgroup>
          <tbody>
            <tr class="el-table__row">
              <td rowspan="1" colspan="1">
                <div class="cell label require">项目类型</div>
              </td>
              <td rowspan="1" colspan="6">
                <div class="cell">
                  <el-radio-group v-model="radio">
                    <el-radio label="A">B1</el-radio>
                    <el-radio label="B">B2-B4</el-radio>
                    <el-radio label="C">B5或C或其它</el-radio>
                  </el-radio-group>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td rowspan="1" colspan="1">
                <div class="cell label require">实验室</div>
              </td>
              <td rowspan="1" colspan="6">
                <div class="cell">
                  <el-checkbox-group v-model="checkbox1">
                    <el-checkbox label="A">联电上海低温室</el-checkbox>
                    <el-checkbox label="B">联电黑河实验室</el-checkbox>
                    <el-checkbox label="C">客户实验室</el-checkbox>
                    <el-checkbox label="D">联电上海常温室/地面车位</el-checkbox>
                    <el-checkbox label="E">重庆分公司低温室</el-checkbox>
                    <el-checkbox label="F">芜湖分公司低温室</el-checkbox>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td rowspan="1" colspan="1">
                <div class="cell label">特殊功能</div>
              </td>
              <td rowspan="1" colspan="6">
                <div class="cell">
                  <el-checkbox-group v-model="checkbox2">
                    <el-checkbox label="A">具有下线预泵油功能且打开</el-checkbox>
                    <el-checkbox label="B">PreDrive预泵油功能</el-checkbox>

                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td rowspan="1" colspan="1">
                <div class="cell label">验证信息</div>
              </td>
              <td rowspan="1" colspan="6">
                <div class="cell">
                  <el-checkbox-group v-model="checkbox3">
                    <el-checkbox label="A">已完成道路实验</el-checkbox>
                    <el-checkbox label="B">已完成客户耐久实验</el-checkbox>

                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td rowspan="4" colspan="1">
                <div class="cell label">项目信息</div>
              </td>
              <td rowspan="1" colspan="6">
                <div class="cell">
                  <el-checkbox-group v-model="checkbox4">
                    <el-checkbox label="A">有双质量飞轮</el-checkbox>
                    <el-checkbox label="B">起停飞轮</el-checkbox>
                    <el-checkbox label="C">混动点机起动</el-checkbox>
                    <el-checkbox label="D">下线起动控制</el-checkbox>
                    <el-checkbox label="E">GDI项目</el-checkbox>
                    <el-checkbox label="F">起动机由ECU控制</el-checkbox>
                    <el-checkbox label="G">通过电压降判断起动过程</el-checkbox>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">

              <td rowspan="1" colspan="1">
                <div class="label cell">
                  报告号
                </div>
              </td>
              <td rowspan="1" colspan="1">
                <div class="cell">
                  <el-input v-model="FA4Table.FA4_1"></el-input>

                </div>
              </td>
              <td rowspan="1" colspan="1">
                <div class="label cell">
                  机油型号
                </div>
              </td>
              <td rowspan="1" colspan="1">
                <div class="cell">
                  <el-input v-model="FA4Table.FA4_2"></el-input>

                </div>
              </td>
              <td rowspan="1" colspan="1">
                <div class="label cell">
                  汽油号
                </div>
              </td>
              <td rowspan="1" colspan="1">
                <div class="cell">
                  <el-input v-model="FA4Table.FA4_3"></el-input>

                </div>
              </td>
            </tr>
            <tr class="el-table__row">

              <td rowspan="1" colspan="1">
                <div class="label cell">
                  火花塞型号
                </div>
              </td>
              <td rowspan="1" colspan="1">
                <div class="cell">
                  <el-input v-model="FA4Table.FA4_4"></el-input>

                </div>
              </td>
              <td rowspan="1" colspan="1">
                <div class="label cell">
                  蓄电池型号
                </div>
              </td>
              <td rowspan="1" colspan="1">
                <div class="cell">
                  <el-input v-model="FA4Table.FA4_5"></el-input>

                </div>
              </td>
              <td rowspan="1" colspan="1">
                <div class="label cell">
                  起动机型号
                </div>
              </td>
              <td rowspan="1" colspan="1">
                <div class="cell">
                  <el-input v-model="FA4Table.FA4_6"></el-input>

                </div>
              </td>
            </tr>
            <tr class="el-table__row">

              <td rowspan="1" colspan="1">
                <div class="label cell">
                  匹配数据
                </div>
              </td>
              <td rowspan="1" colspan="1">
                <div class="cell">
                  <el-input v-model="FA4Table.FA4_7"></el-input>

                </div>
              </td>
              <td rowspan="1" colspan="1">
                <div class="label cell">
                  燃油泵型号
                </div>
              </td>
              <td rowspan="1" colspan="1">
                <div class="cell">
                  <el-input v-model="FA4Table.FA4_8"></el-input>

                </div>
              </td>
              <td rowspan="1" colspan="2">

              </td>
            </tr>
            <tr class="el-table__row">
              <td rowspan="1" colspan="1">
                <div class="cell label">报告存放路径：</div>
              </td>
              <td rowspan="1" colspan="6">
                <div class="cell">
                  <el-input v-model="FA4Table.FA4_16"></el-input>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td rowspan="1" colspan="1">
                <div class="cell label require">DCM文件路径：</div>
              </td>
              <td rowspan="1" colspan="6">
                <div class="cell">
                  <el-input v-model="FA4Table.FA4_17"></el-input>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td rowspan="1" colspan="1">
                <div class="cell label">非FA4 DCM路径：</div>
              </td>
              <td rowspan="1" colspan="6">
                <div class="cell">
                  <el-input v-model="FA4Table.FA4_18"></el-input>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td rowspan="1" colspan="1">
                <div class="cell label require">dat文件存放路径：</div>
              </td>
              <td rowspan="1" colspan="6">
                <div class="cell">
                  <el-input v-model="FA4Table.FA4_20"></el-input>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      <div class="el-table__column-resize-proxy" style="display: none;"></div>
    </div>
    <input type="hidden" name="FA4Type" v-model="radio">
    <!-- 理论上说不需再转换，需修改 -->
    <input type="hidden" name="FA4Laboratory" v-model="JSON.stringify(checkbox1)">
    <input type="hidden" name="FA4Tem" v-model="JSON.stringify(checkbox2)">
    <input type="hidden" name="FA4Ver" v-model="JSON.stringify(checkbox3)">
    <input type="hidden" name="FA4Infor" v-model="JSON.stringify(checkbox4)">
    <input type="hidden" name="FA4Table" v-model="FA4TableString">
    <input type="hidden" name="OPLInfo" v-model="OPLInfo">
    <h4>OPL信息</h4>
    <el-table :data="OPLTable" border style="width: 100%;margin-top:1em">
      <el-table-column prop="a" label="问题">
        <template slot-scope="scope">
          <el-input v-model="scope.row.a"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="b" label="措施">
        <template slot-scope="scope">
          <el-input v-model="scope.row.b"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="c" label="负责人">
        <template slot-scope="scope">
          <el-input v-model="scope.row.c"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="d" label="计划完成日期">
        <template slot-scope="scope">
          <el-input v-model="scope.row.d"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="e" label="实际完成日期">
        <template slot-scope="scope">
          <el-input v-model="scope.row.e"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="f" label="实施与结果简述">
        <template slot-scope="scope">
          <el-input v-model="scope.row.f"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="g" label="当前状态">
        <template slot-scope="scope">
          <el-input v-model="scope.row.g"></el-input>
        </template>
      </el-table-column>

    </el-table>
    <div style="text-align: right;margin:0.6em 0">
      <i class="el-icon-minus" @click="minusOPL"></i>
      <i class="el-icon-plus" @click="plusOPL"></i>

    </div>

    <el-button type="primary" @click="submit" style="width:90px;margin-left:1em;float:right">提交</el-button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "A",
      checkbox1: [],
      checkbox2: [],
      checkbox3: [],
      checkbox4: [],
      FA4Table: {
        FA4_1: "",
        FA4_2: "",
        FA4_3: "",
        FA4_4: "",
        FA4_5: "",
        FA4_6: "",
        FA4_7: "",
        FA4_8: "",
        FA4_16: "",
        FA4_17: "",
        FA4_18: "",
        FA4_20: "",
      },
      OPLTable: [{ a: "", b: "", c: "", d: "", e: "", f: "", g: "" }],
      // tableData:[{
      //   col0:'项目类型',
      //   col1:{'B1':'A','B2-B4':'B','B5或C或其它':'C'},
      // },
      // {
      //   col0:'实验室',
      //   col1:{'B1':'A','B2-B4':'B','B5或C或其它':'C'},
      // },
      // {
      //   col0:'项目信息',
      //   col1:'报告号',
      // },
      // ]
    };
  },
  methods: {
    submit() {
      if (
        this.checkbox1.length == 0 ||
        !this.FA4Table.FA4_17 ||
        !this.FA4Table.FA4_20
      ) {
        this.$message({
          message: "必填项请填写完整",
          type: "warning",
        });
        return
      }
      this.$nextTick(() => {
        this.$emit("submit");
      });
    },
    plusOPL() {
      this.OPLTable.push({ a: "", b: "", c: "", d: "", e: "", f: "", g: "" });
    },
    minusOPL() {
      if (this.OPLTable.length > 1) {
        this.OPLTable.pop();
      }
    },

    // arraySpanMethod({ row, column, rowIndex, columnIndex }){
    //   if(columnIndex)
    // }
  },
  computed: {
    OPLInfo() {
      var arr = [];
      this.OPLTable.forEach((item, index) => {
        arr.push(Object.values(item));
      });
      return JSON.stringify(arr);
    },
    FA4TableString() {
      return JSON.stringify(this.FA4Table);
    },
  },
};
</script>

<style scoped>
/* .el-table th, .el-table tr{
  background:none;
} */
/* .el-table tr td:first-child{
  background:#F5F7FA;
} */
.cell.require::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
i {
  font-size: 28px;
  cursor: pointer;
}
</style>