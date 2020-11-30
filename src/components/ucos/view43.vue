<template>
  <div>
    <!-- "DG齿转速计算" -->
    <div>
      <!-- <el-form-item label="dat网盘路径：" required>
        <el-input v-model="data.input1" style="width:450px"></el-input>
        <el-button type="primary" style="width:90px;margin:0 0.5em" @click="submit()">提交</el-button>
      </el-form-item> -->
      <el-tabs type="card" style="margin-bottom:1em" @tab-click="handleClick">
        <el-tab-pane label="填写dat路径">
          <div style="margin:0.8em 0">
            <span class="label">DAT存储位置：</span>
            <el-input name="datPath43" v-if="type=='path'" v-model="data.input1" style="width:500px"
              placeholder="必填，只需要提供dat目录，不需要带dat的名字">
            </el-input>
            <el-button type="primary" @click="submit('path')" style="width:90px;margin-left:0.5em">提交</el-button>

          </div>
        </el-tab-pane>
        <el-tab-pane label="上传dat文件">
          <div style="margin:0.8em 0">
            <el-button type="primary" @click="transFile()">选择文件</el-button>
            <input ref="file43" v-if="type=='file'" type="file" multiple="multiple" accept=".dat" name="datFile43"
              style="display: none" @change="fileChange($event)">
            <el-input style="width:500px;" placeholder="请选择dat文件" v-model="file43Name" :disabled="true">
            </el-input>
            <el-button type="primary" @click="submit('file')" style="width:90px;margin-left:0.5em">提交</el-button>

          </div>

        </el-tab-pane>
      </el-tabs>

      <div>
        <span class="label">DG信号名称：</span>
        <el-input v-model="data.input2" style="width:150px;margin-right:1.5em"></el-input>
        <el-checkbox v-model="checked">智能自动识别</el-checkbox>
      </div>

    </div>
    <input type="hidden" name="DGName" v-model="DGName">
    <input type="hidden" name="type" v-model="type">
    <!-- <input type="hidden" name="datPath43" v-model="data.input1"> -->
  </div>

</template>

<script>
export default {
  data() {
    return {
      data: { input1: "", input2: "" },
      // DGName:'',
      checked: true,
      file43Name: "",
      type: "path",
    };
  },
  computed: {
    DGName() {
      if (this.checked) {
        return this.data.input2;
      } else {
        return "";
      }
    },
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
        if (!this.data.input1) {
          this.warnModal("请填写路径。");
          return;
        }
      } else {
        if (!this.file43Name) {
          this.warnModal("请至少选择一个文件。");
          return;
        }
      }

      this.$nextTick(() => {
        this.$emit("submit");
      });
    },
    transFile() {
      console.log(this.type);
      this.$refs["file43"].dispatchEvent(new MouseEvent("click"));
    },
    fileChange(e) {
      console.log(e.target);
      var name = "";
      for (let i = 0; i < e.target.files.length; i++) {
        name = name + e.target.files[i].name + ";";
      }
      this.file43Name = name;
    },
  },
};
</script>

<style scoped>
.label {
  width: 110px;
}
</style>