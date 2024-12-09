<template>
  <div class="order-layout">
    <el-card>
      <el-tabs v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane label="订单列表" name="list"></el-tab-pane>
        <el-tab-pane label="订单统计" name="stats"></el-tab-pane>
      </el-tabs>
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'OrderLayout',
  data() {
    return {
      activeTab: 'list'
    }
  },
  watch: {
    '$route'(to) {
      this.activeTab = to.path.split('/').pop()
    }
  },
  created() {
    this.activeTab = this.$route.path.split('/').pop()
  },
  methods: {
    handleTabClick(tab) {
      this.$router.push(`/admin/order/${tab.name}`)
    }
  }
}
</script>