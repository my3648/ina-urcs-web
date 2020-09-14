<template>
  
     <el-card style="position:relative;" :body-style="{ padding: '0px' }">
      <!-- <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image"> -->
      <span class="time" style="position:absolute;top:1em;right:1em">{{programme.calculate.length}}</span>
      
      <div style="height:100px">
        <i  @click="selectProgramme()" class="el-icon-folder-opened" style="font-size:60px;margin:20px;" :style="{color:activeIndex==index?'skyblue':''}"></i>
      </div>
      <div style="padding:14px;">
        <el-input @keyup.enter.native="$event.target.blur" @blur="editShow=false" v-focus="true" v-if="editShow"  size="mini" style="width:100px" v-model="programme.name"></el-input>
        <div class="edit"  v-if="!editShow">{{programme.name}}</div>
        <div style="float:right">
          <i class="el-icon-edit-outline" @click="editProgramme()"></i>
          <i class="el-icon-delete" @click="deleteProgramme()"></i>
          <i class="el-icon-plus" @click.stop="addProgramme()"></i>
        </div>
        <div class="bottom clearfix">
          <div class="time">last modifyed:{{programme.time}}</div>
        </div>
      </div>
    </el-card>
 
</template>

<script>
export default {
  props:['programme','index','activeIndex',''],
  
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
    editProgramme(){
      console.log(this.index);
      
      this.editShow=true;
      // this.$refs.editInput.focus();
      

    },
    deleteProgramme(){
      console.log(this.index);
   
      this.$emit('delete',this.index)

    },
    addProgramme(){
            this.$emit('add',this.index)

    },
    selectProgramme(){
     this.$emit('select',this.index)

    }
  
  }

}
</script>

<style scoped>
.el-card{
  width:200px;
  float:left;
  margin-right:1em;
  border-radius: 10px;
}
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  i{
    cursor:pointer

  }
  .edit{
    overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;width:100px;display:inline-block
  }

</style>