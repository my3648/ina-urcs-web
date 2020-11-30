<template>
  <div>
    <h3>Task Definition</h3>
    <el-form ref="deviceFormName" :inline="true" :model="deviceForm" class="demo-form-inline">
      <el-form-item label="ProjectId" prop="projectId">
        <el-select size="medium" clearable v-model="deviceForm.projectId" filterable>
          <el-option v-for="(item,index) in projectIdList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="DeviceSN" prop="sn">
        <el-select size="medium" clearable v-model="deviceForm.sn" filterable>
          <el-option v-for="(item,index) in snList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="Package" prop="package">
        <el-select size="medium" clearable v-model="deviceForm.package" filterable>
          <el-option v-for="(item,index) in packageList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="Task" prop="task">
        <el-select size="medium" clearable v-model="deviceForm.task" filterable>
          <el-option v-for="(item,index) in taskList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="CommentKeyword" prop="commentKeyword">
        <el-select size="medium" clearable v-model="deviceForm.commentKeyword" filterable>
          <el-option v-for="(item,index) in commentKeywordList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-card class="box-card" style="width:380px;float:left;margin-right:20px">
        <div slot="header" class="clearfix">
          <div class="title">Calculation Cycle</div>
          <el-radio-group v-model="deviceForm.radio">
            <el-radio :label="1">Everyday</el-radio>
            <el-radio :label="3">Every 3 days</el-radio>
            <el-radio :label="7">Once a week</el-radio>
            <el-radio :label="14">Once two week</el-radio>
          </el-radio-group>

          <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <div>

        </div>

      </el-card>
      <el-card class="box-card" style="width:380px;float:left">
        <div slot="header" class="clearfix">
          <div class="title">Only Once</div>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
      </el-card>

    </el-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      deviceForm: {
        projectId: "",
        sn: "",
        package: "",
        task: "",
        commentKeyword: "",
        radio: 3
      }
    };
  }
};
</script>

<style scoped>
.box-card /deep/ .title {
  font-weight: 650;
  text-align: center;
}
</style>