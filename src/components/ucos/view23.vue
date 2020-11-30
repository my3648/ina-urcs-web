<template>
  <div>
    <el-tabs type="card" style="margin-bottom:1em" @tab-click="handleClick">
      <el-tab-pane label="填写dat路径">
        <div style="margin:0.8em 0">
          <span class="label">DAT存储位置：</span>
          <el-input name="plat23_2" v-if="type=='path'" v-model="plat23_2" style="width:500px"
            placeholder="必填，只需要提供dat目录，不需要带dat的名字">
          </el-input>
          <el-button type="primary" @click="submit('path')" style="width:90px;margin-left:0.5em">提交</el-button>

        </div>
      </el-tab-pane>
      <el-tab-pane label="上传dat文件">
        <div style="margin:0.8em 0">
          <el-button type="primary" @click="transFile()">选择文件</el-button>
          <input ref="file23" v-if="type=='file'" type="file" name="plat23_1" multiple="multiple" accept=".dat"
            style="display: none" @change="fileChange($event)">
          <el-input style="width:500px;" placeholder="请选择dat文件" v-model="file23Name" :disabled="true">
          </el-input>
          <el-button type="primary" @click="submit('file')" style="width:90px;margin-left:0.5em">提交</el-button>

        </div>

      </el-tab-pane>
    </el-tabs>
    <input type="hidden" name="type" v-model="type">

  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      file23Name: "",
      plat23_2: "",
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
    submit(type) {
      if (type == "path") {
        if (!this.plat23_2) {
          this.warnModal("请填写路径。");

          return;
        }
      } else {
        if (!this.file23Name) {
          this.warnModal("请至少选择一个文件。");

          return;
        }
      }
      this.$nextTick(() => {
        this.$emit("submit");
      });
    },
    transFile() {
      this.$refs["file23"].dispatchEvent(new MouseEvent("click"));
    },
    fileChange(e) {
      console.log(e.target);
      var name = "";
      for (let i = 0; i < e.target.files.length; i++) {
        name = name + e.target.files[i].name + ";";
      }
      this.file23Name = name;
    },
  },
};
</script>

<style scoped>
.el-input {
  width: 450px;
}
</style>