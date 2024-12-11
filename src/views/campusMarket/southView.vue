<template>
    <el-scrollbar class="infinite-scroll-container" v-loading="fullscreenLoading" 
                  element-loading-text="加载中..."
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(255, 255, 255, 0.8)">
        <div class="search-wrapper">
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item label="商品名">
                    <el-input v-model="searchForm.user" placeholder="搜索你需要的商品" clearable />
                </el-form-item>
                <el-form-item label="区域">
                    <el-select v-model="searchForm.region" placeholder="选择你的购买区间" clearable>
                        <el-option label="南区" value="south" />
                        <el-option label="北区" value="north" />
                    </el-select>
                </el-form-item>
                <el-form-item label="发布时间">
                    <el-date-picker v-model="searchForm.date" type="date" placeholder="选择发布时间" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        
        <!-- 使用 PostCard 组件展示帖子列表 -->
        <div class="posts-container" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <PostCard
                v-for="post in posts"
                :key="post.id"
                :post="post"
                @like="handleLike"
                @comment="handleComment"
            />
            <div v-if="loading" class="loading-more">
                <el-loading-component></el-loading-component>
            </div>
        </div>
    </el-scrollbar>
</template>

<script>
import PostCard from './components/PostCard.vue';  /* 修改导入路径 */
import demoImg from '@/demoImg/demo.jpg';  // 添加这行

export default {
    name: 'SouthView',
    components: {
        PostCard  // 注册 PostCard
    },
    data() {
        return {
            searchForm: {
                user: '',
                region: '',
                date: ''
            },
            posts: [],
            loading: false,
            page: 1,
            fullscreenLoading: false
        };
    },
    methods: {
        // 添加加载更多帖子的方法
        loadMore() {
            if (this.loading) return;
            this.loading = true;
            // 模拟加载数据
            setTimeout(() => {
                const newPosts = Array(5).fill().map((_, index) => ({
                    id: this.posts.length + index + 1,
                    username: `用户${this.posts.length + index + 1}`,
                    userAvatar: 'https://placeholder.com/avatar.jpg',
                    createTime: '2023-12-01',
                    productName: '电脑',
                    price: 99.99,
                    description: '这是一个商品描述...我也不要做数据库课设啊啊啊',
                    productImage: demoImg,  // 修改这行
                    likes: Math.floor(Math.random() * 100),
                    isLiked: false,
                    comments: []
                }));
                this.posts.push(...newPosts);
                this.loading = false;
                this.page++;
            }, 1000);
        },
        handleLike(postId) {
            const post = this.posts.find(p => p.id === postId);
            if (post) {
                post.isLiked = !post.isLiked;
                post.likes += post.isLiked ? 1 : -1;
            }
        },
        handleComment({ postId, content }) {
            const post = this.posts.find(p => p.id === postId);
            if (post) {
                post.comments.push({
                    id: Date.now(),
                    username: '当前用户',
                    userAvatar: 'https://placeholder.com/avatar.jpg',
                    content: content
                });
            }
        },
        onSubmit() {
            console.log('submit!');
        }
    },
    mounted() {
        this.fullscreenLoading = true;
        this.loadMore();
        setTimeout(() => {
            this.fullscreenLoading = false;
        }, 1000);
    },
    activated() {
        this.fullscreenLoading = true;
        setTimeout(() => {
            this.fullscreenLoading = false;
        }, 1000);
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

.infinite-scroll-container {
    height: calc(100vh - 180px);
}

.posts-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.loading-more {
    text-align: center;
    margin: 20px 0;
}

/* 添加搜索框居中样式 */
.search-wrapper {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    background-color: #f5f7fa;
    background: linear-gradient(135deg, rgba(124, 10, 39, 0.05), rgba(184, 134, 11, 0.05));
}

.demo-form-inline {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
}

:deep(.el-button--primary) {
    background: linear-gradient(45deg, #7C0A27, #B8860B);
    border: none;
}

:deep(.el-button--primary:hover) {
    background: linear-gradient(45deg, #960C30, #DAA520);
}

:deep(.el-input__inner:focus) {
    border-color: #7C0A27;
}

:deep(.el-select .el-input.is-focus .el-input__inner) {
    border-color: #7C0A27;
}
</style>