<template>
  <!-- 外层容器，用于统一管理布局 -->
  <div class="chart-container">
    <!-- 加载状态 -->
    <div class="loading-wrapper" v-if="loading">
      <dv-loading>Loading...</dv-loading>
    </div>
    <!-- 折线图容器 -->
    <div class="chart-wrapper"  v-else>
      <div ref="chartsDOM" style="width: 100%; height: 450px;"></div>
    </div>
  </div>
</template>




<script setup lang="ts">
import { ref, onMounted, watch,onUnmounted } from "vue";
import * as echarts from "echarts";
import axios from 'axios'

// 添加 loading 状态变量
const loading = ref(true);
const chartsDOM = ref();
const yaxisYesterDayDatas = ref<number[]>([])
const xaxisYesterDayDatas = ref<string[]>([])
const yaxisNowDatas = ref<number[]>([])
// 监听数据变化自动更新图表
watch([xaxisYesterDayDatas, yaxisYesterDayDatas, yaxisNowDatas], () => {
  // if (loading.value) return;
  initMap();
}, { flush: 'post' });
async function fetchData(isInitial = false) {
  if (isInitial) {
    loading.value = true;
  }
  try {
    const res = await axios.post('/data/getDayLineChart', {
      queryDate: "20250529"
    });
    xaxisYesterDayDatas.value = res.data.data.xaxisYesterDayDatas;
    yaxisYesterDayDatas.value = res.data.data.yaxisYesterDayDatas;
    yaxisNowDatas.value =  res.data.data.yaxisNowDatas;
  } catch (error) {
    console.error("请求失败:", error);
  }finally {
    loading.value = false; // 结束加载
  }
}
async function initMap() {
  if (loading.value) return;
  const myChart = echarts.getInstanceByDom(chartsDOM.value) ||
      echarts.init(chartsDOM.value);
  myChart.clear(); // 清除旧的图表配置
  myChart.showLoading(); // Echarts 内置加载动画
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
        const formatNumber = (num: number) => {
          return num.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          });
        };

        params.forEach(item => {
          result += `${item.marker} ${item.seriesName}: ${formatNumber(Number(item.value))} W<br/>`;
        });

        return result;
      }
    },
    legend: {
      data: [
        {
          name: "PV",
          // 强制设置图形为圆。
          icon: "circle",
          // 设置文本为红色
          textStyle: {
            color: "white",
          },
        },
        {
          name: "昨日数据",
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
    toolbox: {
      feature: {
        saveAsImage: {
          pixelRatio: 2, // 设置保存图像的像素比例，默认为1，可以提高清晰度
          title: "下载", // 保存图像按钮的鼠标悬停标题
          // icon: 'image://path/to/save-icon.png', // 自定义保存图像按钮的图标
          name: "日发电量折线图", // 指定保存图像时使用的文件名
          backgroundColor: '#0a1b34',
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
        data: xaxisYesterDayDatas.value,
        axisLabel: {
          color: "rgba(255,255,255,0.8)",
        },
      },


    ],
    yAxis: [
      {
        type: "value",
        name: "生产(W)",
        nameTextStyle: {
          color: "rgba(255,255,255,0.8)", // 橙色示例，可改为任意颜色
          fontSize: 12,    // 可选：调整字体大小
        },
        axisLabel: {
          color: "rgba(255,255,255,0.8)",
        },
      },
    ],
    series: [
      {
        name: "PV",
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
        data: yaxisNowDatas.value,
      },
      {
        name: "昨日数据",
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
        data: yaxisYesterDayDatas.value,
      },
    ],
  };
  try {
    // ...原有 option 配置...
    myChart.setOption(option);
  } finally {
    myChart.hideLoading();
  }
}

let intervalId: ReturnType<typeof setInterval>;
onMounted(async () => {
  await fetchData(true); // 初始化时调用，显示加载状态
  initMap();
  // 每 5 分钟（300000 毫秒）调用一次 fetchData 方法
  intervalId = setInterval(fetchData, 500000);
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
.loading-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.6); // 可选：添加背景遮罩
  padding: 20px;
  border-radius: 8px;
  color: #fff;
}
.chart-wrapper {
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 0;
}
</style>
