<template>
  <div style="height: 600px;">

    <div style="height: 600px; width: 50%; float: left;">
      <div id="plotter0" style="height: 100%;"></div>
    </div>

    <div style="height: 600px; width: 50%; float: left; overflow: auto;">
      <div id="faultCountArea" style="padding: 0 2em;">
        <h4>Reported DFCS</h4>
        <table class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition first">
          <thead>
            <tr>
              <th class="el-table_1_column_1     is-leaf">time</th>
              <th class="el-table_1_column_2     is-leaf">dfc</th>
              <th class="el-table_1_column_3     is-leaf">channel</th>
              <th class="el-table_1_column_4     is-leaf">filename</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <h4>History DFCS</h4>
        <table class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition second">
          <tbody></tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
export default {};
</script>

<style>
</style>