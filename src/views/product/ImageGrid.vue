<template>
    <div class="image-grid">
        <el-row :gutter="20">
            <el-col :span="6" v-for="(img, index) in images" :key="index">
                <el-card :body-style="{ padding: '0px' }" class="image-card" shadow="hover">
                    <div class="image-container" @mouseenter="handleMouseEnter(index)" @mouseleave="handleMouseLeave">
                        <img :src="require(`../../demoImg/${img.img}`)" class="image" />
                        <div v-if="hoveredIndex === index" class="overlay">
                            <div class="product-info">
                                <h3>{{ img.product }}</h3>
                                <el-button 
                                    type="primary" 
                                    round
                                    class="detail-btn"
                                    icon="el-icon-view"
                                    @click="showDetail(img)">
                                    查看详情
                                </el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <ProductDetail :visible.sync="detailVisible" :image="selectedImage" />
    </div>
</template>

<script>
import ProductDetail from './ProductDetail.vue';

export default {
    name: 'ImageGrid',
    components: {
        ProductDetail
    },
    props: {
        images: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            hoveredIndex: null,
            detailVisible: false,
            selectedImage: {}
        };
    },
    methods: {
        handleMouseEnter(index) {
            this.hoveredIndex = index;
        },
        handleMouseLeave() {
            this.hoveredIndex = null;
        },
        showDetail(image) {
            this.selectedImage = image;
            this.detailVisible = true;
        }
    }
};
</script>

<style scoped>
.image-container {
    position: relative;
    overflow: hidden;
    aspect-ratio: 1;
}

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: all 0.3s ease;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.image-container:hover .overlay {
    opacity: 1;
}

.image-container:hover .image {
    transform: scale(1.05);
}

.image-card {
    margin-bottom: 20px;
    overflow: hidden;
    border-radius: 8px;
}

.image-grid {
    padding: 20px;
    height: calc(100vh - 100px);
    overflow-y: auto;
}

.product-info {
    text-align: center;
    color: white;
}

.product-info h3 {
    margin-bottom: 15px;
    font-size: 18px;
}

.detail-btn {
    padding: 10px 25px;
    font-size: 14px;
    border: 2px solid rgba(255, 255, 255, 0.8);
    background-color: rgba(64, 158, 255, 0.9);
    transition: all 0.3s ease;
}

.detail-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    background-color: #409EFF;
}

.detail-btn i {
    margin-right: 5px;
}
</style>