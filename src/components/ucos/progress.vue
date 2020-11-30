<template>
  <el-dialog title="提交进度" :close-on-click-modal="false" :visible.sync="visible" width="20%">
    <p style="margin:0 0 1em 0" v-show="percent<100">当前进度为:</p>
    <div style="margin:0 0 1em 0" v-show="percent==100">
      <div style="display:inline-block;height:2em;line-height:2em">正在处理中:</div>
      <div v-loading="true" style="width:1.5em;height:1.5em;display:inline-block;margin:0 1em"></div>

    </div>

    <el-progress v-show="percent<100" :color="customColorMethod" :text-inside="true" :stroke-width="24"
      :percentage="percent">
    </el-progress>

  </el-dialog>

</template>

<script>
export default {
  data() {
    return {
      customColorMethod: [
        { color: "#909399", percentage: 20 },

        // { color: "#e6a23c", percentage: 50 },
        { color: "#409eff", percentage: 100 },
        { color: "#67c23a" },
      ],
      percent: 0,
      visible: false,
    };
  },
 
};
</script>

<style>
</style>