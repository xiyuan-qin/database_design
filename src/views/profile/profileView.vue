<template>
  <div class="profile-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/market' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-card class="profile-card">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="个人信息" name="info">
          <user-info :user-data="userData"/>
        </el-tab-pane>
        <el-tab-pane label="账号设置" name="settings">
          <user-settings :user-data="userData"/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import UserInfo from './components/userInfo.vue'
import UserSettings from './components/userSettings.vue'

export default {
  components: {
    UserInfo,
    UserSettings
  },
  data() {
    return {
      activeTab: 'info',
      userData: {
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        username: '测试用户',
        email: 'test@example.com',
        creditScore: 4.5,
        purchaseCount: 10,
        registerTime: '2023-01-01'
      }
    }
  }
}
</script>

<style scoped>
.profile-container {
  padding: 20px;
}
.profile-card {
  margin-top: 20px;
}
</style>