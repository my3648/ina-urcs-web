<template>
  <div>
    <div style="margin:0.8em 0">
      <span class="label">如果流量计通道的信号名称不为AD_mste，请输入（多个则用逗号隔开）</span>
      <el-input name="plat1_1" v-model="input1"></el-input>

    </div>
    <div style="margin:0.8em 0">
      <span class="label"> 当流量计零漂为负值时,请把负值输入(e.g.-2); 为0或正值可留空,将自动引用dat记录值。
      </span>
      <el-input name="offset" v-model="input2" placeholder=""></el-input>

    </div>
    <div style="margin:0.8em 0">
    <el-radio-group v-model="radio">
      <el-radio label="A">AD接自总管</el-radio>
      <el-radio label="B">AD分别接自总管和高压管路</el-radio>
      <el-radio label="C">AD分别接自总管和低压管路</el-radio>
      <el-radio label="D">AD分别接自低压管路和高压管路</el-radio>
    </el-radio-group>
    <input type="hidden" name="plat_select" v-model="radio">

    </div>

    <!-- 加上有name的隐藏输入框，这样就不用父组件来取值了 -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: "",
      input2: "",
      radio: "A",
    };
  },
};
</script>

<style lang="less" scoped>

.el-input {
  width: 150px;
}
</style>