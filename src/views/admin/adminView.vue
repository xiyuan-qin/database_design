<template>
    <div class="common-layout">
        <el-container>
            <el-header style="font-size: 40px;color: brown;font-family: SimSun;background-color: lightgray;">
                山东大学青岛二手交易市场管理系统
                <el-button type="danger" size="small" style="float: right; margin-top: 15px;" @click="logout">
                    退出登录
                </el-button>
            </el-header>
            <el-container>
                <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                    <el-menu :default-openeds="['1']">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-location"></i>区域管理</template>
                            <el-menu-item-group>
                                <el-menu-item index="1-1">
                                    <router-link to="/south">南区管理</router-link>
                                </el-menu-item>
                                <el-menu-item index="1-2">
                                    <router-link to="/north">北区管理</router-link>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-user"></i>用户管理</template>
                            <el-menu-item-group>
                                <el-menu-item index="2-1">
                                    <router-link to="/user-list">用户列表</router-link>
                                </el-menu-item>
                                <el-menu-item index="2-2">
                                    <router-link to="/user-auth">用户认证</router-link>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                        <el-submenu index="3">
                            <template slot="title"><i class="el-icon-goods"></i>商品管理</template>
                            <el-menu-item-group>
                                <el-menu-item index="3-1">
                                    <router-link to="/goods-list">商品列表</router-link>
                                </el-menu-item>
                                <el-menu-item index="3-2">
                                    <router-link to="/goods-audit">商品审核</router-link>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                        <el-submenu index="4">
                            <template slot="title"><i class="el-icon-s-order"></i>订单管理</template>
                            <el-menu-item-group>
                                <el-menu-item index="4-1">
                                    <router-link to="/order-list">订单列表</router-link>
                                </el-menu-item>
                                <el-menu-item index="4-2">
                                    <router-link to="/order-stats">订单统计</router-link>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'AdminView',
    methods: {
        logout() {
            // 实现登出逻辑
            this.$confirm('确认退出系统吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 清除登录状态
                localStorage.removeItem('token');
                this.$router.push('/login');
            }).catch(() => {});
        }
    }
}
</script>

<style scoped>
.el-header {
    position: relative;
    padding: 0 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
}

.el-aside {
    min-height: calc(100vh - 60px);
}

.el-menu {
    border-right: none;
}

a {
    text-decoration: none;
    color: inherit;
}
</style>