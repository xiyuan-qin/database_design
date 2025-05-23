<template>
    <div class="common-layout">
        <el-container>
            <el-header style="background: linear-gradient(to right, #7C0A27, #B8860B);">
                <div class="header-content">
                    <a href="https://www.sdu.edu.cn/index.htm" target="_blank">
                        <img src="@/assets/sdu.jpg" alt="山东大学校徽" class="sdu-logo">
                    </a>
                    <div class="title" @click="toMarket">山东大学青岛二手交易市场</div>
                    <div class="header-right">
                        <el-dropdown @command="handleCommand" class="user-dropdown">
                            <span class="el-dropdown-link">
                                <i class="el-icon-user"></i>
                                个人中心
                                <span v-if="unreadCount" class="unread-badge">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="profile">
                                    <i class="el-icon-user"></i>
                                    个人中心
                                </el-dropdown-item>
                                <el-dropdown-item command="chat">
                                    <i class="el-icon-message"></i>
                                    私信
                                    <span v-if="unreadCount" class="menu-badge">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
                                </el-dropdown-item>
                                <el-dropdown-item command="posts">
                                    <i class="el-icon-document"></i>
                                    贴文管理
                                </el-dropdown-item>
                                <el-dropdown-item command="logout">
                                    <i class="el-icon-switch-button"></i>
                                    退出登录
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px" style="background: linear-gradient(180deg, #F5E6E6 0%, #FFF5E6 100%)">
                    <el-menu :default-openeds="['1']" class="custom-menu">
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
                    <div v-if="$route.path === '/market'" class="welcome-container">
                        <h1>欢迎来到山东大学二手交易平台</h1>
                        <div class="welcome-content">
                            <el-card class="welcome-card">
                                <div slot="header">
                                    <span>平台介绍</span>
                                </div>
                                <p>这里是山东大学青岛校区的二手交易平台，您可以：</p>
                                <ul>
                                    <li>浏览南区、北区的二手商品</li>
                                    <li>发布您的闲置物品</li>
                                    <li>与其他同学进行交易互动</li>
                                </ul>
                            </el-card>
                        </div>
                    </div>
                    <router-view v-else></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/icon.css';

export default {
    name: 'MarketView',
    data() {
        return {
            unreadCount: 0
        }
    },
    methods: {
        handleCommand(command) {
            if (command === 'logout') {
                this.$confirm('确认退出系统吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // TODO: 后端API - 用户登出
                    // POST /api/auth/logout
                    // Headers: { Authorization: token }
                    localStorage.removeItem('token');
                    this.$router.push('/default');
                }).catch(() => {});
            } else if (command === 'profile') {
                this.$router.push('/profile');
            } else if (command === 'posts') {
                this.$router.push('/posts');
            } else if (command === 'chat') {
                this.$router.push('/chat');
            }
        },

        // TODO: 后端API - 检查未读消息数量
        // GET /api/chat/unread
        // Headers: { Authorization: token }
        // Response: { count: number }
        async checkUnreadMessages() {
            try {
                const response = await fetch('/api/chat/unread')
                const data = await response.json()
                this.unreadCount = data.count
            } catch (error) {
                console.error('获取未读消息数量失败:', error)
            }
        },

        toMarket() {
            if (this.$route.path !== '/market') {
                this.$router.push('/market');
            }
        }
    },
    
    // TODO: 后端API - 页面加载时的初始化检查
    // 1. 验证用户登录状态
    // GET /api/auth/check
    // Headers: { Authorization: token }
    
    // 2. 获取用户基本信息
    // GET /api/user/info
    // Headers: { Authorization: token }
    mounted() {
        this.checkUnreadMessages()
        // 每分钟检查一次未读消息
        this.timer = setInterval(() => {
            this.checkUnreadMessages()
        }, 60000)
    },
    
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer)
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
    margin-left: auto;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 0 15px;
}

.el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 500;
    background: rgba(255, 255, 255, 0.1);
    padding: 8px 15px;
    border-radius: 20px;
    transition: all 0.3s ease;
    position: relative;
}

