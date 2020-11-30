<template>
  <div style="margin-top:1em">
    <div style="margin-bottom:0.8em">

      <el-radio-group v-model="radio1">
        <span class="label" style="margin-right:1em">平台选择</span>

        <el-radio label="UP8">UP8</el-radio>
        <el-radio label="UD8">UD8</el-radio>
        <el-radio label="MED17810.1">MED17810.1</el-radio>
        <el-radio label="MED17810">MED17810</el-radio>
       
      </el-radio-group>
    </div>
    <input type="hidden" name="ECUplatform" v-model="radio1">
  </div>

</template>

<script>
export default {
  data() {
    return {
      radio1: "UP8",
     
    };
  },
};
</script>

<style scoped>
.el-radio {
  margin-right: 20px;
}
</style>