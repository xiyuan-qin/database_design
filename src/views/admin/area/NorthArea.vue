<template>
  <div class="north-area">
    <h2>北区管理</h2>
    <el-table :data="northData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="location" label="具体位置"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'NorthArea',
  data() {
    return {
      northData: []
    }
  },
  methods: {
    handleEdit(row) {
      console.log('编辑区域:', row);
    },
    handleDelete(row) {
      console.log('删除区域:', row);
    }
  }
}
</script>