.el-dropdown-link:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
}

.el-dropdown-link i {
    margin-right: 5px;
    color: #FFD700;
}

.el-dropdown-menu__item i {
    margin-right: 5px;
}

.menu-item {
    height: 50px !important;  /* 增加高度 */
    line-height: 50px !important;  /* 调整行高 */
    margin: 8px 15px !important;
    border-radius: 8px;
    background: linear-gradient(90deg, rgba(124, 10, 39, 0.05), rgba(184, 134, 11, 0.05)) !important;
    position: relative;
    overflow: hidden;
}

.menu-item:hover {
    background: linear-gradient(90deg, rgba(124, 10, 39, 0.1), rgba(184, 134, 11, 0.1)) !important;
}

.menu-link {
    height: 100%;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;  /* 文字居中 */
    padding: 0 20px !important;
    color: #7C0A27;
    font-size: 16px;
    font-family: "Microsoft YaHei", sans-serif;
    border-radius: 4px;
    transition: all 0.3s ease;
    font-weight: 500;
    position: relative;
    z-index: 1;
}

.menu-link:hover {
    color: #7C0A27;
    font-weight: 600;
    transform: translateX(5px);
}

/* 激活状态的样式 */
.el-menu-item.is-active .menu-link {
    color: #7C0A27;
    font-weight: 600;
    background-color: rgba(124, 10, 39, 0.1);
}

/* 修改子菜单组的样式 */
.el-menu-item-group__title {
    padding: 8px 16px;
    font-size: 14px;
    color: #909399;
}

.title {
    flex-grow: 1;
    font-size: 40px;
    font-family: "STXingkai", "华文行楷", SimSun;
    display: inline-block;
    cursor: pointer;
    padding: 10px 20px;
    position: relative;
    background: linear-gradient(to right, #FFD700, #FFFFFF);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    letter-spacing: 2px;
    transition: all 0.4s ease;
}

.title::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, 
        rgba(139, 0, 0, 0) 0%,
        rgba(139, 0, 0, 0.1) 50%,
        rgba(139, 0, 0, 0) 100%);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
}

