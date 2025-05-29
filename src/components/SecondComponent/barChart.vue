<template>
  <!-- 折线图 -->
  <div class="chart-container">
    <!-- 折线图容器 -->
    <div class="chart-wrapper">
      <div ref="barChartsDOM" style="width: 100%; height: 400px;"></div>
    </div>
  </div>
</template>




<script setup lang="ts">
import {ref, onMounted, inject, watch, onUnmounted} from "vue";
import * as echarts from "echarts";
import axios from 'axios';

const barChartsDOM = ref();
const activeButton = inject('activeButton');
const weekXAxis = ref<string[]>([])
const weekYAxis = ref<number[]>([])
const monthXAxis = ref<string[]>([])
const monthYAxis = ref<number[]>([])
const yearXAxis = ref<string[]>([])
const yearYAxis = ref<number[]>([])
const typeName = ref<string>()
const unitName = ref<string>()
const currentXAxis = ref<string[]>([]);
const currentYAxis = ref<number[]>([]);
// 监听数据变化自动更新图表
watch(() => activeButton.value, (newVal) => {
  switch(newVal) {
    case 'week':
      currentXAxis.value = weekXAxis.value;
      currentYAxis.value = weekYAxis.value;
      typeName.value = "周发电量";
      unitName.value = "度";
      break;
    case 'month':
      currentXAxis.value = monthXAxis.value;
      currentYAxis.value = monthYAxis.value;
      typeName.value = "月发电量";
      unitName.value = "度";
      break;
    case 'year':
      currentXAxis.value = yearXAxis.value;
      currentYAxis.value = yearYAxis.value;
      typeName.value = "年发电量";
      unitName.value = "万度";
      break;
  }
  initMap();
});
async function fetchData() {
  try {
    const res = await axios.post('/data/getBarChart', {
      queryDate: "20250529"
    });
    weekXAxis.value = res.data.data.weekXAxis;
    weekYAxis.value = res.data.data.weekYAxis;
    monthXAxis.value = res.data.data.monthXAxis;
    monthYAxis.value = res.data.data.monthYAxis;
    yearXAxis.value = res.data.data.yearXAxis;
    yearYAxis.value = res.data.data.yearYAxis;
    // 初始化默认显示周数据
    currentXAxis.value = weekXAxis.value;
    currentYAxis.value = weekYAxis.value;
  } catch (error) {
    console.error("请求失败:", error);
  }
}
async function initMap() {
  // var myChart = echarts.init(barChartsDOM.value);
  const myChart = echarts.getInstanceByDom(barChartsDOM.value) ||
      echarts.init(barChartsDOM.value);
  let dataAxis = currentXAxis.value;
  // prettier-ignore

  let data = currentYAxis.value;
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
      formatter: function(params) {
        const currentUnit = unitName.value; // 先获取当前单位
        let result = `${params[0].name}<br/>`; // x轴名称，例如 Mon
        const formatNumber = (num: number) => {
          return num.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          });
        };

        params.forEach(item => {
          result += `${item.marker} ${item.seriesName}: ${formatNumber(Number(item.value))} ${currentUnit}<br/>`;
        });

        return result;
      }
    },
    legend: {
      data: [        {
          name: typeName.value,
          // 强制设置图形为圆。
          icon: "circle",
          // 设置文本为红色
          textStyle: {
            color: "white",
          },
        }
      ],
      bottom: 0,
    },
    // 保存
    toolbox: {
      feature: {
        saveAsImage: {
          pixelRatio: 2, // 设置保存图像的像素比例，默认为1，可以提高清晰度
          title: "下载", // 保存图像按钮的鼠标悬停标题
          // icon: 'image://path/to/save-icon.png', // 自定义保存图像按钮的图标
          name: "发电量柱状图", // 指定保存图像时使用的文件名
          backgroundColor: '#0a1b34', // 保存的图像背景颜色，默认为透明
          excludeComponents: ["toolbox","dataZoom"], // 排除不想保存的组件，默认不排除任何组件
          borderColor: '#3570d2',
          borderWidth: 1,
          // 提高图片质量
          quality: 0.8,
          // 类型默认是png，也可以设置为jpeg
          type: 'png',
          show: true, // 是否显示保存图像按钮，默认为true
        },
      },
    },

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
      name: "生产(" +unitName.value+")" ,
      nameTextStyle: {
        color: "rgba(255,255,255,0.8)", // 橙色示例，可改为任意颜色
        fontSize: 12,    // 可选：调整字体大小
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
        name: typeName.value,
        type: "bar",
        barWidth: 50,
        showBackground: false,
        itemStyle: {
          // 为 label2 设置不同的颜色
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgb(237,170,89)" },
            { offset: 1, color: "rgb(255, 204, 0)" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#ffcc66" },
              { offset: 0.7, color: "#ffcc66" },
              { offset: 1, color: "#eccfb1" },
            ]),
          },
        },
        data: data,
      }
    ],
  };

  myChart.setOption(option);
}

let intervalId: ReturnType<typeof setInterval>;
onMounted(async () => {
  await fetchData();
  // 每 5 分钟（300000 毫秒）调用一次 fetchData 方法
  intervalId = setInterval(fetchData, 300000);
});
onUnmounted(() => {
  // 组件卸载时清除定时器，避免内存泄漏
  if (intervalId) {
    clearInterval(intervalId);
  }
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