<template>
  <div>

    <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
      style="width: 100%;margin:1em 0">

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
                <div class="cell label">实验设备:</div>
              </td>
              <td rowspan="1" colspan="4">
                <div class="cell">
                  <el-checkbox-group v-model="FA4Laboratory_2">
                    <el-checkbox label="A">联电上海低温室</el-checkbox>
                    <el-checkbox label="B">联电黑河实验室</el-checkbox>
                    <el-checkbox label="C">客户实验室</el-checkbox>
                    <el-checkbox label="D">联电上海常温室/地面车位</el-checkbox>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td>
                <div class="cell label">验证信息:</div>
              </td>
              <td rowspan="1" colspan="4">
                <div class="cell">
                  <el-checkbox-group v-model="FA4Ver_2">
                    <el-checkbox label="A">已完成道路试验</el-checkbox>
                    <el-checkbox label="B">已完成客户耐久实验</el-checkbox>

                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td rowspan="3">
                <div class="cell label">项目信息:</div>
              </td>
              <td colspan="4">
                <div class="cell">
                  <el-checkbox-group v-model="FA4Infor_2">
                    <el-checkbox label="A">带有GPF</el-checkbox>
                    <el-checkbox label="B">带有起停控制（包括混动）</el-checkbox>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>

            <tr class="el-table__row">

              <td>
                <div class="cell label">
                  报告号
                </div>
              </td>
              <td>
                <div class="cell">
                  <el-input name="FA4_2_1" v-model="FA4_2_1"></el-input>
                </div>
              </td>
              <td>
                <div class="cell label">
                  HEX文件
                </div>
              </td>
              <td>
                <div class="cell">
                  <el-input name="FA4_2_2" v-model="FA4_2_2"></el-input>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">

              <td>
                <div class="cell label">
                  前氧型号
                </div>
              </td>
              <td>
                <div class="cell">
                  <el-input name="FA4_2_3" v-model="FA4_2_3"></el-input>
                </div>
              </td>
              <td>
                <div class="cell label">
                  后氧型号
                </div>
              </td>
              <td>
                <div class="cell">
                  <el-input name="FA4_2_4" v-model="FA4_2_4"></el-input>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td>
                <div class="cell label">报告存放路径:</div>
              </td>
              <td colspan="4">
                <div class="cell">
                  <el-input name="FA4_2_5" v-model="FA4_2_5"></el-input>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td>
                <div class="cell label">DCM文件路径:</div>
              </td>
              <td colspan="4">
                <div class="cell">
                  <el-input name="FA4_2_6" v-model="FA4_2_6"></el-input>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td>
                <div class="cell label">热电偶位置图片路径:</div>
              </td>
              <td colspan="4">
                <div class="cell">
                  <el-input name="FA4_2_7" v-model="FA4_2_7"></el-input>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td>
                <div class="cell label">dat文件存放路径:</div>
              </td>
              <td colspan="4">
                <div class="cell">
                  <el-input name="FA4_2_8" v-model="FA4_2_8"></el-input>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td>
                <div class="cell label">出现的问题:</div>
              </td>
              <td colspan="4">
                <div class="cell">
                  <el-input  type="textarea"
  :rows="2" name="FA4_2_9" v-model="FA4_2_9"></el-input>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      <div class="el-table__column-resize-proxy" style="display: none;"></div>
    </div>
    <!-- 理论上说不需再转换，需修改 -->

    <input type="hidden" name="FA4Laboratory_2" v-model="JSON.stringify(FA4Laboratory_2)">
    <input type="hidden" name="FA4Ver_2" v-model="JSON.stringify(FA4Ver_2)">
    <input type="hidden" name="FA4Infor_2" v-model="JSON.stringify(FA4Infor_2)">

    <el-button type="primary" @click="submit" style="width:90px;margin-left:1em;float:right">提交</el-button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      FA4Laboratory_2: [],
      FA4Ver_2: [],
      FA4Infor_2: [],
      FA4_2_1: "",
      FA4_2_2: "",
      FA4_2_3: "",
      FA4_2_4: "",
      FA4_2_5: "",
      FA4_2_6: "",
      FA4_2_7: "",
      FA4_2_8: "",
      FA4_2_9: "",
      
    };
  },
  methods: {
    submit() {
      if (
        this.FA4Laboratory_2.length==0

      ) {
        this.$message({
          message: "请至少选择一个实验室",
          type: "warning",
        });
        return;
      }
      this.$nextTick(() => {
        this.$emit("submit");
      });
    },
  },
  computed: {},
};
</script>

<style scoped>
i {
  font-size: 28px;
  cursor: pointer;
}
</style>