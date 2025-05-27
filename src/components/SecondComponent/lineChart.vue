<template>
  <!-- 外层容器，用于统一管理布局 -->
  <div class="chart-container">
    <!-- 折线图容器 -->
    <div class="chart-wrapper">
      <div ref="chartsDOM" style="width: 100%; height: 450px;"></div>
    </div>
  </div>
</template>




<script setup lang="ts">
import { ref, onMounted, toRef } from "vue";
import * as echarts from "echarts";
// src/utils/request.ts
import axios from 'axios'

const chartsDOM = ref();
const categories = ref<string[]>([])
const line1Data = ref<number[]>([])
const line2Data = ref<number[]>([])

// onMounted(() => {
//   axios.post('/api/data', {
//     // 这里是你要传给后端的 JSON 数据
//     year: 2024,
//     region: 'south',
//     monthly: 'October'
//   })
//       .then(response => {
//         categories.value = response.categories
//         line1Data.value = response.line1Data
//         line2Data.value = response.line2Data
//       })
//       .catch(error => {
//         console.error("请求失败:", error);
//       });
// });

async function initMap() {
  var myChart = echarts.init(chartsDOM.value);
  // 显示 loading 动画
  myChart.showLoading();
  // 再得到数据的基础上，进行地图绘制
  myChart.hideLoading();
  var option = {
    color: ["#80FFA5","#00DDFF"],
    title: {
      // text: "  🚀 车流量折线图 ",
      // left: 'center',
      // subtext: '每分钟数据'
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100
      }
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#0C93B4",
        },
      },
      formatter: function(params) {
        let result = `${params[0].name}<br/>`; // x轴名称，例如 Mon

        params.forEach(item => {
          result += `${item.marker} ${item.seriesName}: ${item.value} %<br/>`;
        });

        return result;
      }
    },
    legend: {
      data: [
        {
          name: "Line 1",
          // 强制设置图形为圆。
          icon: "circle",
          // 设置文本为红色
          textStyle: {
            color: "white",
          },
        },
        {
          name: "Line 2",
          // 强制设置图形为圆。
          icon: "circle",
          // 设置文本为红色
          textStyle: {
            color: "white",
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
        smooth: true,
        lineStyle: {
          width: 2, // 同样设为 2
          color: "#80FFA5", // 橙色
        },
        showSymbol: false,
        emphasis: {
          focus: "series",
        },
        data: [140, 232, 101, 264, 90, 340, 250],
      },
      {
        name: "Line 2",
        type: "line",
        smooth: true,
        lineStyle: {
          width: 2,
          color: "#00DDFF", // 蓝色,
        },
        showSymbol: false,
        emphasis: {
          focus: "series",
        },
        data: [120, 282, 111, 234, 220, 100, 310],
      },
      // {
      //   polyline: true,
      //   // showSymbol: false,
      //   name: "流动光线",
      //   type: "lines",
      //   smooth: true,
      //   coordinateSystem: "cartesian2d",
      //   effect: {
      //     delay: 100, // 延迟100ms开始流动
      //     trailLength: 0.5,
      //     show: true,
      //     period: 5,
      //     symbolSize: 4,
      //     loop: true,
      //   },
      //   lineStyle: {
      //     color: "#20db9df0",
      //     width: 0,
      //     opacity: 0,
      //     curveness: 0.5, // 设置曲率
      //     // type: "curve", // 设置为曲线
      //   },
      //
      //   data: [
      //     {
      //       coords: [
      //         [0, 140],
      //         [1, 232],
      //         [2, 101],
      //         [3, 264],
      //         [4, 90],
      //         [5, 340],
      //         [6, 250],
      //       ],
      //     },
      //   ],
      // },
    ],
  };

  myChart.setOption(option);
}

onMounted(async () => {
  await initMap();
});
</script>
<style lang="scss" scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  gap: 10px; // 模块之间间距
}
.chart-wrapper {
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 0;
}
</style>
