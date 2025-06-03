import { defineStore } from 'pinia';
import axios from 'axios';

export const usePowerStationStore = defineStore('powerStation', {
  state: () => ({
    initialized: false, // 添加初始化标记
    powerStationDetail: null,
    timer: null as ReturnType<typeof setInterval> | null,
    loading: false
  }),
  actions: {
    async fetchPowerStationDetail() {
      try {
        const response = await axios.get('/data/queryPowerStationDetail');
        this.powerStationDetail = response.data.data;
      } catch (error) {
        console.error('获取电站详情失败:', error);
      }finally {
        this.loading = false;
      }
    },
    async startFetching() {
      if (this.initialized) return;
      // 页面初始化时调用一次
      this.fetchPowerStationDetail();
      // 每 5 分钟（300000 毫秒）调用一次
      this.timer = setInterval(() => {
        this.fetchPowerStationDetail();
      }, 300000);
    },
    stopFetching() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
  },
});