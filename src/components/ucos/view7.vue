<template>
  <div>
    <span class="label">DAT文件存放路径：</span>
    <el-input name="plat7datPath" v-model="input" style="width: 450px;" placeholder="请填写DAT文件存放路径"></el-input>
    <el-button type="primary" @click="submit" style="width:90px">提交</el-button>
    <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
      style="width: 100%;margin-top:1em">

      <div class="el-table__body-wrapper is-scrolling-none">
        <table class="el-table__body" style="width: 100%;" cellspacing="0" cellpadding="0" border="0">
          <colgroup>
            <col name="el-table_3_column_7" width="90">
            <col name="el-table_3_column_8">

          </colgroup>
          <tbody>

            <tr class="el-table__row">
              <td>
                <div class="cell label">VO</div>
              </td>
              <td>
                <div class="cell">
                  <el-input placeholder="D11" v-model="D11"></el-input>
                </div>
              </td>
              <td>
                <div class="cell">
                  <el-input placeholder="D12" v-model="D12"></el-input>
                </div>
              </td>
              <td>
                <div class="cell">
                  <el-input placeholder="D13" v-model="D13"></el-input>
                </div>
              </td>
              <td>
                <div class="cell">
                  <el-input placeholder="D14" v-model="D14"></el-input>
                </div>
              </td>
              <td>
                <div class="cell">
                  <el-input placeholder="D15" v-model="D15"></el-input>
                </div>
              </td>
              <td>
                <div class="cell">
                  <el-input placeholder="D16" v-model="D16"></el-input>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td>
                <div class="cell label">HO</div>
              </td>
              <td>
                <div class="cell">
                  <el-input placeholder="D21" v-model="D21"></el-input>
                </div>
              </td>
              <td>
                <div class="cell">
                  <el-input placeholder="D22" v-model="D22"></el-input>
                </div>
              </td>
              <td>
                <div class="cell">
                  <el-input placeholder="D23" v-model="D23"></el-input>
                </div>
              </td>
              <td>
                <div class="cell">
                  <el-input placeholder="D24" v-model="D24"></el-input>
                </div>
              </td>
              <td>
                <div class="cell">
                  <el-input placeholder="D25" v-model="D25"></el-input>
                </div>
              </td>
              <td>
                <div class="cell">
                  <el-input placeholder="D26" v-model="D26"></el-input>
                </div>
              </td>
            </tr>
            <tr class="el-table__row">
              <td>
                <div class="cell label">GPF</div>
              </td>
              <td>
                <div class="cell">
                  <el-input placeholder="D31" v-model="D31"></el-input>
                </div>
              </td>
              <td>
                <div class="cell">
                  <el-input placeholder="D32" v-model="D32"></el-input>
                </div>
              </td>
              <td>
                <div class="cell">
                  <el-input placeholder="D33" v-model="D33"></el-input>
                </div>
              </td>
              <td>
                <div class="cell">
                  <el-input placeholder="D34" v-model="D34"></el-input>
                </div>
              </td>
              <td>
                <div class="cell">
                  <el-input placeholder="D35" v-model="D35"></el-input>
                </div>
              </td>
              <td>
                <div class="cell">
                  <el-input placeholder="D36" v-model="D36"></el-input>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="el-table__column-resize-proxy" style="display: none;"></div>
      <input type="hidden" name="tableinput" v-model="tableinput">
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      input:'',
      D11: "",
      D12: "",
      D13: "",
      D14: "",
      D15: "",
      D16: "",
      D21: "",
      D22: "",
      D23: "",
      D24: "",
      D25: "",
      D26: "",
      D31: "",
      D32: "",
      D33: "",
      D34: "",
      D35: "",
      D36: "",
      tableinput: "",
    };
  },
  methods: {
    submit() {
      var obj = {
        VO: [this.D11, this.D12, this.D13, this.D14, this.D15, this.D16],
        HO: [this.D21, this.D22, this.D23, this.D24, this.D25, this.D26],
        GPF: [this.D31, this.D32, this.D33, this.D34, this.D35, this.D36],
      };
      this.tableinput = JSON.stringify(obj);

      this.$nextTick(() => {
        this.$emit("submit");
      });
    },
  },
};
</script>

<style scoped>
</style>