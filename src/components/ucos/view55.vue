<template>
  <div>
    <div style="margin:0.8em 0 0.4em 0">
      <el-button type="primary" style="width:250px" @click="transFile()">模块DCM（%F1MA_NeuNetFit）</el-button>
      <input ref="file55_1" type="file" multiple="multiple" accept=".DCM" name="file55_1" style="display: none"
        @change="fileChange($event)">
      <el-input style="width:450px;" placeholder="请选择DCM文件" v-model="file55_1" :disabled="true">
      </el-input>

    </div>
    <div style="margin:0.4em 0">
      <el-button type="primary" style="width:250px" @click="transFile2()">测试DAT（闭环学习已较稳定）</el-button>
      <input ref="file55_2" type="file" multiple="multiple" accept=".dat" name="file55_2" style="display: none"
        @change="fileChange2($event)">
      <el-input style="width:450px;" placeholder="请选择dat文件" v-model="file55_2" :disabled="true">
      </el-input>

    </div>
    <div style="margin:0.4em 0">
      <span class="label" style="width:250px">绘制的温度范围（逗号隔开）</span>
      <el-input style="width:450px;" name="plat55_range" v-model="plat55_range" @keyup.native="onlyNumber55($event)">
      </el-input>
      <el-button type="primary" @click="submit()" style="width:90px">提交</el-button>
    </div>
    <div style="margin:0.6em 0">
      <span class="label">局部模型参数的选取：</span>
      <el-radio-group v-model="plat55_radio">
        <el-radio label="A">测试结束时刻的值</el-radio>
        <el-radio label="B">测试过程的平均值</el-radio>
        <el-radio label="C">时段内平均值/s</el-radio>
      </el-radio-group>
      <el-input size="medium" style="width:100px;margin-left:1em" name="average_min" v-model="average_min"></el-input>
      ——
      <el-input size="medium" style="width:100px" name="average_max" v-model="average_max"></el-input>
    </div>
    <input type="hidden" name="plat55_radio" v-model="plat55_radio">

  </div>
</template>

<script>
export default {
  data() {
    return {
      file55_1: "",
      file55_2: "",
      plat55_range: "",
      plat55_radio: "A",
      average_min: "",
      average_max: "",
    };
  },
  methods: {
    onlyNumber55(e) {
      e.target.value = e.target.value.replace(/[^\d|\.|\-|\,]/g, "");
    },
    transFile() {
      this.$refs["file55_1"].dispatchEvent(new MouseEvent("click"));
    },
    fileChange(e) {
      console.log(e.target);
      var name = "";
      for (let i = 0; i < e.target.files.length; i++) {
        name = name + e.target.files[i].name + ";";
      }
      this.file55_1 = name;
    },
    transFile2() {
      this.$refs["file55_2"].dispatchEvent(new MouseEvent("click"));
    },
    fileChange2(e) {
      console.log(e.target);
      var name = "";
      for (let i = 0; i < e.target.files.length; i++) {
        name = name + e.target.files[i].name + ";";
      }
      this.file55_2 = name;
    },
    transFile3() {
      this.$refs["file55_3"].dispatchEvent(new MouseEvent("click"));
    },

    submit() {
      this.$nextTick(() => {
        this.$emit("submit");
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>