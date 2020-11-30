<template>
  <div>
    <div style="margin:0.8em 0">
      <span class="label">如果流量计通道的信号名称不为AD_mste，请输入（多个则用逗号隔开）</span>
      <el-input name="plat2_1" v-model="input"></el-input>

    </div>
   


    <!-- 加上有name的隐藏输入框，这样就不用父组件来取值了 -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      
    };
  },
};
</script>

<style lang="less" scoped>

.el-input {
  width: 150px;
}
</style>