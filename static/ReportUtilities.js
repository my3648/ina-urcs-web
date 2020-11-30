

function makeScatterPlot(_divname, _title, _xtitle, _ytitle, _enableLgend, _tooltipNamex, _tooltipNamey, _seriesData, _dispRange, _threshold, _filemapping) {
    
    // console.log(_filemapping)

    var colorPlan = {
        border: "#c5c5c5",
        title: "#7f7f7f",
        seriesColorList: ["#3c78d8", "#6aa84f"],
        warning: "#f1c232",
        danger: "#ff4444"
    };

    var option = {
        chart: {
            type: "scatter",
            borderWidth: 1,
            borderColor: colorPlan["border"],
            zoomType: "xy",
            panning: true,
            panKey: "shift"
        },
        title: {
            text: _title,
            style: {
                color: colorPlan["title"],
                fontWeight: "bold",
                fontSize: "12px"
            }
        },
        xAxis: { title: { text: _xtitle } },
        yAxis: {
            title: {
                text: _ytitle
            }
        },
        legend: { enabled: _enableLgend },
        credits: { enabled: false },
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
        },
        series: []
    };

    // display range
    var displayRage = [["xmin", "min", "xAxis"], ["xmax", "max", "xAxis"], ["ymin", "min", "yAxis"], ["ymax", "max", "yAxis"]];
    for (i=0;i<4;i++){
        try {
            if (!_dispRange[displayRage[i][0]] == "") {
                option[displayRage[i][2]][displayRage[i][1]] = parseFloat(_dispRange[displayRage[i][0]]);
            }
        } catch (err) { }
    }

    // threshold
    var thresholdOption = [];
    var thresholdRng = [["low", "warning"],["min", "danger"],["high", "warning"],["max", "danger"]];
    for (i=0;i<4;i++){
        try {
            if (!_threshold[thresholdRng[i][0]] == "") {
                thresholdOption.push({
                    color: colorPlan[thresholdRng[i][1]],
                    width: 2,
                    value: parseFloat(_threshold[thresholdRng[i][0]])
                });
            }
        } catch (err) { }

    }
    option["yAxis"]["plotLines"] = thresholdOption;
    
    // seriesOpiotn
    var seriesOption = [];

    for (i = 0; i < _seriesData.length; i++) {
        seriesOption.push({
            name: _seriesData[i]["name"],
            data: _seriesData[i]["data"],
            color: _seriesData[i]["color"],
            turboThreshold: 0,
            marker: { radius: 3, symbol: "circle" }
        });
    }

    option["series"] = seriesOption;

    Highcharts.chart(_divname, option);
}

function makeColumnPlot(_divname, _title, _xtitle, _ytitle, _enableLgend, _tooltipNamex, _seriesDataX, _seriesData, _threshold) {
    var colorPlan = {
        border: "#c5c5c5",
        title: "#7f7f7f",
        seriesColorList: ["rgba(60,120,216,1)", "rgba(106,168,79,1)"],
        warning: "#f1c232",
        danger: "#ff4444"
    };

    var option = {
        chart: {
            type: "column",
            borderWidth: 1,
            borderColor: colorPlan["border"],
            zoomType: "xy",
            panning: true,
            panKey: "shift"
        },
        title: {
            text: _title,
            style: {
                color: colorPlan["title"],
                fontWeight: "bold",
                fontSize: "12px"
            }
        },
        xAxis: {
            title: { text: _xtitle },
            categories: _seriesDataX
        },
        yAxis: {
            title: {
                text: _ytitle
            }
        },
        legend: { enabled: _enableLgend },
        credits: { enabled: false },
        tooltip: {
            formatter: function () {
                var s = "<b>" + _tooltipNamex + ": " + _seriesDataX[this.point.x] + "</b>";
                s += "<br /><b>per: " + this.point.y + "%</b>";
                return s;
            }
        },
        plotOptions:{
            series:{
                dataLabels:{
                    enabled:true
                }
            }
        },
        series: []
    };

    // threshold
    var thresholdOption = [];
    var thesholdRng = [["low","warning"], ["min","danger"], ["high","warning"],["max","danger"]];
    for(i=0;i<4;i++){
        try {
            if (!_threshold[thesholdRng[i][0]] == "") {
                thresholdOption.push({
                    color: colorPlan[thesholdRng[i][1]],
                    width: 2,
                    value: (_seriesDataX.length - 1) / (_seriesDataX[_seriesDataX.length - 1] - _seriesDataX[0]) * (parseFloat(_threshold[thesholdRng[i][0]]) - _seriesDataX[0])
                });
            }
        } catch (err) { }
    }

    option["xAxis"]["plotLines"] = thresholdOption;
    
    var seriesOption = [];
    for (i = 0; i < _seriesData.length; i++) {
        seriesOption.push({
            name: _seriesData[i]["name"],
            data: _seriesData[i]["data"],
            color: _seriesData[i]["color"]
        });
    }

    option["series"] = seriesOption;

    Highcharts.chart(_divname, option);
}

