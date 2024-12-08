<template>
    <div class="common-layout">
        <el-container>
            <el-header style="background-color: lightgray;">
                <div class="title" @click="toMarket">山东大学青岛二手交易市场</div>
                <div class="header-right">
                    <div class="nav-item" @click="toProfile">
                        <i class="el-icon-user"></i>
                        个人中心
                    </div>
                    <el-button type="danger" size="small" @click="logout">
                        退出登录
                    </el-button>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                    <el-menu :default-openeds="['1']">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-message"></i>校园集市</template>
                            <el-menu-item-group>
                                <el-menu-item index="1-1" class="menu-item">
                                    <router-link to="/market/south" class="menu-link">南区</router-link>
                                </el-menu-item>
                                <el-menu-item index="1-2" class="menu-item">
                                    <router-link to="/market/north" class="menu-link">北区</router-link>
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
import 'element-ui/lib/theme-chalk/icon.css';

export default {
    name: 'MarketView',
    methods: {
        logout() {
            this.$confirm('确认退出系统吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                localStorage.removeItem('token');
                this.$router.push('/login');
            }).catch(() => {});
        },
        toProfile() {
            this.$router.push('/profile');
        },
        toMarket() {
            this.$router.push('/market');
        }
    }
};
</script>

<style scoped>
.layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
    border-right: none;
}

.layout-container-demo .el-main {
    padding: 0;
}

.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}

.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.demo-form-inline .el-select {
    --el-select-width: 220px;
}

.el-header {
    position: relative;
    padding: 0 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
}

.header-right {
    float: right;
    display: flex;
    align-items: center;
    height: 100%;
}

.nav-item {
    padding: 0 20px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #409EFF;
    cursor: pointer;
    margin-right: 15px;
    background: rgba(64, 158, 255, 0.1);
    border-radius: 16px;
    transition: all 0.3s;
}

.nav-item:hover {
    background: #409EFF;
    color: white;
}

.nav-item i {
    margin-right: 5px;
}

.menu-item {
    margin: 8px 0;
    border-radius: 6px;
    transition: all 0.3s ease;
}

.menu-item:hover {
    background-color: #f0f7ff !important;
}

.menu-link {
    display: block;
    text-decoration: none;
    color: #606266;
    font-size: 16px;
    font-family: "Microsoft YaHei", sans-serif;
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.menu-link:hover {
    color: #409EFF;
    font-weight: 600;
    transform: translateX(5px);
}

/* 激活状态的样式 */
.el-menu-item.is-active .menu-link {
    color: #409EFF;
    font-weight: 600;
    background-color: #ecf5ff;
}

/* 修改子菜单组的样式 */
.el-menu-item-group__title {
    padding: 8px 16px;
    font-size: 14px;
    color: #909399;
}

.title {
    font-size: 40px;
    color: brown;
    font-family: SimSun;
    display: inline-block;
    cursor: pointer;
    transition: all 0.3s;
}

.title:hover {
    transform: scale(1.02);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

/* 隐藏左侧菜单栏滚动条 */
.el-aside::-webkit-scrollbar {
    display: none;
}

.el-aside {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;     /* Firefox */
}
</style>