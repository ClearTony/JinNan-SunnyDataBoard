<template>
  <!-- 折线图 -->
  <div style="width: 800px; height: 300px" ref="chartsDOM"></div>
</template>




<script setup lang="ts">
import { ref, onMounted, toRef } from "vue";
import * as echarts from "echarts";

const chartsDOM = ref();

async function initMap() {
  var myChart = echarts.init(chartsDOM.value);
  // 显示 loading 动画
  myChart.showLoading();
  // 再得到数据的基础上，进行地图绘制
  myChart.hideLoading();
  var option = {
    color: ["#00DDFF", "#80FFA5"],
    title: {
      // text: "  🚀 车流量折线图 ",
      // left: 'center'
      // subtext: '每分钟数据'
    },

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#0C93B4",
        },
      },
      formatter: "{b}:<br/> 车流量：{c} %",
    },
    legend: {
      data: [
        {
          name: "Line 1",
          // 强制设置图形为圆。
          icon: "circle",
          // 设置文本为红色
          textStyle: {
            color: "whilt",
          },
        },
        {
          name: "Line 2",
          // 强制设置图形为圆。
          icon: "circle",
          // 设置文本为红色
          textStyle: {
            color: "whilt",
          },
        },
      ],
      bottom: -5,
    },
    // 保存
    // toolbox: {
    //   feature: {
    //     saveAsImage: {
    //       pixelRatio: 2, // 设置保存图像的像素比例，默认为1，可以提高清晰度
    //       title: "下载", // 保存图像按钮的鼠标悬停标题
    //       // icon: 'image://path/to/save-icon.png', // 自定义保存图像按钮的图标
    //       name: "车流量折线图", // 指定保存图像时使用的文件名
    //       // backgroundColor: 'transparent', // 保存的图像背景颜色，默认为透明
    //       excludeComponents: ["toolbox"], // 排除不想保存的组件，默认不排除任何组件
    //       show: true, // 是否显示保存图像按钮，默认为true
    //       // emphasis: {
    //       //     show: true, // 鼠标悬停按钮时是否高亮显示，默认为true
    //       //     iconStyle: {
    //       //         textPosition: 'bottom',
    //       //         color: '#000',
    //       //         borderColor: '#000',
    //       //         borderWidth: 1
    //       //     }
    //       // }
    //     },
    //   },
    // },

    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "10%",
      containLabel: true,
    },

    xAxis: [
      {
        boundaryGap: false,
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Line 1",
        type: "line",
        stack: "Total",
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(128, 255, 165)",
            },
            {
              offset: 1,
              color: "rgb(1, 191, 236)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [140, 232, 101, 264, 90, 340, 250],
      },
      {
        name: "Line 2",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(0, 221, 255)",
            },
            {
              offset: 1,
              color: "rgb(77, 119, 255)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [120, 282, 111, 234, 220, 340, 310],
      },
      {
        polyline: true,
        // showSymbol: false,
        name: "流动光线",
        type: "lines",
        smooth: true,
        coordinateSystem: "cartesian2d",
        effect: {
          delay: 100, // 延迟100ms开始流动
          trailLength: 0.5,
          show: true,
          period: 5,
          symbolSize: 4,
          loop: true,
        },
        lineStyle: {
          color: "#20db9df0",
          width: 0,
          opacity: 0,
          curveness: 0.5, // 设置曲率
          // type: "curve", // 设置为曲线
        },

        data: [
          {
            coords: [
              [0, 140],
              [1, 232],
              [2, 101],
              [3, 264],
              [4, 90],
              [5, 340],
              [6, 250],
            ],
          },
        ],
      },
    ],
  };

  myChart.setOption(option);
}

onMounted(async () => {
  await initMap();
});
</script>
