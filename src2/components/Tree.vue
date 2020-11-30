<template>
  <div>
    <vue2-org-tree :data="data" :horizontal="true" :label-class-name="labelClassName" collapsable @on-expand="onExpand"
      @on-node-click="NodeClick" @on-node-mouseover="onMouseover" @on-node-mouseout="onMouseout"
      :renderContent="renderContent()"
      >
    </vue2-org-tree>

    <div @focusin="focusinPopover()" @focusout="focusoutPopover()" @mouseenter="mouseenterPopover()"
      @mouseleave="mouseleavePopover()" v-show="BasicSwich" role="tooltip" id="el-popover-5617" aria-hidden="true"
      class="el-popover el-popper el-popover--plain floating"
      style="width: 200px; transform-origin: center bottom 0px; z-index: 2053;" tabindex="0">
      <div class="el-popover__title">标题</div>
      <!-- 这是一段内容,这是一段内容,这是一段内容,这是一段内容。 -->
      <p>ID:{{BasicInfo.id}}</p>
      <p>Name:{{BasicInfo.label}}</p>
      <div x-arrow="" class="popper__arrow" style="left: 47.25px;"></div>
    </div>
    <!-- <div v-show="BasicSwich" class="floating">
      <p>ID:{{BasicInfo.id}}</p>
      <p>Name:{{BasicInfo.label}}</p>
    </div> -->
  </div>

  <!-- collapsable -->
</template>

<script>
export default {
  data() {
    return {
      data: {
        id: 0,
        label: "XXX科技有限公司",
        children: [
          {
            id: 2,
            label: "产品研发部",
            children: [
              {
                id: 5,
                label: "研发-前端"
              },
              {
                id: 6,
                label: "研发-后端"
              },
              {
                id: 9,
                label: "UI设计"
              },
              {
                id: 10,
                label: "产品经理"
              }
            ]
          },
          {
            id: 3,
            label: "销售部",
            children: [
              {
                id: 7,
                label: "销售一部"
              },
              {
                id: 8,
                label: "销售二部"
              }
            ]
          },
          {
            id: 4,
            label: "财务部"
          },
          {
            id: 9,
            label: "HR人事"
          },
          {
            id: 1,
            label: "+"
          }
        ]
      },
      labelClassName: "bg-color-orange",
      BasicSwich: false,
      BasicInfo: { id: null, label: null }
    };
  },
  methods: {
    // focusinPopover() {
    //   console.log("in");

    //   Object(r.a)(this.referenceElm, "focusing"),
    //     ("click" !== this.trigger && "focus" !== this.trigger) ||
    //       (this.showPopper = !0);
    // },
    // focusoutPopover() {
    //   console.log("out");
    //   Object(r.i)(this.referenceElm, "focusing"),
    //     ("click" !== this.trigger && "focus" !== this.trigger) ||
    //       (this.showPopper = !1);
    // },
    mouseenterPopover() {
      // console.log("enter");
      // var e = this;
      // clearTimeout(this._timer),
      //   this.openDelay
      //     ? (this._timer = setTimeout(function() {
      //         e.showPopper = !0;
      //       }, this.openDelay))
      //     : (this.showPopper = !0);
    },
    mouseleavePopover() {
       this.BasicSwich = false;
      // console.log("leave");
      // var e = this;
      // clearTimeout(this._timer),
      //   this.closeDelay
      //     ? (this._timer = setTimeout(function() {
      //         e.showPopper = !1;
      //       }, this.closeDelay))
      //     : (this.showPopper = !1);
    },
    collapse(list) {
      var _this = this;
      list.forEach(function(child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
      });
    },
    onExpand(e, data) {
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
    },
    toggleExpand(data, val) {
      var _this = this;
      if (Array.isArray(data)) {
        data.forEach(function(item) {
          _this.$set(item, "expand", val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
      }
    },
    NodeClick(e, data) {
      console.log(e);
      // e 为 event
      console.log(data);
      // 当前项的所有详情 如：id label children
    },
    onMouseout(e, data) {
      // this.BasicSwich = false;
    },
    onMouseover(e, data) {
      this.BasicInfo = data;
      this.BasicSwich = true;
      var floating = document.getElementsByClassName("floating")[0];
      floating.style.left = e.clientX + "px";
      floating.style.top = e.clientY + "px";
    },
    renderContent(){
      
    }
  },
  mounted() {
    this.toggleExpand(this.data, true);
    $('.org-tree-node-label-inner')
  }
};
</script>

<style>
.bg-color-orange {
  color: #fff;
  background-color: orange;
}
.floating {
  /* background: rgba(0, 0, 0, 0.7);
  width: 160px;
  height: 100px; */
  position: absolute;
  color: #fff;
  /* padding-top: 15px;
  border-radius: 15px;
  padding-left: 15px;
  box-sizing: border-box; */
  left: 0;
  top: 0;
  transition: all 0.3s;
  /* z-index: 999;
  text-align: left;
  font-size: 12px; */
}
</style>