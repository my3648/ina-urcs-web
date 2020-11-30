<template>
  <div>
    <form id="form52">
      <el-tabs type="card" style="margin-bottom:1em" @tab-click="handleClick">
        <el-tab-pane label="填写dat路径">
          <div style="margin:0.8em 0">
            <span class="label">DAT存储位置：</span>
            <el-input name="FilePath" v-if="type=='path'" v-model="FilePath" style="width:500px"
              placeholder="必填，只需要提供dat目录，不需要带dat的名字">
            </el-input>
            <el-button type="primary" @click="submit('path')" style="width:90px;margin-left:0.5em">提交</el-button>

          </div>
        </el-tab-pane>
        <el-tab-pane label="上传dat文件">
          <div style="margin:0.8em 0">
            <el-button type="primary" @click="transFile()">选择文件</el-button>
            <input ref="file52" v-if="type=='file'" type="file" name="datFile" multiple="multiple" accept=".dat"
              style="display: none" @change="fileChange($event)">
            <el-input style="width:500px;" placeholder="请选择dat文件" v-model="file52Name" :disabled="true">
            </el-input>
            <el-button type="primary" @click="submit('file')" style="width:90px;margin-left:0.5em">提交</el-button>

          </div>

        </el-tab-pane>
      </el-tabs>

      <input type="hidden" name="type" v-model="type">
      <input type="hidden" name="email" v-model="email">
      <input type="hidden" name="projectNumber" v-model="projectNumber">
      <input type="hidden" name="datatype" v-model="datatype">

    </form>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="one" label="0mm" width="100">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.one"></el-checkbox>
        </template>

      </el-table-column>
      <el-table-column prop="two" label="0.5mm" width="100">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.two"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="three" label="1mm" width="100">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.three"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="four" label="rough" width="100">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.four"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="fileName" label="fileName">
      </el-table-column>
    </el-table>
    <div style="text-align: right;margin:0.8em 0">
      <el-button type="primary" @click="submit52" style="width:90px">提交</el-button>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      file52Name: "",
      FilePath: "",
      type: "path",
      datatype: "FA6BDTESKAnalysis",
      tableData: [],
    };
  },
  props: ["email", "projectNumber"],
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
        if (!this.FilePath) {
          this.warnModal("请填写路径。");

          return;
        }
      } else {
        if (!this.file52Name) {
          this.warnModal("请至少选择一个文件。");

          return;
        }
      }
      var formData = new FormData($("#form52")[0]);
      var config = {
        // headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          var complete =
            (progressEvent.loaded / progressEvent.total) * 100 || 0;
          // this.$refs.progress.filePercent = complete;
          this.$emit("progressModal", true, Math.floor(complete));
        },
      };
      this.$http
        .post("http://139.196.196.221:8081/FA6BDTeskSubMit", formData, config)
        .then((res) => {
          console.log(data);
          var { flg, info, data } = res.data;
          this.$emit("progressModal", false, 0);
          this.infoModal(flg, info);
          this.tableData = [];
          data.forEach((item, index) => {
            this.tableData.push({
              one: false,
              two: false,
              three: false,
              four: false,
              fileName: item,
            });
          });
        })
        .catch((res) => {
          this.$emit("progressModal", false, 0);

          this.infoModal("nok", "上传文件失败。");
        });

      // this.$emit("submit");
    },
    submit52() {
      console.log(this.tableData);
      var list = ["one", "two", "three", "four"];
      var result = [];
      for (var i = 0; i < 4; i++) {
        var arr = [];
        this.tableData.forEach((item, index) => {
          if (item[list[i]]) {
            arr.push(item["fileName"]);
          }
          result.push(arr);
        });
      }
      console.log(result);
      this.$emit("infoModal", true);
      this.$http
        .post("http://139.196.196.221:8081/FA6BDTeskStCal", JSON.stringify({
          data: result,
          email: this.email,
          projectNumber: this.projectNumber,
          datatype: "FA6BDTESKAnalysis",
        }))
        .then((res) => {
          console.log(res);
          var { flg, info } = res.data;
          this.$emit("infoModal", false);
          this.infoModal(flg, info);
        })
        .catch((err) => {
          console.log(err);
          this.$emit("infoModal", false);
          this.infoModal("nok", "提交失败!");
        });
    },

    transFile() {
      this.$refs["file52"].dispatchEvent(new MouseEvent("click"));
    },
    fileChange(e) {
      console.log(e.target);
      var name = "";
      for (let i = 0; i < e.target.files.length; i++) {
        name = name + e.target.files[i].name + ";";
      }
      this.file52Name = name;
    },
  },
};
</script>

<style scoped>
.el-input {
  width: 450px;
}
</style>