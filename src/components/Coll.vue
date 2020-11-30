<template>
  <el-collapse-item>
    <template slot="title">
      <div style="line-height:18px;font-size:18px">
        <i class="el-icon-location-information"></i>{{sn}}
      </div>
    </template>
    <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">

      <el-table-column label="Name" prop="name">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" style="width:100px" placeholder="搜索" />
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          操作
        </template>
        <template slot-scope="scope">
          <el-button circle size="mini" @click="P(scope.$index, scope.row)">&nbsp;P&nbsp;</el-button>
          <el-button circle size="mini" type="danger" @click="B(scope.$index, scope.row)">B</el-button>
          <el-button circle size="mini" type="danger" @click="S(scope.$index, scope.row)">S</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-collapse-item>

</template>

<script>
export default {
  data() {
    return {
      search:'',
      newCanvas:this.canvas
      // tableData: [
      //   {
      //     name: "nmot_1",
      //   },
      //   {
      //     name: "nmot_2",
      //   },
      //   {
      //     name: "nmot_3",
      //   },
      //   {
      //     name: "nmot_4",
      //   },
      // ],
    };
  },
  methods:{
    P(index,row){
      console.log(index,row);
      this.newCanvas[0]['plotdata']['physical'].push({name:row.name,data:row.data})

      this.$emit('updata:canvas',this.newCanvas)
    },
    
  },
  props:['tableData','sn','canvas'],
  mounted() {},
};
</script>

<style>
</style>