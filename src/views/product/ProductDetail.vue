<template>
    <!-- eslint-disable-next-line vue/no-mutating-props -->
    <el-dialog :visible.sync="visible" title="商品详情" width="60%" class="product-dialog">
        <div class="product-container">
            <div class="product-image">
                <img :src="require(`../../demoImg/${image.img}`)" alt="商品图片" />
            </div>
            <div class="product-info">
                <h2 class="product-title">{{ image.product }}</h2>
                <div class="info-item">
                    <i class="el-icon-user"></i>
                    <span>发布人：{{ image.name }}</span>
                </div>
                <div class="info-item">
                    <i class="el-icon-location"></i>
                    <span>地址：{{ image.address }}</span>
                </div>
                <div class="info-item">
                    <i class="el-icon-time"></i>
                    <span>发布日期：{{ image.date }}</span>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleContact">联系卖家</el-button>
            <el-button @click="$emit('update:visible', false)">关闭</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'ProductDetail',
    props: {
        image: {
            type: Object,
            required: true
        },
        visible: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        handleContact() {
            this.$message({
                message: '功能开发中...',
                type: 'info'
            });
        }
    }
};
</script>

<style scoped>
.product-dialog {
    border-radius: 8px;
}

.product-container {
    display: flex;
    gap: 20px;
    padding: 20px;
}

.product-image {
    flex: 1;
    max-width: 50%;
}

.product-image img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.product-info {
    flex: 1;
    padding: 20px;
}

.product-title {
    margin-bottom: 20px;
    color: #303133;
    font-size: 24px;
}

.info-item {
    margin: 15px 0;
    color: #606266;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.info-item i {
    color: #409EFF;
}

.dialog-footer {
    text-align: right;
    margin-top: 20px;
}
</style>
