function loadScript(url, callback) {
  var script = document.createElement("script")
  script.type = "text/javascript"
  if (typeof callback != "undefined") {
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null
          callback()
        }
      }
    } else {
      script.onload = function () {
        callback()
      }
    }
  }
  script.src = url
  document.body.appendChild(script)
}


function makeStyle() {
  var colorPlan = {
    borderColor: "#c5c5c5",
    titleColor: "#7f7f7f",
    // warningColor: "#f1c232",
    // dangerColor: "#ff4444",
    seriesColor2_Upper: ["#5BC49F", "#FF7B7B"],
    seriesColor2_Lower: ["#FF7B7B", "#5BC49F"],
    seriesColor3: ["#60ACFC", "#5BC49F", "#FF7B7B"],
    seriesColor6: ["#60ACFC", "#32D3EB", "#5BC49F", "#FEB64D", "#FF7B7B", "#9287E7"],
  }
  return colorPlan
}

function makePlot(plotInfo) {

  console.log(plotInfo)
  console.log(JSON.stringify(plotInfo));



  if (plotInfo['topic'] != 'fun_TrqMonitoring' && plotInfo['layout'] == 'MDAMonitor') {
    // var menuArr=[]

    var itemstr = ``

      plotInfo.charts.forEach((item, index) => {
        // menuArr.push(item.filename)
        // itemstr += `<a data-index="${index}" class="item${index == 0 ? ' active' : ''}">${plotInfo.topic} segment[${index}]</a>`

        itemstr += `<li
        data-index="${index}"
          role="menuitem"
          tabindex="-1"
          class="el-menu-item ${index == 0 ? ' is-active' : ''}"
          style="padding-left: 20px;"
        ><i class="el-icon-menu"></i> <span>${plotInfo.topic} segment[${index}]</span></li>`
  
      })
   
  
    $('#plotBody .el-menu').html(itemstr)
    $('#plotBody .el-menu .el-menu-item').click(function () {
      // console.log();

      $('#plotBody .el-menu .el-menu-item').removeClass('is-active')
      $(this).addClass('is-active')
      loadMDA(plotInfo['charts'], $(this).attr('data-index'))
    })
    loadMDA(plotInfo['charts'], 0)
  } else if (plotInfo['layout'] == 'LayoutDFC') {
    var {
      historyDFC,
      reportedDFC
    } = plotInfo;
    // console.log(historyDFC);
    // console.log(reportedDFC);
    var reportedDFC=[
    	{
    		"time":"xxx",
    		"dfc":"xxxx",
    		"channel":"xxxx",
    		"filename":"xxxx"
    	}
    ]
    var historyDFC= ["DFC_WFSNP", "xxxx","xxxx"]
    if (reportedDFC) {
      var htmlstr = ``

      reportedDFC.forEach((item, index) => {
        htmlstr += '<tr class="el-table__row">'
        htmlstr += `<td class="el-table_1_column_1">  <div class="cell">
        ${item.time}
        </div></td>`
        htmlstr += `<td class="el-table_1_column_2">  <div class="cell">
        ${item.dfc}
        </div></td>`
        htmlstr += `<td class="el-table_1_column_3">  <div class="cell">
        ${item.channel}
        </div></td>`
        htmlstr += `<td class="el-table_1_column_4">  <div class="cell">
        ${item.filename}
        </div></td>`
        htmlstr += '</tr>'

      })
      console.log(htmlstr)


      $('#faultCountArea .first.el-table tbody').html(htmlstr)
    }
    if (historyDFC) {
      var historystr = ``
      historyDFC.forEach((item, index) => {
        historystr += '<tr class="el-table__row">'
        historystr += `<td class="el-table_1_column_1">
        <div class="cell">
        ${item}
        </div>
        </td>`

        historystr += '</tr>'
      })
      console.log(historystr);
      $('#faultCountArea .second.el-table tbody').html(historystr)


    }


    makeXYplot(plotInfo.charts[0], "plotter0")

  } else {
    for (var i = 0; i < plotInfo.charts.length; i++) {

      var chartopt = plotInfo.charts[i]

      if (chartopt.type == "XYplot") {
        console.log("chartopt", chartopt)
        var p1 = makeXYplot(chartopt, "plotter" + String(i))
      }
      if (chartopt.type == "XZplot") {
        console.log("chartopt", chartopt)
        var p1 = makeXZPlot(chartopt, "plotter" + String(i))
      }
      if (chartopt.type == "XYZplot") {

        console.log("chartopt", chartopt)
        var p1 = makeXYZplot(chartopt, "plotter" + String(i))
      }
      if (chartopt.type == "gps") {
        loadMap("plotter" + String(i), chartopt["series"])
      }

    }
  }



}

