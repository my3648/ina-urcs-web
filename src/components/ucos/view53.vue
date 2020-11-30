<template>
  <div>
    <form action="" ref="form53">
      <input type="hidden" name="email" v-model="email">
      <div style="margin:0.8em 0">
        <el-button type="primary" @click="transFile()">选择文件</el-button>
        <input ref="file53" type="file" multiple="multiple" accept=".xls,.xlsx,.xlsb,.xlsm,.csv" name="excel"
          style="display: none" @change="fileChange($event)">
        <el-input style="width:450px;" placeholder="请选择dat,DCM,xls,xlsx,xlsb,xlsm,pdf,csv,txt,mf4文件"
          v-model="file53Name" :disabled="true">
        </el-input>
        <el-button type="primary" @click="submit53()" style="width:90px;">上传</el-button>

      </div>
    </form>
    <el-tabs v-model="activeSheet" type="card">
      <el-tab-pane :label="name" :name="name" v-for="(value,name) in vars" :key="name">
        <div>
          <div v-for="(v,n,i) in listArr[name]" :key="n" style="margin:0.5em 0">
            <span @click="selectLine(n)" :class="n==activeLine?'activeline line':'line'">{{n}}</span>
            <span class="label" style="margin-right:1em;margin-left:2em">X:</span>
            <el-select v-model="v[0]" filterable placeholder="请选择">

              <el-option v-for="item in value" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
            <span class="label" style="margin-right:1em;margin-left:2em">Y:</span>
            <el-select v-model="v[1]" filterable placeholder="请选择">
              <el-option v-for="item in value" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
            <span class="label" style="margin-right:1em;margin-left:2em">等高线:</span>
            <el-select v-model="v[2]" filterable placeholder="请选择">
              <el-option v-for="item in value" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
            <div v-if="i==Object.keys(listArr[name]).length-1"
              style="display:inline-block;height:44px;line-height:44px;vertical-align:middle;margin-left:1em">
              <i class="el-icon-minus" style="font-size: 28px;cursor: pointer;" @click="minusTable(listArr[name])"></i>
              <i class="el-icon-plus" style="font-size: 28px;cursor: pointer;" @click="plusTable(listArr[name])"></i>
            </div>

          </div>

        </div>

      </el-tab-pane>
      <div style="text-align:right">
        <el-button type="primary" style="width:90px;" @click="query53()">确认</el-button>
      </div>
    </el-tabs>
    <el-divider></el-divider>
    <div>
      <!-- <div>{{lineData[activeSheet][activeLine]}}</div> -->

      <span class="title">等高线数量:</span>
      <span class="label" style="margin:0 7em 0 1em">{{lineData[activeSheet][activeLine]['linesNum']}}</span>
      <span class="title">最大值:</span>
      <span class="label" style="margin:0 7em 0 1em">{{lineData[activeSheet][activeLine]['maxVal']}}</span>
      <span class="title">最小值:</span>
      <span class="label" style="margin:0 7em 0 1em">{{lineData[activeSheet][activeLine]['minVal']}}</span>
      <!-- <span class="font-size:15px;font-weight:550">{{lineData[activeSheet][activeLine]}}</span> -->
    </div>

    <el-card class="box-card" style="margin-top:1em;min-width:870px">
      <div style="border-right:1px solid #ccc;width:50%;float:left;box-sizing:border-box">
        <h4 style="margin-top:0">等高线手动调整</h4>
        <div>

          <el-input @keyup.native="onlyNumber($event)" v-model="newValue" style="width:250px"></el-input>
          <el-button type="primary" @click="addLine()">插入值</el-button>

        </div>
        <div style="height:30px" v-for="(item,index) in lineData[activeSheet][activeLine]['colorAndValue']"
          :key="index">
          <div class="colorLine" :style="{background:item[0]}"></div>
          <div class="label" style="line-height:30px;">{{item[1]}}</div>
          <i class="el-icon-delete" @click="deleteLine(index)"></i>

        </div>

        <div>
          <el-checkbox v-model="lineData[activeSheet][activeLine]['lineShow']">显示等高线</el-checkbox>
          <el-checkbox v-model="lineData[activeSheet][activeLine]['filled']">填充颜色</el-checkbox>

        </div>

      </div>
      <div style="width:50%;float:left;padding-left:1em;box-sizing:border-box">
        <h4 style="margin-top:0">等高线标签设置</h4>
        <div style="margin-bottom:1em">
          <el-checkbox v-model="lineData[activeSheet][activeLine]['lineLabel']">等高线带有标签</el-checkbox>

        </div>
        <span class="label" style="margin-right:1em">标签的小数位数:</span>
        <el-input-number v-model="lineData[activeSheet][activeLine]['decNum']"></el-input-number>
        <div style="text-align:right">
          <el-button type="primary" style="width:90px;" @click="calc53()">提交</el-button>

        </div>
      </div>
      <div style="overflow:hidden;clear:both"></div>

      <div>

      </div>
    </el-card>
    <my-progress ref="progress"></my-progress>
  </div>
