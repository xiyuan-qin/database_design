<template>
  <div class="user-info">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="avatar-container">
          <el-avatar :size="120" :src="userData.avatar"/>
          <h3>{{ userData.username }}</h3>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="info-container">
          <h4>基本信息</h4>
          <el-descriptions :column="2">
            <el-descriptions-item label="用户名">{{ userData.username }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ userData.email }}</el-descriptions-item>
            <el-descriptions-item label="注册时间">{{ userData.registerTime }}</el-descriptions-item>
            <el-descriptions-item label="购买次数">{{ userData.purchaseCount }}次</el-descriptions-item>
          </el-descriptions>
          
          <h4>信誉度</h4>
          <el-rate
            v-model="localCreditScore"
            disabled
            show-score
            text-color="#ff9900">
          </el-rate>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localCreditScore: 0
    }
  },
  watch: {
    userData: {
      immediate: true,
      handler(newVal) {
        this.localCreditScore = newVal.creditScore
      }
    }
  }
}
</script>

<style scoped>
.avatar-container {
  text-align: center;
  padding: 20px;
}
.info-container {
  padding: 20px;
}
h4 {
  margin: 20px 0 10px 0;
}
</style>
