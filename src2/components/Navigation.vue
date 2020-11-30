<template>
  <div>
    <!-- <el-button @click="set()">setcookie</el-button> -->
    <div style="width: 75%;margin:2em auto 0 auto;">
      <el-row :gutter="12">
        <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8" v-for="(item,index) in cardArr" :key="index">
          <el-card shadow="hover">
            <div @click="href(item.name)" style="text-align:center;width:100%;cursor:pointer" ref="img">
              <!-- :style="{'height':imgHeight}" -->
              <img  :src="require(`@/../static/${item.src}`)" alt=""  style="width:80%;height:250px;" >
            </div>
                        <h1>{{item.name}}</h1>

            <!-- <div style="width:100%"> -->
            <p style="min-height:3em;text-align:center" class="label" v-html="item.description"></p> 
            <!-- style="min-height:10em"  -->
            <div style="text-align:center">
              <el-button @click="href(item.name)" type="primary" style="padding:12px 40px;font-size:14px">
                进入{{item.name}}</el-button>

            </div>
            <!-- </div> -->

          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {cardArr} from '../../static/cardList.js'
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      cardArr: [],
      imgHeight:300,
    };
  },
  created(){
    this.$http.post('http://139.196.196.221:3000/certStatus').then((res)=>{
      console.log(res);
    })
    this.cardArr=cardArr;
    // console.log(this.$refs.img[0].offsetHeight);

  },
  mounted(){
// console.log(this.$refs.img[0].offsetHeight);
this.imgHeight=this.$refs.img[0].offsetHeight
  },
  
  computed:{
    // imgHeight:function(){
      // return this.$refs.img[0].offsetHeight
    // }

  },
  

  methods: {
    set() {
      this.setCookie("token", "value", 7);
      this.setCookie("username", "user", 7);
      localStorage.setItem("token", "value");
      localStorage.setItem("username", "user");
    },
    setCookie(key, value, t) {
      var oDate = new Date();
      oDate.setDate(oDate.getDate() + t);
      document.cookie = key + "=" + value + "; expires=" + oDate.toDateString();
    },
    href(name) {
      // location.href = locationHref;
      if(name=='UCDM'){
        location.href="http://139.196.196.221:3001/"
      }else if(name=="UCOS"){
        this.$router.push({ path: "/ucos" })
      }else if(name=='URCS'){
        this.$router.push({path:"/home"})
      }

    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-col {
  /* height: 580px; */
  padding: 10px 0;
}
.el-card {
  height: 100%;
  background: "rgba(255,255,255,0.8)";
}
.el-card h1 {
  text-align: center;
}
.el-card p {
  font-size: 14px;
  line-height: 2em;
  padding: 0 20px;
}
h2{
  text-align: center;
}
.label{
    color: rgb(158, 158, 158);
font-size: 15px;
/* font-weight: 520; */
}
</style>
