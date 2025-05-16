<template>
  <!-- 折线图 -->
  <div style="width: 365px; height: 330px; top: -20px; left: 5px;" ref="pieChartDOM"></div>
</template>




<script setup lang="ts">
import { ref, onMounted, toRef } from "vue";
import * as echarts from "echarts";

const pieChartDOM = ref();

async function initMap() {
  var myChart = echarts.init(pieChartDOM.value);

  var option = {
    title: {
      // text: "  🚀 车辆类型统计图",
      // subtext: 'Fake Data',
      // left: 'center'
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}:<br/> 车流量：{c} %",
    },
    legend: {
      bottom: 10,
      left: "center",
      data: ["label1", "label2", "label3", "label4"],
      textStyle: {
        color: "whilt",
      },
    },
    series: [
      {
        textStyle: {
        color: "#F8F8F8",
      },
        type: "pie",
        radius: "55%",
        center: ["50%", "53%"],
        selectedMode: "single",
        data: [
          {
            label: { color: 'rgb(89,253,193)' },
            value: 434,
            name: "label4",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgb(89,253,193)" },
                { offset: 1, color: "rgb(48,214,231)" },
              ]),
            },
          },
          {
            label: { color: 'rgb(37,210,234)' },
            value: 1548,
            name: "label3",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgb(37,210,234)" },
                { offset: 1, color: "rgb(8,209,255)" },
              ]),
            },
          },
          {
            label: { color: 'rgb(148,107,244)' },
            value: 735,
            name: "label2",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgb(148,107,244)" },
                { offset: 1, color: "rgb(151,162,247)" },
              ]),
            },
          },
          {
            label: { color: 'rgb(98,106,241)' },
            value: 510,
            name: "label1",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgb(61,185,249)" },
                { offset: 1, color: "rgb(98,106,241)" },
              ]),
            },
          },
        ],

        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.02)",
          },
          textStyle: {
            color: "whilt",
          },
        },
      },
    ],
  };

  myChart.setOption(option);
}

onMounted(async () => {
  await initMap();
});
</script>
