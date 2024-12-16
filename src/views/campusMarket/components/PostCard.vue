<template>
  <el-card class="post-card" :body-style="{ padding: '0px' }">
    <div class="post-header">
      <el-avatar :src="post.userAvatar" :size="40"></el-avatar>
      <div class="user-info">
        <div class="username">{{ post.username }}</div>
        <div class="post-time">{{ post.createTime }}</div>
      </div>
    </div>
    
    <img class="product-image" :src="post.productImage" :alt="post.productName">
    
    <div class="post-content">
      <h3 class="product-title">{{ post.productName }}</h3>
      <div class="product-price">¥{{ post.price.toFixed(2) }}</div>
      <el-divider></el-divider>
      <p class="product-description">{{ post.description }}</p>
    </div>
    
    <div class="interaction-area">
      <el-button-group>
        <el-button type="text" @click="handleLike" class="like-button">
          <i class="like-icon" :class="{ 'is-liked': isLiked }">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </i>
          <span class="like-count" :class="{ 'liked': isLiked }">
            {{ likeCount }}
          </span>
        </el-button>
        <el-button type="text" @click="openCommentDialog" class="comment-button">
          <i class="el-icon-chat-dot-round"></i>
          <span class="comment-count">{{ commentCount }}</span>
        </el-button>
      </el-button-group>
    </div>

    <comment-region
      :visible.sync="showCommentDialog"
      :post-id="post.id"
      @comment-added="handleCommentAdded"
      @like-updated="handleLikeUpdated"
    />
  </el-card>
</template>

<script>
import CommentRegion from '@/views/comments/CommentRegion.vue'

export default {
  name: 'PostCard',
  components: { CommentRegion },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showCommentDialog: false,
      isLiked: false,
      likeCount: 0,
      commentCount: 0
    }
  },
  created() {
    this.isLiked = this.post.isLiked
    this.likeCount = this.post.likes
    this.commentCount = this.post.commentCount
  },
  methods: {
    async handleLike() {
      try {
        // eslint-disable-next-line no-unused-vars
        const payload = {
          postId: this.post.id,
          action: !this.isLiked ? 'like' : 'unlike'
        }
        // await api.updateLike(payload)
        //添加后端点赞接口
        this.isLiked = !this.isLiked
        this.likeCount += this.isLiked ? 1 : -1
      } catch (error) {
        this.$message.error('操作失败，请重试')
      }
    },
    handleCommentAdded() {
      this.commentCount += 1
    },
    handleLikeUpdated({ isLiked, count }) {
      this.isLiked = isLiked
      this.likeCount = count
    },
    openCommentDialog() {
      this.showCommentDialog = true
    }
  }
}
</script>

<style scoped>
.post-card {
  margin-bottom: 0;  /* 修改这里 */
  border-radius: 0;  /* 修改这里 */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;  /* 移除边框 */
  background: linear-gradient(135deg, #ffffff 0%, #FFF5E6 100%);  /* 背景渐变 */
  box-shadow: 
    0 4px 12px rgba(124, 10, 39, 0.08),
    0 2px 4px rgba(184, 134, 11, 0.15);
  position: relative;
  overflow: hidden;  /* 确保渐变效果不会溢出 */
}

.post-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #7C0A27, #B8860B);  /* 更漂亮的渐变色 */
  opacity: 0.8;
}

.post-card:hover {
  transform: translateY(-5px);
  background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%);  /* 悬停时的渐变 */
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 4px 12px rgba(64, 158, 255, 0.2);
}

.post-header {
  background: linear-gradient(135deg, #f8faff 0%, #f0f7ff 100%);
  border-bottom: 1px solid rgba(64, 158, 255, 0.1);
  padding: 16px;
}

.product-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.post-card:hover .product-image {
  transform: scale(1.02);
}

.post-content {
  padding: 20px;
  background: #ffffff;
  border-radius: 0 0 12px 12px;
  border-top: 1px solid rgba(64, 158, 255, 0.1);
}

.product-title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.8);  /* 增强文字阴影 */
  padding-bottom: 8px;
  border-bottom: 1px dashed rgba(64, 158, 255, 0.2);  /* 添加底部虚线 */
}

.product-price {
  display: inline-block;
  color: #f56c6c;
  font-size: 20px;
  font-weight: bold;
  padding: 4px 12px;
  background: rgba(245, 108, 108, 0.1);
  border-radius: 20px;
  margin: 8px 0;
  background: linear-gradient(90deg, #7C0A27 0%, #B8860B 100%);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(255, 71, 87, 0.2);
}

.product-description {
  color: #5c6b7f;
  line-height: 1.6;
  padding: 8px 0;
}

.interaction-area {
  padding: 12px 20px 16px;
  background: linear-gradient(135deg, #f8faff 0%, #f0f7ff 100%);
  border-top: 1px solid rgba(64, 158, 255, 0.1);
  border-radius: 0 0 12px 12px;
}

.interaction-area .el-button {
  margin-right: 20px;
}

.interaction-area .liked {
  color: #f56c6c;
}

.like-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.like-button:hover {
  background: linear-gradient(135deg, #FFE5E5 0%, #FFF5E6 100%);
}

.like-button:hover .like-icon svg {
  fill: #ff4757;
}

.like-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.like-icon svg {
  fill: #bbb;
  transition: all 0.3s ease;
}

.like-icon.is-liked svg {
  fill: #7C0A27;
}

.like-icon.pop {
  animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes pop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}

.like-count {
  font-size: 14px;
  color: #606266;
  transition: all 0.3s ease;
}

.like-count.liked {
  color: #7C0A27;
  font-weight: 600;
}

.comment-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.comment-button:hover {
  background: linear-gradient(135deg, #ecf5ff 0%, #e0f0ff 100%);
}

.comment-button i {
  font-size: 18px;
  transition: all 0.3s ease;
}

.comment-button:hover i {
  transform: scale(1.1);
  color: #409EFF;
}

.comment-count {
  font-size: 14px;
  color: #606266;
  transition: all 0.3s ease;
}

.comment-button:hover .comment-count {
  color: #409EFF;
  font-weight: 500;
}
</style>