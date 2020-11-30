<template>
  <div>
    <div style="margin:0.8em 0 0.4em 0">
      <el-button type="primary" style="width:195px" @click="transFile()">请选择文件（无故障）</el-button>
      <input ref="file50_1" type="file" multiple="multiple" accept=".dat,.DCM,.xlsx,.csv,.xlsb,.pdf,.xlsm,.xls,.txt,.mf4" name="file50_1" style="display: none"
        @change="fileChange($event)">
      <el-input style="width:450px;" placeholder="请选择dat,DCM,xls,x  lsx,xlsb,xlsm,pdf,csv,txt,mf4文件" v-model="file50Name" :disabled="true">
      </el-input>
    

    </div>
    <div style="margin:0.4em 0">
      <el-button type="primary"  style="width:195px" @click="transFile2()">请选择文件（delay）</el-button>
      <input ref="file50_2" type="file" multiple="multiple" accept=".dat,.DCM,.xlsx,.csv,.xlsb,.pdf,.xlsm,.xls,.txt,.mf4" name="file50_2" style="display: none"
        @change="fileChange2($event)">
      <el-input style="width:450px;" placeholder="请选择dat,DCM,xls,x  lsx,xlsb,xlsm,pdf,csv,txt,mf4文件" v-model="file50Name2" :disabled="true">
      </el-input>
     

    </div>
    <div style="margin:0.4em 0">
      <el-button type="primary"  style="width:195px" @click="transFile3()">请选择文件（transtion）</el-button>
      <input ref="file50_3" type="file" multiple="multiple" accept=".dat,.DCM,.xlsx,.csv,.xlsb,.pdf,.xlsm,.xls,.txt,.mf4" name="file50_3" style="display: none"
        @change="fileChange3($event)">
      <el-input style="width:450px;" placeholder="请选择dat,DCM,xls,x  lsx,xlsb,xlsm,pdf,csv,txt,mf4文件" v-model="file50Name2" :disabled="true">
      </el-input>
     

    </div>
  <div style="text-align:right">
    <el-button type="success"  @click="submit()">上传文件</el-button>

  </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      file50Name: "",
      file50Name2: "",
      file50Name3: "",
    };
  },
  methods: {
    transFile() {
      this.$refs["file50_1"].dispatchEvent(new MouseEvent("click"));
    },
    fileChange(e) {
      console.log(e.target);
      var name = "";
      for (let i = 0; i < e.target.files.length; i++) {
        name = name + e.target.files[i].name + ";";
      }
      this.file50Name = name;
    },
    transFile2() {
      this.$refs["file50_2"].dispatchEvent(new MouseEvent("click"));
    },
    fileChange2(e) {
      console.log(e.target);
      var name = "";
      for (let i = 0; i < e.target.files.length; i++) {
        name = name + e.target.files[i].name + ";";
      }
      this.file50Name2 = name;
    },
    transFile3() {
      this.$refs["file50_3"].dispatchEvent(new MouseEvent("click"));
    },
    fileChange3(e) {
      console.log(e.target);
      var name = "";
      for (let i = 0; i < e.target.files.length; i++) {
        name = name + e.target.files[i].name + ";";
      }
      this.file50Name3 = name;
    },
    submit(){
      this.$emit("submit");
    }
  },
};
</script>

<style lang="less" scoped>

</style>