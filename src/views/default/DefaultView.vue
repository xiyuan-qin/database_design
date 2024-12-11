<template>
    <div class="common-layout">
        <el-container>
            <el-header style="background-color: lightgray;">
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
                <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                    <el-menu :default-openeds="['1']">
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
                        <SouthView />
                    </div>
                    <div v-if="currentSection === 'north'" class="section">
                        <h2>北区商品</h2>
                        <NorthView />
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

/* 新的登录按钮样式 */
.login-button {
    background: linear-gradient(45deg, #4CAF50, #2196F3);
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
    background: linear-gradient(45deg, #45a049, #1976D2);
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
</style>