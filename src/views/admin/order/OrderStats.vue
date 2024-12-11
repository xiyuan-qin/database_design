
<template>
  <div class="order-stats">
    <h2>订单统计</h2>
    <el-card class="stats-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="stat-item">
            <div class="stat-title">今日订单数</div>
            <div class="stat-value">0</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-item">
            <div class="stat-title">本月订单数</div>
            <div class="stat-value">0</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'OrderStats',
  data() {
    return {
      statsData: {}
    }
  }
}
</script>

<style scoped>
.stats-card {
  margin-bottom: 20px;
}
.stat-item {
  text-align: center;
  padding: 20px;
}
.stat-title {
  font-size: 14px;
  color: #666;
}
.stat-value {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
}
</style>