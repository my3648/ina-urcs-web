<template>
  <div>

    <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
      style="width: 100%;margin-top:1em ">

      <div class="el-table__body-wrapper is-scrolling-none">
        <table class="el-table__body" style="width: 100%;" cellspacing="0" cellpadding="0" border="0">
          <colgroup>
            <col name="el-table_3_column_7" width="190">
            <col name="el-table_3_column_8">
            <col name="el-table_3_column_9">
          </colgroup>
          <tbody>
            <tr class="el-table__row">
              <td>
                <div class="cell label require">项目类型</div>
              </td>
              <td rowspan="1" colspan="7">
                <div class="cell">
                  <el-radio-group v-model="plat25_1">
                    <el-radio label="A">新平台项目</el-radio>
                    <el-radio label="B">新发动机项目</el-radio>
                    <el-radio label="C">变形移植项目</el-radio>
                  </el-radio-group>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td>
                <div class="cell label">实验设备:</div>
              </td>
              <td rowspan="1" colspan="7">
                <div class="cell">
                  <el-checkbox-group v-model="plat25_2">
                    <el-checkbox label="A">常温转毂</el-checkbox>
                    <el-checkbox label="B">高温转毂</el-checkbox>
                    <el-checkbox label="C">排放转毂</el-checkbox>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td>
                <div class="cell label">匹配数据已经过的验证:</div>
              </td>
              <td rowspan="1" colspan="7">
                <div class="cell">
                  <el-checkbox-group v-model="plat25_3">
                    <el-checkbox label="A">夏季实验</el-checkbox>
                    <el-checkbox label="B">冬季实验</el-checkbox>
                    <el-checkbox label="C">高原实验</el-checkbox>

                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td>
                <div class="cell label">氧传闭环已经过的验证:</div>
              </td>
              <td rowspan="1" colspan="7">
                <div class="cell">
                  <el-checkbox-group v-model="plat25_4">
                    <el-checkbox label="A">新鲜催化器</el-checkbox>
                    <el-checkbox label="B">快速老化催化器</el-checkbox>
                    <el-checkbox label="C">实车老化催化器</el-checkbox>

                  </el-checkbox-group>
                </div>
              </td>
            </tr>

            <tr class="el-table__row">
              <td>
                <div class="cell label require">EMS系统:</div>
              </td>
              <td rowspan="1" colspan="7">
                <div class="cell">
                  <el-radio-group v-model="plat25_5">
                    <el-radio label="A">MG1US008</el-radio>
                    <el-radio label="B">MG1UA008</el-radio>
                    <el-radio label="C">MED17810.1</el-radio>
                    <el-radio label="D">MED17810</el-radio>
                    <el-radio label="E">ME17U6.1</el-radio>
                  </el-radio-group>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td>
                <div class="cell label">报告内容:</div>
              </td>
              <td rowspan="1" colspan="7">
                <div class="cell">
                  <el-checkbox-group v-model="plat25_6">
                    <el-checkbox label="A">氧传加热和闭环控制</el-checkbox>
                    <el-checkbox label="B">过渡工况补偿控制</el-checkbox>
                    <el-checkbox label="C">碳罐系统控制</el-checkbox>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>

            <tr class="el-table__row">
              <td rowspan="2" colspan="1">
                <div class="cell label">碳罐控制阀：</div>
              </td>
              <td rowspan="2">
                <div class="cell">
                  <el-input name="plat25_7_1" v-model="plat25_7_1" placeholder="TEV5"></el-input>

                </div>
              </td>
              <td rowspan="2" colspan="1">
                <div class="cell label">非TEV5</div>
              </td>
              <td colspan="2">
                <div class="cell">
                  <el-input name="plat25_MinTem" placeholder="最小开度%（例:5）" v-model="plat25_MinTem"></el-input>
                </div>
              </td>
              <td colspan="3">
                <div class="cell">
                  <el-input name="plat25_MinNum" placeholder="流量kg/h（例:0.05）" v-model="plat25_MinNum"></el-input>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td colspan="2">
                <div class="cell">
                  <el-input name="plat25_MaxTem" placeholder="最大开度%（例:99）" v-model="plat25_MaxTem"></el-input>
                </div>
              </td>
              <td colspan="3">
                <div class="cell">
                  <el-input name="plat25_MaxNum" placeholder="流量kg/h（例:8.0）" v-model="plat25_MaxNum"></el-input>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td>
                <div class="cell label">前氧类型：</div>
              </td>
              <td>
                <div class="cell">
                  <el-input name="plat25_7_2" placeholder="LSU" v-model="plat25_7_2"></el-input>
                </div>
              </td>
              <td>
                <div class="cell label">后氧类型：</div>
              </td>
              <td>
                <div class="cell">
                  <el-input name="plat25_7_3" placeholder="LSF4.2" v-model="plat25_7_3"></el-input>
                </div>
              </td>
              <td>
                <div class="cell label">HEX名称：</div>
              </td>
              <td>
                <div class="cell">
                  <el-input name="plat25_7_4" placeholder="LSF4.2" v-model="plat25_7_4"></el-input>
                </div>
              </td>
              <td>
                <div class="cell label">报告号：</div>
              </td>
              <td>
                <div class="cell">
                  <el-input name="plat25_7_5" placeholder="Fxxx" v-model="plat25_7_5"></el-input>
                </div>
              </td>

            </tr>
            <tr class="el-table__row">
              <td colspan="2">
                <div class="cell label">数据成熟度：</div>

              </td>
              <td>
                <div class="cell label">闭环控制：</div>

              </td>
              <td>
                <div class="cell">
                  <el-radio-group v-model="plat25_8_1" name="plat25_8_1">
                    <el-radio label="-" v-show="false">-</el-radio>
                    <el-radio label="50%">50%</el-radio>
                    <el-radio label="75%">75%</el-radio>
                  </el-radio-group>
                </div>
              </td>
              <td>
                <div class="cell label">过渡工况：</div>

              </td>
              <td>
                <div class="cell">
                  <el-radio-group v-model="plat25_8_2" name="plat25_8_2">
                    <el-radio label="-" v-show="false">-</el-radio>
                    <el-radio label="50%">50%</el-radio>
                    <el-radio label="75%">75%</el-radio>
                  </el-radio-group>

                </div>

              </td>
              <td>
                <div class="cell label">碳罐系统：</div>

              </td>
              <td>
                <div class="cell">
                  <el-radio-group v-model="plat25_8_3" name="plat25_8_3">
                    <el-radio label="-" v-show="false">-</el-radio>
                    <el-radio label="50%">50%</el-radio>
                    <el-radio label="75%">75%</el-radio>
                  </el-radio-group>
                </div>

              </td>

            </tr>
            <tr class="el-table__row"></tr>

          </tbody>
        </table>
      </div>
      <div class="el-table__column-resize-proxy" style="display: none;"></div>
    </div>
    <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
      style="width: 100%;margin-top:1em">

      <div class="el-table__body-wrapper is-scrolling-none">
        <table class="el-table__body" style="width: 100%;" cellspacing="0" cellpadding="0" border="0">
          <colgroup>
            <col name="el-table_3_column_7" width="190">
            <col name="el-table_3_column_8">

          </colgroup>
          <tbody>
            <tr class="el-table__row">
              <td>
                <div class="cell label">实物图片路径：</div>
              </td>
              <td>
                <div class="cell">
                  <el-input name="plat25_9" placeholder="P:\xxx" v-model="plat25_9"></el-input>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td>
                <div class="cell label">闭环控制测量文件路径: </div>
              </td>
              <td>
                <div class="cell">
                  <el-input name="plat25_10" placeholder="P:\xxx" v-model="plat25_10"></el-input>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td>
                <div class="cell label">过渡工况测量文件路径: </div>
              </td>
              <td>
                <div class="cell">
                  <el-input name="plat25_11" placeholder="P:\xxx" v-model="plat25_11"></el-input>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td>
                <div class="cell label">碳罐系统测量文件路径: </div>
              </td>
              <td>
                <div class="cell">
                  <el-input name="plat25_12" placeholder="P:\xxx" v-model="plat25_12"></el-input>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td>
                <div class="cell label">氧传加热测量文件路径: </div>
              </td>
              <td>
                <div class="cell">
                  <el-input name="plat25_13" placeholder="P:\xxx" v-model="plat25_13"></el-input>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="el-table__column-resize-proxy" style="display: none;"></div>
    </div>
    <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
      style="width: 100%;margin-top:1em">

      <div class="el-table__body-wrapper is-scrolling-none">
        <table class="el-table__body" style="width: 100%;" cellspacing="0" cellpadding="0" border="0">
          <colgroup>
            <col name="el-table_3_column_7" width="190">
            <col name="el-table_3_column_8">

          </colgroup>
          <tbody>

            <tr class="el-table__row">
              <td>
                <div class="cell label">闭环控制测量文件路径: </div>
              </td>
              <td>
                <div class="cell">
                  <el-input name="plat25_14" placeholder="P:\xxx" v-model="plat25_14"></el-input>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td>
                <div class="cell label">过渡工况测量文件路径: </div>
              </td>
              <td>
                <div class="cell">
                  <el-input name="plat25_15" placeholder="P:\xxx" v-model="plat25_15"></el-input>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td>
                <div class="cell label">碳罐系统测量文件路径: </div>
              </td>
              <td>
                <div class="cell">
                  <el-input name="plat25_16" placeholder="P:\xxx" v-model="plat25_16"></el-input>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td>
                <div class="cell label">氧传加热DCM文件路径： </div>
              </td>
              <td>
                <div class="cell">
                  <el-input name="plat25_17" placeholder="P:\xxx" v-model="plat25_17"></el-input>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="el-table__column-resize-proxy" style="display: none;"></div>
    </div>
    <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
      style="width: 100%;margin-top:1em">

      <div class="el-table__body-wrapper is-scrolling-none">
        <table class="el-table__body" style="width: 100%;" cellspacing="0" cellpadding="0" border="0">
          <colgroup>
            <col name="el-table_3_column_7" width="190">
            <col name="el-table_3_column_8">

          </colgroup>
          <tbody>

            <tr class="el-table__row">
              <td>
                <div class="cell label">项目OPL： </div>
              </td>
              <td>
                <div class="cell">
                  <el-input type="textarea" :rows="3" placeholder="请输入内容" name="plat25_18" v-model="plat25_18">
                  </el-input>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="el-table__column-resize-proxy" style="display: none;"></div>
    </div>
    <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
      style="width: 100%;margin-top:1em">

      <div class="el-table__body-wrapper is-scrolling-none">
        <table class="el-table__body" style="width: 100%;" cellspacing="0" cellpadding="0" border="0">
          <colgroup>
            <col name="el-table_3_column_7" width="190">
            <col name="el-table_3_column_8">

          </colgroup>
          <tbody>

            <tr class="el-table__row">
              <td>
                <div class="cell label">报告存放路径：</div>
              </td>
              <td>
                <div class="cell">
                  <el-input placeholder="P:\xxx" name="plat25_19" v-model="plat25_19">
                  </el-input>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="el-table__column-resize-proxy" style="display: none;"></div>
    </div>
    <!-- 理论上说不需再转换，需修改 -->

    <input type="hidden" name="plat25_1" v-model="plat25_1">
    <input type="hidden" name="plat25_2" v-model="JSON.stringify(plat25_2)">
    <input type="hidden" name="plat25_3" v-model="JSON.stringify(plat25_3)">
    <input type="hidden" name="plat25_4" v-model="JSON.stringify(plat25_4)">
    <input type="hidden" name="plat25_5" v-model="plat25_5">

    <input type="hidden" name="plat25_6" v-model="JSON.stringify(plat25_6)">
    <input type="hidden" name="plat25_8_1" v-model="plat25_8_1">
    <input type="hidden" name="plat25_8_2" v-model="plat25_8_2">
    <input type="hidden" name="plat25_8_3" v-model="plat25_8_3">

    <!-- <div style="text-align: right;margin:0.6em 0">
      <i class="el-icon-minus" @click="minusOPL"></i>
      <i class="el-icon-plus" @click="plusOPL"></i>
    </div> -->

    <el-button type="primary" @click="submit" style="width:90px;margin-left:1em;float:right">提交</el-button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      plat25_1: "A",
      plat25_2: [],
      plat25_3: [],
      plat25_4: [],
      plat25_5: "A",
      plat25_6: [],
      plat25_7_1: "",

      plat25_MinTem:'',
      plat25_MinNum:'',
      plat25_MaxTem:'',
      plat25_MaxNum:'',
      plat25_7_2: "",
      plat25_7_3: "",
      plat25_7_4: "",
      plat25_7_5: "",
      plat25_8_1: '-',
      plat25_8_2: '-',
      plat25_8_3:'-',
      plat25_9:'',
      plat25_10:'',
      plat25_11:'',
      plat25_12:'',
      plat25_13:'',
      plat25_14:'',
      plat25_15:'',
      plat25_16:'',
      plat25_17:'',
      plat25_18:'',
      plat25_19:'',

    };
  },
  methods: {
    submit() {
      // if (
      //   !this.plat25_1||!this.plat25_5
        
      // ) {
      //   this.$message({
      //     message: "必填项请填写完整",
      //     type: "warning",
      //   });
      //   return;
      // }
      this.$nextTick(() => {
        this.$emit("submit");
      });
    },
  },
  computed: {
    // OPLInfo() {
    //   var arr = [];
    //   this.OPLTable.forEach((item, index) => {
    //     arr.push(Object.values(item));
    //   });
    //   return JSON.stringify(arr);
    // },
    // FA4TableString() {
    //   return JSON.stringify(this.FA4Table);
    // },
  },
};
</script>

<style scoped>
i {
  font-size: 28px;
  cursor: pointer;
}
</style>