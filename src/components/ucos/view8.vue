<template>
  <div>
    <div style="margin:0.8em 0 0.8em 0">
      <el-button type="primary" @click="transTask()">选择文件</el-button>
      <input ref="taskFile8" type="file" multiple="multiple"
        accept=".dat,.DCM,.xlsx,.csv,.xlsb,.pdf,.xlsm,.xls,.txt,.mf4" name="datDCM" style="display: none"
        @change="taskChange($event)">
      <el-input style="width:450px;" placeholder="选择dat,DCM,xls,xlsx,xlsb,xlsm,pdf,csv文件" v-model="taskFileName"
        :disabled="true">
      </el-input>
      <el-button @click="submit()" type="success">上传文件
      </el-button>

    </div>

    <div style="margin-bottom:0.8em">

      <el-radio-group v-model="plat8_1">
        <!-- <span class="label" style="margin-right:1em">客户模板类型</span> -->

        <el-radio label="A">批量转换txt数据</el-radio>
        <el-radio label="B">结合优先级分析数据</el-radio>

      </el-radio-group>
    </div>
    <el-form :disabled="formDisabled">
      <div style="margin:0.8em 0">
        <span class="label">第一优先排放物(最高优先级)：</span>
        <el-select @change="changeOptions()" v-model="value1">
          <el-option v-for="item in options" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>

      </div>
      <div style="margin:0.8em 0">
        <span class="label">第二优先排放物：</span>
        <el-select @change="changeOptions()" v-model="value2">
          <el-option v-for="item in options" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>

      </div>
      <div style="margin:0.8em 0">
        <span class="label">第三优先排放物：</span>
        <el-select @change="changeOptions()" v-model="value3">
          <el-option v-for="item in options" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>

      </div>
      <div style="margin:0.8em 0">
        <span class="label">第四优先排放物：</span>
        <el-select @change="changeOptions()" v-model="value4">
          <el-option v-for="item in options" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>

      </div>
      <div style="margin:0.8em 0">
        <span class="label">第五优先排放物：</span>
        <el-select @change="changeOptions()" v-model="value5">
          <el-option v-for="item in options" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>

      </div>

    </el-form>
    <input type="hidden" name="plat8_1" v-model="plat8_1">
    <input type="hidden" name="discharge" v-model="discharge">
    <!-- <input type="hidden" name="ReportCar" v-model="radio2">
      <input type="hidden" name="ReportCondition" v-model="radio3"> -->
  </div>

</template>

<script>
export default {
  data() {
    return {
      plat8_1: "A",
      options: ["", "CO", "NOX", "THC", "PN", "COV"],
      formDisabled: true,
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      taskFileName: "",
      discharge:[]
    };
  },
  methods: {
    changeOptions() {
      var arr = ["CO", "NOX", "THC", "PN", "COV"];
      var valueArr = [
        this.value1,
        this.value2,
        this.value3,
        this.value4,
        this.value5,
      ];
      arr = arr.filter((item, index) => {
        return !valueArr.includes(item);
      });
      arr = ["", ...arr];
      this.options = arr;
    },
    transTask() {
      this.$refs["taskFile8"].dispatchEvent(new MouseEvent("click"));
    },
    taskChange(e) {
      console.log(e.target);
      var name = "";
      for (let i = 0; i < e.target.files.length; i++) {
        name = name + e.target.files[i].name + ";";
      }
      this.taskFileName = name;
    },
    submit() {
        
      var arr = [];
      for (var i = 1; i < 6; i++) {
        arr.push({
          [this["value" + i]]: "",
        });
      }
      console.log(JSON.stringify(arr));

     this.discharge=JSON.stringify(arr);
      if (
        !this.$refs.taskFile8.files[0]
      ) {
        this.warnModal("请至少选择一个文件。");
        return;
      }
      if(this.plat8_1 == "B"&&(this.value1==""||this.value2==""||this.value3==""||this.value4==""||this.value5=="")){
        this.warnModal("分析数据必须填写完整！");
        return
      }

   
      this.$nextTick(() => {
        this.$emit("submit");
      });
    },
  },
 
  watch: {
    plat8_1(val) {
      console.log(val);
      if (val == "A") {
        this.formDisabled = true;
      } else {
        this.formDisabled = false;
      }
    },
  },
};
</script>

<style scoped>
.el-radio {
  margin-right: 20px;
}
.label {
  margin-right: 1em;
  width: 220px;
}
</style>