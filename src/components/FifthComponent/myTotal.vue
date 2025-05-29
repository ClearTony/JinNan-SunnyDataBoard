<template>
  <!--第一个 -->
  <div class="big-index-1">
    <!-- 新增按钮组 -->
    <div class="time-buttons">
      <button
          :class="{ active: activeButton === 'day' }"
          @click="handleButtonClick('day')"
      >
        今日
      </button>
      <button
          :class="{ active: activeButton === 'month' }"
          @click="handleButtonClick('month')"
      >
        本月
      </button>
      <button
          :class="{ active: activeButton === 'year' }"
          @click="handleButtonClick('year')"
      >
        全部
      </button>
    </div>
    <ul>
      <li>
        <b class="animation-1"></b><b class="animation-2"></b>
        <b class="animation-3"></b>
        <p>能量分析</p>
        <strong>{{displayEnergyValue}}</strong><span>{{displayEnergyUnit}}</span>
      </li>
      <li>
        <b class="animation-1"></b><b class="animation-2"></b
        ><b class="animation-3"></b>
        <p>生产</p>
        <strong>{{displayEnergyValue}}</strong><span>{{displayEnergyUnit}}</span>
      </li>
      <li>
        <b class="animation-1"></b><b class="animation-2"></b
        ><b class="animation-3"></b>
        <p>净收益</p>
        <strong>{{displayIncomeValue}}</strong><span>{{displayIncomeUnit}}</span>
      </li>
    </ul>

  </div>
</template>

<style lang="scss" scoped>
/*引用字库*/
@font-face {
  font-family: "electronicFont";
  src: url("../../assets/font/DS-DIGIT.TTF");
}

/* 顶部大指标 */
.big-index-1 {
  text-align: center;
  position: absolute;
  left: -10px;
  top: 30px;
  line-height: 1;
  min-width: 818px;
  height: 200px;
  overflow: hidden;
}

.big-index-1 li {
  transition: all 0.1s ease;
  cursor: pointer;
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: 220px;
  height: 100px;
  padding: 10px 0 0 20px;
  background: url(../../assets/images/bg01bigindex.png);
  background-size: cover; /* 图片拉伸以填充整个元素 */
  //   background-position: center; /* 图片居中显示 */
  margin-right: 20px;
}

// 数字
.big-index-1 li strong {
  display: inline-block;
  color: #fff;
  font-family: "electronicFont";
  font-size: 32px;
  font-weight: normal;
  //   top: -10px;
  margin-top: -8px;
  // margin-left: 38px;
}

// 标题
.big-index-1 li p {
  //   display: block;
  color: #b8babb;
  font-size: 20px;
  top: -10px;
  // margin-left: 60px;
}

.big-index-1 li .animation-1 {
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: bounceInLeft1;
  -webkit-animation-duration: 9000ms;
  position: absolute;
  left: 12px;
  bottom: 0px;
  height: 3px;
  width: 420px;
  background: url(../../assets/images/bg04bigindex.png) 0 0 repeat-x;
}

.big-index-1 li .animation-2 {
  position: absolute;
  right: 0;
  top: 1px;
  height: 111px;
  width: 15px;
  background: url(../../assets/images/bg02bigindex.png) 0 0 no-repeat;
}
.big-index-1 li .animation-3 {
  position: absolute;
  right: -1px;
  bottom: -1px;
  height: 111px;
  width: 4px;
  background: url(../../assets/images/bg03bigindex.png) 50% 50% no-repeat;
}

.big-index-1 li:hover .animation-2 {
  background: url(../../assets/images/bg02bigindex_.png) 0 0 no-repeat;
}

.big-index-1 li:hover .animation-3 {
  background: url(../../assets/images/bg03bigindex_.png) 50% 50% no-repeat;
}

.big-index-1 li:hover .animation-1 {
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: bounceInRight1;
  -webkit-animation-duration: 4000ms;
}

.big-index-1 li:hover .animation-2,
.big-index-1 li:hover .animation-3 {
  -webkit-animation: flash 0.2s 0.2s ease both;
  -moz-animation: flash 0.2s 0.2s ease both;
}

