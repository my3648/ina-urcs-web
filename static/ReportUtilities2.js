function ColorFactory() {
  return {
    border: "#c5c5c5",
    title: "#7f7f7f",
    warning: "#f6b26b",
    danger: "#ea9999",
    thres_warn: "#f6ad49",
    thres_error: "#ee827c",
  }
}

function makePlot(target, obj, filenameMapping) {
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].type == "column") {

      var yTitleName = obj[i].yTitleName
      var xcategory = obj[i].xcategory

      var option = {
        chart: {
          zoomType: "x",
          panning: true,
          panKey: "shift",
        },
        title: {
          text: obj[i].title,
          style: {
            color: ColorFactory().title,
            fontWeight: "bold",
            fontSize: "12px",
          },
        },
        subtitle: {
          useHTML: true,
          align: "right",
          text:'<button type="button" class="el-button el-button--info el-button--mini is-plain zoomclass" myvalue="'+String(i)+'"><!----><i class="el-icon-zoom-in"></i><!----></button>',
          // text: '<button class="ui mini button zoomclass" myvalue="' + String(i) + '"><span><i class="zoom icon"></i></span></button>',
        },
        xAxis: {
          title: {
            text: obj[i].xTitleName,
          },
          tickWidth: 1,
          min: obj[i].xmin,
          max: obj[i].xmax,
          categories: xcategory
        },
        yAxis: {
          title: {
            text: obj[i].yTitleName
          },
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          column: {
            maxPointWidth: 20
          },
        },
        tooltip: {
          formatter: function () {
            var s = ""
            if (yTitleName == "percent [%]") {
              s += "<b>y: " + this.point.y + "%</b><br/>"
            }
            if (yTitleName == "count [-]") {
              s += "<b>y: " + this.point.y + "</b><br/>"
            }

            return s
          },
        },
        series: []
      }

      if (obj[i].series.length > 1) {
        option["legend"] = {
          enabled: true
        }
      } else {
        option["legend"] = {
          enabled: false
        }
      }

      var seriesOption = []

      for (let j =0; j < obj[i].series.length; j++) {
        var myseries = {
          name: obj[i].series[j].name,
          data: obj[i].series[j].data,
          type: obj[i].series[j].type,
          color: obj[i].series[j].color,
          borderWidth: 0,
          turboThreshold: 0,
        }
        if (obj[i].series[j].type == "spline") {
          myseries["marker"] = {
            radius: 0
          }
        }
        seriesOption.push(myseries)
      }
      option["series"] = seriesOption

      if (obj[i].threshold) {
        option["xAxis"].plotLines = [{
            color: ColorFactory().thres_error,
            width: 4,
            value: parseFloat(obj[i].threshold[0]),
          },
          {
            color: ColorFactory().thres_error,
            width: 4,
            value: parseFloat(obj[i].threshold[3]),
          },
          {
            color: ColorFactory().thres_warn,
            width: 3,
            value: parseFloat(obj[i].threshold[1]),
          },
          {
            color: ColorFactory().thres_warn,
            width: 3,
            value: parseFloat(obj[i].threshold[2]),
          },
        ]
      }
      Highcharts.chart(target + String(i), option)
    }

    if (obj[i].type == "scatter") {
      var option = {
        chart: {
          type: "scatter",
          zoomType: "xy",
          panning: true,
          panKey: "shift",
        },
        title: {
          text: obj[i].title,
          style: {
            color: ColorFactory().title,
            fontWeight: "bold",
            fontSize: "12px"
          },
        },
        subtitle: {
          useHTML: true,
          align: "right",
          text:'<button type="button" class="el-button el-button--info el-button--mini is-plain zoomclass" myvalue="'+String(i)+'"><!----><i class="el-icon-zoom-in"></i><!----></button>',

          
          // text: '<button class="ui mini button zoomclass" myvalue="' + String(i) + '"><span><i class="zoom icon"></i></span></button>',
        },
        xAxis: {
          title: {
            text: obj[i].xTitleName
          },
        },
        yAxis: {
          title: {
            text: obj[i].yTitleName
          },
        },
        credits: {
          enabled: false
        },
        tooltip: {
          formatter: function () {
            var s = "<b>" + _tooltipNamex + ": " + this.point.x + "</b>";
            s += "<br/><b>" + _tooltipNamey + ": " + this.point.y + "</b>";
            s += "<br/><b>time: " + this.point.time + "</b>";
            if (_filemapping!=undefined){
                s += "<br/><b>filename: " + _filemapping[this.point.filename] + "</b>";

            }else{
                s += "<br/><b>filename: " + this.point.filename + "</b>";

            }
            return s;
        }
          // formatter: function () {

          //   var s = "<b>x: " + this.point.x + "</b><br/>"

          //   s += "<b>y: " + this.point.y + "</b><br/>"

          //   if (!(typeof this.point.z == "undefined")) {
          //     s += "<b>z: " + this.point.z + "</b><br/>"
          //   }

          //   if (!(typeof this.point.time == "undefined")) {
          //     s += "<b>filetime: " + String(this.point.time) + "</b><br/>"
          //   }

          //   if (!(typeof this.point.filename == "undefined")) {
          //     s += "<b>filename: " + filenameMapping[this.point.filename] + "</b><br/>"
          //   }

          //   return s
          // },
        },
        series: [],
      }

      if (obj[i].series.length > 1) {
        option["legend"] = {
          enabled: true,
        }
      } else {
        option["legend"] = {
          enabled: false,
        }
      }

      // axis min max specification
      if (typeof obj[i].xmin == "number") {
        option["xAxis"]["min"] = obj[i].xmin
      }
      if (typeof obj[i].xmax == "number") {
        option["xAxis"]["max"] = obj[i].xmax
      }
      if (typeof obj[i].ymin == "number") {
        option["yAxis"]["min"] = obj[i].ymin
      }
      if (typeof obj[i].ymax == "number") {
        option["yAxis"]["max"] = obj[i].ymax
      }

      var seriesOption = []

      for (let j =0; j < obj[i].series.length; j++) {

        var seritesItem;

        seritesItem = {
          name: obj[i].series[j].name,
          data: obj[i].series[j].data,
          color: obj[i].series[j].color,
          borderWidth: 0,
          turboThreshold: 0,
          marker: {
            radius: 2.5,
            symbol: "circle",
          }
        }

        seriesOption.push(seritesItem)
      }
      option["series"] = seriesOption

      if (obj[i].threshold) {
        option["yAxis"].plotLines = [{
            color: ColorFactory().thres_error,
            width: 4,
            value: parseFloat(obj[i].threshold[0]),
          },
          {
            color: ColorFactory().thres_error,
            width: 4,
            value: parseFloat(obj[i].threshold[3]),
          },
          {
            color: ColorFactory().thres_warn,
            width: 3,
            value: parseFloat(obj[i].threshold[1]),
          },
          {
            color: ColorFactory().thres_warn,
            width: 3,
            value: parseFloat(obj[i].threshold[2]),
          },
        ]
      }

      Highcharts.chart(target + String(i), option)
    }
  }
}

