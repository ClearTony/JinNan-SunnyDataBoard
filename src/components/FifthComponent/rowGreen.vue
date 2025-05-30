<template>
  <!--第二个 -->
  <div class="decoration-1">
    <dv-decoration-3 style="width:600px;height:30px;" />
  </div>
  <div class="flex" v-if="powerStationDetail">
    <div class="col-md-2">
      <div class="column">
        <p>CO₂减排量</p>
        <div class="purple"><span class="bold">{{powerStationDetail.coTwoValue}}</span>{{powerStationDetail.coTwoUnit}}</div>
      </div>
    </div>
    <div class="col-md-2">
      <div class="column">
        <p>节约标准煤</p>
        <div class="grn"><span class="bold">{{powerStationDetail.standardCoalValue}}</span>{{powerStationDetail.standardCoalUnit}}</div>
      </div>
    </div>

    <div class="col-md-2">
      <div class="column">
        <p>等效植树</p>
        <div class="yel"><span class="bold">{{powerStationDetail.standingWoodValue}}</span>{{powerStationDetail.standingWoodUnit}}</div>
      </div>
    </div>
  </div>
  <div class="decoration-2">
    <dv-decoration-3 style="width:600px;height:30px;" />
  </div>
</template>

<style lang="scss" scoped>
.hbule {
  color: #86b5d2;
}
.purple {
  color: #8129dd;
}
.grn {
  color: #8ec63f;
}
.bule {
  color: #2756ca;
}
.yel {
  color: #f1b601;
}
.org {
  color: #f86423;
}
.ybule {
  color: #27aae3;
}

.column {
  border: 1px solid #252e44;
  text-align: center;
  margin-bottom: 0;
  margin: 1px;
}

// 文字
.column p {
  background: #6d8fe600;
  color: #fff;
  padding: 0;
  font-size: 20px;
}
// 数字
.column div {
  font-size: 25px;
  padding: 0;
  margin-bottom: 10px;
}

.col-md-2 {
  margin-top: 100px;
  margin-left: 60px;
  width: 180px;
  // float: left;
}

/*引用字库*/
@font-face {
  font-family: "electronicFont";
  src: url("../../assets/font/DS-DIGIT.TTF");
}

.flex {
  font-family: "electronicFont";
  padding-left: 10px;
  padding-right: 30px;
  display: flex;
}
.decoration-1 {
  position: absolute;
  top: 30px; // 往下移动 20px，可根据需求调整
  left: 30px; // 往右移动 30px，可根据需求调整
}
.decoration-2 {
  position: absolute;
  bottom: 30px; // 往下移动 20px，可根据需求调整
  right: 30px; // 往右移动 30px，可根据需求调整
}

</style>



<script setup lang="ts">
import {usePowerStationStore} from "/@/stores/powerStationStore";
import {computed, onMounted, onUnmounted} from "vue";

const powerStationStore = usePowerStationStore();
const powerStationDetail = computed(() => powerStationStore.powerStationDetail);
</script>
