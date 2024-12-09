
<template>
  <div class="goods-list">
    <h2>商品列表</h2>
    <el-table :data="goodsData" border style="width: 100%">
      <el-table-column prop="id" label="商品ID"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleRemove(scope.row)">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'GoodsList',
  data() {
    return {
      goodsData: []
    }
  },
  methods: {
    handleRemove(row) {
      console.log('下架商品:', row);
    }
  }
}
</script>