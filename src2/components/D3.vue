<template>
  <div class="tree" id="tree"></div>
</template>

<script>
// import "http://apps.bdimg.com/libs/d3/3.4.8/d3.min.js"
import "@/../static/d3.v3.min.js";
import "../assets/font-awesome-4.7.0/css/font-awesome.min.css";
export default {
  data() {
    return {};
  },
  mounted() {
    var treedata = {
      name: "PublisherNameLongName",
      id: "id1",
      type: "type0",
      addable: false,
      editable: false,
      removable: false,
      enableble: false,
      children: [
        {
          name: "Landing A",
          id: "id2",
          type: "type1",
          addable: true,
          editable: true,
          removable: true,
          enablable: true,
          enable: false,
          children: [
            {
              name: "Account 1",
              id: "id3",
              type: "type2",
              children: [
                {
                  name: "tracking link 1",
                  id: "id4",
                  type: "type3",
                  enablable: true,
                  enable: true
                },
                {
                  name: "tracking link 2",
                  id: "id5",
                  type: "type3",
                  enablable: true,
                  enable: true
                },
                {
                  name: "tracking link 3",
                  id: "id6",
                  type: "type3",
                  enablable: true,
                  enable: false
                }
              ]
            },
            {
              name: "Account 2",
              id: "id7",
              type: "type2"
            },
            {
              name: "Account 3",
              id: "id9",
              type: "type2"
            }
          ]
        },
        {
          name: "Landing B",
          id: "id8",
          type: "type1",
          addable: true,
          editable: true,
          removable: true,
          enablable: true,
          enable: false,
          children: [
            {
              name: "Account 4",
              id: "id10",
              type: "type2"
            },
            {
              name: "Account 5",
              id: "id11",
              type: "type2"
            },
            {
              name: "Account 6",
              id: "id12",
              type: "type2"
            }
          ]
        },
        {
          name: "Landing C",
          id: "id13",
          type: "type1",
          addable: true,
          editable: true,
          removable: true,
          // "enablable": true,//是否有多选框
          // "enable": true, //是否选中
          children: [
            {
              name: "Subtopic 7",
              id: "id14",
              type: "type3"
            },
            {
              name: "Subtopic 8",
              id: "id15",
              type: "type3"
            },
            {
              name: "Subtopic 9",
              id: "id16",
              type: "type3"
            }
          ]
        }
      ]
    };

    var m = [20, 20, 20, 20],
      w = 800 - m[1] - m[3],
      h = 600 - m[0] - m[2],
      i = 0,
      r = 800,
      x = d3.scale
        .linear()
        .domain([0, w])
        .range([0, w]),
      y = d3.scale
        .linear()
        .domain([0, h])
        .range([0, h]),
      root;

    var vis = d3
      .select("#tree")
      .append("svg:svg")
      .attr("viewBox", "0 0 600 600")
      .attr("width", w + m[1] + m[3])
      .attr("height", h + m[0] + m[2])
      .append("svg:g")
      //.attr("pointer-events", "all")
      .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
    //.call(d3.behavior.zoom().scaleExtent([1,8]).on("zoom",zoom));
    //.call(d3.behavior.zoom().x(x).y(y).scaleExtent([1, 8]).on("zoom", zoom))
    vis
      .append("rect")
      .attr("class", "overlay")
      .attr("width", w + m[1] + m[3])
      .attr("height", h + m[0] + m[2])
      .attr("opacity", 0);

    var tree = d3.layout.tree().size([h, w]);

    var diagonal = d3.svg.diagonal().projection(function(d) {
      return [d.y, d.x];
    });

    root = treedata;
    root.x0 = h / 2;
    root.y0 = 0;

    function toggleAll(d) {
      if (d.children) {
        d.children.forEach(toggleAll);
        toggle(d);
      }
    }
    console.log(root);

    // initialize the display to show a few nodes.
    root.children.forEach(toggleAll);
    //toggle(root.children[1]);
    //toggle(root.children[9]);

    update(root);

    // 更新数据
    function update(source) {
      var duration = d3.event && d3.event.altKey ? 5000 : 500;

      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse();

      // Normalize for fixed-depth.
      nodes.forEach(function(d) {
        d.y = d.depth * 180;
      });

      // Update the nodes...
      var node = vis.selectAll("g.node").data(nodes, function(d) {
        return d.id || (d.id = ++i);
      });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node
        .enter()
        .append("svg:g")
        .attr("class", "node")
        .attr("id", function(d) {
          return "node-" + d.id;
        })
        .attr("transform", function(d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on("click", function(d) {
          toggle(d);
          update(d);
          if (d["info"]) {
            playvid(d["info"]);
          }
        });

      nodeEnter
        .append("svg:circle")
        .attr("r", 1e-6)
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
        });

      var nodeText = nodeEnter
        .append("svg:foreignObject")
        //.attr("y", function(d) { return d.children || d._children ? -10 : 10; })
        //.attr("dx", ".35em")
        //.attr("x", function(d) {
        //  return d.children || d._children ? -10 : 10;
        //})
        .attr("y", -30)
        .attr("x", -5)
        .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
        })
        .style("fill-opacity", 1e-6)
        .attr("width", 160)
        .attr("height", 24)
        .append("xhtml:div")
        .attr("class", function(d) {
          return "node-label" + " node-" + d.type;
        })
        .classed("disabled", function(d) {
          return d.enable !== undefined && !d.enable;
        });

      //Enable node button
      nodeText
        .filter(function(d) {
          return d.enablable;
        })
        .append("input", ".")
        .attr("type", "checkbox")
        .property("checked", function(d) {
          return d.enable;
        })
        .on("change", toggleEnable, true)
        .on("click", stopPropogation, true);

      //de label
      nodeText
        .append("span")
        .attr("class", "node-text")
        .text(function(d) {
          return d.name;
        });

      //Edit node button
      nodeText
        .filter(function(d) {
          return d.editable;
        })
        .append("a")
        .attr("class", "node-edit")
        .on("click", alertEdit, true)
        .append("i")
        .attr("class", "fa fa-pencil");

      //Add node button
      nodeText
        .filter(function(d) {
          return d.addable;
        })
        .append("a")
        .attr("class", "node-add")
        .on("click", onAddNode, true)
        .append("i")
        .attr("class", "fa fa-plus");

      //Remove node button
      nodeText
        .filter(function(d) {
          return d.removable;
        })
        .append("a")
        .attr("class", "node-remove")
        .on("click", onRemoveNode, true)
        .append("i")
        .attr("class", "fa fa-times");

      // Transition nodes to their new position.
      var nodeUpdate = node
        .transition()
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + d.y + "," + d.x + ")";
        });

      nodeUpdate
        .select("circle")
        .attr("r", 4.5)
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
        });

      nodeUpdate.select("text").style("fill-opacity", 1);

      // Transition exiting ndoes to the parent's new position.
      var nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

      nodeExit.select("circle").attr("r", 1e-6);
      nodeExit.select("text").style("fill-opacity", 1e-6);

      // Update the links...
      var link = vis
        .selectAll("path.link")
        .data(tree.links(nodes), function(d) {
          return d.target.id;
        });

      // Enter any new links at hte parent's previous position
      link
        .enter()
        .insert("svg:path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
          var o = {
            x: source.x0,
            y: source.y0
          };
          return diagonal({
            source: o,
            target: o
          });
        })
        .transition()
        .duration(duration)
        .attr("d", diagonal);

      // Transition links to their new position.
      link
        .transition()
        .duration(duration)
        .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link
        .exit()
        .transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = {
            x: source.x,
            y: source.y
          };
          return diagonal({
            source: o,
            target: o
          });
        })
        .remove();

      // Stash the old positions for transition.
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }
    // Toggle children
    function toggle(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    }

    // zoom in / out
    function zoom(d) {
      //vis.attr("transform", "transl3ate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      var nodes = vis.selectAll("g.node");
      nodes.attr("transform", transform);

      // Update the links...
      var link = vis.selectAll("path.link");
      link.attr("d", translate);

      // Enter any new links at hte parent's previous position
      //link.attr("d", function(d) {
      //      var o = {x: d.x0, y: d.y0};
      //      return diagonal({source: o, target: o});
      //    });
    }

    function transform(d) {
      return "translate(" + x(d.y) + "," + y(d.x) + ")";
    }

    function translate(d) {
      var sourceX = x(d.target.parent.y);
      var sourceY = y(d.target.parent.x);
      var targetX = x(d.target.y);
      var targetY = (sourceX + targetX) / 2;
      var linkTargetY = y(d.target.x0);
      var result =
        "M" +
        sourceX +
        "," +
        sourceY +
        " C" +
        targetX +
        "," +
        sourceY +
        " " +
        targetY +
        "," +
        y(d.target.x0) +
        " " +
        targetX +
        "," +
        linkTargetY +
        "";
      //console.log(result);

      return result;
    }
    var that=this;
    function alertEdit(d){
      that.$prompt('请输入节点名', '编辑', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:  /\S/,
          inputErrorMessage: '节点名不能为空'
        }).then(({ value }) => {
          // this.$message({
          //   type: 'success',
          //   message: '你的邮箱是: ' + value
          // });
          onEditNode(d,value)
        })
        // .catch(() => {
          // that.$message({
          //   type: 'info',
          //   message: '取消输入'
          // });       
        // });
              
