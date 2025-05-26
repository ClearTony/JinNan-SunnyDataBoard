<template>
  <!-- 第一个 停电检测 -->
  <div>
    <!-- 二级标题 -->
    <dv-border-box-11 title="⚡️ 停电检测" style="width: 900px; height: 930px">
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
              ⚠️ 主网故障停电
            </div>
          </dv-border-box-5>
        </div>

        <div>
          <dv-border-box-8
            style="
              top: 90px;
              left: 40px;
              width: 820px;
              height: 340px;
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
                  ⚒️ 配电多维分析
                  <!-- 添加按钮 -->
                  <div style="display: flex; gap: 10px; margin-left: 550px; margin-top: -30px;">
                    <button
                        @click="handleButtonClick('年')"
                        :style="{ color: getButtonColor('年'), backgroundColor: 'transparent', border: 'none', padding: '5px 10px', fontSize: '18px', cursor: 'pointer'}"
                    >
                      年
                    </button>
                    <button
                        @click="handleButtonClick('月')"
                        :style="{ color: getButtonColor('月'), backgroundColor: 'transparent', border: 'none', padding: '5px 10px', fontSize: '18px', cursor: 'pointer'}"
                    >
                      月
                    </button>
                    <button
                        @click="handleButtonClick('日')"
                        :style="{ color: getButtonColor('日'), backgroundColor: 'transparent', border: 'none', padding: '5px 10px', fontSize: '18px', cursor: 'pointer' }"
                    >
                      日
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
                  width: 800px;
                  height: 340px;
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

          <!-- 隐藏饼状图部分 -->
          <!-- <div style="margin-left: 40px">
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
                  💡 重点关注停电
                </div>
              </dv-border-box-5>
            </div>
            <div>
              <dv-border-box-8
                style="
                  top: 130px;
                  left: 40px;
                  width: 385px;
                  height: 340px;
                  color: #fff;
                "
              >
                <div
                  style="
                    padding: 10px;
                    font-size: 18px;
                    font-weight: 700;
                    color: #fff;
                  "
                >
                  <pieChart></pieChart>
                </div>
              </dv-border-box-8>
            </div>
          </div> -->
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
</style>

<script setup lang="ts">
import lineChart from "/@/components/SecondComponent/lineChart.vue";
import barChart from "/@/components/SecondComponent/barChart.vue";
import pieChart from "/@/components/SecondComponent/pieChart.vue";
import { ref } from 'vue';
// 存储每个按钮的点击状态
const buttonStates = ref<Record<string, 'white' | '#33ffff'>>({
  年: '#33ffff',
  月: '#33ffff',
  日: '#33ffff'
});
// 处理新添加按钮的点击事件
const handleButtonClick = (label: string) => {
  console.log(`点击了 ${label} 按钮`);
  if (buttonStates.value[label] === '#33ffff') {
    buttonStates.value[label] = 'white';
  } else if (buttonStates.value[label] === 'white') {
    buttonStates.value[label] = '#33ffff';
  } else {
    buttonStates.value[label] = '#33ffff';
  }
  // 可以在这里添加与后端交互或更新图表数据的逻辑
};
// 根据按钮状态获取颜色
const getButtonColor = (label: string) => {
  return buttonStates.value[label];
};
</script>
