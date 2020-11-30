<template>
  <div style="margin-top:1em">
    <div style="margin-bottom:0.8em">

      <el-radio-group v-model="radio1">
        <span class="label" style="margin-right:1em">客户模板类型</span>

        <el-radio label="吉利">吉利</el-radio>
        <el-radio label="吉利沿泰">吉利沿泰</el-radio>
        <el-radio label="吉利卡达克PDF">吉利卡达克PDF</el-radio>
        <el-radio label="长城">长城</el-radio>
        <el-radio label="广汽">广汽</el-radio>
        <el-radio label="广汽沿泰">广汽沿泰</el-radio>
        <el-radio label="一汽">一汽</el-radio>
        <el-radio label="一汽红旗">一汽红旗</el-radio>
        <el-radio label="泛亚">泛亚</el-radio>
        <el-radio label="五菱">五菱</el-radio>
        <el-radio label="AVL">AVL</el-radio>
        <el-radio label="必维">必维</el-radio>
      </el-radio-group>
    </div>
    <div style="margin-bottom:0.8em">

      <el-radio-group v-model="radio2">
        <span class="label" style="margin-right:1em">试验车辆类型</span>

        <el-radio label="第一类车">第一类车</el-radio>
        <el-radio label="第二类车">第二类车</el-radio>
      </el-radio-group>
    </div>
    <div style="margin-bottom:0.8em">

      <el-radio-group v-model="radio3">
        <span class="label" style="margin-right:1em">试验条件</span>

        <el-radio label="20C-fresh">20C-fresh</el-radio>
        <el-radio label="20C-aged">20C-aged</el-radio>
        <el-radio label="-7C">-7C</el-radio>
      </el-radio-group>
    </div>
    <input type="hidden" name="ReportSelect" v-model="radio1">
    <input type="hidden" name="ReportCar" v-model="radio2">
    <input type="hidden" name="ReportCondition" v-model="radio3">
  </div>

</template>

<script>
export default {
  data() {
    return {
      radio1: "吉利",
      radio2: "第一类车",
      radio3: "20C-fresh",
    };
  },
};
</script>

<style scoped>
.el-radio {
  margin-right: 20px;
}
</style>