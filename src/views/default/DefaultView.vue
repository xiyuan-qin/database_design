<template>
    <div class="common-layout">
        <el-container>
            <el-header style="background: linear-gradient(to right, #7C0A27, #B8860B);">
                <div class="title" @click="toDefault">山东大学青岛二手交易市场</div>
                <div class="header-right">
                    <el-button type="primary" class="login-button" @click="toLogin">
                        <i class="el-icon-user"></i>
                        <span class="login-text">登录/注册</span>
                    </el-button>
                </div>
            </el-header>
            <div class="marquee-container">
                <div class="marquee-content">
                    <span class="notice-item" v-for="i in 4" :key="i">
                        <i class="el-icon-warning warning-icon"></i>
                        您还没有登录，只能浏览部分商品，请点击登录以享受完整功能
                    </span>
                </div>
            </div>
            <el-container>
                <!-- 添加左侧菜单栏 -->
                <el-aside width="200px" style="background: linear-gradient(180deg, #F5E6E6 0%, #FFF5E6 100%)">
                    <el-menu :default-openeds="['1']" class="custom-menu">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-menu"></i>校园集市</template>
                            <el-menu-item-group>
                                <el-menu-item index="1-1" class="menu-item" @click="showSection('south')">
                                    <span class="menu-link">南区</span>
                                </el-menu-item>
                                <el-menu-item index="1-2" class="menu-item" @click="showSection('north')">
                                    <span class="menu-link">北区</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <!-- 显示南区和北区的内容 -->
                    <div v-if="currentSection === 'south'" class="section">
                        <h2>南区商品</h2>
                        <SouthView :isDefaultView="true" />
                    </div>
                    <div v-if="currentSection === 'north'" class="section">
                        <h2>北区商品</h2>
                        <NorthView :isDefaultView="true" />
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import SouthView from '../campusMarket/southView.vue';
import NorthView from '../campusMarket/northView.vue';

export default {
    name: 'DefaultView',
    components: {
        SouthView,
        NorthView
    },
    data() {
        return {
            currentSection: 'south'
        };
    },
    methods: {
        toLogin() {
            this.$router.push('/login');
        },
        toDefault() {
            if (this.$route.path !== '/default') {
                this.$router.push('/default');
            }
        },
        showSection(section) {
            this.currentSection = section;
        }
    }
};
</script>

<style scoped>
/* 样式调整，与 marketView.vue 保持一致 */
.common-layout {
    width: 100%;
    height: 100%;
}

.title {
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
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2),
                -1px -1px 0 rgba(255, 255, 255, 0.2);
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

.header-right {
    float: right;
    display: flex;
    align-items: center;
    height: 100%;
}

.el-header {
    position: relative;
    padding: 0 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
}

.marquee-container {
    background-color: #FFF3E0;
    padding: 8px 0;
    overflow: hidden;
    position: relative;
}

.marquee-content {
    display: inline-block;
    white-space: nowrap;
    animation: marquee 40s linear infinite;  /* 调整滚动时间 */
    padding: 0 20px;
}

.notice-item {
    display: inline-block;
    color: #FF5722;
    font-size: 16px;
    margin-right: 100px;
}

.warning-icon {
    color: #FF5722;
    margin-right: 10px;
    animation: bounce 1s infinite;
}

@keyframes marquee {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-3px);
    }
}

.el-aside {
    /* 隐藏滚动条 */
    overflow-y: hidden;
}

.menu-item {
    background: linear-gradient(90deg, rgba(124, 10, 39, 0.05), rgba(184, 134, 11, 0.05));
    margin: 10px 15px;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.menu-item:hover {
    background: linear-gradient(90deg, rgba(124, 10, 39, 0.1), rgba(184, 134, 11, 0.1)) !important;
}

.menu-link {
    display: block;
    text-decoration: none;
    color: #7C0A27;
    font-size: 16px;
    font-family: "Microsoft YaHei", sans-serif;
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.3s ease;
    font-weight: 500;
}

.menu-link:hover {
    color: #7C0A27;
    font-weight: 600;
    transform: translateX(5px);
}

/* 新的登录按钮样式 */
.login-button {
    background: linear-gradient(45deg, #7C0A27, #B8860B);
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.login-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    background: linear-gradient(45deg, #960C30, #DAA520);
}

.login-button i {
    font-size: 18px;
}

.login-text {
    font-size: 16px;
}

.section {
    margin-bottom: 40px;
}

h2 {
    margin-bottom: 20px;
    color: #409EFF;
}

@media screen and (max-width: 768px) {
    .title {
        font-size: 32px;
    }

    .header-right {
        flex-direction: column;
    }
}

.el-menu-item.is-active .menu-link {
    color: #7C0A27;
    background-color: rgba(124, 10, 39, 0.1);
}

:deep(.el-menu) {
    border-right: none;
    background: transparent;
}

:deep(.el-submenu__title) {
    color: #7C0A27 !important;
    font-weight: bold;
}

:deep(.el-menu-item-group__title) {
    color: #B8860B;
    font-weight: 500;
    padding: 10px 20px;
}
</style>