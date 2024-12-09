<template>
  <div class="order-list">
    <h2>订单列表</h2>
    <el-table :data="orderData" border style="width: 100%">
      <el-table-column prop="orderId" label="订单号" width="180"></el-table-column>
      <el-table-column prop="buyer" label="买家"></el-table-column>
      <el-table-column prop="seller" label="卖家"></el-table-column>
      <el-table-column prop="amount" label="金额"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  data() {
    return {
      orderData: []
    }
  },
  methods: {
    handleDetail(row) {
      console.log('查看订单详情:', row);
    }
  }
}
</script>