@keyframes bounceInLeft1 {
  0% {
    -webkit-transform: translateX(-115px);
  }
  100% {
    -webkit-transform: translateX(0);
  }
}

@keyframes bounceInRight1 {
  0% {
    -webkit-transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(-115px);
  }
}
.time-buttons {
  margin-bottom: 20px;
  button {
    margin-right: 50px;
    padding: 8px 16px; // 调整内边距，让按钮更饱满
    border: none;  // 明确设置为无边框
    border-radius: 4px; // 添加圆角
    cursor: pointer;
    background-color: transparent; // 初始背景透明
    color: #b8babb; // 文字颜色与标题一致
    font-size: 16px; // 调整字体大小
    transition: all 0.3s ease; // 添加过渡效果

    &.active {
      background-color: #063c75;
      color: white;
      border-color: #063c75; // 激活状态边框颜色与背景一致
    }

    &:hover {
      background-color: rgb(6, 60, 117); // 悬停时半透明背景
      color: white;
    }
  }
}
</style>



<script setup lang="ts">
import { ref, onMounted, onUnmounted,watch } from "vue";
import { usePowerStationStore } from '/@/stores/powerStationStore';
import { computed } from 'vue';

const powerStationStore = usePowerStationStore();
const powerStationDetail = computed(() => powerStationStore.powerStationDetail);
// 记录当前激活的按钮
const activeButton = ref("");
// 新增响应式变量，用于动态显示能量值
const displayEnergyValue = ref('');
const displayEnergyUnit = ref('');
const displayIncomeValue = ref('');
const displayIncomeUnit = ref('');
// 处理按钮点击事件
const handleButtonClick = (buttonType: string) => {
  // 确保有数据再处理
  if (!powerStationDetail.value) return;
  activeButton.value = buttonType;
  switch (buttonType) {
    case 'day':
      // 假设今日的能量值存储在 powerStationDetail 的某个字段中，这里示例为 totalEnergyValueDay
      displayEnergyValue.value = powerStationDetail.value?.todayEnergyValue || '';
      displayEnergyUnit.value = powerStationDetail.value?.todayEnergyUnit || '';
      displayIncomeValue.value = powerStationDetail.value?.todayIncomeValue || '';
      displayIncomeUnit.value = powerStationDetail.value?.todayIncomeUnit || '';
      break;
    case 'month':
      // 假设本月的能量值存储在 powerStationDetail 的某个字段中，这里示例为 totalEnergyValueMonth
      displayEnergyValue.value = powerStationDetail.value?.monthEnergyValue || '';
      displayEnergyUnit.value = powerStationDetail.value?.monthEnergyUnit || '';
      displayIncomeValue.value = powerStationDetail.value?.monthIncomeValue || '';
      displayIncomeUnit.value = powerStationDetail.value?.monthIncomeUnit || '';
      break;
    case 'year':
      // 使用原有的总能量值
      displayEnergyValue.value = powerStationDetail.value?.totalEnergyValue || '';
      displayEnergyUnit.value = powerStationDetail.value?.totalEnergyUnit || '';
      displayIncomeValue.value = powerStationDetail.value?.totalIncomeValue || '';
      displayIncomeUnit.value = powerStationDetail.value?.totalIncomeUnit || '';
      break;
    default:
      displayEnergyValue.value = '';
  }
};
let timer: ReturnType<typeof setInterval> | null = null;
// 添加 watch 监听
watch(
    () => powerStationDetail.value,
    (newValue) => {
      if (newValue && !activeButton.value) {
        handleButtonClick('day');
      }
    }
);
onMounted(async () => {
  await powerStationStore.startFetching();
  // 双重保障：无论watch是否触发都确保执行
  if (powerStationDetail.value && !activeButton.value) {
    handleButtonClick('day');
  }
  const buttonTypes = ['day', 'month', 'year'];
  let index = 0;
  timer = setInterval(() => {
    if (index >= buttonTypes.length) {
      index = 0;
    }
    handleButtonClick(buttonTypes[index]);
    index++;
  }, 5000);
});
onUnmounted(() => {
  powerStationStore.stopFetching();
  if (timer) {
    clearInterval(timer);
  }
});
</script>
