<template>

    <el-card :body-style="{ padding: '0px' }">
     
      <div class="cardIn">
        <div style="position:absolute;right:14px;top:7px">
                <i :class="boxData['4gOnline']?'':''" class="iconfont icon-lixian"></i>
<!-- <i class="iconfont icon-WiFi"></i> -->
        </div>
        

        <h4>{{boxData.snNumber}}</h4>
          <p>4G:{{boxData['4gOnline']?'在线':'不在线'}}</p>
                     <p>记录速度:{{boxData.Recording_Status}}</p>
                     <p>记录仪位置:{{boxData.address}}</p>
                    <p>项目号:{{boxData.xmh}}</p>
                    <p>当前用户:{{boxData.user||'无'}}</p>
        <div class="bottom clearfix">
          <!-- <time class="time">{{ 'dff' }}</time> -->
          <el-button type="text" class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card>
 
  
</template>

<script>
import '@/assets/download/iconfont.css'
export default {
  props: ['boxData','buttonShow'],
    data(){
          return {
            // username: localStorage.getItem('username')
            username:'dd'
          }
        },

}
</script>

<style scoped>

.el-card h4,p{
  margin-top:0;
  margin-bottom:0.5em;
  
}
.el-card p{
  font-size:14px;
}
.el-card .icon-lixian{
  color:#777
}
.el-card .icon-WiFi{
  color:#67C23A
}
.overview .el-col{
  margin-bottom:1em;
}
.el-card i{
  font-size:36px;
}
.el-card .cardIn{
 padding: 14px;position:relative
}

</style>