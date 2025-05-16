<template>
  <!--第二个 -->
  <div class="flex">
    <div class="col-md-2">
      <div class="column">
        <p>宏观经济</p>
        <div class="purple"><span class="bold">1292</span>条</div>
      </div>
    </div>
    <div class="col-md-2">
      <div class="column">
        <p>资本市场</p>
        <div class="grn"><span class="bold">892</span>条</div>
      </div>
    </div>
    
    <!-- <div class="col-md-2">
      <div class="column">
        <p>货币市场</p>
        <div class="bule"><span class="bold">590</span>条</div>
      </div>
    </div> -->
    <div class="col-md-2">
      <div class="column">
        <p>外汇市场</p>
        <div class="yel"><span class="bold">970</span>条</div>
      </div>
    </div>
    <div class="col-md-2">
      <div class="column">
        <p>债券市场</p>
        <div class="org"><span class="bold">1002</span>条</div>
      </div>
    </div>
    <div class="col-md-2">
      <div class="column">
        <p>大宗商品</p>
        <div class="ybule"><span class="bold">692</span>条</div>
      </div>
    </div>
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
  margin-top: 180px;
  margin-left: 20px;
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



</style>



<script setup lang="ts">

</script>
