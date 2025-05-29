<template                                                                                                                                 >
  <!-- 第一个 停电检测 -->
  <div>
    <!-- 二级标题 -->
    <dv-border-box-11 title="⚡️ 电量监测" style="width: 1900px; height: 1200px">
      <div>
        <!-- 三级标题 -->
        <div>
          <dv-border-box-5
            :color="['#225762', '#225762']"
            style="top: 80px; left: 40px; width: 280px; height: 40px"
          >
            <div
              style="
                padding-left: 15px;
                padding-top: 8px;
                font-size: 18px;
                font-weight: 700;
                color: #33ffff;
              "
            >
              ⚡️ 日发电量
            </div>
          </dv-border-box-5>
        </div>

        <div>
          <dv-border-box-8
            style="
              top: 90px;
              left: 40px;
              width: 1810px;
              height: 500px;
              color: #fff;
            "
          >
            <div
              style="
                padding: 5px;
                font-size: 18px;
                font-weight: 700;
                color: #fff;
              "
            >
              <lineChart></lineChart>
            </div>
          </dv-border-box-8>
        </div>

        <!-- 下面 -->
        <div class="flex">
          <div>
            <!-- 三级标题 -->
            <div>
              <dv-border-box-5
                :color="['#225762', '#225762']"
                style="top: 120px; left: 40px; width: 280px; height: 40px"
              >
                <div
                  style="
                    padding-left: 15px;
                    padding-top: 8px;
                    font-size: 18px;
                    font-weight: 700;
                    color: #33ffff;
                  "
                >
                  ⚡️ 周月年发电量
                  <!-- 添加按钮 -->
                  <div class="time-buttons" style="display: flex; gap: 10px; margin-left: 550px; margin-top: -30px;">
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
                </div>
              </dv-border-box-5>
            </div>

            <div>
              <dv-border-box-8
                style="
                  top: 130px;
                  left: 40px;
                  width: 1810px;
                  height: 450px;
                  color: #fff;
                "
              >
                <div
                  style="
                    padding: 5px;
                    font-size: 18px;
                    font-weight: 700;
                    color: #fff;
                  "
                >
                  <barChart></barChart>
                </div>
              </dv-border-box-8>
            </div>
          </div>
        </div>
      </div>
    </dv-border-box-11>
  </div>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
}

.active {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
/* 添加鼠标悬停样式 */
button:hover {
  color: white;
  transform: scale(1.05);
  transition: all 0.2s ease;
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
import lineChart from "/@/components/SecondComponent/lineChart.vue";
import barChart from "/@/components/SecondComponent/barChart.vue";
import {onMounted, onUnmounted, ref,provide} from 'vue';

const activeButton = ref("week");
provide('activeButton', activeButton);
// 处理按钮点击事件
const handleButtonClick = (buttonType: string) => {
  activeButton.value = buttonType;
  // 这里可以添加你需要的业务逻辑，比如调用接口获取不同时间范围的数据
  console.log(`vue2点击了 ${buttonType} 按钮`);
};
let timer: ReturnType<typeof setInterval> | null = null;
onMounted(async () => {
  handleButtonClick('week'); // 默认触发"日"按钮
  const buttonTypes = ['week', 'month', 'year'];
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
  if (timer) {
    clearInterval(timer);
  }
});
</script>
