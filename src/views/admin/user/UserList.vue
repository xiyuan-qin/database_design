<template>
  <div class="user-list">
    <h2>用户列表</h2>
    <el-table :data="userData" border style="width: 100%">
      <el-table-column prop="id" label="用户ID" width="80"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="createTime" label="注册时间"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="handleBlock(scope.row)">封禁</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      userData: []
    }
  },
  methods: {
    handleBlock(row) {
      console.log('封禁用户:', row);
    },
    handleDelete(row) {
      console.log('删除用户:', row);
    }
  }
}
</script>