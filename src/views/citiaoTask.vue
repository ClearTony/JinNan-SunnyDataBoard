<template>
  <div class="table-wrapper">

    <div style="margin-bottom: 20px; margin-left: 5%;">
      <el-date-picker
          v-model="selectedDate"
          type="date"
          placeholder="选择排产日期"
          value-format="YYYY-MM-DD"
          :clearable="false"
          @change="onDateChange"
      />
    </div>

    <div class="custom-table"  v-if="tableData.length > 0">
      <div v-for="(row, rowIndex) in tableData" :key="rowIndex" class="table-row">
        <div
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            class="table-cell"
            :class="[cell.className,cell.customClass]"
            :style="[cell.style || {}, { width: cell.width || 'auto' }]"
        >
          {{ cell.content }}
        </div>
      </div>
    </div>

    <div v-else class="empty-data" style="margin-left: 5%; font-size: 24px; color: #999;">
      暂无数据，请选择其他日期或稍后再试
    </div>


    <div class="pagination">
      <button @click="changePage(-1)" :disabled="currentPage === 0">上一页</button>
      <span>当前第 {{ currentPage + 1 }} / 共 {{ totalPage }} 页</span>
      <button @click="changePage(+1)" :disabled="currentPage >= totalPage - 1">下一页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, onMounted, onUnmounted, ref} from 'vue';
import axios from 'axios'
import {useRoute} from 'vue-router'
import { format } from 'date-fns'
const selectedDate = ref<string>('')

const route = useRoute()
let intervalId: number | null = null
const tableData = ref<Array<Array<{
  content: string;
  width?: string;
  className?: string;
  customClass?: string;
  style?: any
}>>>([])
const res = ref<any>(null)
const refStatus = ref<any>(null)

const currentPage = ref(0) // 当前页码，从 0 开始计数
const totalPage = ref(0)   // 总页数
const fetchData = async (machineNumber: string, taskDate: string) => {
  try {
    const response = await axios.get(`/citiao/getTaskPictureList/${machineNumber}`, {
      params: {
        taskDate // 把日期作为查询参数传入
      }
    })

    if (response.data.code === 100 && Array.isArray(response.data.data) && response.data.data.length > 0) {
      res.value = response.data
      totalPage.value = response.data.data.length
      currentPage.value = 0
      const item = response.data.data[currentPage.value]
      updateTableData(item)
    }else {
      // 数据为空时清空表格内容，并提示
      tableData.value = []
      res.value = null
      totalPage.value = 0
      currentPage.value = 0
    }
  } catch (error) {
    console.error('调用接口失败:', error)
  }
}

const onDateChange = () => {
  const machineNumber = route.params.machineNumber as string
  if (selectedDate.value) {
    fetchData(machineNumber, selectedDate.value)
  }
}
const fetchDataStatus = async (machineNumber: string) => {
  try {
    const axiosResponse = await axios.get(`/citiao/getNewDataStatus/${machineNumber}`)
    if (axiosResponse.data.code === 100) {
      refStatus.value = axiosResponse.data.data.status
    }
  } catch (error) {
    console.error('调用接口失败:', error)
  }
}
onMounted(() => {
  selectedDate.value = format(new Date(), 'yyyy-MM-dd')
  const machineNumber = route.params.machineNumber as string
  fetchData(machineNumber,selectedDate.value) // 页面加载时立即调用一次
  intervalId = window.setInterval(() => {
    fetchDataStatus(machineNumber)
    if (refStatus.value === "1") {
      fetchData(machineNumber,selectedDate.value)
    }
  }, 60 * 1000) // 每 5 分钟调用一次
})