function makeDfcHistory(order, data, mapping) {
  var htmlstr = ""

  htmlstr += '<div style="margin-top:20px; font-family: Arial; font-size: 14px; ">Histrory DFC</div>'
  htmlstr += '<table style="width: 100%; font-family: Arial; font-size: 11px;">'
  htmlstr += '<tbody id="tb_dfes">'

  // make column head
  htmlstr += "<tr>"
  htmlstr += '<th width="5%" bgcolor="lightblue" style="font-weight: normal;">' + "id" + "</th>"

  for (var i = 0; i < order.length; i++) {
    if (order[i] == "filename") {
      htmlstr += '<th width="35%" bgcolor="lightblue" style="font-weight: normal;">' + order[i] + "</th>"
    } else {
      htmlstr += '<th width="12%" bgcolor="lightblue" style="font-weight: normal;">' + order[i] + "</th>"
    }
  }
  htmlstr += "</tr>"

  // make data content

  for (var k = 0; k < data.length; k++) {
    htmlstr += '<th width="5%" style="font-weight: normal;" align="left" >' + String(k + 1) + "</th>"
    htmlstr += '<th width="35%" style="font-weight: normal;" align="left" >' + mapping[data[k]["filename"]] + "</th>"

    possibles = ["DFES_numDFC_[0]", "DFES_numDFC_[1]", "DFES_numDFC_[2]", "DFES_numDFC_[3]", "DFES_numDFC_[4]"]
    for (var name in possibles) {
      if (data[k].hasOwnProperty(possibles[name])) {
        htmlstr += '<th width="12%" style="font-weight: normal;" align="left" >' + data[k][possibles[name]] + "</th>"
      } else {
        htmlstr += '<th width="12%" style="font-weight: normal;" align="left" >' + "" + "</th>"
      }
    }
    htmlstr += "</tr>"
  }

  htmlstr += "</tbody>"
  htmlstr += "</table>"

  var tb = document.getElementById("thisTbody2")
  tb.innerHTML = htmlstr
}