function makeHeatmapPlot(_divname, _title, _xtitle, _ytitle, _enableLgend, _tooltipNamex, _tooltipNamey, _seriesDataX, _seriesDataY, _seriesData) {
    var colorPlan = {
        border: "#c5c5c5",
        title: "#7f7f7f",
        seriesColorList: ["#6e9eeb", "#6aa84f"],
        warning: "#f6b26b",
        danger: "#ea9999"
    };

    var option = {
        chart: {
            type: "heatmap",
            borderWidth: 1,
            borderColor: colorPlan["border"]
        },
        title: {
            text: _title,
            style: {
                color: colorPlan["title"],
                fontWeight: "bold",
                fontSize: "12px"
            }
        },
        xAxis: {
            min: 0,
            max: _seriesDataX.length - 1,
            title: { text: _xtitle },
            categories: _seriesDataX
        },
        yAxis: {
            min: 0,
            max: _seriesDataY.length - 1,
            categories: _seriesDataY,
            title: { text: _ytitle }
        },
        legend: { enabled: _enableLgend },
        credits: { enabled: false },
        colorAxis: {
            min: 0,
            maxColor: "#ff4f4f",
            reversed: false
        },
        legend: {
            align: "right",
            layout: "vertical",
            margin: 0,
            verticalAlign: "top",
            y: 26,
            symbolHeight: 200
        },
        credits: {
            enabled: false
        },
        tooltip: {
            formatter: function () {
                var s = "<b>" + _tooltipNamex + ": " + _seriesDataX[this.point.x] + "</b>";
                s += "<br/><b>" + _tooltipNamey + ": " + _seriesDataY[this.point.y] + "</b>";
                s += "<br/><b>count: " + this.point.value + "</b>";
                return s;
            }
        },
        series: []
    };

    var seriesOption = [];

    for (i = 0; i < _seriesData.length; i++) {
        seriesOption.push({
            data: _seriesData,
            borderWidth: 0,
            turboThreshold: 0
        });
    }

    option["series"] = seriesOption;

    Highcharts.chart(_divname, option);
}