stopPropogation();
    }

    function onEditNode(d,value) {
      var length = 9;
      var id = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, length);

      var str = {
        name: value,
        id: id,
        type: "type1",
        addable: true,
        editable: true,
        removable: true,
        enablable: true,
        enable: false,
        children: []
      };
      console.log(d);
      var index = d.parent.children.indexOf(d);
      if (index > -1) {
        d.parent.children.splice(index, 1, str);
      }
      update(d.parent);
      stopPropogation();

      // alert(d)
      // var length = 9;
      // var id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);

      // addChildNode(d.id, {
      //   "name": "new child node",
      //   "id": id,
      //   "type": "type2"
      // });
      // stopPropogation();
    }

    function onAddNode(d) {
      var length = 9;
      var id = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, length);
      addChildNode(d.id, {
        name: "new child node",
        id: id,
        type: "type2"
      });
      stopPropogation();
      console.log(root);
    }

    function onRemoveNode(d) {
      var index = d.parent.children.indexOf(d);
      if (index > -1) {
        d.parent.children.splice(index, 1);
      }
      update(d.parent);
      stopPropogation();
    }

    function addChildNode(parentId, newNode) {
      var node = d3.select("#" + "node-" + parentId);
      var nodeData = node.datum();
      if (nodeData.children === undefined && nodeData._children === undefined) {
        nodeData.children = [newNode];
      } else if (nodeData._children != null) {
        nodeData._children.push(newNode);
        toggle(nodeData);
      } else if (nodeData.children != null) {
        nodeData.children.push(newNode);
      }
      update(node);
      stopPropogation();
    }

    function toggleEnable(d) {
      d.enable = !d.enable;
      var node = d3
        .select("#" + "node-" + d.id + " .node-label")
        .classed("disabled", !d.enable);
      stopPropogation();
    }

    function stopPropogation() {
      d3.event.stopPropagation();
    }
  }
};
</script>

<style scoped>
/* @import "../assets/font-awesome-4.7.0/css/font-awesome.min.css"; */
/* body {
    background-color: #fff;
  } */

.tree /deep/ .node circle {
  cursor: pointer;
  fill: #fff;
  stroke: steelblue;
  stroke-width: 1.5px;
}

.tree /deep/ .node-label {
  font-size: 12px;
  padding: 3px 5px;
  display: inline-block;
  word-wrap: break-word;
  max-width: 160px;
  background: #d0dee7;
  border-radius: 5px;
}

.tree /deep/ .node a:hover {
  cursor: pointer;
}

.tree /deep/ .node a {
  font-size: 10px;
  margin-left: 5px;
}

.tree /deep/ a.node-remove {
  color: red;
}

.tree /deep/ input + .node-text {
  margin-left: 5px;
}

.tree /deep/ .node-label.node-type1 {
  background: coral;
}

.tree /deep/ .node-label.node-type2 {
  background: lightblue;
}

.tree /deep/ .node-label.node-type3 {
  background: yellow;
}

.tree /deep/ .node-label.disabled {
  background: #e9e9e9;
  color: #838383;
}

.tree /deep/ .node text {
  font-size: 11px;
}

.tree /deep/ path.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 1.5px;
}
</style>