function makeDfcReported(order, data, mapping) {

  var htmlstr = ""

  htmlstr += '<div style="margin-top:20px; font-family: Arial; font-size: 14px; ">Reported DFC</div>'
  htmlstr += '<table style="width: 100%; font-family: Arial; font-size: 11px;">'
  htmlstr += '<tbody id="tb_dfes">'

  // make column head
  htmlstr += "<tr>"
  htmlstr += '<th width="5%" bgcolor="lightblue" style="font-weight: normal;">' + "id" + "</th>"
  for (var i = 0; i < order.length; i++) {
    if (order[i] == "time") {
      htmlstr += '<th width="5%" bgcolor="lightblue" style="font-weight: normal;">' + order[i] + "</th>"
    } else if (order[i] == "filename") {
      htmlstr += '<th width="30%" bgcolor="lightblue" style="font-weight: normal;">' + order[i] + "</th>"
    } else {
      htmlstr += '<th width="12%" bgcolor="lightblue" style="font-weight: normal;">' + order[i] + "</th>"
    }
  }
  htmlstr += "</tr>"

  // fill in data content

  for (var k = 0; k < data.length; k++) {

    htmlstr += "<tr>"
    htmlstr += '<th width="5%" style="font-weight: normal;" align="left" >' + String(k + 1) + "</th>"
    htmlstr += '<th width="5%" style="font-weight: normal;" align="left" >' + data[k]["time"] + "</th>"
    htmlstr += '<th width="30%" style="font-weight: normal;" align="left" >' + mapping[data[k]["filename"]] + "</th>"

    possibles = ["DFES_numDFC_[0]", "DFES_numDFC_[1]", "DFES_numDFC_[2]", "DFES_numDFC_[3]", "DFES_numDFC_[4]"]

    for (var name in possibles) {
      if (data[k].hasOwnProperty(possibles[name])) {
        htmlstr += '<th width="12%" style="font-weight: normal;" align="left" >' + data[k][possibles[name]] + "</th>"
      } else {
        htmlstr += '<th width="12%" style="font-weight: normal;" align="left" >' + "" + "</th>"
      }
    }
    htmlstr += "</tr>"
  }

  htmlstr += "</tbody>"
  htmlstr += "</table>"

  var tb = document.getElementById("thisTbody1")
  tb.innerHTML = htmlstr
}

