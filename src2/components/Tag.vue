<template>
  <!-- 因为editPackage不得已 另起组件 ？？-->
  <div> 
    <div class="title" v-if="index==0">
    <span @dblclick="editTitle=true" v-if="!editTitle" style="font-weight:600">&nbsp;&nbsp;{{title}}:</span>
    <el-input @keyup.enter.native="editTitle=false"  placeholder="请输入分组名"   v-focus="true"  v-if="editTitle" v-model="title"
      size="mini"></el-input>
    <el-button v-if="editTitle" @click="editTitle=false" type="primary" size="mini">确定</el-button>


    </div>

    <el-tag  v-if="!editPackage" @close="handleClose()" @dblclick.native="showEditPackage()" :disable-transitions="true" closable type="">
      {{ tag }}
    </el-tag>

    <el-input @keyup.enter.native="editPackage=false" ref="tagInput" placeholder="请输入标签名"   v-focus="true"  @blur="allBlur($event)" v-if="editPackage" v-model="input"
      size="mini"></el-input>
       <!-- @change="returnTagFn($event)" -->
    <el-input @keyup.enter.native="editPackage=false" ref="dictInput" placeholder="请输入英文名" @change="dictChange($event)"  @blur="allBlur($event)" v-if="editPackage&&enshow" v-model="dict"
      size="mini"></el-input>
     <!-- <div @click="dict[input]=4545"></div>  -->
      <el-button v-if="editPackage" @click="editPackage=false" type="primary" size="mini">确定</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
    //  input:this.tag,
    //  放这里不行，添加行时会出错？ 不能及时更新input
      dict: this.tagDict||'',
      

      editPackage: false,
      editTitle:false
    };
  },
  computed:{
    input:{
     get(){
       return this.tag
     },
     set(val){
   this.$emit("update:tag", val)
     }
    },
    title:{
     get(){
       return this.name
     },
     set(val){
        this.$emit("update:name", val)
     }
    },
    // dict:{
    //  get(){
    //    return this.tagDict||''
    //  },set(val){
    //    console.log(val);
    //    this.$emit("update:tagDict", val)
    //  }
    // }
  },
  directives: {
    focus: {
      inserted: function(el, { value }) {
        if (value) {
          console.log(value);
          el.children[0].focus();
        }
      }
    }
  },
  props: { tag: String,tagDict:String,name:String,index:Number,enshow:Boolean},

  methods: {
    // returnTagFn(e) {
    //   console.log(e);

    //   this.$emit("update:tag", this.input);
    // },
    showEditPackage() {
      this.editPackage = true;
    },
    handleClose() {
      this.$emit("delete", this.input);
    },
    dictChange(e){
      console.log(e);
      console.log(this.dict);
         this.$emit("update:tagDict", e);
    },
    allBlur(e){
     

    }
  }
};
</script>

<style>
.el-tag {
  margin: 0.2em 0.4em;
}
.package i {
  cursor: pointer;

}
.packageDiv .el-input {
  display: inline-block;
  width: 120px;
}
  .package{
    
    border-bottom:1px dashed #ccc;
    padding:0.5em 0;
    min-height:32px;
  }
  .title{
    display: inline-block;
  }
</style>
