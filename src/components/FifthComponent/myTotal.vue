<template>
  <!--第一个 -->
  <div class="big-index-1">
    <!-- 新增按钮组 -->
    <div class="time-buttons">
      <button
          :class="{ active: activeButton === 'day' }"
          @click="handleButtonClick('day')"
      >
        日
      </button>
      <button
          :class="{ active: activeButton === 'week' }"
          @click="handleButtonClick('week')"
      >
        周
      </button>
      <button
          :class="{ active: activeButton === 'month' }"
          @click="handleButtonClick('month')"
      >
        月
      </button>
      <button
          :class="{ active: activeButton === 'year' }"
          @click="handleButtonClick('year')"
      >
        年
      </button>
    </div>
    <ul>
      <li>
        <b class="animation-1"></b><b class="animation-2"></b
        ><b class="animation-3"></b>
        <p>能量分析</p>
        <strong>5,741.4度</strong>
      </li>
      <li>
        <b class="animation-1"></b><b class="animation-2"></b
        ><b class="animation-3"></b>
        <p>生产</p>
        <strong>174.6069</strong>
      </li>
      <li>
        <b class="animation-1"></b><b class="animation-2"></b
        ><b class="animation-3"></b>
        <p>净收益</p>
        <strong>174.6069</strong>
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
  display: block;
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
import { ref, onMounted, onUnmounted } from "vue";
// 记录当前激活的按钮
const activeButton = ref("");

// 处理按钮点击事件
const handleButtonClick = (buttonType: string) => {
  activeButton.value = buttonType;
  // 这里可以添加你需要的业务逻辑，比如调用接口获取不同时间范围的数据
  console.log(`点击了 ${buttonType} 按钮`);
};
let timer: ReturnType<typeof setInterval> | null = null;
onMounted(async () => {
  handleButtonClick('day'); // 默认触发"日"按钮
  const buttonTypes = ['day', 'week', 'month', 'year'];
  let index = 0;
  timer = setInterval(() => {
    if (index >= buttonTypes.length) {
      index = 0;
    }
    handleButtonClick(buttonTypes[index]);
    index++;
  }, 3000);
});
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>