function makePlotLayout(target, plotdata, height = null, width = null) {
  // layout definition
  var contentHtml = ""

  if (plotdata["layout"] == "layout1") {
    if (height == "undefined" && width == "undefined") {
      contentHtml += '<div style="width: 100%;">'
      contentHtml += '<div id="' + target + '0" style="height:810px; width: 99%; "></div>'
      contentHtml += "</div>"
    } else {
      contentHtml += '<div style="width: 100%;">'
      contentHtml += '<div id="' + target + '0" style="height:' + height + "px; width: " + width + 'px; "></div>'
      contentHtml += "</div>"
    }
  }
  if (plotdata["layout"] == "layoutPT") {
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '0" style="height:400px; width: 99%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '1" width: 99%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '2" width: 99%;  float:left;"></div>'
    contentHtml += "</div>"
    contentHtml += '<div style="margin-top:30px;">'
    contentHtml += "</div>"
  }
  if (plotdata["layout"] == "layout12") {
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '0" style="height:810px; width: 49%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '1" style="height:810px; width: 49%;  float:left;"></div>'
    contentHtml += "</div>"
  }
  if (plotdata["layout"] == "layout21") {
    contentHtml += '<div id="' + target + '0" style="height:405px; width: 99%; "></div>'
    contentHtml += '<div id="' + target + '1" style="height:405px; width: 99%; "></div>'
  }
  if (plotdata["layout"] == "layout22A") {
    contentHtml += '<div style="width: 100%; margin-top:10px;">'
    contentHtml += '<div id="' + target + '0" style="height:410px; width: 49%; border: 1px solid lightgray; display:inline-block;"></div>'
    contentHtml += '<div id="' + target + '1" style="height:410px; width: 49%; border: 1px solid lightgray; display:inline-block;"></div>'
    contentHtml += "</div>"
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '2" style="height:410px; width: 49%; border: 1px solid lightgray; display:inline-block;"></div>'
    contentHtml += '<div id="' + target + '3" style="height:410px; width: 49%; border: 1px solid lightgray; display:inline-block;"></div>'
    contentHtml += "</div>"
  }
  if (plotdata["layout"] == "layout22B") {
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '0" style="height:405px; width: 35%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '1" style="height:405px; width: 64%;  float:left;"></div>'
    contentHtml += "</div>"
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '2" style="height:405px; width: 35%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '3" style="height:405px; width: 64%;  float:left;"></div>'
    contentHtml += "</div>"
  }
  if (plotdata["layout"] == "layout22C") {
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '0" style="height:405px; width: 64%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '1" style="height:405px; width: 35%;  float:left;"></div>'
    contentHtml += "</div>"
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '2" style="height:405px; width: 64%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '3" style="height:405px; width: 35%;  float:left;"></div>'
    contentHtml += "</div>"
  }
  if (plotdata["layout"] == "layout23") {
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '0" style="height:405px; width: 33%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '1" style="height:405px; width: 33%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '2" style="height:405px; width: 33%;  float:left;"></div>'
    contentHtml += "</div>"
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '3" style="height:405px; width: 33%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '4" style="height:405px; width: 33%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '5" style="height:405px; width: 33%;  float:left;"></div>'
    contentHtml += "</div>"
  }
  if (plotdata["layout"] == "layout31") {
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '0" style="height:269px; width: 100%; "></div>'
    contentHtml += '<div id="' + target + '1" style="height:269px; width: 100%; "></div>'
    contentHtml += '<div id="' + target + '2" style="height:269px; width: 100%; "></div>'
    contentHtml += "</div>"
  }
  if (plotdata["layout"] == "layout41") {
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '0" style="height:202px; width: 100%; "></div>'
    contentHtml += '<div id="' + target + '1" style="height:202px; width: 100%; "></div>'
    contentHtml += '<div id="' + target + '2" style="height:202px; width: 100%; "></div>'
    contentHtml += '<div id="' + target + '3" style="height:202px; width: 100%; "></div>'
    contentHtml += "</div>"
  }
  if (plotdata["layout"] == "layout51") {
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '0" style="height:162px; width: 100%; "></div>'
    contentHtml += '<div id="' + target + '1" style="height:162px; width: 100%; "></div>'
    contentHtml += '<div id="' + target + '2" style="height:162px; width: 100%; "></div>'
    contentHtml += '<div id="' + target + '3" style="height:162px; width: 100%; "></div>'
    contentHtml += '<div id="' + target + '4" style="height:162px; width: 100%; "></div>'
    contentHtml += "</div>"
  }
  if (plotdata["layout"] == "layout32") {
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '0" style="height:269px; width: 49%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '1" style="height:269px; width: 49%;  float:left;"></div>'
    contentHtml += "</div>"
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '2" style="height:269px; width: 49%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '3" style="height:269px; width: 49%;  float:left;"></div>'
    contentHtml += "</div>"
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '4" style="height:269px; width: 49%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '5" style="height:269px; width: 49%;  float:left;"></div>'
    contentHtml += "</div>"
  }
  if (plotdata["layout"] == "layout42") {
    contentHtml +=
      `
		<div style="width: 100%;">
		<div id="` +
      target +
      `0" style="height:202px; width: 49%; float:left;"></div>
		<div id="` +
      target +
      `1" style="height:202px; width: 49%; float:left;"></div>
		</div>
		<div style="width: 100%;">
		<div id="` +
      target +
      `2" style="height:202px; width: 49%; float:left;"></div>
		<div id="` +
      target +
      `3" style="height:202px; width: 49%; float:left;"></div>
		</div>
		<div style="width: 100%;">
		<div id="` +
      target +
      `4" style="height:202px; width: 49%; float:left;"></div>
		<div id="` +
      target +
      `5" style="height:202px; width: 49%; float:left;"></div>
		</div>
		<div style="width: 100%;">
		<div id="` +
      target +
      `6" style="height:202px; width: 49%; float:left;"></div>
		<div id="` +
      target +
      `7" style="height:202px; width: 49%; float:left;"></div>
		</div>
		`
  }
  if (plotdata["layout"] == "layout52") {
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '0" style="height:162px; width: 49%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '1" style="height:162px; width: 49%;  float:left;"></div>'
    contentHtml += "</div>"
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '2" style="height:162px; width: 49%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '3" style="height:162px; width: 49%;  float:left;"></div>'
    contentHtml += "</div>"
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '4" style="height:162px; width: 49%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '5" style="height:162px; width: 49%;  float:left;"></div>'
    contentHtml += "</div>"
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '6" style="height:162px; width: 49%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '7" style="height:162px; width: 49%;  float:left;"></div>'
    contentHtml += "</div>"
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '8" style="height:162px; width: 49%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '9" style="height:162px; width: 49%;  float:left;"></div>'
    contentHtml += "</div>"
  }
  if (plotdata["layout"] == "layout62") {
    contentHtml +=
      `
		<div style="width: 100%;">
		<div id="` +
      target +
      `0" style="height:135px; width: 49%; float:left;"></div>
		<div id="` +
      target +
      `1" style="height:135px; width: 49%; float:left;"></div>
		</div>
		<div style="width: 100%;">
		<div id="` +
      target +
      `2" style="height:135px; width: 49%; float:left;"></div>
		<div id="` +
      target +
      `3" style="height:135px; width: 49%; float:left;"></div>
		</div>
		<div style="width: 100%;">
		<div id="` +
      target +
      `4" style="height:135px; width: 49%; float:left;"></div>
		<div id="` +
      target +
      `5" style="height:135px; width: 49%; float:left;"></div>
		</div>
		<div style="width: 100%;">
		<div id="` +
      target +
      `6" style="height:135px; width: 49%; float:left;"></div>
		<div id="` +
      target +
      `7" style="height:135px; width: 49%; float:left;"></div>
		</div>
		<div style="width: 100%;">
		<div id="` +
      target +
      `8" style="height:135px; width: 49%; float:left;"></div>
		<div id="` +
      target +
      `9" style="height:135px; width: 49%; float:left;"></div>
		</div>
		<div style="width: 100%;">
		<div id="` +
      target +
      `10" style="height:135px; width: 49%; float:left;"></div>
		<div id="` +
      target +
      `11" style="height:135px; width: 49%; float:left;"></div>
		</div>
		`
  }
  if (plotdata["layout"] == "layoutVW") {
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div id="' + target + '0" style="height:810px; width: 49%;  float:left;"></div>'
    contentHtml += '<div style="height:810px; width: 49%; float:left;">'
    contentHtml += '<div id="' + target + '1" style="height:404px; "></div>'
    contentHtml += '<div id="' + target + '2" style="height:404px; "></div>'
    contentHtml += "</div>"
    contentHtml += "</div>"
  }
  if (plotdata["layout"] == "layoutVE") {
    contentHtml += '<div style="width: 100%;">'
    contentHtml += '<div style="height:810px; width: 49%; float:left;">'
    contentHtml += '<div id="' + target + '0" style="height:404px; "></div>'
    contentHtml += '<div id="' + target + '1" style="height:404px; "></div>'
    contentHtml += "</div>"
    contentHtml += '<div id="' + target + '2" style="height:810px; width: 49%;  float:left;"></div>'
    contentHtml += "</div>"
  }
  if (plotdata["layout"] == "layoutVN") {
    contentHtml += '<div id="' + target + '0" style="height:405px; width: 98%; "></div>'
    contentHtml += "<div>"
    contentHtml += '<div id="' + target + '1" style="height:405px; width: 49%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '2" style="height:405px; width: 49%;  float:left;"></div>'
    contentHtml += "</div>"
  }
  if (plotdata["layout"] == "layoutVS") {
    contentHtml += "<div>"
    contentHtml += '<div id="' + target + '0" style="height:405px; width: 49%;  float:left;"></div>'
    contentHtml += '<div id="' + target + '1" style="height:405px; width: 49%;  float:left;"></div>'
    contentHtml += "</div>"
    contentHtml += '<div id="' + target + '2" style="height:405px; width: 98%; "></div>'
  }
  console.log(target);
  console.log(document.getElementById(target));
  document.getElementById(target).innerHTML = contentHtml
}
export{
  makePlot,makePlotLayout
}