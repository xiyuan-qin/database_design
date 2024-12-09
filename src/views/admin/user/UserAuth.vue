
<template>
  <div class="user-auth">
    <h2>用户认证</h2>
    <el-table :data="authData" border style="width: 100%">
      <el-table-column prop="userId" label="用户ID"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="authType" label="认证类型"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
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
  name: 'UserAuth',
  data() {
    return {
      authData: []
    }
  },
  methods: {
    handleApprove(row) {
      console.log('通过认证:', row);
    },
    handleReject(row) {
      console.log('拒绝认证:', row);
    }
  }
}
</script>