function loadMDA(charts, idx) {

  var {
    filename,
    title,
    subtitle
  } = charts[idx]
  var {
    x,
    boolean,
    physical
  } = charts[idx].plotdata;
  var yAxis = [];
  physical.forEach((item, index) => {
    if (item.name == "{coolantTemp}") {
      console.log('cool')
      yAxis.push({
        min: -30,
        max: 130,
        lineWidth: 1,
        title: {
          text: item.name,
          style: {
            // color: this.colorList[index]

            color: Highcharts.getOptions().colors[index]
          },
          offset: 25 * index + 10
        },
        offset: 0,
        labels: {
          align: "left",
          x: -25 * index,
          rotation: -90,
          style: {
            // color: this.colorList[index]
            color: Highcharts.getOptions().colors[index]
          },

          reserveSpace: false //x:-5 // 轴标签不占用空间
        },
        showEmpty: false
      });

    } else {
      yAxis.push({
        lineWidth: 1,
        title: {
          text: item.name,
          style: {
            // color: this.colorList[index]

            color: Highcharts.getOptions().colors[index]
          },
          offset: 25 * index + 10
        },
        offset: 0,
        labels: {
          align: "left",
          x: -25 * index,
          rotation: -90,
          style: {
            // color: this.colorList[index]
            color: Highcharts.getOptions().colors[index]
          },

          reserveSpace: false //x:-5 // 轴标签不占用空间
        },
        showEmpty: false
      });

    }

  });
  var series = [];
  physical.forEach((item, index) => {
    series.push({
      // color: this.colorList[index],
      yAxis: index,
      data: item.data,
      name: item.name
    });
  });
  var myphysical = {
    chart: {
      // marginLeft: 40, // Keep all charts left aligned
      spacingTop: 20,
      // spacingBottom: 20,
      zoomType: "x",
      panning: true,
      panKey: "shift"
    },
    title: {
      // userHTML:true,
      text: title
    },
    subtitle: {
      // userHTML:true,
      text: subtitle
    },

    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    xAxis: {
      title: {
        text: "time[s]"
      },
      categories: x,
      crosshair: true,
      events: {
        setExtremes: syncExtremes
      },
      labels: {
        format: "{value}"
      }
    },
    yAxis: yAxis,
    plotOptions: {
      series: {
        marker: {
          enabled: false,
          states: {
            hover: {
              fillColor: "rgba(255,255,255,0)",
              lineColor: "rgba(255,255,255,0)"
            }
          }
        }
      },

      line: {
        point: {
          events: {
            mouseOver: function () {
              var series = this.series.chart.series;
              Highcharts.each(series, function (s) {
                s.setState("");
              });
            }
          }
        }
      }
    },
    tooltip: {
      shared: true
    },
    // tooltip: {
    //   positioner: function() {
    //     // console.log(this.chart);
    //     return {
    //       x: this.chart.chartWidth - this.label.width, // right aligned
    //       y: -1 // align to title
    //     };
    //   },
    //   borderWidth: 0,
    //   backgroundColor: "none",
    //   pointFormat: "{point.y}",
    //   headerFormat: "",
    //   shadow: false,
    //   style: {
    //     fontSize: "18px"
    //   },
    //   valueDecimals: 1
    // },
    series: series
  };
  var myboolean = [];
  boolean.forEach((item, index) => {
    var obj = {
      chart: {
        // marginLeft: 40, // Keep all charts left aligned
        // spacingTop: 5,
        // spacingBottom: 5,
        // zoomType: "x"
        // type:'step'
      },
      title: null,
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false,
            states: {
              hover: {
                fillColor: "rgba(255,255,255,0)",
                lineColor: "rgba(255,255,255,0)"
              }
            }
          }
        }
      },

      xAxis: {
        categories: x,

        visible: false,
        crosshair: true,
        events: {
          setExtremes: syncExtremes
        },
        labels: {
          format: "{value}"
        }
      },
      yAxis: [{
        lineWidth: 1,
        title: {
          text: item.name,
          style: {
            color: Highcharts.getOptions().colors[0]
          },

          offset: 25 * (myphysical.yAxis.length - 1) + 10
          // x:25 * (myphysical.yAxis.length - 1)+10-25,
          // rotation:0
        },
        offset: 0,
        max: 1,
        min: 0,

        labels: {
          align: "left",
          style: {
            color: Highcharts.getOptions().colors[0]
          },
          // rotation:-90,
          x: (myphysical.yAxis.length - 1) * -25,
          reserveSpace: false //x:-5 // 轴标签不占用空间
        }
        // tickInterval: 0.01
      }],
      // tooltip: {
      //   positioner: function() {
      //     // console.log(this.chart);
      //     return {
      //       x: this.chart.chartWidth - this.label.width, // right aligned
      //       y: -1 // align to title
      //     };
      //   },
      //   borderWidth: 0,
      //   backgroundColor: "none",
      //   pointFormat: "{point.y}",
      //   headerFormat: "",
      //   shadow: false,
      //   style: {
      //     fontSize: "18px"
      //   },
      //   valueDecimals: 1
      // },
      series: [{
        step: true,
        data: item.data,
        name: item.name,
        type: "line",
        color: Highcharts.getOptions().colors[0],
        fillOpacity: 0.3
        // tooltip: {
        //   valueSuffix: " " + "km/h"
        // }
      }]
    };

    myboolean.push(obj);
  });

  var obj = {};
  obj.physical = myphysical;
  obj.boolean = myboolean;
  console.log(obj);
  // Highcharts.chart('plotter0',)


  var htmlstr = `<div style="height:450px" id="physical">   
  </div>`
  for (var i = 0; i < obj.boolean.length; i++) {
    htmlstr += `<div style="height:50px" id="boolean${i}"></div>`
  }

  $('#plotter_MDA').html(htmlstr)
  $('#plotBody .menu').parent().css('height',(450+obj.boolean.length*50)+'px')

  Highcharts.chart(`physical`, obj.physical)

  for (var i = 0; i < obj.boolean.length; i++) {
    Highcharts.chart(`boolean${i}`, obj.boolean[i])

  }


  // ------------
  $('#plotter_MDA').bind('mousemove touchmove touchstart', function (e) {
    var chart,
      point,
      i,
      event;
    // console.log(Highcharts.charts);
    for (var i = 0; i < Highcharts.charts.length; i = i + 1) {
      chart = Highcharts.charts[i]
      if (chart) {
        event = chart.pointer.normalize(e.originalEvent); // Find coordinates within the chart
        point = chart.series[0].searchPoint(event, true); // Get the hovered point
        if (point) {
          point.highlight(e);
        }

      }
    }
  })
  Highcharts.Pointer.prototype.reset = function () {
    return undefined;
  };
  /**
   * 高亮当前的数据点，并设置鼠标滑动状态及绘制十字准星线
   */
  Highcharts.Point.prototype.highlight = function (event) {
    this.onMouseOver(); // 显示鼠标激活标识
    // console.log(this.series.chart.tooltip)
    // this.series.chart.tooltip.refresh(this); // 显示提示框
    // this.series.chart.xAxis[0].drawCrosshair(event, this); // 显示十字准星线
    // this.series.chart.xAxis[1].drawCrosshair(event, this); // 显示十字准星线
  };

}



