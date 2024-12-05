<template>
  <div class="settings-container">
    <el-form :model="form" label-width="100px">
      <el-form-item label="修改头像">
        <el-avatar :size="100" :src="userData.avatar"/>
        <el-button size="small" type="primary" class="upload-btn">上传新头像</el-button>
      </el-form-item>
      
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      
      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      
      <el-form-item label="修改密码">
        <el-input type="password" v-model="form.oldPassword" placeholder="原密码"></el-input>
        <el-input type="password" v-model="form.newPassword" placeholder="新密码"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="saveSettings">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        username: '',
        email: '',
        oldPassword: '',
        newPassword: ''
      }
    }
  },
  methods: {
    saveSettings() {
      // 实现保存设置的逻辑
      this.$message.success('设置已保存')
    }
  },
  created() {
    this.form.username = this.userData.username
    this.form.email = this.userData.email
  }
}
</script>

<style scoped>
.settings-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.upload-btn {
  margin-left: 20px;
}
.el-input {
  margin-bottom: 10px;
}
</style>