onUnmounted(() => {
  if (intervalId !== null) {
    window.clearInterval(intervalId) // 组件卸载时清除定时器
  }
})
const updateTableData = (item: any) => {
  const internalControlVo = item.internalControlVo || {}
  tableData.value = [
    [{content: '成品生产规格控制表', width: '100%', className: 'bold-cell'}],
    [
      {content: '客户:', width: '13%', className: 'bold-cell'},
      {content: internalControlVo.symbol || '', width: '13%', className: 'bold-cell'},
      {content: '料型：', width: '14%', className: 'bold-cell'},
      {content: internalControlVo.materialType || '', width: '15%', className: 'bold-cell'},
      {content: '端差', width: '14%', className: 'bold-cell'},
      {content: internalControlVo.endDifference || '', width: '15%', className: 'bold-cell'},
      {content: '曲绕', width: '8%', className: 'bold-cell'},
      {content: internalControlVo.winding || '', width: '8%', className: 'bold-cell'}
    ],
    [
      {content: '规格:', width: '13%', className: 'bold-cell'},
      {content: internalControlVo.length || '', width: '13%', className: 'bold-cell'},
      {
        content: '+' + internalControlVo.orderDrawingLimit1 || '',
        width: '7%',
        className: 'bold-cell',
        customClass: 'align-top-left'
      },
      {
        content: '-' + internalControlVo.orderDrawingLimit1 || '',
        width: '7%',
        className: 'bold-cell',
        customClass: 'special-cell'
      },
      {content: '×', width: '3%', className: 'bold-cell'},
      {
        content: internalControlVo.width || '',
        width: '12%',
        className: 'bold-cell',
        style: {backgroundColor: '#FFF3CA'}
      },
      {
        content: '+' + internalControlVo.orderDrawingLimit2 || '', width: '7%', className: 'bold-cell', style: {
          backgroundColor: '#FFF3CA',
          fontSize: '24px',
        }, customClass: 'align-top-left'
      },
      {
        content: '-' + internalControlVo.orderDrawingLimit2 || '',
        width: '7%',
        className: 'bold-cell',
        customClass: 'special-cell'
      },
      {content: '×', className: 'bold-cell', width: '3%'},
      {
        content: internalControlVo.thickness || '',
        width: '12%',
        className: 'bold-cell',
        style: {backgroundColor: '#FFF3CA'}
      },
      {
        content: '+' + internalControlVo.orderDrawingLimit3 || '',
        width: '8%',
        className: 'bold-cell',
        customClass: 'align-top-left'
      },
      {
        content: '-' + internalControlVo.orderDrawingLimit3 || '',
        width: '8%',
        className: 'bold-cell',
        customClass: 'special-cell'
      }
    ],
    [
      {content: '调刀T:', width: '13%', className: 'bold-cell', style: {backgroundColor: '#F4B7BE'}},
      {
        content: (internalControlVo.cuta1 || '') + '—' + (internalControlVo.cuta2 || ''),
        width: '30%',
        className: 'bold-cell',
        style: {backgroundColor: '#F4B7BE'}
      },
      {
        content: (internalControlVo.cutb1 || '') + '—' + (+internalControlVo.cutb2 || ''),
        width: '26%',
        className: 'bold-cell',
        style: {backgroundColor: '#F4B7BE'}
      },
      {content: '型号', width: '8%', className: 'bold-cell'},
      {content: internalControlVo.model, width: '23%', className: 'bold-cell'},
    ],
    [
      {content: '公差P', width: '13%', className: 'bold-cell', style: {backgroundColor: '#FFF3CA'}},
      {
        content: internalControlVo.finished1Max1 || '',
        width: '13%',
        className: 'bold-cell',
        style: {backgroundColor: '#FFF3CA'}
      },
      {
        content: internalControlVo.finished1Limit1 || '',
        width: '7%',
        className: 'bold-cell',
        customClass: 'align-top-left'
      },
      {
        content: internalControlVo.finished1Limit2 || '',
        width: '7%',
        className: 'bold-cell',
        customClass: 'special-cell'
      },
      {content: '×', width: '3%', className: 'bold-cell', style: {backgroundColor: '#FFF3CA'}},
      {
        content: internalControlVo.finished2Max1 || '',
        width: '12%',
        className: 'bold-cell',
        style: {backgroundColor: '#FFF3CA'}
      },
      {
        content: internalControlVo.finished2Limit1 || '',
        width: '7%',
        className: 'bold-cell',
        customClass: 'align-top-left'
      },
      {
        content: internalControlVo.finished2Limit2 || '',
        width: '7%',
        className: 'bold-cell',
        customClass: 'special-cell'
      },
      {content: '×', width: '3%', className: 'bold-cell', style: {backgroundColor: '#FFF3CA'}},
      {
        content: internalControlVo.finished3Max1 || '',
        width: '12%',
        className: 'bold-cell',
        style: {backgroundColor: '#FFF3CA'}
      },
      {
        content: internalControlVo.finished3Limit1 || '',
        width: '8%',
        className: 'bold-cell',
        customClass: 'align-top-left'
      },
      {
        content: internalControlVo.finished3Limit2 || '',
        width: '8%',
        className: 'bold-cell',
        customClass: 'special-cell'
      }
    ],
    [
      {content: '公差Q', width: '13%', className: 'bold-cell', style: {backgroundColor: '#FFF3CA'}},
      {
        content: internalControlVo.qfinished1Max1 || '',
        width: '13%',
        className: 'bold-cell',
        style: {backgroundColor: '#FFF3CA'}
      },
      {
        content: internalControlVo.qfinished1Limit1 || '',
        width: '7%',
        className: 'bold-cell',
        customClass: 'align-top-left'
      },
      {
        content: internalControlVo.qfinished1Limit2 || '',
        width: '7%',
        className: 'bold-cell',
        customClass: 'special-cell'
      },
      {content: '×', width: '3%', className: 'bold-cell', style: {backgroundColor: '#FFF3CA'}},
      {
        content: internalControlVo.qfinished2Max1 || '',
        width: '12%',
        className: 'bold-cell',
        style: {backgroundColor: '#FFF3CA'}
      },
      {
        content: internalControlVo.qfinished2Limit1 || '',
        width: '7%',
        className: 'bold-cell',
        customClass: 'align-top-left'
      },
      {
        content: internalControlVo.qfinished2Limit2 || '',
        width: '7%',
        className: 'bold-cell',
        customClass: 'special-cell'
      },
      {content: '×', width: '3%', className: 'bold-cell', style: {backgroundColor: '#FFF3CA'}},
      {
        content: internalControlVo.qfinished3Max1 || '',
        width: '12%',
        className: 'bold-cell',
        style: {backgroundColor: '#FFF3CA'}
      },
      {
        content: internalControlVo.qfinished3Limit1 || '',
        width: '8%',
        className: 'bold-cell',
        customClass: 'align-top-left'
      },
      {
        content: internalControlVo.qfinished3Limit2 || '',
        width: '8%',
        className: 'bold-cell',
        customClass: 'special-cell'
      }
    ],
    [
      {content: '条/箱', width: '13%', className: 'bold-cell'},
      {content: '条/盒', width: '13%', className: 'bold-cell'},
      {content: '条/排', width: '14%', className: 'bold-cell'},
      {content: '条/打', width: '15%', className: 'bold-cell'},
      {content: '包装箱', width: '14%', className: 'bold-cell'},
      {content: '编号', width: '15%', className: 'bold-cell'},
      {content: '网纹', width: '16%', className: 'bold-cell'},
    ],
    [
      {content: internalControlVo.piecesPerBox || '', width: '13%', className: 'bold-cell'},
      {content: internalControlVo.piecesPerCartridge || '', width: '13%', className: 'bold-cell'},
      {content: internalControlVo.piecesPerRow || '', width: '14%', className: 'bold-cell'},
      {content: internalControlVo.piecesPerDozen || '', width: '15%', className: 'bold-cell'},
      {content: internalControlVo.packagingBox || '', width: '14%', className: 'bold-cell'},
      {content: internalControlVo.specificationCode || '', width: '15%', className: 'bold-cell'},
      {content: internalControlVo.texture || '', width: '16%', className: 'bold-cell'},
    ],
    [
      {content: '包装方法：', width: '13%', className: 'bold-cell', style: {fontSize: '24px'}},
      {
        content: internalControlVo.packagingMethod || '',
        width: '87%',
        className: 'bold-cell',
        style: {fontSize: '24px'}
      },
    ],
    [
      {content: '特殊要求：', width: '13%', className: 'bold-cell', style: {fontSize: '24px'}},
      {
        content: internalControlVo.specialRequirement || '',
        width: '61%',
        className: 'bold-cell',
        style: {fontSize: '24px'}
      },
      {
        content: '图纸版本号',
        width: '7%',
        className: 'bold-cell',
        style: {backgroundColor: '#FEDB61', fontSize: '24px'}
      },
      {
        content: internalControlVo.drawingVersionNumber || '',
        width: '19%',
        className: 'bold-cell',
        style: {backgroundColor: '#FEDB61', fontSize: '24px'}
      },
    ],
    [
      {
        content: '计划数量（条）',
        width: '13%',
        className: 'bold-cell',
        style: {backgroundColor: '#FEDB61', fontSize: '24px'}
      },
      {
        content: '实交数量（条）',
        width: '13%',
        className: 'bold-cell',
        style: {backgroundColor: '#FEDB61', fontSize: '24px'}
      },
      {content: '要 求：', width: '22%', className: 'bold-cell', style: {backgroundColor: '#FEDB61', fontSize: '24px'}},
      {content: '备注', width: '26%', className: 'bold-cell', style: {backgroundColor: '#FEDB61', fontSize: '24px'}},
      {
        content: '包装备注',
        width: '26%',
        className: 'bold-cell',
        style: {backgroundColor: '#FEDB61', fontSize: '24px'}
      },
    ],
    [
      {content: item.plannedQuantity || '', width: '13%', className: 'bold-cell', style: {fontSize: '24px'}},
      {content: item.actualQuantity || '', width: '13%', className: 'bold-cell', style: {fontSize: '24px'}},
      {content: item.requirement || '', width: '22%', className: 'bold-cell', style: {fontSize: '24px'}},
      {content: item.remark || '', width: '26%', className: 'bold-cell', style: {fontSize: '24px'}},
      {
        content: internalControlVo.packagingRemark || '',
        width: '26%',
        className: 'bold-cell',
        style: {fontSize: '24px'}
      },
    ],
    // [
    //   {content: '叠片客户：', width: '13%', className: 'bold-cell', style: {backgroundColor: '#FEDB61'}},
    //   {content: '叠片规格', width: '18%', className: 'bold-cell', style: {backgroundColor: '#FEDB61'}},
    //   {content: '叠片日期', width: '10%', className: 'bold-cell', style: {backgroundColor: '#FEDB61'}},
    //   {content: '叠片数量', width: '10%', className: 'bold-cell', style: {backgroundColor: '#FEDB61'}},
    //   {content: '放置区域', width: '14%', className: 'bold-cell', style: {backgroundColor: '#FEDB61'}},
    //   {content: '要 求', width: '13%', className: 'bold-cell', style: {backgroundColor: '#FEDB61'}},
    //   {content: '计划数量（条）', width: '11%', className: 'bold-cell', style: {backgroundColor: '#FEDB61'}},
    //   {content: '实交数量（条）', width: '11%', className: 'bold-cell', style: {backgroundColor: '#FEDB61'}},
    // ],
    // [
    //   {content: 'YR', width: '13%', className: 'bold-cell'},
    //   {content: '174.0*17.0*4.50', width: '18%', className: 'bold-cell'},
    //   {content: '240925', width: '10%', className: 'bold-cell'},
    //   {content: '2D', width: '10%', className: 'bold-cell'},
    //   {content: 'A8/B13', width: '14%', className: 'bold-cell'},
    //   {content: '0', width: '13%', className: 'bold-cell'},
    //   {content: '(11776)', width: '11%', className: 'bold-cell'},
    //   {content: '13000', width: '11%', className: 'bold-cell'},
    // ],
  ]
}
// 切换页码
const changePage = (direction: number) => {
  let newPage = currentPage.value + direction
  if (newPage >= 0 && newPage < totalPage.value) {
    currentPage.value = newPage
    const item = res.value.data[currentPage.value]
    updateTableData(item)
  }
}
</script>


