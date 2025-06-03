<template>
  <!-- 第一个 停电检测 -->
  <div>
    <!-- 二级标题 -->
    <dv-border-box-11 title="⚡️ 任务列表" style="width: 2850px; height: 1300px">
      <div>
        <!-- 里面的内容——滚动表格 -->
        <div>
          <dv-border-box-8
            style="
              top: 90px;
              left: 40px;
              width: 2750px;
              height: 1150px;
              color: #fff;
            "
          >
            <div
              style="
                padding: 20px;
                font-size: 18px;
                font-weight: 700;
                color: #fff;
              "
            >
              <!-- 表格 -->
              <div style="margin: 10px">
                <lineTable></lineTable>
              </div>
            </div>
          </dv-border-box-8>
        </div>
      </div>
    </dv-border-box-11>
  </div>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
}
</style>




<script setup lang="ts">



import lineTable from "/@/components/FirstComponent/lineTable.vue";
import capsuleChart from "/@/components/FirstComponent/capsuleChart.vue";

import ringChart from "/@/components/FirstComponent/ringChart.vue";
import rowTable from "/@/components/FirstComponent/rowTable.vue";
</script>