function makeXYplot(chartopt, divName) {
  /* basic definition*/
  var option = {
    chart: {
      type: "scatter",
      borderWidth: 1,
      borderColor: makeStyle()["borderColor"],
      zoomType: "xy",
      panning: true,
      panKey: "shift",
      backgroundColor: null,
      events: {
        load: function () {
          var ren = this.renderer
          console.log(ren);

          if (chartopt["lightIndex"] == -1) {
            ren.image("../../../static/icon/light_redempty.png", 12, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_yellowempty.png", 30, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_greenempty.png", 48, 7, 15, 15).css({}).add()
          }
          if (chartopt["lightIndex"] == 0) {
            ren.image("../../../static/icon/light_redempty.png", 12, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_yellowempty.png", 30, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_greenfill.png", 48, 7, 15, 15).css({}).add()
          }
          if (chartopt["lightIndex"] == 1) {
            ren.image("../../../static/icon/light_redempty.png", 12, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_yellowfill.png", 30, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_greenempty.png", 48, 7, 15, 15).css({}).add()
          }
          if (chartopt["lightIndex"] == 2) {
            ren.image("../../../static/icon/light_redfill.png", 12, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_yellowempty.png", 30, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_greenempty.png", 48, 7, 15, 15).css({}).add()
          }
        },
      },
    },
    title: {
      text: chartopt["title"],
      style: {
        color: makeStyle()["titleColor"],
        fontSize: "12px",
      },
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      title: {
        text: chartopt["xtitle"]
      },
    },
    yAxis: {
      title: {
        text: chartopt["ytitle"]
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function () {
        var s = "<b>" + chartopt["xtitle"] + ": " + this.point.x + "</b>"
        s += "<br/><b>" + "value: " + this.point.y + "</b>"
        s += "<br/><b>time: " + this.point.time + "</b>"
        s += "<br/><b>filename: " + chartopt["filename"] + "</b>"
        return s
      },
    },
    series: [],
  }

  /* make threshold */
  if (chartopt["thresVal"]) {
    var thresholdOption = []
    for (var i = 0; i < chartopt["thresVal"].length; i++) {

      thresholdOption.push({
        color: "#ee827c",
        width: 4,
        value: parseFloat(chartopt["thresVal"][i]),
      })

    }
    option["yAxis"]["plotLines"] = thresholdOption
  }

  /* make series */
  if (chartopt["series"]) {
    var seriesOption = []
    for (var i = 0; i < chartopt["series"].length; i++) {
      seriesOption.push({
        name: chartopt["series"][i]["name"],
        data: chartopt["series"][i]["data"],
        color: chartopt["series"][i]["color"],
        turboThreshold: 0,
        marker: {
          radius: 3,
          symbol: "circle"
        },
      })
    }
    option["series"] = seriesOption
  }

  /* make display range */
  if (chartopt["dispRng"]) {
    if (chartopt["dispRng"][0] != "") {
      option["xAxis"]["min"] = parseFloat(chartopt["dispRng"][0])
    }
    if (chartopt["dispRng"][1] != "") {
      option["xAxis"]["max"] = parseFloat(chartopt["dispRng"][1])
    }
    if (chartopt["dispRng"][2] != "") {
      option["yAxis"]["min"] = parseFloat(chartopt["dispRng"][2])
    }
    if (chartopt["dispRng"][3] != "") {
      option["yAxis"]["max"] = parseFloat(chartopt["dispRng"][3])
    }
  }

  /* make lengend visisble */
  if (chartopt["series"].length < 2) {
    option["legend"]["enabled"] = false
  } else {
    option["legend"]["enabled"] = true
  }

  if (chartopt["subtitle"] != "") {
    option["subtitle"]["text"] = "ErrorInfo: " + chartopt["subtitle"]
    option["subtitle"]["style"] = {
      color: "#b94047",
      fontSize: "10px",
    }
  }

  /* construct plot */
  Highcharts.chart(divName, option)
}

function makeXZPlot(chartopt, divName) {
  /* basic definition*/

  var option = {
    chart: {
      type: "column",
      borderWidth: 1,
      borderColor: makeStyle()["borderColor"],
      zoomType: "xy",
      panning: true,
      panKey: "shift",
      events: {
        load: function () {
          var ren = this.renderer

          if (chartopt["lightIndex"] == -1) {
            ren.image("../../../static/icon/light_redempty.png", 12, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_yellowempty.png", 30, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_greenempty.png", 48, 7, 15, 15).css({}).add()
          }
          if (chartopt["lightIndex"] == 0) {
            ren.image("../../../static/icon/light_redempty.png", 12, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_yellowempty.png", 30, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_greenfill.png", 48, 7, 15, 15).css({}).add()
          }
          if (chartopt["lightIndex"] == 1) {
            ren.image("../../../static/icon/light_redempty.png", 12, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_yellowfill.png", 30, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_greenempty.png", 48, 7, 15, 15).css({}).add()
          }
          if (chartopt["lightIndex"] == 2) {
            ren.image("../../../static/icon/light_redfill.png", 12, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_yellowempty.png", 30, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_greenempty.png", 48, 7, 15, 15).css({}).add()
          }
        },
      },
    },
    title: {
      text: chartopt["title"],
      style: {
        color: makeStyle()["titleColor"],
        fontSize: "12px",
      },
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      title: {
        text: chartopt["xtitle"]
      },
      categories: chartopt["xcategory"],

      // chartopt["xAxis"].map(function (item) {
      // 	return parseFloat(item).toFixed(2)
      // }),
    },
    yAxis: {
      title: {
        text: chartopt["ytitle"]
      },
      min: 0,
      max: 100
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function () {
        var s = ""
        s += "<br/><b>percent" + ": " + this.y + "%</b>"
        return s
      },
    },
    series: [],
  }

  /* make threshold */
  if (chartopt["thresVal"]) {
    var thresholdOption = []
    for (var i = 0; i < chartopt["thresVal"].length; i++) {

      thresholdOption.push({
        color: "#ee827c",
        width: 4,
        value: parseFloat(chartopt["thresVal"][i]),
      })

    }
    option["xAxis"]["plotLines"] = thresholdOption
  }

  /* make series */
  if (chartopt["series"]) {
    var seriesOption = []
    for (var i = 0; i < chartopt["series"].length; i++) {
      seriesOption.push({
        name: chartopt["series"][i]["name"],
        data: chartopt["series"][i]["data"],
        color: chartopt["series"][i]["color"],
      })
    }
    option["series"] = seriesOption
  }

  /* other definition */
  if (chartopt["series"].length < 2) {
    option["legend"]["enabled"] = false
  } else {
    option["legend"]["enabled"] = true
  }

  if (chartopt["subtitle"] != "") {
    option["subtitle"]["text"] = "ErrorInfo: " + chartopt["subtitle"]
    option["subtitle"]["style"] = {
      color: "#b94047",
      fontSize: "10px",
    }
  }

  /* construct plot */
  Highcharts.chart(divName, option)
}

function makeXYZplot(chartopt, divName) {

  var option = {
    chart: {
      type: "scatter",
      borderWidth: 1,
      borderColor: makeStyle()["borderColor"],
      zoomType: "xy",
      panning: true,
      panKey: "shift",
      events: {
        load: function () {
          var ren = this.renderer

          if (chartopt["lightIndex"] == -1) {
            ren.image("../../../static/icon/light_redempty.png", 12, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_yellowempty.png", 30, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_greenempty.png", 48, 7, 15, 15).css({}).add()
          }
          if (chartopt["lightIndex"] == 0) {
            ren.image("../../../static/icon/light_redempty.png", 12, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_yellowempty.png", 30, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_greenfill.png", 48, 7, 15, 15).css({}).add()
          }
          if (chartopt["lightIndex"] == 1) {
            ren.image("../../../static/icon/light_redempty.png", 12, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_yellowfill.png", 30, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_greenempty.png", 48, 7, 15, 15).css({}).add()
          }
          if (chartopt["lightIndex"] == 2) {
            ren.image("../../../static/icon/light_redfill.png", 12, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_yellowempty.png", 30, 7, 15, 15).css({}).add()
            ren.image("../../../static/icon/light_greenempty.png", 48, 7, 15, 15).css({}).add()
          }
        },
      },
    },
    title: {
      text: chartopt.title,
      style: {
        color: makeStyle()["titleColor"],
        fontWeight: "bold",
        fontSize: "12px",
      },
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      title: {
        text: chartopt.xtitle
      },
    },
    yAxis: {
      title: {
        text: chartopt.ytitle
      },
    },
    legend: {
      enabled: true,
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function () {
        var s = "<b>" + chartopt.xtitle + ": " + String(this.point.x) + "</b>"
        s += "<br/><b>" + chartopt.ytitle + ": " + String(this.point.y) + "</b>"
        s += "<br/><b>value: " + String(this.point.z) + "</b>"
        // s += "<br/><b>time: " + String(this.point.time) + "</b>"  // this.point.value
        s += "<br/><b>filename: " + chartopt.filename + "</b>" // this.point.value
        return s
      },
    },
    series: [],
  }

  console.log(chartopt)

  /* make series */
  var colorarr = ['#f2ecde', '#ff7500', '#177cb0']
  if (chartopt["series"]) {
    var seriesOption = []
    for (var i = 0; i < chartopt["series"].length; i++) {
      if (chartopt['title'] == 'Knock overview' && chartopt.series.length == 3) {
        seriesOption.push({
          name: chartopt["series"][i]["name"],
          data: chartopt["series"][i]["data"],
          color: colorarr[i],
          turboThreshold: 0,
          marker: {
            radius: 2.5,
            symbol: "circle"
          },
        })
      } else {
        seriesOption.push({
          name: chartopt["series"][i]["name"],
          data: chartopt["series"][i]["data"],
          color: chartopt["series"][i]["color"],
          turboThreshold: 0,
          marker: {
            radius: 2.5,
            symbol: "circle"
          },
        })
      }


    }
    option["series"] = seriesOption
  }

  /* make display range */
  if (chartopt["dispRng"]) {
    if (chartopt["dispRng"][0] != "") {
      option["xAxis"]["min"] = parseFloat(chartopt["dispRng"][0])
    }
    if (chartopt["dispRng"][1] != "") {
      option["xAxis"]["max"] = parseFloat(chartopt["dispRng"][1])
    }
    if (chartopt["dispRng"][2] != "") {
      option["yAxis"]["min"] = parseFloat(chartopt["dispRng"][2])
    }
    if (chartopt["dispRng"][3] != "") {
      option["yAxis"]["max"] = parseFloat(chartopt["dispRng"][3])
    }
  }

  if (chartopt["subtitle"] != "") {
    option["subtitle"]["text"] = "ErrorInfo: " + chartopt["subtitle"]
    option["subtitle"]["style"] = {
      color: "#b94047",
      fontSize: "10px",
    }
  }


  /* construct plot */
  Highcharts.chart(divName, option)
}

function loadMap(divName, series) {
  // console.log(JSON.stringify(series[0].data))
  // console.dir(series[0].data)
  var jsGPS = []
  try {
    for (var i = 0; i < series[0]["data"].length; i++) {
      // if(i>series[0]["data"].length*0.2){
      jsGPS.push([series[0]["data"][i]["x"], series[0]["data"][i]["y"]])

      // }
    }

  } catch (err) {

    jsGPS.push([121.63063049316406, 31.27289199829102])


    console.log('catch')

  }
  contructmap(divName, jsGPS)
}

function contructmap(divName, jsGPS) {
  // if(!jsGPS){
  // 	console.log('jsGPS',jsGPS);
  // 	return
  // }
  var map = new AMap.Map(divName, {
    zoom: 15,
    // viewMode: "3D",
    center: [jsGPS[0][0], jsGPS[0][1]],
  })

  var polyline = new AMap.Polyline({
    path: jsGPS,
    borderWeight: 20,
    strokeColor: "#3366ff",
    lineJoin: "round",
  })
  map.add(polyline)
}

function syncExtremes(e) {
  console.log("methods");
  var thisChart = this.chart;
  if (e.trigger !== "syncExtremes") {
    Highcharts.each(Highcharts.charts, function (chart) {
      if (chart !== thisChart) {
        if (chart.xAxis[0].setExtremes) {
          chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {
            trigger: "syncExtremes"
          });
        }
      }
    });
  }
}

export {
  makePlot

}
