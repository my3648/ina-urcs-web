<template>
  <div style="position:relative">

    <div style="margin:0.8em 0">
      <h3>PG输入</h3>
      <span class="label">机型</span>
      <el-select v-model="plat54_1" name="plat54_1">

        <el-option value="三缸机"></el-option>
        <el-option value="四缸机"></el-option>
      </el-select>

    </div>
    <div style="margin:0.8em 0">
      <span class="label">长齿齿宽对应的曲轴转角</span>
      <el-input v-model="plat54_2" name="plat54_2"></el-input>
    </div>
    <div style="margin:0.8em 0">
      <span class="label">短齿齿宽对应的曲轴转角</span>
      <el-input v-model="plat54_3" name="plat54_3"></el-input>
    </div>
    <div style="margin:0.8em 0">
      <span class="label">进气PG传感器中心线到第一齿齿边的角度（图示β角）:</span>
      <el-input v-model="plat54_4" name="plat54_4"></el-input>
    </div>
    <div style="margin:0.8em 0">
      <span class="label">排气PG传感器中心线到第一齿齿边的角度:</span>
      <el-input v-model="plat54_5" name="plat54_5"></el-input>
    </div>
    <div style="margin:0.8em 0">
      <div class="label">进气PG的齿序:</div>

    </div>
    <!-- <h4>进气PG的齿序:</h4> -->
    <div class="row" style="margin:0.8em 0">

      <div>
        <el-select v-model="inlet_0">
          <el-option value="长高"></el-option>
          <el-option value="短低"></el-option>
          <el-option value="长低"></el-option>
          <el-option value="短高"></el-option>
        </el-select>
        <el-select v-model="inlet_1">
          <el-option value="长高"></el-option>
          <el-option value="短低"></el-option>
          <el-option value="长低"></el-option>
          <el-option value="短高"></el-option>
        </el-select>
        <el-select v-model="inlet_2">
          <el-option value="长高"></el-option>
          <el-option value="短低"></el-option>
          <el-option value="长低"></el-option>
          <el-option value="短高"></el-option>
        </el-select>
        <el-select v-model="inlet_3">
          <el-option value="长高"></el-option>
          <el-option value="短低"></el-option>
          <el-option value="长低"></el-option>
          <el-option value="短高"></el-option>
        </el-select>
        <el-select v-model="inlet_4">
          <el-option value="长高"></el-option>
          <el-option value="短低"></el-option>
          <el-option value="长低"></el-option>
          <el-option value="短高"></el-option>
        </el-select>
        <el-select v-model="inlet_5">
          <el-option value="长高"></el-option>
          <el-option value="短低"></el-option>
          <el-option value="长低"></el-option>
          <el-option value="短高"></el-option>
        </el-select>
        <el-select v-model="inlet_6">
          <el-option value="长高"></el-option>
          <el-option value="短低"></el-option>
          <el-option value="长低"></el-option>
          <el-option value="短高"></el-option>
        </el-select>
        <el-select v-model="inlet_7">
          <el-option value="长高"></el-option>
          <el-option value="短低"></el-option>
          <el-option value="长低"></el-option>
          <el-option value="短高"></el-option>
        </el-select>
      </div>
    </div>
    <div style="margin:0.8em 0">
      <div class="label">排气PG的齿序:</div>

    </div>

    <div class="row" style="margin:0.8em 0">

      <div>
        <el-select v-model="exhaust_0">
          <el-option value="长高"></el-option>
          <el-option value="短低"></el-option>
          <el-option value="长低"></el-option>
          <el-option value="短高"></el-option>
        </el-select>
        <el-select v-model="exhaust_1">
          <el-option value="长高"></el-option>
          <el-option value="短低"></el-option>
          <el-option value="长低"></el-option>
          <el-option value="短高"></el-option>
        </el-select>
        <el-select v-model="inlet_2" disabled>
          <el-option value="长高"></el-option>
          <el-option value="短低"></el-option>
          <el-option value="长低"></el-option>
          <el-option value="短高"></el-option>
        </el-select>
        <el-select v-model="inlet_3" disabled>
          <el-option value="长高"></el-option>
          <el-option value="短低"></el-option>
          <el-option value="长低"></el-option>
          <el-option value="短高"></el-option>
        </el-select>
        <el-select v-model="inlet_4" disabled>
          <el-option value="长高"></el-option>
          <el-option value="短低"></el-option>
          <el-option value="长低"></el-option>
          <el-option value="短高"></el-option>
        </el-select>
        <el-select v-model="inlet_5" disabled>
          <el-option value="长高"></el-option>
          <el-option value="短低"></el-option>
          <el-option value="长低"></el-option>
          <el-option value="短高"></el-option>
        </el-select>
        <el-select v-model="inlet_6" disabled>
          <el-option value="长高"></el-option>
          <el-option value="短低"></el-option>
          <el-option value="长低"></el-option>
          <el-option value="短高"></el-option>
        </el-select>
        <el-select v-model="inlet_7" disabled>
          <el-option value="长高"></el-option>
          <el-option value="短低"></el-option>
          <el-option value="长低"></el-option>
          <el-option value="短高"></el-option>
        </el-select>
      </div>
    </div>
    <div style="margin:0.8em 0">

      <span class="label">一缸压缩上止点距离系统零点的角度</span>
      <el-input v-model="plat54_6" name="plat54_6"></el-input>
      <span class="label" style="margin-left:3em;">DG传感器的信号轮</span>
      <el-input v-model="plat54_7" name="plat54_7"></el-input>

    </div>
    <input type="hidden" name="inlet" v-model="inlet">
    <input type="hidden" name="exhaust" v-model="exhaust">
    <el-button type="primary" @click="submit" style="width:90px;margin-left:1em;float:right">提交</el-button>

    <!-- 加上有name的隐藏输入框，这样就不用父组件来取值了 -->

    <div style="position:absolute;top:0;right:0;height:500px">
      <img style="height:100%" src="@/../static/FA4EPMCalGenerate.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plat54_1: "",
      plat54_2: "",
      plat54_3: "",
      plat54_4: "",
      plat54_5: "",
      plat54_6: "",
      plat54_7: "",
      inlet_0: "长高",
      inlet_1: "长高",
      inlet_2: "长高",
      inlet_3: "长高",
      inlet_4: "长高",
      inlet_5: "长高",
      inlet_6: "长高",
      inlet_7: "长高",
      exhaust_0: "长高",
      exhaust_1: "长高",
      inlet: "",
      exhaust: "",
    };
  },
  props: ["projectNumber", "email"],

  methods: {
    submit() {
      var arr = [];
      for (var i = 0; i < 8; i++) {
        arr.push(this["inlet_" + i]);
      }
      this.inlet = JSON.stringify(arr);
      this.exhaust = JSON.stringify([
        this.exhaust_0,
        this.exhaust_1,
        this.inlet_2,
        this.inlet_3,
        this.inlet_4,
        this.inlet_5,
        this.inlet_6,
        this.inlet_7,
      ]);
      this.$nextTick(() => {
        this.$emit("submit");
      });

      // var formData = new FormData(this.$refs.form54);

      //     if (this.projectNumber) {
      //       formData.append("projectNumber", this.projectNumber);
      //     } else {
      //       this.warnModal("请填写项目号。");
      //       return;
      //     }

      //     formData.append("email", this.email);
      // for (var [a, b] of formData.entries()) {
      //       console.log(a, b);
      //     }
      //     this.$emit("infoModal", true);
      // this.$http
      //   .post("http://139.196.196.221:8081/submit54url", formData)
      //   .then((res) => {
      //     console.log(res);
      //     this.$emit("infoModal", false);

      //     this.infoModal("ok", "上传文件成功。");
      //   })
      //   .catch((res) => {
      //     this.$emit("infoModal", false);

      //     this.infoModal("nok", "上传文件失败。");
      //   });
    },
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 150px;
}
.label {
  margin-right: 1em;
}
.row .el-select {
  width: 80px;
  margin-right: 0.5em;
}
</style>