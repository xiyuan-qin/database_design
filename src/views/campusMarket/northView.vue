<template>
    <el-scrollbar>
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
        <ImageGrid :images="imageList" />
    </el-scrollbar>
</template>

<script>
import ImageGrid from '@/views/product/ImageGrid.vue';

export default {
    name: 'SouthView',
    components: {
        ImageGrid
    },
    data() {
        const item = {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
            product: 'Laptop',
            img: 'image.jpg'
        };

        return {
            searchForm: {
                user: '',
                region: '',
                date: ''
            },
            tableData: Array.from({ length: 20 }).fill(item),
            imageList: [
                {
                    img: 'demo.jpg',
                    product: '电脑',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                    date: '2016-05-02'
                },
                // ...更多图片对象
            ]
        };
    },
    methods: {
        onSubmit() {
            console.log('submit!');
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
</style>