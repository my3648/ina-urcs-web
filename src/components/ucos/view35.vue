<template>
  <div>
    <el-table :data="advice" border style="width: 100%">
      <el-table-column type="index" width="90">
      </el-table-column>
      <el-table-column prop="name" label="所属功能包" width="220">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name"></el-input>

        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容">
        <template slot-scope="scope">
          <el-input type="textarea" :rows="2" v-model="scope.row.content"></el-input>

        </template>

      </el-table-column>
    </el-table>
    <div style="text-align: right;margin:0.6em 0">
      <i class="el-icon-minus" @click="minusTable"></i>
      <i class="el-icon-plus" @click="plusTable"></i>

    </div>
    <div style="text-align: right;margin:0.6em 0">
      <el-button type="primary" @click="submit" style="width:90px">提交</el-button>

    </div>

    <input type="hidden" name="advice" v-model="JSON.stringify(advice)">

  </div>
</template>

<script>
export default {
  data() {
    return {
      advice: [
        {
          name: "",
          content: "",
        },
      ],
    };
  },
  methods: {  
    minusTable() {
      if (this.advice.length > 1) {
        this.advice.pop();
      }
    },
    plusTable() {
      this.advice.push({
        name: "",
        content: "",
      });
    },
    submit() {
      this.$emit("submit");
    },
  },
};
</script>

<style scoped>
i {
  font-size: 28px;
  cursor: pointer;
}
</style>