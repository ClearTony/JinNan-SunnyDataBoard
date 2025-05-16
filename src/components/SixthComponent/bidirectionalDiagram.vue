<template>
  <!-- 双向图 bidirectionalDiagram -->
  <div style="width: 800px; height: 380px; margin-left:20px; margin-top: -43px;" ref="bidirectionalDiagramDOM"></div>
</template>


<script setup lang="ts">
import { ref, onMounted, toRef } from "vue";
import * as echarts from "echarts";

const bidirectionalDiagramDOM = ref();

async function initMap() {
  var myChart = echarts.init(bidirectionalDiagramDOM.value);
  var spNum = 5;
  var _max = 100;
  var legendData = ["10月前", "11月", "12月"];
  var y_data = ["管线", "桩基", "承台", "立柱", "盖梁", "路面","桥梁", "电线"];
  var _datamax = [100, 100, 100, 100, 100, 100,100,100],
    _data1 = [10, 15, 10, 43, 15, 11,29,17],
    _data2 = [19, 25, 40, 33, 15, 51,27,40],
    _data3 = [21, 35, 30, 13, 35, 11,19,23];
  var fomatter_fn = function (v) {
    return ((v.value / _max) * 100).toFixed(0) + "%";
  };
  var _label = {
    normal: {
      show: true,
      position: "inside",
      formatter: fomatter_fn,
      textStyle: {
        color: "#fff",
        fontSize: 16,
      },
    },
  };
  var option = {
    // backgroundColor: "#051338",
    grid: {
      containLabel: true,
      left: 0,
      right: 15,
      bottom: 30,
    },
    // 触摸显示的
    tooltip: {
      show: true,
      backgroundColor: "#fff",
      borderColor: "#ddd",
      borderWidth: 1,
      textStyle: {
        color: "#3c3c3c",
        fontSize: 16,
      },
      formatter: function (p) {
        console.log(p);
        var _arr = p.seriesName.split("/"),
          idx = p.seriesIndex; //1，2，3
        return (
          "名称：" +
          p.seriesName +
          "<br>" +
          "完成：" +
          p.value +
          "<br>" +
          "占比：" +
          ((p.value / _max) * 100).toFixed(0) +
          "%"
        );
      },
      extraCssText: "box-shadow: 0 0 5px rgba(0, 0, 0, 0.1)",
    },
    xAxis: {
      splitNumber: spNum,
      interval: _max / spNum,
      max: _max,
      axisLabel: {
        show: false,
        formatter: function (v) {
          var _v = ((v / _max) * 100).toFixed(0);
          return _v === "0" ? _v : _v + "%";
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: [
      {
        data: y_data,
        axisLabel: {
          fontSize: 16,
          color: "#fff",
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      {
        show: false,
        data: y_data,
        axisLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        type: "bar",
        silent: true,
        yAxisIndex: 1,
        barGap: 10,    // 设置柱状图之间的间距
        itemStyle: {
          normal: {
            color: "rgba(255,255,255,0.1)",   // 柱状的背景
          },
          emphasis: {
            color: "rgba(255,255,255,0.3)",
          },
        },
        data: _datamax,
      },
      {
        type: "bar",
        name: "10月前",
        stack: "2",
        label: _label,
        legendHoverLink: false,
        barWidth: 20,
        barGap: 50,    // 设置柱状图之间的间距
        itemStyle: {
          normal: {
            color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: '#9C58F6' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#6866F0' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
          },
          emphasis: {
            color: "#9C58F6",
          },
        },
        data: _data1,
      },
      {
        type: "bar",
        name: "11月",
        stack: "2",
        legendHoverLink: false,
        barWidth: 50,
        barGap: 20,    // 设置柱状图之间的间距
        label: _label,
        itemStyle: {
          normal: {
            color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: '#3AB9F8' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#606EF2' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
          },
          emphasis: {
            color: "#3BB6F8",
          },
        },
        data: _data2,
      },
      {
        type: "bar",
        stack: "2",
        name: "12月",
        legendHoverLink: false,
        barWidth: 20,
        barGap: 50,    // 设置柱状图之间的间距
        label: _label,
        itemStyle: {
          normal: {
            color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#65FDF0' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#2986AF' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
          },
          emphasis: {
            color: "#61F5EC",
          },
        },
        data: _data3,
      },
    ],
  };

  myChart.setOption(option);
}

onMounted(async () => {
  await initMap();
});
</script>