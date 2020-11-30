<template>
  <div>
    <!-- opacity:0.5 -->
    <div style="background:black;opacity:0.75;height:800px;position:absolute;top:0;left:0;right:0;z-index:99;"></div>
    <div class="vid-wrappper">
      <div
        style="z-index:100;position:absolute;top:30%;left:50%;color:#fff;text-align:center;transform:translateX(-50%)">
        <h1 class="ui inverted header" style="font-size:4em">INA URCS</h1>
        <h2>Remote measure, data-insighted apps, intelligence</h2>
      </div>

      <!-- muted静音：可以自动播放 -->
      <!-- <video muted autoplay="autoplay" loop="true">
        <source src="@/assets/urcs-old.mp4" type="video/mp4" />
      </video> -->
    </div>
    <div style="width:1100px;margin:0 auto 2em auto">
      <el-row>
        <el-col :span="12">
          <h2>We Help Automotive Engineers</h2>
          <p>
            We empower calibraion engineers with capability to insight into
            measure data. Delight engineers and extend capacity through cloud
            computation and big data technology.
          </p>
          <h2>We Make Data Products that Run in the Air</h2>
          <p>
            It might sound stuff of dream, but exhaustive testing and data
            checking can be intelligently re-engineered and fun.
          </p>
        </el-col>
        <el-col :span="12">
          <div style="text-align:right;">
            <div style="border:1px #eee solid;width:360px;height:360px;display:inline-block;border-radius:7px">
              <img src="@/assets/big-data-circle.jpg" style=";width:350px" alt="" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
export default {};
</script>

<style scoped>
.vid-wrappper {
  width: 100%;
  height: 800px;
  /* position: relative;
  padding-bottom: 42.06%; 
 
  height: 0; */
  
}

video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 800px;
  object-fit: fill;
}
.el-main p {
  line-height: 2em;
}
</style>