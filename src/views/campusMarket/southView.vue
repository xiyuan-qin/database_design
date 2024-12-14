<template>
  <div class="south-view-container">
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
        <div class="create-post-button">
            <el-button type="primary" @click="showCreatePost">
                <i class="el-icon-plus"></i> 发布新商品
            </el-button>
        </div>
    </el-scrollbar>
    <CreatePostForm ref="createPostForm" @submit="handlePostSubmit" />
  </div>
</template>

<script>
import PostCard from './components/PostCard.vue';  /* 修改导入路径 */
import CreatePostForm from './forms/CreatePostForm.vue';
import demoImg from '@/demoImg/demo.jpg';  // 添加这行

export default {
    name: 'SouthView',
    props: {
        isDefaultView: {
            type: Boolean,
            default: false
        }
    },
    components: {
        PostCard,  // 注册 PostCard
        CreatePostForm
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
        },
        showCreatePost() {
            if (this.isDefaultView) {
                this.$message({
                    message: '只有登录才能发布商品！',
                    type: 'warning',
                    duration: 2000
                });
            } else {
                this.$refs.createPostForm.show();
            }
        },
        handlePostSubmit(formData) {
            if (formData.region === 'south') {
                this.posts.unshift(formData);
                this.$message.success('发布成功！');
            }
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
.south-view-container {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.infinite-scroll-container {
  height: calc(100vh - 120px);
  background: #f5f7fa;
  padding: 0;
  margin: 0;
}

.posts-container {
  padding: 0;
  max-width: 800px;
  margin: 0 auto;
  background: transparent;
  height: calc(100vh - 180px);
  overflow-y: auto;
}

/* 隐藏滚动条但保持功能 */
.posts-container::-webkit-scrollbar {
  display: none;
}

.posts-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* 搜索栏样式调整 */
.search-wrapper {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  background-color: #f5f7fa;
  background: linear-gradient(135deg, rgba(124, 10, 39, 0.05), rgba(184, 134, 11, 0.05));
  margin: 0;
}

.demo-form-inline {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

:deep(.el-form-item) {
  margin-bottom: 0;
}

/* 固定按钮样式 */
.create-post-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
}

:deep(.el-button--primary) {
  background: linear-gradient(45deg, #7C0A27, #B8860B);
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 25px;
  box-shadow: 0 4px 12px rgba(124, 10, 39, 0.2);
  transition: all 0.3s ease;
}

:deep(.el-button--primary:hover) {
  background: linear-gradient(45deg, #960C30, #DAA520);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(124, 10, 39, 0.3);
}

:deep(.el-button--primary i) {
  margin-right: 8px;
}
</style>