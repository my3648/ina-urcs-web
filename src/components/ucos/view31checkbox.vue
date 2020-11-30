<template>
  <div class="checkRow">
    <i class="el-icon-remove-outline" v-show="isShow" @click="isShow=false"></i>
    <i class="el-icon-circle-plus-outline" v-show="!isShow" @click="isShow=true"></i>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{title}}
    </el-checkbox>
    <transition name="fade">
      <div class="childRow" v-show="isShow">
        <!-- @change="handlecheckedConfigChange" -->
        <el-checkbox-group v-model="childValue" transiton="fade">
          <el-checkbox v-for="cfg in config" :label="cfg" :key="cfg">{{cfg}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </transition>

  </div>
</template>
<script>
// const config = ['上海', '北京', '广州', '深圳'];
export default {
  data() {
    return {
      checkAll: false,
      // OPTValue: [],
      // config: config,
      childValue: [],
      isIndeterminate: false,
      isShow: false,
    };
  },
  props: { title: String, config: Array, OPTValue: Array },
  watch: {
    childValue: {
      handler(val) {
      
        // this.OPTValue=val;
        // this.OPTValue=val;
        this.handlecheckedConfigChange(val);
      },
      deep: true,
      immediate: true,
    },
    OPTValue: {
      handler(val) {
       
        this.childValue = val;
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    handleCheckAllChange(val) {
      this.childValue = val ? this.config : [];
      // this.$emit("OPTUpdate", this.title, val ? this.config : []);
      // this.handlecheckedConfigChange(this.childValue);
      this.isIndeterminate = false;
    },
    handlecheckedConfigChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.config.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.config.length;
      this.$emit("OPTUpdate", this.title, value);
    },
  },
};
</script>

<style scoped>
.checkRow {
  margin: 1em 0;
}
.childRow {
  margin: 5px 0 5px 35px;
}
.childRow .el-checkbox {
  margin: 0.5em 0;
  display: block;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
i {
  cursor: pointer;
  font-size: 22px;
  vertical-align: middle;
}
</style>