.title:hover {
    transform: scale(1.03);
    background: linear-gradient(to right, #FFFFFF, #FFD700);
    -webkit-background-clip: text;
    background-clip: text;
    letter-spacing: 3px;
}

.title:hover::before {
    transform: translateX(100%);
}

.title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(to right, transparent, #FF0000, transparent);
    transform: translateX(-50%);
    transition: width 0.4s ease;
}

.title:hover::after {
    width: 80%;
}

/* 隐藏左侧菜单栏滚动条 */
.el-aside::-webkit-scrollbar {
    display: none;
}

.el-aside {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;     /* Firefox */
}

.welcome-container {
    text-align: center;
    padding: 0;  /* 修改这里 */
    margin: 0;   /* 添加这行 */
}

.welcome-container h1 {
    color: #7C0A27;
    margin-bottom: 30px;
    font-size: 32px;
    text-shadow: 2px 2px 4px rgba(184, 134, 11, 0.2);
}

.welcome-content {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.welcome-card {
    width: 80%;
    max-width: 600px;
    margin: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-top: 4px solid #7C0A27;
    background: linear-gradient(135deg, #ffffff 0%, #FFF5E6 100%);
}

.welcome-card .el-card__header {
    background-color: #f5f7fa;
    font-size: 18px;
    font-weight: bold;
    color: #303133;
}

.welcome-card ul {
    text-align: left;
    padding-left: 20px;
}

.welcome-card li {
    margin: 10px 0;
    color: #606266;
    font-size: 16px;
}

/* 添加 header 内容布局样式 */
.header-content {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    background: linear-gradient(to right, #7C0A27, #B8860B);
}

.sdu-logo {
    height: 50px;
    margin-right: 15px;
    border-radius: 50%;
    transition: transform 0.3s ease;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 2px solid #B8860B;
}

.sdu-logo:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.el-menu-item.is-active {
    background: rgba(124, 10, 39, 0.1);
    border-left: 3px solid #7C0A27;
}

:deep(.el-submenu__title:hover) {
    background: linear-gradient(to right, rgba(124, 10, 39, 0.1), rgba(184, 134, 11, 0.1));
}

:deep(.custom-menu) {
    border-right: none;
    background: transparent;
}

:deep(.el-submenu__title) {
    color: #7C0A27 !important;
    font-weight: bold;
    height: 60px !important;  /* 增加标题高度 */
    line-height: 60px !important;
    font-size: 18px !important;  /* 增大字体 */
    display: flex ;
    align-items: center ;
    padding-left: 25px ;
    margin-bottom: 10px;
}

:deep(.el-menu-item-group__title) {
    color: #B8860B;
    font-weight: 500;
    padding: 10px 20px;
    padding: 15px 25px ;  /* 增加内边距 */
    font-size: 14px ;
}

:deep(.el-menu) {
    background: transparent;
    padding: 10px 0;  /* 增加整体内边距 */
}

.el-dropdown-link {
    color: #FFFFFF;
    font-weight: 500;
    background: rgba(255, 255, 255, 0.1);
    padding: 8px 15px;
    border-radius: 20px;
    transition: all 0.3s ease;
}

.el-dropdown-link:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
}

.el-dropdown-link i {
    color: #FFD700;
}

:deep(.el-dropdown-menu) {
    border: none;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

:deep(.el-dropdown-menu__item) {
    padding: 12px 24px;
    font-weight: 500;
}

:deep(.el-dropdown-menu__item:hover) {
    background: linear-gradient(90deg, rgba(124, 10, 39, 0.1), rgba(184, 134, 11, 0.1));
    color: #7C0A27;
}

:deep(.el-dropdown-menu__item i) {
    color: #B8860B;
}

/* 修改个人中心下拉菜单样式 */
.user-dropdown {
    position: relative;
    z-index: 1000;
}

.el-dropdown-link {
    cursor: pointer;
    color: #FFFFFF;
    font-size: 14px;
    padding: 8px 15px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 5px;
}

.header-right {
    margin-left: auto;
    padding: 0;
    background: none;
}

/* 优化左侧菜单样式 */
.el-menu-item {
    height: auto;
    line-height: normal;
    padding: 0 ;
    margin: 8px 15px;
}

.menu-link {
    width: 100%;
    box-sizing: border-box;
}

:deep(.el-menu-item.is-active) {
    background: rgba(124, 10, 39, 0.1);
}

:deep(.el-menu-item:hover) {
    background: rgba(124, 10, 39, 0.05);
}

:deep(.el-menu) {
    background: transparent;
}

/* 添加悬停特效 */
.menu-item:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(124, 10, 39, 0.1), rgba(184, 134, 11, 0.1));
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
}

.menu-item:hover:after {
    transform: scaleX(1);
    transform-origin: left;
}

/* 添加以下样式来移除白边 */
.common-layout {
    height: 100vh;
    display: flex;
    overflow: hidden;
    position: fixed;  /* 添加这行 */
    width: 100%;     /* 添加这行 */
    top: 0;          /* 添加这行 */
    left: 0;         /* 添加这行 */
}

.el-container {
    height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;  /* 添加这行 */
}

:deep(.el-main) {
    padding: 0 !important;  /* 修改这里，添加!important */
    margin: 0;
    background: #f5f7fa;  /* 可选：添加背景色 */
    overflow-y: auto;  /* 修改这行 */
    overflow-x: hidden;  /* 添加这行 */
}

/* 添加未读消息红点样式 */
.unread-badge {
    position: absolute;
    right: -5px;
    top: -5px;
    background-color: #f56c6c;
    color: white;
    border-radius: 10px;
    padding: 0 6px;
    font-size: 12px;
    z-index: 1;
}

.menu-badge {
    float: right;
    background-color: #f56c6c;
    color: white;
    border-radius: 10px;
    padding: 0 6px;
    font-size: 12px;
    margin-left: 5px;
}
</style>