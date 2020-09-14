<template>
    <el-card
            :body-style="{
              padding: '0 1em',
              display: 'flex',
              'align-items': 'center',
              height: '100%'
            }" 
            :style="{color:activeIndex2==index?'skyblue':'',border:activeIndex2==index?'1px skyblue solid':''}"
            
          >
            <i class="el-icon-collection-tag" style="font-size:20px;"></i>
            <el-input  @keyup.enter.native="$event.target.blur" @blur="editShow=false" v-focus="true" v-if="editShow"  size="mini" style="width:100px" v-model="calculate.name"></el-input>

            <span v-if="!editShow" style="margin:0 1em;font-size:14px">{{calculate.name}}</span>
            <div class="time">last modifyed:{{calculate.time}}</div>
            <div style="flex:1;text-align:right;overflow:hidden;">
              <i class="el-icon-edit-outline" @click.stop="editCalculate()"></i>
              <i class="el-icon-delete" @click.stop="deleteCalculate()"></i>
              <i class="el-icon-plus" @click.stop="addCalculate()"></i>

            </div>
          </el-card>
</template>

<script>
export default {
props:['calculate','index','activeIndex2'],
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
  data(){
    return{
      editShow:false
    }
  },
    methods:{
    editCalculate(){
      console.log(this.index);
      
      this.editShow=true;
      // this.$refs.editInput.focus();
      

    },
    deleteCalculate(){
      console.log(this.index);
   
      this.$emit('delete',this.index)

    },
    addCalculate(){
            this.$emit('add',this.index)

    }
    // 不能再组件整体直接写函数 放在父组件了
    // selectCalculate(){
    //   console.log(this.index);
    //  this.$emit('select',this.index)

    // }
  
  }
}
</script>

<style scoped>
.el-card{
  margin:0.75em 0;
  height:40px;
  width:100%;
  border-radius:20px;
  box-sizing:border-box;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,.1);
}
.time {
  font-size: 13px;
  color: #999;
}
i{
  cursor:pointer
}

</style>