</template>

<script>
import progress from "./progress";
export default {
  props: ["projectNumber", "email"],
  data() {
    return {
      filePercent: 0,
      dialogVisible: false,
      file53Name: "",
      vars: { sheet1: [] },
      activeName: "first",
      test: "",
      listArr: { sheet1: { 等高线1: ["", "", ""] } },
      lineData: {
        sheet1: {
          等高线1: {
            linesNum: "",
            maxVal: "",
            minVal: "",
            colorAndValue: [
              ["rgb(3,252,3)", 0],
              ["rgb(252,2,4)", 5],
            ],
            lineShow: false,
            filled: true,
            lineLabel: false,
            decNum: 2,
          },
        },
      },
      activeSheet: "sheet1",
      activeLine: "等高线1",
      default: {
        linesNum: "",
        maxVal: "",
        minVal: "",
        colorAndValue: [
          ["rgb(3,252,3)", 0],
          ["rgb(252,2,4)", 5],
        ],
        lineShow: false,
        filled: false,
        lineLabel: false,
        decNum: 2,
      },
      newValue: "",
    };
  },

  methods: {
    transFile() {
      this.$refs["file53"].dispatchEvent(new MouseEvent("click"));
    },
    fileChange(e) {
      console.log(e.target);
      var name = "";
      for (let i = 0; i < e.target.files.length; i++) {
        name = name + e.target.files[i].name + ";";
      }
      this["file53Name"] = name;
    },

    selectLine(name) {
      this.activeLine = name;
    },
    submit53() {
      var formData = new FormData(this.$refs["form53"]);
      if (this.projectNumber) {
        formData.append("projectNumber", this.projectNumber);
      } else {
        this.warnModal("请填写项目号。");
        return;
      }
      formData.append("type", "FA1ParsContoursUpload");

      var config = {
        // headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          var complete =
            (progressEvent.loaded / progressEvent.total) * 100 || 0;
          // this.$refs.progress.filePercent = complete;
          this.$emit("progressModal", true, complete);
        },
      };
      // this.$emit("progressModal",true,0)
      for (var [a, b] of formData.entries()) {
        console.log(a, b);
      }

      this.$http
        .post("http://139.196.196.221:8081/FA1ParsContours", formData, config)
        // FA1ParsContours
        .then((res) => {
          console.log(res);
          var { flg, info, vars } = res.data;
          // var vars = {
          //   sheet1: ["a", "b", "c", "d"],
          //   sheet2: ["e", "f", "g", "h"],
          // };

          this.$emit("progressModal", false, 0);

          this.vars = vars;
          this.listArr = {};
          this.lineData = {};
          for (var item in vars) {
            // this.listArr[item] = ["","",""];
            this.$set(this.listArr, item, {});
            this.$set(this.listArr[item], "等高线1", ["", "", ""]);
            this.$set(this.lineData, item, {});
            this.$set(this.lineData[item], "等高线1", {
              linesNum: "",
              maxVal: "",
              minVal: "",
              colorAndValue: [
                ["rgb(3,252,3)", ""],
                ["rgb(252,2,4)", ""],
              ],
              lineShow: true,
              filled: true,
              lineLabel: true,
              decNum: 2,
            });
          }
          this.activeSheet = Object.keys(vars)[0];

          console.log(this.listArr);
          console.log(this.lineData);

          this.infoModal(flg, info);
        })
        .catch((res) => {
          this.$emit("progressModal", false, 0);

          this.infoModal("nok", "上传文件失败。");
        });
    },
    query53() {
      var formData = new FormData();
      if (this.projectNumber) {
        formData.append("projectNumber", this.projectNumber);
      } else {
        this.warnModal("请填写项目号。");
        return;
      }
      formData.append("type", "FA1ParsContoursCheckIn");
      formData.append("email", this.email);
      for (var item in this.listArr) {
        formData.append(item, JSON.stringify(this.listArr[item]));
      }

      this.$emit("infoModal", true);

      this.$http
        .post("http://139.196.196.221:8081/FA1ParsContours", formData)
        .then((res) => {
          console.log(res);
          // var res = {
          //   data: {
          //     flg: "ok",
          //     info: "成功",
          //     data: {
          //       user: "zhiwei.wang",
          //       projNum: "788_4415ET.2 ECU FI 3",
          //       sheet1: {
          //         等高线1: {
          //           linesNum: 20,
          //           maxVal: 100,
          //           minVal: 0,
          //           colorAndValue: [
          //             ["rgb(3,252,3)", 0],
          //             ["rgb(252,2,4)", 5],
          //           ],
          //           lineShow: true,
          //           filled: true,
          //           lineLabel: true,
          //           decNum: 2,
          //         },
          //         等高线2: {
          //           linesNum: 5,
          //           maxVal: 50,
          //           minVal: 0,
          //           colorAndValue: [
          //             ["#93DB70", 0],
          //             ["#238E23", 10],
          //           ],
          //           lineShow: false,
          //           filled: false,
          //           lineLabel: false,
          //           decNum: 1,
          //         },
          //       },
          //       sheet2: {
          //         等高线1: {
          //           linesNum: 20,
          //           maxVal: 100,
          //           minVal: 0,
          //           colorAndValue: [
          //             ["rgb(3,252,3)", 0],
          //             ["rgb(252,2,4)", 5],
          //           ],
          //           lineShow: true,
          //           filled: true,
          //           lineLabel: true,
          //           decNum: 2,
          //         },
          //         等高线2: {
          //           linesNum: 5,
          //           maxVal: 50,
          //           minVal: 0,
          //           colorAndValue: [
          //             ["#93DB70", 0],
          //             ["#238E23", 10],
          //           ],
          //           lineShow: false,
          //           filled: false,
          //           lineLabel: false,
          //           decNum: 1,
          //         },
          //       },
          //     },
          //   },
          // };

          var { flg, info, data } = res.data;
          this.lineData = data;
          this.$emit("infoModal", false);

          delete this.lineData["email"];
          delete this.lineData["projectNumber"];
          // delete this.lineData["projNum"];

          this.infoModal(flg, info);
        })
        .catch((res) => {
          this.$emit("infoModal", false);
          this.infoModal("nok", "上传文件失败。");
        });
    },
    plusTable(obj) {
      // console.log(obj);
      var index = Object.keys(obj).length;
      this.$set(obj, "等高线" + (index + 1), ["", "", ""]);
      this.$set(
        this.lineData[this.activeSheet],
        "等高线" + (index + 1),
        this.default
      );
      console.log(this.listArr);
      console.log(this.lineData);
    },
    minusTable(obj) {
      var index = Object.keys(obj).length;
      if (index > 1) {
        this.$delete(obj, "等高线" + index);
        this.$delete(this.lineData[this.activeSheet], "等高线" + index);
      }
      console.log(this.listArr);
      console.log(this.lineData);
    },
    getColor(max, min, maxcol, mincol, value) {
      var arr = maxcol.split(",");
      var arr2 = mincol.split(",");
      console.log(arr);
      console.log(arr2);
      var maxr = Number(arr[0].replace(/[^0-9]+/g, ""));
      var maxg = Number(arr[1].replace(/[^0-9]+/g, ""));
      var maxb = Number(arr[2].replace(/[^0-9]+/g, ""));
      var minr = Number(arr2[0].replace(/[^0-9]+/g, ""));
      var ming = Number(arr2[1].replace(/[^0-9]+/g, ""));
      var minb = Number(arr2[2].replace(/[^0-9]+/g, ""));
      console.log(maxr, minr);
      console.log(maxg, ming);
      console.log(maxb, minb);
      var r = this.getC(max, min, maxr, minr, value);
      var g = this.getC(max, min, maxg, ming, value);
      var b = this.getC(max, min, maxb, minb, value);
      return `rgb(${r},${g},${b})`;
    },

    getC(max, min, maxcol, mincol, value) {
      // console.log(max, min, maxcol, mincol, value)
      var item = ((value - min) * (maxcol - mincol)) / (max - min) + mincol;
      return item;
    },
    addLine() {
      var colorAndValue = this.lineData[this.activeSheet][this.activeLine][
        "colorAndValue"
      ];
      console.log(this.newValue);
      if (
        this.newValue <= colorAndValue[0][1] ||
        this.newValue >= colorAndValue[colorAndValue.length - 1][1]
      ) {
        return;
      }
      var min = colorAndValue[0][1];
      var max = colorAndValue[colorAndValue.length - 1][1];
      var mincol = colorAndValue[0][0];
      var maxcol = colorAndValue[colorAndValue.length - 1][0];
      var color = this.getColor(max, min, maxcol, mincol, this.newValue);

      colorAndValue.push([color, Number(this.newValue)]);
      colorAndValue.sort(this.compare(1));
    },
    compare(p) {
      return function (m, n) {
        var a = m[p];
        var b = n[p];
        // console.log(b , a);
        if (a > b) {
          return 1;
        } else if (a < b) {
          return -1;
        } else {
          return 0;
        }
      };
    },
    deleteLine(index) {
      if (
        this.lineData[this.activeSheet][this.activeLine]["colorAndValue"]
          .length > 2
      ) {
        this.lineData[this.activeSheet][this.activeLine][
          "colorAndValue"
        ].splice(index, 1);
      }
      // lineData[activeSheet][activeLine]['colorAndValue'][index]
    },
    calc53() {
      console.log(this.lineData);
      this.lineData.type = "FA1ParsContoursSubmit";
      for (var item in this.listArr) {
        // console.log(item);
        for (var value in this.listArr[item]) {
          // console.log(value);
          if (this.lineData[item][value]) {
            this.lineData[item][value]["parsName"] = this.listArr[item][value];
          }
        }
      }
      this.lineData["email"] = this.email;
      this.lineData["projectNumber"] = this.projectNumber;
      this.$emit("infoModal", true);

      this.$http
        .post("http://139.196.196.221:8081/FA1ParsContours", JSON.stringify(this.lineData))
        .then((res) => {
          console.log(res);

          var { flg, info, data } = res.data;

          this.$emit("infoModal", false);

          this.infoModal(flg, info);
        })
        .catch((res) => {
          this.$emit("infoModal", false);
          this.infoModal("nok", "上传文件失败。");
        });
    },
  },
  components: {
    "my-progress": progress,
  },
};
</script>

<style scoped>
.line {
  cursor: pointer;
  margin-right: 2em;
  font-size: 17px;
  font-weight: 600;
  color: #606266;
}
.activeline {
  color: #409eff;
}
.title {
  font-size: 17px;
  font-weight: 600;
  color: #606266;
}
.colorLine {
  height: 6px;
  border-radius: 3px;
  width: 350px;

  display: inline-block;
  /* margin:12px 1em 12px 0; */
  line-height: 30px;
  vertical-align: middle;
  margin-right: 10px;
}
.el-icon-delete {
  font-size: 18px;
  line-height: 30px;
  margin-left: 1em;
  cursor: pointer;
}
</style>