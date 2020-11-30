<template>
  <div>
    <div style="margin-bottom:0.5em">
      <span class="label">原排PN计算数据所在路径：</span>
      <el-input name="plat47_path" v-model="input1" style="width:450px" placeholder="请填写DAT文件存放的网盘路径"></el-input>

    </div>
    <span class="label">原排PN取样提前时间：</span>

    <el-input name="plat47_time" v-model="input2" style="width:250px" placeholder="请填写最小脉宽限制值">

      <template slot="append">s</template>
    </el-input>
    <el-button type="primary" @click="submit" style="width:90px;margin-left:1em">提交</el-button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: "",
      input2: "",
    };
  },
  methods: {
    submit() {
      this.$emit("submit");
    },
  },
};
</script>

<style scoped>
.label {
  width: 200px;
  display: inline-block;
}
</style>