// bubble chart
function makeScatterDistr(_divname, _title, _xtitle, _ytitle, _enableLgend, _tooltipNamex, _tooltipNamey, _tooltipNamez, _seriesData) {
    var colorPlan = {
        border: "#c5c5c5",
        title: "#7f7f7f"
    };

    var option = {
        chart: {
            type: "scatter",
            borderWidth: 1,
            borderColor: colorPlan["border"],
            zoomType: "xy",
            panning: true,
            panKey: "shift"
        },
        title: {
            text: _title,
            style: {
                color: colorPlan["title"],
                fontWeight: "bold",
                fontSize: "12px"
            }
        },
        xAxis: {
            title: { text: _xtitle }
        },
        yAxis: {
            title: {
                text: _ytitle
            }
        },
        legend: { enabled: _enableLgend },
        credits: { enabled: false },
        tooltip: {
            formatter: function () {
                var s = "<b>" + _tooltipNamex + ": " + this.point.x + "</b>";
                s += "<br/><b>" + _tooltipNamey + ": " + this.point.y + "</b>";
                s += "<br/><b>" + _tooltipNamez + ": " + this.point.z + "</b>";
                return s;
            }
        },
        series: []
    };
    var seriesOption = [];
    for (i = 0; i < _seriesData.length; i++) {
        seriesOption.push({
            name: _seriesData[i]["name"],
            data: _seriesData[i]["data"],
            color: _seriesData[i]["color"],
            turboThreshold: 0,
            marker: { radius: 3, symbol: "circle" }
        });
    }

    option["series"] = seriesOption;

    Highcharts.chart(_divname, option);
}


function makeScatterPlotDualAxis(_divname, _title, _xtitle, _ytitle1, _ytitle2, _enableLgend, _tooltipNamex, _tooltipNamey, _seriesData, _dispRange, _threshold){
    var colorPlan = {
        border: "#c5c5c5",
        title: "#7f7f7f",
        seriesColorList: ["#3c78d8", "#6aa84f"],
        warning: "#f1c232",
        danger: "#ff4444"
    };

    var option = {
        chart: {
            type: "scatter",
            borderWidth: 1,
            borderColor: colorPlan["border"],
            zoomType: "xy",
            panning: true,
            panKey: "shift"
        },
        title: {
            text: _title,
            style: {
                color: colorPlan["title"],
                fontWeight: "bold",
                fontSize: "12px"
            }
        },
        xAxis: { title: { text: _xtitle } },
        yAxis: [
            {
                title: {
                    text: _ytitle1
                }
            },
            {
                title: {
                    text: _ytitle2
                },
                opposite: true
            }
        ],
        legend: { enabled: _enableLgend },
        credits: { enabled: false },
        tooltip: {
            formatter: function () {
                var s = "<b>" + _tooltipNamex + ": " + this.point.x + "</b>";
                s += "<br/><b>" + _tooltipNamey + ": " + this.point.y + "</b>";
                s += "<br/><b>time: " + this.point.time + "</b>";
                s += "<br/><b>filename: " + this.point.filename + "</b>";
                return s;
            }
        },
        series: []
    };

    // display range
    var displayRage = [["xmin", "min", "xAxis"], ["xmax", "max", "xAxis"], ["ymin", "min", "yAxis"], ["ymax", "max", "yAxis"]];
    for (i=0;i<4;i++){
        try {
            if (!_dispRange[displayRage[i][0]] == "") {
                option[displayRage[i][2]][displayRage[i][1]] = parseFloat(_dispRange[displayRage[i][0]]);
            }
        } catch (err) { }
    }

    // threshold
    var thresholdOption = [];
    var thresholdRng = [["low", "warning"],["min", "danger"],["high", "warning"],["max", "danger"]];
    for (i=0;i<4;i++){
        try {
            if (!_threshold[thresholdRng[i][0]] == "") {
                thresholdOption.push({
                    color: colorPlan[thresholdRng[i][1]],
                    width: 2,
                    value: parseFloat(_threshold[thresholdRng[i][0]])
                });
            }
        } catch (err) { }

    }
    option["yAxis"]["plotLines"] = thresholdOption;
    
    // seriesOpiotn
    var seriesOption = [];

    for (i = 0; i < _seriesData.length; i++) {
        
        seriesOption.push({
            name: _seriesData[i]["name"],
            data: _seriesData[i]["data"],
            color: _seriesData[i]["color"],
            turboThreshold: 0,
            yAxis: _seriesData[i]["yAxis"],
            marker: { radius: 3, symbol: "circle" }
        });
    }

    option["series"] = seriesOption;

    Highcharts.chart(_divname, option);
}