<template>
  <!-- 折线图 -->
  <div style="width: 365px; height: 330px; top:-20px" ref="barChartsDOM"></div>
</template>




<script setup lang="ts">
import { ref, onMounted, toRef } from "vue";
import * as echarts from "echarts";

const barChartsDOM = ref();

async function initMap() {
  var myChart = echarts.init(barChartsDOM.value);

  let dataAxis = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  // prettier-ignore

  let data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
  let yMax = 500;
  let dataShadow = [];

  for (let i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
  }

  var option = {
    title: {
      // text: "  🚀 车辆速度统计柱状图 ",
      // left: 'center'
      // subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "rgba(53,112,210,1)",
        },
      },
      formatter: "{b}:<br/> 车流量：{c} %",
    },
    legend: {
      data: [        {
          name: "label1",
          // 强制设置图形为圆。
          icon: "circle",
          // 设置文本为红色
          textStyle: {
            color: "whilt",
          },
        },],
      bottom: 0,
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

    xAxis: {
      data: dataAxis,
      axisLabel: {
        color: "rgba(255,255,255,0.8)",
      },
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "rgba(255,255,255,0.8)",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "10%",
      containLabel: true,
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    series: [
      {
        name: "label1",
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgb(0, 221, 255)" },
            // { offset: 0.5, color: 'rgb(0, 221, 255)' },
            { offset: 1, color: "rgb(77, 119, 255)" },
            // { offset: 0, color: 'rgb(6,190,179)' },
            // // { offset: 0.5, color: 'rgb(0, 221, 255)' },
            // { offset: 1, color: 'rgb(1,141,160)' }
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
        data: data,
      },
    ],
  };

  myChart.setOption(option);
}

onMounted(async () => {
  await initMap();
});
</script>
