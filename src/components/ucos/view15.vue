<template>
  <div>
    <h4>可输入期望合并的开始和结束时间，留空则默认全过程合并(单位/s)。</h4>
    <div style="margin:0.8em 0">
      <span class="label" style="margin-right:1em">WLTC test phase1 mass(g)
      </span>
      <el-input v-model="RPAdata.rpa1"></el-input>
      <span class="label" style="margin-right:1em">WLTC test phase2 mass(g)
      </span>
      <el-input v-model="RPAdata.rpa2"></el-input>

    </div>
    <div style="margin:0.8em 0">
      <span class="label" style="margin-right:1em">WLTC test phase3 mass(g)
      </span>
      <el-input v-model="RPAdata.rpa3"></el-input>
      <span class="label" style="margin-right:1em">WLTC test phase4 mass(g)
      </span>
      <el-input v-model="RPAdata.rpa4"></el-input>

    </div>
    <div style="margin:0.8em 0">
      <el-checkbox v-model="rpaCheckbox">汇总数据</el-checkbox>
      <span style="margin:0 1em 0 3em;color: #606266;
font-weight: 500;font-size:14px">油品：
      </span>
      <el-input size="mini" :disabled="disabled" style="width:150px" name="info_collect" v-model="info_collect">
      </el-input>

    </div>
    <div style="margin:0.8em 0">
      <el-checkbox v-model="PHEVOVC" :label="true" name="PHEVOVC">OVC-HEV项目</el-checkbox>
    </div>
    <h4>法规限值</h4>
    <div style="margin:0 0 0.8em 0">
      <span class="label" style="margin-right:1em">NOx(g/km)
      </span>
      <el-input v-model="em_limit.NOx"></el-input>
      <span class="label" style="margin-right:1em">CO(g/km)
      </span>
      <el-input v-model="em_limit.CO"></el-input>
      <span class="label" style="margin-right:1em">PN(#/km)
      </span>
      <el-input v-model="em_limit.PN"></el-input>
      <span class="label" style="margin-right:1em">CF_limit
      </span>
      <el-input v-model="em_limit.CF_limit"></el-input>
    </div>

    <input type="hidden" name="RPAdata" v-model="JSON.stringify(RPAdata)">
    <input type="hidden" name="em_limit" v-model="JSON.stringify(em_limit)">
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      RPAdata: {
        rpa1: "",
        rpa2: "",
        rpa3: "",
        rpa4: "",
      },
      rpaCheckbox: false,
      info_collect: "",
      disabled: true,
      PHEVOVC: false,
      em_limit: {
        NOx: "",
        CO: "",
        PN: "",
        CF_limit: "",
      },
    };
  },
  methods: {
    // onlyNumber(e){
    //   console.log(e.target.value);
    //   e.target.value = e.target.value.replace(/[^\d|\.|\-]/g, "");
    // }
  },
  watch: {
    rpaCheckbox(val) {
      if (val) {
        this.disabled = false;
      } else {
        this.info_collect = "";
        this.disabled = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 150px;
  margin-right: 2em;
}
</style>