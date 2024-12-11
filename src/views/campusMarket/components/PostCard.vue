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
          <i class="like-icon" :class="{ 'is-liked': post.isLiked }">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </i>
          <span class="like-count" :class="{ 'liked': post.isLiked }">
            {{ post.likes }}
          </span>
        </el-button>
        <el-button type="text" @click="showCommentDialog">
          <i class="el-icon-chat-dot-round"></i>
          {{ post.comments.length }}
        </el-button>
      </el-button-group>
    </div>
    
    <!-- 评论滚动展示区 -->
    <div class="comments-preview" v-if="post.comments.length">
      <el-carousel 
        height="50px"
        direction="vertical"
        :autoplay="true"
        :interval="3000"
        indicator-position="none">
        <el-carousel-item v-for="comment in post.comments" :key="comment.id">
          <div class="comment-preview-item">
            <el-avatar :src="comment.userAvatar" :size="24"></el-avatar>
            <span class="preview-username">{{ comment.username }}:</span>
            <span class="preview-content">{{ comment.content }}</span>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 优化后的评论弹窗 -->
    <el-dialog
      title="评论"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
      custom-class="comment-dialog"
      append-to-body
      destroy-on-close>
      <div class="comment-dialog-content">
        <div class="comment-list" ref="commentList">
          <div v-if="post.comments.length === 0" class="no-comments">
            暂无评论，来发表第一条评论吧！
          </div>
          <div v-for="comment in post.comments" :key="comment.id" class="comment-item">
            <el-avatar :src="comment.userAvatar" :size="32"></el-avatar>
            <div class="comment-content">
              <div class="comment-header">
                <span class="comment-username">{{ comment.username }}</span>
                <span class="comment-time">{{ comment.createTime || '刚刚' }}</span>
              </div>
              <p class="comment-text">{{ comment.content }}</p>
            </div>
          </div>
        </div>
        <div class="comment-input-area">
          <el-input
            v-model="commentText"
            type="textarea"
            :rows="2"
            :maxlength="200"
            show-word-limit
            resize="none"
            placeholder="写下你的评论..."
            @keyup.ctrl.enter="submitComment"
          />
          <div class="comment-actions">
            <span class="hint">Enter 发送</span>
            <el-button 
              type="primary" 
              size="small" 
              :disabled="!commentText.trim()"
              @click="submitComment">
              发表评论
            </el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
    name: 'PostCard',
    components: {},
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            commentText: '',
            showAllComments: false,
            isInputFocused: false,
            dialogVisible: false
        };
    },
    computed: {
        displayComments() {
            return this.showAllComments 
                ? this.post.comments 
                : this.post.comments.slice(-2);
        }
    },
    methods: {
        submitComment() {
            if (this.commentText.trim()) {
                this.$emit('comment', {
                    postId: this.post.id,
                    content: this.commentText,
                    createTime: new Date().toLocaleString()
                });
                this.commentText = '';
            }
        },
        handleFocus() {
            this.isInputFocused = true;
        },
        handleBlur() {
            this.isInputFocused = false;
        },
        showCommentDialog() {
            this.dialogVisible = true;
        },
        handleLike() {
            this.$emit('like', this.post.id);
            // 优化点赞动画
            const likeIcon = event.currentTarget.querySelector('.like-icon');
            likeIcon.classList.add('pop');
            setTimeout(() => {
                likeIcon.classList.remove('pop');
            }, 300);
        },
        handleClose(done) {
            this.commentText = '';
            done();
        }
    }
};
</script>

<style scoped>
.post-card {
  margin-bottom: 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.post-header {
  padding: 16px;
  display: flex;
  align-items: center;
  background-color: #fafafa;
}

.user-info {
  margin-left: 12px;
}

.product-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
}

.post-content {
  padding: 16px;
}

.product-title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: bold;
}

.product-price {
  color: #f56c6c;
  font-size: 20px;
  font-weight: bold;
}

.interaction-area {
  padding: 0 16px 16px;
}

.interaction-area .el-button {
  margin-right: 20px;
}

.interaction-area .liked {
  color: #f56c6c;
}

.comments-preview {
  padding: 0 16px 16px;
  border-top: 1px solid #ebeef5;
}

.comment-preview-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #606266;
}

.preview-username {
  color: #409EFF;
  font-weight: 500;
}

.preview-content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.comment-dialog {
  border-radius: 12px;
  overflow: hidden;
}

.comment-dialog-content {
  height: 60vh;
  display: flex;
  flex-direction: column;
}

.comment-list {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f9f9f9;
}

.no-comments {
  text-align: center;
  color: #909399;
  padding: 40px 0;
}

.comment-item {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.comment-item:hover {
  transform: translateX(5px);
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.comment-username {
  font-weight: 500;
  color: #409EFF;
}

.comment-time {
  font-size: 12px;
  color: #909399;
}

.comment-text {
  margin: 0;
  line-height: 1.5;
  color: #606266;
}

.comment-input-area {
  padding: 16px;
  background: white;
  border-top: 1px solid #ebeef5;
}

.comment-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.hint {
  font-size: 12px;
  color: #909399;
}

:deep(.el-dialog__body) {
  padding: 0;
}

:deep(.el-dialog__header) {
  padding: 16px 20px;
  border-bottom: 1px solid #ebeef5;
}

:deep(.el-textarea__inner) {
  background-color: #f5f7fa;
  border: none;
  transition: all 0.3s;
}

:deep(.el-textarea__inner:focus) {
  background-color: white;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
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
  background-color: rgba(255, 71, 87, 0.1);
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
  fill: #ff4757;
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
  color: #ff4757;
  font-weight: 600;
}
</style>
