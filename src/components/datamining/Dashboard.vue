<template>
 
    <div>
    <div ref="groupHeight" :style="{ height: heightValue }" style="padding-bottom:1em">
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input2">
      </el-input>
      <h4 style="margin:0.8em 0">方案分组</h4>
      <div style="position:relative">
        <div style="overflow:auto hidden;height:210px;">
          <vuedraggable @update="
                  el => {
                    dragEnd(el, 'activeIndex');
                  }
                " :options="{
                  delay: 10, //按住10ms
                  animation: 300,
                  forceFallback: true,
                  fallbackClass: true,
                  scrollSensitivity: 100,
                  scrollSpeed: 20
                }" v-model="programmeArr" :style="{ width: (programmeArr.length + 1) * 220 + 'px' }">
            <!-- :force-fallback="true"
                :scroll-sensitivity="150"
                :animation="'200ms'"
                  scrollSensitivity:80,
                scrollSpeed: 100 -->
            <!-- length+1的目的是删除时不会出现短暂换行 -->
            <transition-group>
              <programme @select="selectPro" @delete="deletePro" @add="addPro" :programme="programmeArr[index]"
                v-for="(item, index) in programmeArr" ref="proChild" :index="index" :activeIndex="activeIndex"
                :key="index"></programme>
            </transition-group>
          </vuedraggable>
        </div>

        <!-- <div
              style="width:200px;height:180px;background:skyblue;position:absolute;top:0;right:0;z-index:50"
            >
              <el-card style="height:100%"></el-card>
            </div> -->
      </div>
      <!-- <div style="text-align:center;padding:1em">
            <el-button type="primary">创建新的方案</el-button>
          </div> -->
      <el-divider></el-divider>
    </div>

    <div :style="{
            height: 'calc(100vh - ' + (heightValue + 86) + 'px)',
            minHeight: '200px',
            overflow: 'auto'
          }">
      <!-- :options="{
                delay:10,//按住10ms
                animation:300,
              forceFallback:true,fallbackClass:true,scrollSensitivity:80
             
              }" -->
      <vuedraggable v-model="programmeArr[activeIndex].calculate" :move="getdata" @update="
              el => {
                dragEnd(el, 'activeIndex2');
              }
            ">
        <!-- 
             开启后不使用html5拖拽，但偶尔会触发点击事件导致activeindex错误,scrollSensitivity(触发滚动条的px值)依赖于forceFallback
             :options="{animation:300,forceFallback:true,fallbackClass:true,scrollSensitivity:80}" -->

        <transition-group>
          <calculation @click.native="selectCalculate(index)" @delete="deleteCal" @add="addCal"
            :activeIndex2="activeIndex2" :calculate="programmeArr[activeIndex].calculate[index]" ref="calChild"
            v-for="(item, index) in programmeArr[activeIndex]['calculate']" :index="index" :key="index"></calculation>
        </transition-group>
      </vuedraggable>
    </div>
    <div style="float:right">
      <el-button size="mini" type="primary">导入数据</el-button>
      <el-button size="mini" type="primary">使用方案计算</el-button>
    </div>

    </div>


</template>

<script>
import vuedraggable from "vuedraggable";
import programme from "./Programme.vue";
import calculation from "./Calculation.vue";

