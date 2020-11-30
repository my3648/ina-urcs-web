<template>
  <div>
    <h4>可输入期望合并的开始和结束时间，留空则默认全过程合并(单位/s)。</h4>
    <div style="margin:0.8em 0">
      <span class="label" style="margin-right:1em">开始时间</span>
      <el-input @keyup.native="onlyNumber($event)" v-model="timepoint.startTime"></el-input>
      <span class="label" style="margin-right:1em">结束时间</span>
      <el-input @keyup.native="onlyNumber($event)" v-model="timepoint.endTime"></el-input>

    </div>

    <!-- 加上有name的隐藏输入框，这样就不用父组件来取值了 -->
    <input type="hidden" name="timepoint" v-model="JSON.stringify(timepoint)">
  </div>
</template>

<script>
export default {
  data() {
    return {
      timepoint: {
        startTime: "",
        endTime: "",
      },
      // rules:{
      // startTime:[
      //              { type: 'number', message: '只能输入数字', trigger: 'blur' },
      //           ],
      //   }
    };
  },
  methods:{
    // onlyNumber(e){
    //   console.log(e.target.value);
    //   e.target.value = e.target.value.replace(/[^\d|\.|\-]/g, "");

    // }
  }
};
</script>

<style lang="less" scoped>
.el-input {
  width: 250px;
  margin-right:2em
}
</style>