<template>
  <el-container class="admin-layout">
    <el-aside width="auto">
      <admin-menu></admin-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-user"></i>
              管理员
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">
                <i class="el-icon-switch-button"></i>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AdminMenu from './AdminMenu.vue'

export default {
  name: 'AdminLayout',
  components: {
    AdminMenu
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        this.$confirm('确认退出登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 这里可以添加清除登录状态的逻辑
          localStorage.removeItem('token');
          this.$router.push('/');//
          this.$message({
            type: 'success',
            message: '已退出登录'
          });
        }).catch(() => {});
      }
    }
  }
}
</script>

<style scoped>
.admin-layout {
  height: 100vh;
}
.el-header {
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  line-height: 60px;
}
.header-right {
  float: right;
  margin-right: 20px;
}
.el-main {
  background-color: #f0f2f5;
  padding: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #666;
}
.el-dropdown-link i {
  margin-right: 5px;
}
.el-dropdown-menu__item i {
  margin-right: 5px;
}
</style>