export default {
  name: "HelloWorld",
  // mixins: [ContainerMixin],

  data() {
    return {
      input1: "",
      input2: "",
      msg: "Welcome to Your Vue.js App",
      heightValue: "",
      activeIndex: 0,
      activeIndex2: 0,
      programmeArr: [
        {
          name: "EAF1内部",
          time: "2020-03-21",
          select: true,
          calculate: [
            { name: "ATM计算", time: "2020-03-21" },
            { name: "BTM计算", time: "2020-03-21" },
            { name: "CTM计算", time: "2020-03-21" },
            { name: "DTM计算", time: "2020-03-21" },
            { name: "ETM计算", time: "2020-03-21" },
            { name: "FTM计算", time: "2020-03-21" }
          ]
        },
        {
          name: "EAF2内部",
          time: "2020-03-22",
          select: false,
          calculate: [
            { name: "ATM计算", time: "2020-03-22" },
            { name: "BTM计算", time: "2020-03-22" },
            { name: "CTM计算", time: "2020-03-22" }
          ]
        },
        {
          name: "EAF3内部",
          time: "2020-03-23",
          select: false,
          calculate: [
            { name: "ATM计算", time: "2020-03-23" },
            { name: "BTM计算", time: "2020-03-23" },
            { name: "CTM计算", time: "2020-03-23" }
          ]
        },
        {
          name: "EAF4内部",
          time: "2020-03-24",
          select: false,
          calculate: [
            { name: "ATM计算", time: "2020-03-24" },
            { name: "BTM计算", time: "2020-03-24" },
            { name: "CTM计算", time: "2020-03-24" }
          ]
        },
        {
          name: "EAF5内部",
          time: "2020-03-25",
          select: false,
          calculate: [
            { name: "ATM计算", time: "2020-03-25" },
            { name: "BTM计算", time: "2020-03-25" },
            { name: "CTM计算", time: "2020-03-25" }
          ]
        },
        {
          name: "EAF5内部",
          time: "2020-03-20",
          select: false,
          calculate: [
            { name: "ATM计算", time: "2020-03-20" },
            { name: "BTM计算", time: "2020-03-20" },
            { name: "CTM计算", time: "2020-03-20" }
          ]
        },
        {
          name: "EAF5内部",
          time: "2020-03-20",
          select: false,
          calculate: [
            { name: "ATM计算", time: "2020-03-20" },
            { name: "BTM计算", time: "2020-03-20" },
            { name: "CTM计算", time: "2020-03-20" }
          ]
        },
        {
          name: "EAF5内部",
          time: "2020-03-20",
          select: false,
          calculate: [
            { name: "ATM计算", time: "2020-03-20" },
            { name: "BTM计算", time: "2020-03-20" },
            { name: "CTM计算", time: "2020-03-20" }
          ]
        },
        {
          name: "EAF5内部",
          time: "2020-03-20",
          select: false,
          calculate: [
            { name: "ATM计算", time: "2020-03-20" },
            { name: "BTM计算", time: "2020-03-20" },
            { name: "CTM计算", time: "2020-03-20" }
          ]
        },
        {
          name: "EAF5内部",
          time: "2020-03-20",
          select: false,
          calculate: [
            { name: "ATM计算", time: "2020-03-20" },
            { name: "BTM计算", time: "2020-03-20" },
            { name: "CTM计算", time: "2020-03-20" }
          ]
        },
        {
          name: "EAF5内部",
          time: "2020-03-20",
          select: false,
          calculate: [
            { name: "ATM计算", time: "2020-03-20" },
            { name: "BTM计算", time: "2020-03-20" },
            { name: "CTM计算", time: "2020-03-20" }
          ]
        },
        {
          name: "EAF5内部",
          time: "2020-03-20",
          select: false,
          calculate: [
            { name: "ATM计算", time: "2020-03-20" },
            { name: "BTM计算", time: "2020-03-20" },
            { name: "CTM计算", time: "2020-03-20" }
          ]
        },
        {
          name: "EAF5内部",
          time: "2020-03-20",
          select: false,
          calculate: [
            { name: "ATM计算", time: "2020-03-20" },
            { name: "BTM计算", time: "2020-03-20" },
            { name: "CTM计算", time: "2020-03-20" }
          ]
        },
        {
          name: "EAF5内部",
          time: "2020-03-20",
          select: false,
          calculate: [
            { name: "ATM计算", time: "2020-03-20" },
            { name: "BTM计算", time: "2020-03-20" },
            { name: "CTM计算", time: "2020-03-20" }
          ]
        },
        {
          name: "EAF5内部",
          time: "2020-03-20",
          select: false,
          calculate: [
            { name: "ATM计算", time: "2020-03-20" },
            { name: "BTM计算", time: "2020-03-20" },
            { name: "CTM计算", time: "2020-03-20" }
          ]
        }
      ]
    };
  },
  created() {
    // 阻止火狐浏览器拖拽自动搜索
    document.body.ondrop = function(event) {
      event.preventDefault();
      event.stopPropagation();
    };
  },
  mounted() {
    this.heightValue = this.$refs.groupHeight.offsetHeight;
  },

  methods: {
    con() {
      console.log(this.programmeArr);
      console.log(this.$refs.groupHeight.offsetHeight);
    },
    deletePro(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if ((this.activeIndex = index)) {
            this.activeIndex = 0;
          } else if (this.activeIndex > index) {
            this.activeIndex -= 1;
          } else if (this.activeIndex < index) {
          }
          if (this.programmeArr.length == 1) {
            return;
          }

          console.log(index);
          this.programmeArr.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    dateFormat(fmt) {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    addPro(index) {
      // var myData = new Date();
      // Date.prototype.Format = function(fmt) {
      //   var o = {
      //     "M+": this.getMonth() + 1, //月份
      //     "d+": this.getDate(), //日
      //     "H+": this.getHours(), //小时
      //     "m+": this.getMinutes(), //分
      //     "s+": this.getSeconds(), //秒
      //     "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      //     S: this.getMilliseconds() //毫秒
      //   };
      //   if (/(y+)/.test(fmt))
      //     fmt = fmt.replace(
      //       RegExp.$1,
      //       (this.getFullYear() + "").substr(4 - RegExp.$1.length)
      //     );
      //   for (var k in o)
      //     if (new RegExp("(" + k + ")").test(fmt))
      //       fmt = fmt.replace(
      //         RegExp.$1,
      //         RegExp.$1.length == 1
      //           ? o[k]
      //           : ("00" + o[k]).substr(("" + o[k]).length)
      //       );
      //   return fmt;
      // };
      var setDate = this.dateFormat();

      this.programmeArr.splice(index + 1, 0, {
        name: "XXX",
        time: setDate,
        calculate: [{ name: "XX计算", time: setDate }]
      });
      console.log(this.$refs.proChild[index + 1].editProgramme());
    },
    selectPro(index) {
      this.activeIndex = index;
      this.activeIndex2 = 0;
      // this.programmeArr.forEach((item, num) => {
      //   item.select = false;
      // });
      // this.programmeArr[index]["select"] = true;
    },
    deleteCal(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if ((this.activeIndex2 = index)) {
            this.activeIndex2 = 0;
          } else if (this.activeIndex2 > index) {
            this.activeIndex2 -= 1;
          } else if (this.activeIndex2 < index) {
          }
          if (this.programmeArr[this.activeIndex].calculate.length == 1) {
            this.$message({
              type: "info",
              message: "至少保留一项"
            });
            return;
          }
          this.programmeArr[this.activeIndex].calculate.splice(index, 1);

          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addCal(index) {
      // var myData = new Date();
      // Date.prototype.Format = function(fmt) {
      //   var o = {
      //     "M+": this.getMonth() + 1, //月份
      //     "d+": this.getDate(), //日
      //     "H+": this.getHours(), //小时
      //     "m+": this.getMinutes(), //分
      //     "s+": this.getSeconds(), //秒
      //     "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      //     S: this.getMilliseconds() //毫秒
      //   };
      //   if (/(y+)/.test(fmt))
      //     fmt = fmt.replace(
      //       RegExp.$1,
      //       (this.getFullYear() + "").substr(4 - RegExp.$1.length)
      //     );
      //   for (var k in o)
      //     if (new RegExp("(" + k + ")").test(fmt))
      //       fmt = fmt.replace(
      //         RegExp.$1,
      //         RegExp.$1.length == 1
      //           ? o[k]
      //           : ("00" + o[k]).substr(("" + o[k]).length)
      //       );
      //   return fmt;
      // };
      var setDate = this.dateFormat();

      this.programmeArr[this.activeIndex].calculate.splice(index + 1, 0, {
        name: "XX计算",
        time: setDate
      });
      console.log(this.$refs.calChild[index + 1].editCalculate());
      //  [index+1].editCalculate()
    },

    selectCalculate(index) {
      this.activeIndex2 = index;
    },
    getdata(evt) {
      // console.log(evt.draggedContext.filterKey);
      //这里evt.draggedContext后续的内容根据具体的定义变量而定
    },
    dragEnd(evt, activeIndex) {
      // console.log(this[activeIndex]);
      console.log("拖动前的索引 :" + evt.oldIndex);
      console.log("拖动后的索引 :" + evt.newIndex);
      if (evt.oldIndex == this[activeIndex]) {
        this[activeIndex] = evt.newIndex;
        // console.log('=');
        // console.log(this.activeIndex2);
      } else if (
        evt.oldIndex > this[activeIndex] &&
        evt.newIndex <= this[activeIndex]
      ) {
        this[activeIndex] += 1;
        //  console.log('+');
        //  console.log(this.activeIndex2);
      } else if (
        evt.oldIndex < this[activeIndex] &&
        evt.newIndex >= this[activeIndex]
      ) {
        this[activeIndex] -= 1;
        //  console.log('-');
        //  console.log(this.activeIndex2);
      }
    }
  },
  components: {
    programme: programme,
    calculation: calculation,
    vuedraggable: vuedraggable
  }
};
</script>

<style scoped>
/* *{
  margin:0;
  padding:0;
} */
.el-main .el-divider--horizontal {
  margin: 1em 0 0 0;
  overflow: hidden;
}

/* .el-menu-item p{
 
  color:#999;
} */
</style>
