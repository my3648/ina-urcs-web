<template>
  <div>
    <div style="margin:0.8em 0">
      <span class="label">开始日期：</span>
      <el-input name="userStartTime" v-model="input1" type="date" style="margin-right:2em"></el-input>
      <span class="label">结束日期：</span>
      <el-input name="userEndTime" v-model="input2" type="date"></el-input>
        <el-button type="primary" @click="submit" style="width:90px">提交</el-button>

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
      // radio: "A",
    };
  },
  methods:{
    submit() {
   
      this.$emit("submit");
    },
  }
};
</script>

<style lang="less" scoped>

.el-input {
  width: 150px;
}

</style>