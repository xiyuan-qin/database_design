
<template>
  <el-menu
    :default-active="activeMenu"
    class="admin-menu"
    :collapse="isCollapse"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
    :unique-opened="true"
    :router="true">
    
    <el-menu-item index="/admin/dashboard">
      <i class="el-icon-s-home"></i>
      <span slot="title">控制台</span>
    </el-menu-item>

    <el-submenu index="goods">
      <template slot="title">
        <i class="el-icon-goods"></i>
        <span>商品管理</span>
      </template>
      <el-menu-item index="/admin/goods/list">商品列表</el-menu-item>
      <el-menu-item index="/admin/goods/audit">商品审核</el-menu-item>
    </el-submenu>

    <el-submenu index="order">
      <template slot="title">
        <i class="el-icon-s-order"></i>
        <span>订单管理</span>
      </template>
      <el-menu-item index="/admin/order/list">订单列表</el-menu-item>
      <el-menu-item index="/admin/order/stats">订单统计</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'AdminMenu',
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    activeMenu() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.admin-menu {
  height: 100%;
  border-right: none;
}
.admin-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>