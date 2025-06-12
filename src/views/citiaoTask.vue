<template>
  <div class="table-wrapper">
    <div class="custom-table">
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
  </div>
</template>

<script setup lang="ts">
import {defineProps, onMounted, onUnmounted,ref} from 'vue';
import axios from 'axios'
let intervalId: number | null = null
const tableData = ref<Array<Array<{ content: string; width?: string; className?: string; customClass?: string; style?: any }>>>([])
const fetchData = async (machineNumber: string) => {
  try {
    const response = await axios.get(`/citiao/getTaskPictureList/${machineNumber}`)
    if (response.data.code === 100 && response.data.data.length > 0) {
      const item = response.data.data[0]
      updateTableData(item)
    }
  } catch (error) {
    console.error('调用接口失败:', error)
  }
}
onMounted(() => {
  const machineNumber = '1' // 替换为实际的 machineNumber
  fetchData(machineNumber) // 页面加载时立即调用一次
  intervalId = window.setInterval(() => {
    fetchData(machineNumber)
  }, 5 * 60 * 1000) // 每 5 分钟调用一次
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
      {content:  item.customerName || '', width: '13%', className: 'bold-cell'},
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
      {content: '+'+internalControlVo.orderDrawingLimit1 || '', width: '7%', className: 'bold-cell',  style: {
          backgroundColor: '#FFF3CA',
          fontSize: '24px',
          textAlign: 'left',
          verticalAlign: 'top',
          lineHeight: 'normal'
        }},
      {content: '-'+internalControlVo.orderDrawingLimit1 || '', width: '7%', className: 'bold-cell', customClass: 'special-cell'},
      {content: '×', width: '3%', className: 'bold-cell'},
      {content: internalControlVo.width || '', width: '12%', className: 'bold-cell', style: {backgroundColor: '#FFF3CA'}},
      {content: '+'+internalControlVo.orderDrawingLimit2 || '', width: '7%', className: 'bold-cell', style: {
          backgroundColor: '#FFF3CA',
          fontSize: '24px',
          textAlign: 'left',
          verticalAlign: 'top',
          lineHeight: 'normal'
        }},
      {content: '-'+internalControlVo.orderDrawingLimit2 || '', width: '7%', className: 'bold-cell', customClass: 'special-cell'},
      {content: '×', className: 'bold-cell', width: '3%'},
      {content: internalControlVo.thickness || '', width: '12%', className: 'bold-cell', style: {backgroundColor: '#FFF3CA'}},
      {content: '+'+internalControlVo.orderDrawingLimit3 || '', width: '8%', className: 'bold-cell',style: {
          backgroundColor: '#FFF3CA',
          fontSize: '24px',
          textAlign: 'left',
          verticalAlign: 'top',
          lineHeight: 'normal'
        }},
      {content: '-'+internalControlVo.orderDrawingLimit3 || '', width: '8%', className: 'bold-cell', customClass: 'special-cell'}
    ],
    [
      {content: '调刀T:', width: '13%', className: 'bold-cell', style: {backgroundColor: '#F4B7BE'}},
      {content: (internalControlVo.cuta1 || '') +'—'+ (internalControlVo.cuta2 || ''), width: '30%', className: 'bold-cell', style: {backgroundColor: '#F4B7BE'}},
      {content: (internalControlVo.cutb1 || '') +'—'+( +internalControlVo.cutb2 || ''), width: '26%', className: 'bold-cell', style: {backgroundColor: '#F4B7BE'}},
      {content: '型号', width: '8%', className: 'bold-cell'},
      {content: internalControlVo.model, width: '23%', className: 'bold-cell'},
    ],
    [
      {content: '公差P', width: '13%', className: 'bold-cell', style: {backgroundColor: '#FFF3CA'}},
      {content: internalControlVo.finished1Max1 || '', width: '13%', className: 'bold-cell', style: {backgroundColor: '#FFF3CA'}},
      {content: '+'+internalControlVo.finished1Limit1 || '', width: '7%', className: 'bold-cell', style: {
          backgroundColor: '#FFF3CA',
          fontSize: '24px',
          textAlign: 'left',
          verticalAlign: 'top',
          lineHeight: 'normal'
        }},
      {content: '-'+internalControlVo.finished1Limit2 || '', width: '7%', className: 'bold-cell', customClass: 'special-cell'},
      {content: '×', width: '3%', className: 'bold-cell', style: {backgroundColor: '#FFF3CA'}},
      {content: internalControlVo.finished2Max1 || '', width: '12%', className: 'bold-cell', style: {backgroundColor: '#FFF3CA'}},
      {content: '+'+internalControlVo.finished2Limit1 || '', width: '7%', className: 'bold-cell', style: {
          backgroundColor: '#FFF3CA',
          fontSize: '24px',
          textAlign: 'left',
          verticalAlign: 'top',
          lineHeight: 'normal'
        }},
      {content: '-'+internalControlVo.finished2Limit2 || '', width: '7%', className: 'bold-cell', customClass: 'special-cell'},
      {content: '×', width: '3%', className: 'bold-cell', style: {backgroundColor: '#FFF3CA'}},
      {content: internalControlVo.finished3Max1 || '', width: '12%', className: 'bold-cell', style: {backgroundColor: '#FFF3CA'}},
      {content: '+'+internalControlVo.finished3Limit1 || '', width: '8%', className: 'bold-cell', style: {
          backgroundColor: '#FFF3CA',
          fontSize: '24px',
          textAlign: 'left',
          verticalAlign: 'top',
          lineHeight: 'normal'
        }},
      {content: '-'+internalControlVo.finished3Limit2 || '', width: '8%', className: 'bold-cell', customClass: 'special-cell'}
    ],
    [
      {content: '公差Q', width: '13%', className: 'bold-cell', style: {backgroundColor: '#FFF3CA'}},
      {content: internalControlVo.qfinished1Max1 || '', width: '13%', className: 'bold-cell', style: {backgroundColor: '#FFF3CA'}},
      {content: '+'+internalControlVo.qfinished1Limit1 || '', width: '7%', className: 'bold-cell', style: {
          backgroundColor: '#FFF3CA',
          fontSize: '24px',
          textAlign: 'left',
          verticalAlign: 'top',
          lineHeight: 'normal'
        }},
      {content: '-'+internalControlVo.qfinished1Limit2 || '', width: '7%', className: 'bold-cell', customClass: 'special-cell'},
      {content: '×', width: '3%', className: 'bold-cell', style: {backgroundColor: '#FFF3CA'}},
      {content: internalControlVo.qfinished2Max1 || '', width: '12%', className: 'bold-cell', style: {backgroundColor: '#FFF3CA'}},
      {content: '+'+internalControlVo.qfinished2Limit1 || '', width: '7%', className: 'bold-cell', style: {
          backgroundColor: '#FFF3CA',
          fontSize: '24px',
          textAlign: 'left',
          verticalAlign: 'top',
          lineHeight: 'normal'
        }},
      {content: '-'+internalControlVo.qfinished2Limit2 || '', width: '7%', className: 'bold-cell', customClass: 'special-cell'},
      {content: '×', width: '3%', className: 'bold-cell', style: {backgroundColor: '#FFF3CA'}},
      {content: internalControlVo.qfinished3Max1 || '', width: '12%', className: 'bold-cell', style: {backgroundColor: '#FFF3CA'}},
      {content: '+'+internalControlVo.qfinished3Limit1 || '', width: '8%', className: 'bold-cell', style: {
          backgroundColor: '#FFF3CA',
          fontSize: '24px',
          textAlign: 'left',
          verticalAlign: 'top',
          lineHeight: 'normal'
        }},
      {content: '-'+internalControlVo.qfinished3Limit2 || '', width: '8%', className: 'bold-cell', customClass: 'special-cell'}
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
      {content: '包装方法：', width: '13%', className: 'bold-cell'},
      {content: internalControlVo.packagingMethod || '', width: '87%', className: 'bold-cell'},
    ],
    [
      {content: '特殊要求：', width: '13%', className: 'bold-cell'},
      {content: internalControlVo.specialRequirement || '', width: '71%', className: 'bold-cell'},
      {content: '图纸版本号', width: '16%', className: 'bold-cell', style: {backgroundColor: '#FEDB61'}},
    ],
    [
      {content: '包装备注：', width: '13%', className: 'bold-cell'},
      {content: internalControlVo.packagingRemark || '', width: '71%', className: 'bold-cell'},
      {content: internalControlVo.drawingVersionNumber || '', width: '16%', className: 'bold-cell', style: {backgroundColor: '#FEDB61'}},
    ],
    [
      {content: '叠片客户：', width: '13%', className: 'bold-cell', style: {backgroundColor: '#FEDB61'}},
      {content: '叠片规格', width: '18%', className: 'bold-cell', style: {backgroundColor: '#FEDB61'}},
      {content: '叠片日期', width: '10%', className: 'bold-cell', style: {backgroundColor: '#FEDB61'}},
      {content: '叠片数量', width: '10%', className: 'bold-cell', style: {backgroundColor: '#FEDB61'}},
      {content: '放置区域', width: '14%', className: 'bold-cell', style: {backgroundColor: '#FEDB61'}},
      {content: '要 求', width: '13%', className: 'bold-cell', style: {backgroundColor: '#FEDB61'}},
      {content: '计划数量（条）', width: '11%', className: 'bold-cell', style: {backgroundColor: '#FEDB61'}},
      {content: '实交数量（条）', width: '11%', className: 'bold-cell', style: {backgroundColor: '#FEDB61'}},
    ],
    [
      {content: 'YR', width: '13%', className: 'bold-cell'},
      {content: '174.0*17.0*4.50', width: '18%', className: 'bold-cell'},
      {content: '240925', width: '10%', className: 'bold-cell'},
      {content: '2D', width: '10%', className: 'bold-cell'},
      {content: 'A8/B13', width: '14%', className: 'bold-cell'},
      {content: '0', width: '13%', className: 'bold-cell'},
      {content: '(11776)', width: '11%', className: 'bold-cell'},
      {content: '13000', width: '11%', className: 'bold-cell'},
    ],
  ]
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
  border-bottom: 2px solid #000;
  height: 90px;
  line-height: 90px;
  box-sizing: border-box;
}

.table-row:hover {
  background-color: transparent;
}

.table-cell {
  padding: 0 20px;
  border-right: 2px solid #000;
  box-sizing: border-box;
  text-align: center;
  flex-shrink: 0;
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
  text-align: right;
  padding-top: 20px;
}
</style>

