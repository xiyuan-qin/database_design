
<template>
  <div class="goods-audit">
    <h2>商品审核</h2>
    <el-table :data="auditData" border style="width: 100%">
      <el-table-column prop="id" label="商品ID" width="80"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="status" label="审核状态"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleApprove(scope.row)">通过</el-button>
          <el-button size="mini" type="danger" @click="handleReject(scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'GoodsAudit',
  data() {
    return {
      auditData: []
    }
  },
  methods: {
    handleApprove(row) {
      console.log('通过商品:', row);
    },
    handleReject(row) {
      console.log('拒绝商品:', row);
    }
  }
}
</script>