<template>
  <div style="margin-top:1em">
    <div style="margin-bottom:0.8em">

      <el-radio-group v-model="plat26_1">
        <span class="require label" style="margin-right:1em">EMS系统：</span>

        <el-radio label="A">MG1US008-GDI</el-radio>
        <el-radio label="B">MG1US008-PFI</el-radio>
        <el-radio label="C">MG1UA008</el-radio>
        <el-radio label="D">MED17810.1</el-radio>
        <el-radio label="E">MED17810</el-radio>
        <el-radio label="F">ME17U6.1</el-radio>
       
      </el-radio-group>
    </div>
    <div style="margin:0.8em 0">
      <span class="label">前氧排温热偶名称 
      </span>
      <el-input name="plat26_2" v-model="plat26_2" placeholder="T04"></el-input>
      <span class="label" style="margin-left:1em">后氧排温热偶名称 
      </span>
      <el-input name="plat26_3" v-model="plat26_3" placeholder="T20"></el-input>

    </div>

    <input type="hidden" name="plat26_1" v-model="plat26_1"> 
  </div>

</template>

<script>
export default {
  data() {
    return {
      plat26_1: "A",
      plat26_2: "",
      plat26_3: "",
     
    };
  },
};
</script>

<style scoped>
.el-radio {
  margin-right: 20px;
}
.el-input {
  width: 200px;
}
.label{
margin-right:1em;
}
</style>