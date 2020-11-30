<template>
  <div>
    <!-- <div style="margin-bottom:0.5em">
      <span class="label">DAT文件存放路径：</span>
      <el-input name="injPlusDatPth" v-model="input1" style="width:450px" placeholder="请填写DAT文件存放的网盘路径"></el-input>

    </div> -->
    <el-tabs type="card" style="margin-bottom:1em" @tab-click="handleClick">
      <el-tab-pane label="填写dat路径">
        <div style="margin:0.8em 0">
          <span class="label">DAT存储位置：</span>
          <el-input name="injPlusDatPth" v-if="type=='path'" v-model="injPlusDatPth" style="width:500px"
            placeholder="必填，只需要提供dat目录，不需要带dat的名字">
          </el-input>
          <!-- <el-button type="primary" @click="submit('path')" style="width:90px;margin-left:0.5em">提交</el-button> -->

        </div>
      </el-tab-pane>
      <el-tab-pane label="上传dat文件">
        <div style="margin:0.8em 0">
          <el-button type="primary" @click="transFile()">选择文件</el-button>
          <input ref="file21" v-if="type=='file'" type="file" name="injPlusDatFile" multiple="multiple" accept=".dat"
            style="display: none" @change="fileChange($event)">
          <el-input style="width:500px;" placeholder="请选择dat文件" v-model="file21Name" :disabled="true">
          </el-input>
          <!-- <el-button type="primary" @click="submit('file')" style="width:90px;margin-left:0.5em">提交</el-button> -->

        </div>

      </el-tab-pane>
    </el-tabs>

    <span class="label">最小脉宽限制值：</span>

    <el-input name="Injlimvalue" v-model="input2" style="width:250px" placeholder="请填写最小脉宽限制值">

      <template slot="append">.ms</template>
    </el-input>
     <input type="hidden" name="type" v-model="type">
    <el-button type="primary" @click="submit" style="width:90px;margin-left:1em">提交</el-button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      injPlusDatPth: "",
      input2: "",
      file21Name: "",
      type: "path",
    };
  },
  methods: {
    handleClick(tab, event) {
      var text = event.target.innerText;
      if (text == "填写dat路径") {
        this.type = "path";
      } else {
        this.type = "file";
      }
    },
    transFile() {
      this.$refs["file21"].dispatchEvent(new MouseEvent("click"));
    },
    fileChange(e) {
      console.log(e.target);
      var name = "";
      for (let i = 0; i < e.target.files.length; i++) {
        name = name + e.target.files[i].name + ";";
      }
      this.file21Name = name;
    },
    submit() {
      if (this.type == "path") {
        if (!this.injPlusDatPth) {
          this.warnModal("请填写路径。");

          return;
        }
      } else {
        if (!this.file21Name) {
          this.warnModal("请至少选择一个文件。");

          return;
        }
      }
      this.$nextTick(() => {
        this.$emit("submit");
      });
    },
  },
};
</script>

<style scoped>
.label {
  width: 140px;
  display: inline-block;
}
</style>