<style scoped>
.table-wrapper {
  margin-top: 3%;
}

.custom-table {
  min-width: max-content;
  width: 90%;
  margin-left: 5%; /* 左侧留出 10% 空白 */
  font-family: "Microsoft Yahei", sans-serif;
  font-size: 35px;
  color: #0c0000;
  background-color: #fff;
  position: relative;
  border-top: 2px solid #000; /* 黑色顶部边框 */
}

/* 左右边框 */
.custom-table::after,
.custom-table::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #000;
  z-index: 1;
}

.custom-table::after {
  left: 0;
}

.custom-table::before {
  right: 0;
}

.table-row {
  display: flex;
  min-height: 90px;
  border-bottom: 2px solid #000;
  box-sizing: border-box;
}

.table-row:hover {
  background-color: transparent;
}

.table-cell {
  border-right: 10px solid #000;
  box-sizing: border-box;
  text-align: center;
  flex-shrink: 0;
  border-right: 2px solid #000;
  white-space: pre-wrap;
  word-break: break-all;
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-cell:last-child {
  border-right: none;
}

/* 加粗文字 */
.bold-cell {
  font-weight: bold;
}

.special-cell {
  background-color: #FFF3CA;
  font-size: 24px;
  display: flex;
  align-items: flex-end; /* 垂直顶部对齐 */
  justify-content: flex-end; /* 水平右侧对齐 */
  padding: 3px;

}

.pagination {
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
}

.pagination button {
  padding: 8px 16px;
  margin: 0 10px;
  font-size: 16px;
  cursor: pointer;
}

.pagination button:disabled {
  color: #999;
  cursor: not-allowed;
}

.align-top-left {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  background-color: #FFF3CA;
  font-size: 24px;
}
</style>

