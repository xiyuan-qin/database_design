<template>
    <div class="post-management">
        <!-- 添加返回按钮 -->
        <div class="back-button">
            <el-button type="text" @click="goBack">
                <i class="el-icon-arrow-left"></i> 返回
            </el-button>
        </div>

        <el-card class="search-card">
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item label="商品名">
                    <el-input v-model="searchForm.productName" placeholder="商品名称" clearable />
                </el-form-item>
                <el-form-item label="区域">
                    <el-select v-model="searchForm.region" placeholder="选择区域" clearable>
                        <el-option label="南区" value="south" />
                        <el-option label="北区" value="north" />
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="searchForm.status" placeholder="选择状态" clearable>
                        <el-option label="在售" value="selling" />
                        <el-option label="已售出" value="sold" />
                        <el-option label="已下架" value="removed" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                    <el-button @click="resetSearch">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="post-list" v-loading="loading">
            <div class="posts-container" 
                 v-infinite-scroll="loadMore"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10">
                <el-table :data="posts" style="width: 100%">
                    <el-table-column prop="productName" label="商品名称" width="180">
                        <template v-slot="scope">
                            <div class="product-info">
                                <el-image 
                                    :src="scope.row.productImage" 
                                    fit="cover"
                                    class="product-image"
                                    @click="previewImage(scope.row.productImage)">
                                </el-image>
                                <span>{{ scope.row.productName }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="价格" width="100">
                        <template v-slot="scope">
                            ¥{{ scope.row.price }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="region" label="区域" width="100">
                        <template v-slot="scope">
                            {{ scope.row.region === 'south' ? '南区' : '北区' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态" width="100">
                        <template v-slot="scope">
                            <el-tag :type="getStatusType(scope.row.status)">
                                {{ getStatusText(scope.row.status) }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="发布时间" width="180" />
                    <el-table-column label="操作">
                        <template v-slot="scope">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.row)">编辑</el-button>
                            <el-button
                                size="mini"
                                :type="scope.row.status === 'selling' ? 'success' : 'info'"
                                @click="handleStatusChange(scope.row)">
                                {{ scope.row.status === 'selling' ? '标记售出' : '重新上架' }}
                            </el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
import demoImg from '@/demoImg/demo.jpg'

export default {
    name: 'PostManagement',
    data() {
        return {
            searchForm: {
                productName: '',
                region: '',
                status: ''
            },
            posts: [],
            loading: false,
            page: 1
        }
    },
    methods: {
        loadMore() {//在这里添加和后端交互的代码
            if (this.loading) return
            this.loading = true
            
            // 模拟后端加载数据
            setTimeout(() => {
                const newPosts = Array(5).fill().map((_, index) => ({
                    id: this.posts.length + index + 1,
                    productName: `测试商品${this.posts.length + index + 1}`,
                    productImage: demoImg,
                    price: Math.floor(Math.random() * 1000),
                    region: Math.random() > 0.5 ? 'south' : 'north',
                    status: ['selling', 'sold', 'removed'][Math.floor(Math.random() * 3)],
                    createTime: '2023-12-01 12:00:00'
                }))
                
                this.posts.push(...newPosts)
                this.loading = false
                this.page++
            }, 1000)
        },
        
        handleSearch() {
            this.posts = []
            this.page = 1
            this.loadMore()
        },
        
        resetSearch() {
            this.searchForm = {
                productName: '',
                region: '',
                status: ''
            }
            this.handleSearch()
        },
        
        getStatusType(status) {
            const types = {
                'selling': 'success',
                'sold': 'info',
                'removed': 'danger'
            }
            return types[status] || 'info'
        },
        
        getStatusText(status) {
            const texts = {
                'selling': '在售',
                'sold': '已售出',
                'removed': '已下架'
            }
            return texts[status] || '未知'
        },
        
        handleEdit(row) {
            this.$message.info(`编辑商品：${row.productName}`)
        },
        
        handleStatusChange(row) {
            const newStatus = row.status === 'selling' ? 'sold' : 'selling'
            const actionText = row.status === 'selling' ? '标记售出' : '重新上架'
            
            this.$confirm(`确定要${actionText}该商品吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                row.status = newStatus
                this.$message.success(`操作成功`)
            }).catch(() => {})
        },
        
        handleDelete(row) {
            this.$confirm('确定要删除该商品吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.posts = this.posts.filter(item => item.id !== row.id)
                this.$message.success('删除成功')
            }).catch(() => {})
        },
        
        previewImage(url) {
            // 使用 Element UI 的 Image Viewer 组件预览图片
            const h = this.$createElement;
            this.$msgbox({
                title: '图片预览',
                message: h('el-image', {
                    attrs: {
                        src: url,
                        fit: 'contain'
                    },
                    style: {
                        width: '100%',
                        maxHeight: '500px'
                    }
                }),
                beforeClose: (action, instance, done) => {
                    done();
                },
                showConfirmButton: false
            });
        },

        goBack() {
            // 从 localStorage 获取最后访问的区域
            const lastArea = localStorage.getItem('lastArea') || 'market';
            this.$router.push(`/market/${lastArea}`);
        }
    },
    mounted() {
        this.loadMore()
    }
}
</script>

<style scoped>
.post-management {
    padding: 20px;
    background: #f5f7fa;
    min-height: 100vh;
}

.search-card {
    margin-bottom: 20px;
}

.product-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.product-image {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    cursor: pointer;
}

:deep(.el-table) {
    border-radius: 8px;
}

:deep(.el-button--mini) {
    padding: 6px 12px;
    margin: 0 4px;
}

.posts-container {
    min-height: 400px;
}

:deep(.el-form-item) {
    margin-bottom: 0;
}

:deep(.el-card) {
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);
}

:deep(.el-button--primary) {
    background: linear-gradient(45deg, #7C0A27, #B8860B);
    border: none;
}

:deep(.el-button--primary:hover) {
    background: linear-gradient(45deg, #960C30, #DAA520);
    transform: translateY(-1px);
}

/* 添加返回按钮样式 */
.back-button {
    margin-bottom: 20px;
}

.back-button .el-button {
    font-size: 16px;
    color: #7C0A27;
    padding: 10px 0;
    transition: all 0.3s ease;
}

.back-button .el-button:hover {
    color: #B8860B;
    transform: translateX(-5px);
}

.back-button i {
    margin-right: 5px;
}
</style>
