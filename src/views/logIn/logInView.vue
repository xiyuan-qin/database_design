<template>
    <div class="login-container">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="80px" class="login-form">
            <h2 class="login-title">系统登录</h2>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //这里可以和后端联系，进行登录验证
                    if (this.loginForm.username === 'user' && this.loginForm.password === '123') {
                        this.$message({
                            type: 'success',
                            message: '登录成功！'
                        });
                        // 添加路由跳转到 southView
                        this.$router.push('/market');
                    } else if (this.loginForm.username === 'admin' && this.loginForm.password === '123') {
                        this.$message({
                            type: 'success',
                            message: '登录成功！'
                        });
                        // 添加路由跳转到 southView
                        this.$router.push('/admin');
                    }else {
                        this.$message.error('用户名或密码错误！');
                    }
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scoped>
.login-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f3f3f3;
}

.login-form {
    width: 400px;
    padding: 30px;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.login-title {
    text-align: center;
    margin-bottom: 30px;
    color: #303133;
}
</style>
