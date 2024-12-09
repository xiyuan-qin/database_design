<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header">
            <span>待审核商品</span>
          </div>
          <div class="card-body">
            <span class="card-value">0</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header">
            <span>今日订单</span>
          </div>
          <div class="card-body">
            <span class="card-value">0</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard'
}
</script>

<style scoped>
.card-body {
  text-align: center;
  padding: 20px;
}
.card-value {
  font-size: 24px;
  font-weight: bold;
}
</style>