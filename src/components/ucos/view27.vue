<template>
  <div>
        <div id="engineer_rank" style="height: 1200px;width:50%;float:left;"></div>
        <div id="function_rank" style="height: 1200px;width:50%;float:left;"></div>

  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  mounted(){
    this.$http.post('http://139.196.196.221:8081/rankChart',JSON.stringify({
      username: localStorage.getItem("username"),
    })).then((res)=>{
      var {data}=res
         console.log(data);
      // var data=[{Tools:['a','b','c'],Times:[3,2,1]},{Users:['d','e','f'],Times:[3,2,1]}]
      var XArr1 = data[0]["users"];
      var XArr2 = data[1]["users"];
      var YArr1 = data[0]["values"];
      var YArr2 = data[1]["values"];
      // YArr1 = YArr1.filter((item, index) => {
      //   return item != 0
      // })
      // YArr2 = YArr2.filter((item, index) => {
      //   return item != 0
      // })
      // XArr1.slice(0, YArr1.length);
      // XArr2.slice(0, YArr2.length);
      var YArray1 = [];
      var YArray2 = [];
      // for (var a in data[0]) {
      //   XArr1.push(a);
      //   YArr1.push(data[0][a]);

      // }
      YArr1.forEach((item, index) => {
        if (index == 0) {
          YArray1.push({
            y: item,
            color: "#f15c80",
          });
        } else if (index == 1) {
          YArray1.push({
            y: item,
            color: "#f7a35c",
          });
        } else if (index == 2) {
          YArray1.push({
            y: item,
            color: "#90ed7d",
          });
        } else {
          YArray1.push({
            y: item,
          });
        }
      });

      // for (var a in data[1]) {
      //   XArr2.push(a);
      //   YArr2.push(data[1][a]);
      // }
      YArr2.forEach((item, index) => {
        if (index == 0) {
          YArray2.push({
            y: item,
            color: "#f15c80",
          });
        } else if (index == 1) {
          YArray2.push({
            y: item,
            color: "#f7a35c",
          });
        } else if (index == 2) {
          YArray2.push({
            y: item,
            color: "#90ed7d",
          });
        } else {
          YArray2.push({
            y: item,
          });
        }
      });
      console.log(YArray2)
      var height = 20 * (YArray2.length) + 'px'
      console.log(height);
      $('#engineer_rank').css('height', height)
      $('#function_rank').css('height', height)


      var chart = Highcharts.chart("function_rank", {
        chart: {
          type: "bar",
        },
        credits: {
          enabled: false,
        },
        title: {
          text: "UCOS功能排行",
        },
        // subtitle: {
        //   text: '数据来源: Wikipedia.org'
        // },
        xAxis: {
          categories: XArr1,
          title: {
            text: "离线功能",
          },
        },
        yAxis: {
          min: 0,
          tickInterval: 1,
          title: {
            text: "使用次数",
            align: "high",
          },
          labels: {
            overflow: "justify",
          },
        },
        tooltip: {
          valueSuffix: "次",
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
              allowOverlap: true, // 允许数据标签重叠
            },
          },
        },
        legend: {
          enabled: false,
          // layout: 'vertical',
          // align: 'right',
          // verticalAlign: 'top',
          // x: -40,
          // y: 100,
          // floating: true,
          // borderWidth: 1,
          // backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
          // shadow: true
        },
        series: [{
          name: "数据",
          data: YArray1,
        }, ],
      });

      var chart = Highcharts.chart("engineer_rank", {
        chart: {
          type: "bar",
        },
        credits: {
          enabled: false,
        },
        title: {
          text: "工程师使用排行",
        },
        // subtitle: {
        //   text: '数据来源: Wikipedia.org'
        // },
        xAxis: {
          categories: XArr2,
          title: {
            text: "工程师",
          },
        },
        yAxis: {
          min: 0,
          tickInterval: 20,
          title: {
            text: "使用次数",
            align: "high",
          },
          labels: {
            overflow: "justify",
          },
        },
        tooltip: {
          valueSuffix: "次",
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
              allowOverlap: true, // 允许数据标签重叠
            },
          },
        },
        legend: {
          enabled: false,
          // layout: 'vertical',
          // align: 'right',
          // verticalAlign: 'top',
          // x: -40,
          // y: 100,
          // floating: true,
          // borderWidth: 1,
          // backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
          // shadow: true
        },
        series: [{
          name: "数据",
          data: YArray2,
        }, ],
      });


    })

  },

}
</script>

<style>

</style>