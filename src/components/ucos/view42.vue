<template>

  <div>
    <!-- 二维三维散点图 42 -->
    <div style="margin-bottom:0.8em">
      <span class="require label">参数1：</span>
      <el-input placeholder="x" v-model="x" name="xName"></el-input>
    </div>
    <div style="margin-bottom:0.8em">
      <span class="require label">参数2：</span>
      <el-input placeholder="y" v-model="y" name="yName"></el-input>
    </div>
    <div style="margin-bottom:0.8em">
      <span class="label" style="margin-left:10px">参数3：</span>
      <el-input placeholder="z" v-model="z" name="zName"></el-input>
    </div>
    <!-- <div style="margin-bottom:0.8em">
      <span class="require label">dat网盘路径：</span>
      <el-input placeholder="请填写路径" v-model="dat" name="datPath"></el-input>
    </div> -->
    <el-tabs type="card" style="margin-bottom:1em" @tab-click="handleClick">
      <el-tab-pane label="填写dat路径">
        <div style="margin:0.8em 0">
          <span class="label">DAT存储位置：</span>
          <el-input name="datPath" v-if="type=='path'" v-model="datPath" style="width:500px"
            placeholder="必填，只需要提供dat目录，不需要带dat的名字">
          </el-input>
          <el-button type="primary" @click="submit('path')" style="width:90px;margin-left:0.5em">提交</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="上传dat文件">
        <div style="margin:0.8em 0">
          <el-button type="primary" @click="transFile()">选择文件</el-button>
          <input ref="file42" v-if="type=='file'" type="file" name="datFile42" multiple="multiple" accept=".dat"
            style="display: none" @change="fileChange($event)">
          <el-input style="width:500px;" placeholder="请选择dat文件" v-model="file42Name" :disabled="true">
          </el-input>
          <el-button type="primary" @click="submit('file')" style="width:90px;margin-left:0.5em">提交</el-button>

        </div>

      </el-tab-pane>
    </el-tabs>
    <input type="hidden" name="type" v-model="type">

    <!-- <el-button type="primary" @click="submit()" style="float:right;width:90px">提交</el-button> -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      x: "",
      y: "",
      z: "",
      dat: "",
      file42Name: "",
      datPath: "",
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
      // if (!this.x || !this.y || !this.dat) {
      //   this.$message({
      //     message: "必填项请填写完整",
      //     type: "warning",
      //   });
      //   return;
      // }
      if (type == "path") {
        if (!this.x || !this.y ||!this.datPath) {
          this.warnModal("必填项请填写完整。");

          return;
        }
      } else {
        if (!this.x || !this.y ||!this.file42Name) {
          this.warnModal("必填项请填写完整。");

          return;
        }
      }

      this.$nextTick(() => {
        this.$emit("submit");
      });
    },
    transFile() {
      this.$refs["file42"].dispatchEvent(new MouseEvent("click"));
    },
    fileChange(e) {
      console.log(e.target);
      var name = "";
      for (let i = 0; i < e.target.files.length; i++) {
        name = name + e.target.files[i].name + ";";
      }
      this.file42Name = name;
    },
  },
};
</script>

<style scoped>
.el-input {
  width: 450px;
}
.label {
  /* width:70px; */
  margin-right: 10px;
}
</style>