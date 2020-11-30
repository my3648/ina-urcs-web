<template>
  <div>
    <!-- "面积法节温器诊断批量分析" -->
    <span class="label">DAT文件存放路径：</span>
    <el-input name="plat29datPath" v-model="input" placeholder="请填写DAT文件存放路径"></el-input>
    <el-button type="primary" @click="submit" style="width:90px">提交</el-button>

  </div>
</template>

<script>
export default {
    data() {
      return {
        input: "",
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
.el-input {
  width: 450px;
}
</style>