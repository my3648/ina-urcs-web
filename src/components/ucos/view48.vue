<template>
  <div :class="projectNumber">
    <form action="" ref="form48">
      <div style="margin:0.8em 0">
        <span class="label">项目信息：</span>
        <el-input name="projectInfo" v-model="input1"></el-input>
      </div>
      <div style="margin:0.8em 0">
        <span class="label">车号：
        </span>
        <el-input name="CarNumber" v-model="input2" placeholder=""></el-input>
      </div>
      <div style="margin:0.8em 0">
        <span class="label">ECU平台：
        </span>
        <el-input name="ECUPatform" v-model="input3" placeholder=""></el-input>
      </div>
    </form>
    <el-tabs type="border-card">
      <el-tab-pane label="填写dat路径">
        <div style="margin:0.8em 0">
          <span class="label">DAT存储位置：</span>
          <el-input name="FilePath" v-model="FilePath" style="width:500px" placeholder="必填，只需要提供dat目录，不需要带dat的名字">
          </el-input>
          <el-button type="primary" @click="submit('path')" style="width:90px;margin-left:0.5em">提交</el-button>

        </div>
      </el-tab-pane>
      <el-tab-pane label="上传dat文件">
        <div style="margin:0.8em 0">
          <el-button type="primary" @click="transFile()">选择文件</el-button>
          <input ref="file48" type="file" multiple="multiple" accept=".dat" name="datFile" style="display: none"
            @change="fileChange($event)">
          <el-input style="width:500px;" placeholder="请选择dat文件" v-model="file48Name" :disabled="true">
          </el-input>
          <el-button type="primary" @click="submit('file')" style="width:90px;margin-left:0.5em">提交</el-button>

        </div>

      </el-tab-pane>
    </el-tabs>
    <el-dialog title="信息" :close-on-click-modal="false" :visible.sync="dialogVisible" width="20%">
      <p style="margin:0 0 1em 0">正在处理...</p>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      file48Name: "",
      FilePath: "",
      dialogVisible: false,
    };
  },
  props: ["projectNumber","email"],

  methods: {
    submit(type) {
      var formData = new FormData(this.$refs.form48);
      formData.append("email", this.email);
      formData.append("datatype", 'FA6AGPFPressDiff');

      console.log(this.projectNumber);
      if (this.projectNumber) {
        formData.append("projectNumber", this.projectNumber);
      } else {
        this.warnModal("请填写项目号。");
        return;
      }
      if (type == "file") {
        if (!this.$refs.file48.files[0]) {
          this.warnModal("请至少选择一个文件。");
          return;
        }
      } else {
        if (!this.FilePath) {
          this.warnModal("请填写文件路径。");
          return;
        }
      }
      formData.append("type", type);
      this.dialogVisible = true;
      for (var [a, b] of formData.entries()) {
        console.log(a, b);
      }

      this.$http
        .post("http://139.196.196.221:8081/GPFPressDiff", formData)
        .then((res) => {
          console.log(res);
          this.dialogVisible = false;

          this.infoModal("ok", "上传文件成功。");
        })
        .catch((res) => {
          this.dialogVisible = false;

          this.infoModal("nok", "上传文件失败。");
        });
    },
    transFile() {
      this.$refs["file48"].dispatchEvent(new MouseEvent("click"));
    },
    fileChange(e) {
      console.log(e.target);
      var name = "";
      for (let i = 0; i < e.target.files.length; i++) {
        name = name + e.target.files[i].name + ";";
      }
      this.file48Name = name;
    },
  },
};
</script>

<style lang="less" scoped>
.label {
  width: 120px;
}

.el-input {
  width: 200px;
}
</style>