<template>
  <!--第二个 -->
  <div class="flex" v-if="powerStationDetail">
    <div class="col-md-1">
      <div class="column">
        <p>实时功率</p>
        <div class="purple"><span class="bold">{{ powerStationDetail.currPowerValue }}</span> {{powerStationDetail.currPowerUnit }}</div>
      </div>
    </div>
    <div class="col-md-2">
      <div class="column">
        <p>装机功率</p>
        <div class="grn"><span class="bold">{{ powerStationDetail.totalCapcityValue }}</span> {{ powerStationDetail.totalCapcityUnit }}</div>
      </div>
    </div>
  </div>
  <div class="deprecated-line1">
    <dv-decoration-4 style="width:10px;height:230px;" />
  </div>
  <div class="deprecated-line2">
    <dv-decoration-4 style="width:10px;height:230px;" />
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

.column p {
  background: #6d8fe600;
  color: #fff;
  padding: 0;
  font-size: 20px;
}

.column div {
  font-size: 25px;
  padding: 0;
  margin-bottom: 10px;
}

.col-md-1 {
  margin-top: 30px;
  margin-left: 95px;
  width: 180px;
}

.col-md-2 {
  margin-top: 50px;
  margin-left: 95px;
  width: 180px;
}

.deprecated-line1 {
  margin-top: -250px;
  margin-left: 30px;
}
.deprecated-line2 {
  margin-top: -230px;
  margin-left: 330px;
}
</style>



<script setup lang="ts">
import {usePowerStationStore} from "/@/stores/powerStationStore";
import {onMounted, computed,onUnmounted, ref} from "vue";

const powerStationStore = usePowerStationStore();
const powerStationDetail = computed(() => powerStationStore.powerStationDetail);
</script>
