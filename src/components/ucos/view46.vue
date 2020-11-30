<template>
  <div>
    <div style="margin:0.8em 0 0.4em 0">
      <el-button type="primary" @click="transFile()">选择DCM文件(排温模型旧DCM)</el-button>
      <input ref="file46" type="file" multiple="multiple" accept=".dcm" name="dcm46_1" style="display: none"
        @change="fileChange($event)">
      <el-input style="width:600px;" placeholder="需包含exhmod_tmdl、exhmod_tvlvmdl、exhmod_tif
        function的dcm文件(可多个)" v-model="file46Name" :disabled="true">
      </el-input>
      <!-- <el-button @click="submitTask()" type="success">上传文件
                </el-button> -->

    </div>
    <div style="margin:0.4em 0">
      <el-button type="primary" @click="transFile2()">选择DCM文件(排温模型新DCM和露点DCM)</el-button>
      <input ref="file46_2" type="file" multiple="multiple" accept=".dcm" name="dcm46_2" style="display: none"
        @change="fileChange2($event)">
      <el-input style="width:600px;" placeholder="需包含exhmod_tmdl、exhmod_tvlvmdl、exhmod_tif
        function的dcm文件(可多个)" v-model="file46Name2" :disabled="true">
      </el-input>
      <!-- <el-button @click="submitTask()" type="success">上传文件
                </el-button> -->

    </div>

    <div style="margin:0.8em 0">
      <el-radio-group v-model="plat46_radio">
        <el-radio label="起动怠速工况">起动怠速工况</el-radio>
        <el-radio label="行车动态工况">行车动态工况</el-radio>

      </el-radio-group>
      <input type="hidden" name="plat46_radio" v-model="plat46_radio">

    </div>
    <div style="margin:0.8em 0">
 
    <span class="label">DAT文件存放路径：</span>
    <el-input name="plat46_path" style="width:450px" v-model="plat46_path" placeholder="请填写DAT文件存放路径"></el-input>
    <el-button type="primary" @click="submit()" style="width:90px">提交</el-button>

 

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      // input1: "",
      // input2: "",
      plat46_radio: "起动怠速工况",
      file46Name: "",
      file46Name2: "",
      plat46_path:""
    };
  },
  methods: {
    transFile() {
      this.$refs["file46"].dispatchEvent(new MouseEvent("click"));
    },
    fileChange(e) {
      console.log(e.target);
      var name = "";
      for (let i = 0; i < e.target.files.length; i++) {
        name = name + e.target.files[i].name + ";";
      }
      this.file46Name = name;
    },
    transFile2() {
      this.$refs["file46_2"].dispatchEvent(new MouseEvent("click"));
    },
    fileChange2(e) {
      console.log(e.target);
      var name = "";
      for (let i = 0; i < e.target.files.length; i++) {
        name = name + e.target.files[i].name + ";";
      }
      this.file46Name2 = name;
    },
    submit(){
      this.$emit("submit");
    }
  },
};
</script>

<style lang="less" scoped>

</style>