<template>
  <!-- @size-change="nameSizeChange" -->
  <el-pagination
    @current-change="nameCurrentChange"
    :current-page="page.currentPage"
    :page-size="page.pageSize"
    layout="total, prev, pager, next, jumper"
    :total="page.totalPage"
  >
  </el-pagination>
</template>

<script>
export default {
  props: {
    result: {
      //要显示的数据
      type: Array
    }
  },

  data() {
    return {
      page: {}
    };
  },
  mounted() {},
  created() {
    this.page = {
      totalPage: this.result.length, //总页数
      pageSize: 10, //每页显示数量
      currentPage: 1 //当前页 (改变后只是显示更改 ,无法通过改变此值来切换页码)
    };
  },
  methods: {
    //    nameSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    nameCurrentChange(currentPage, result = this.result) {
      this.page.currentPage = currentPage;
      console.log(`当前页: ${currentPage}`);
      console.log(this.page.currentPage);

      //
      let start = (currentPage - 1) * this.page.pageSize;
      let end = currentPage * this.page.pageSize;
      console.log(start,end);
      var tableData = result.slice(start, end);
      console.log(tableData);
      this.$emit("update:tableData", tableData);
      console.log(result);

      // this.$parent.tableData=tableData

      // let length = result.length;
      // console.log(start,end,length);
      // this.tableData = [];
      // this.tableData = result.slice(start, end);
    }
  },
  watch: {
    result(val, oldval) {
      //  console.log('tableData'+JSON.stringify(val));
      console.log(val.length);
      // if(val.length-oldval.length==1){
      //   // var index=Math.floor(val.length / this.page.pageSize);
        
      // }else if(val.length-oldval.length==-1){
      //   if(this.page.currentPage>1){
      //     var index=this.page.currentPage-1
      //   }else{
      //     var index=1
      //   }
      // }else{
      //   var index=1
      // }

      // ----
      // if(val.length!=oldval.length){
      //   if(oldval.length==0){
      //     var index=1
      //   }else if(val.length-oldval.length==1||val.length-oldval.length==-1){
          
      //   }
      //   else if (val.length % this.page.pageSize > 0) {
      //   var index = Math.ceil(val.length / this.page.pageSize);
      // } else if (val.length % this.page.pageSize == 0) {
      //   var index = Math.floor(val.length / this.page.pageSize);
      // }
      // }
      if(val.length!=oldval.length){
        if(oldval.length==0){
          var index=1
        }else if(val.length-oldval.length==1){
         
        }else if(val.length-oldval.length==-1){
         
        }else{
          var index=1
          
        }
      
      }

      this.page.totalPage = val.length;
      this.page.currentPage = index || this.page.currentPage;
      console.log(this.page.currentPage);
      this.nameCurrentChange(this.page.currentPage);
    }
  }
};
</script>

<style></style>
