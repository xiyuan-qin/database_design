<template>
  <div class="goods-layout">
    <el-card>
      <el-tabs v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane label="商品列表" name="list"></el-tab-pane>
        <el-tab-pane label="商品审核" name="audit"></el-tab-pane>
      </el-tabs>
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'GoodsLayout',
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
      this.$router.push(`/admin/goods/${tab.name}`)
    }
  }
}
</script>