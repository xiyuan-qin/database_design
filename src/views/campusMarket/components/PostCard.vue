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

      <!-- 添加热门评论预览 -->
      <div class="comments-preview" v-if="hotComments.length > 0">
        <h4>热门评论</h4>
        <div class="hot-comments">
          <div v-for="comment in hotComments" :key="comment.id" class="preview-comment">
            <span class="preview-username">{{ comment.username }}</span>
            <span class="preview-content">{{ comment.content }}</span>
          </div>
        </div>
        <el-button type="text" class="view-all-btn" @click="showCommentDialog">
          查看全部评论 <i class="el-icon-arrow-right"></i>
        </el-button>
      </div>
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
        <el-button type="text" @click="showCommentDialog" class="comment-button">
          <i class="el-icon-chat-dot-round"></i>
          <span class="comment-count">{{ post.comments.length || 2 }}</span>
        </el-button>
      </el-button-group>
    </div>

    <!-- 右侧评论面板 -->
    <transition name="slide">
      <div v-if="showPanel" class="full-comments-panel">
        <div class="panel-header">
          <h3>评论区</h3>
          <el-button type="text" @click="showPanel = false">
            <i class="el-icon-close"></i>
          </el-button>
        </div>
        <div class="panel-content">
          <div class="comment-list">
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
      </div>
    </transition>

    <!-- 评论弹窗 -->
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
          <div v-if="hotComments.length === 0 && post.comments.length === 0" class="no-comments">
            暂无评论，来发表第一条评论吧！
          </div>
          <!-- 热门评论部分 -->
          <template v-if="hotComments.length > 0">
            <div class="comment-section-title">热门评论</div>
            <div v-for="comment in hotComments" :key="comment.id" class="comment-item hot-comment">
              <el-avatar :src="comment.userAvatar || 'default-avatar.png'" :size="32"></el-avatar>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="comment-username">{{ comment.username }}</span>
                  <span class="comment-time">{{ comment.createTime || '较早' }}</span>
                </div>
                <p class="comment-text">{{ comment.content }}</p>
                <div class="comment-likes">
                  <i class="el-icon-star-on"></i>
                  <span>{{ comment.likes }}</span>
                </div>
              </div>
            </div>
          </template>
          
          <!-- 最新评论部分 -->
          <template v-if="post.comments.length > 0">
            <div class="comment-section-title">最新评论</div>
            <div v-for="comment in post.comments" :key="comment.id" class="comment-item">
              <el-avatar :src="comment.userAvatar" :size="32"></el-avatar>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="comment-username">{{ comment.username }}</span>
                  <span class="comment-time">{{ comment.createTime || '刚刚' }}</span>
                </div>
                <p class="comment-text">{{ comment.content }}</p>
                <div class="comment-likes">
                  <el-button 
                    type="text" 
                    class="like-btn"
                    :class="{ 'is-liked': comment.isLiked }"
                    @click="handleCommentLike(comment)">
                    <i class="el-icon-star-on"></i>
                    <span>{{ comment.likes || 0 }}</span>
                  </el-button>
                </div>
              </div>
            </div>
          </template>
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
            dialogVisible: false,
            showPanel: false,
            hotComments: [
              {
                id: 'hot1',
                username: '热门用户1',
                content: '这个价格很实惠！',
                likes: 88
              },
              {
                id: 'hot2',
                username: '热门用户2',
                content: '已经下单了，很期待！',
                likes: 66
              }
            ]
        };
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
        showCommentDialog() {
            // 可以选择打开面板或弹窗
            //this.showPanel = true;
            this.dialogVisible = true;
        },
        handleLike() {
            this.$emit('like', this.post.id);
            const likeIcon = event.currentTarget.querySelector('.like-icon');
            likeIcon.classList.add('pop');
            setTimeout(() => {
                likeIcon.classList.remove('pop');
            }, 300);
        },
        handleClose(done) {
            this.commentText = '';
            done();
        },
        handleCommentLike(comment) {
            // 如果没有likes字段,初始化为0
            if (typeof comment.likes === 'undefined') {
                this.$set(comment, 'likes', 0);
            }
            if (typeof comment.isLiked === 'undefined') {
                this.$set(comment, 'isLiked', false);
            }
            
            comment.isLiked = !comment.isLiked;
            comment.likes += comment.isLiked ? 1 : -1;
            
            // 添加点赞动画
            const likeBtn = event.currentTarget;
            likeBtn.classList.add('pop');
            setTimeout(() => {
                likeBtn.classList.remove('pop');
            }, 300);
        },
        handleComment({ postId, content }) {
            const post = this.posts?.find(p => p.id === postId);
            if (post) {
                post.comments.push({
                    id: Date.now(),
                    username: '当前用户',
                    userAvatar: 'https://placeholder.com/avatar.jpg',
                    content: content,
                    likes: 0,  // 添加初始点赞数
                    isLiked: false  // 添加点赞状态
                });
            }
        }
    }
};
</script>

<style scoped>
.post-card {
  margin-bottom: 20px;
  border-radius: 12px;
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

/* 添加新样式 */
.comments-preview {
  margin-top: 16px;
  padding: 15px;
  background: linear-gradient(135deg, #f8faff 0%, #f0f7ff 100%);
  border: none;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.08);
}

.preview-comment {
  padding: 8px 0;
  font-size: 14px;
}

.preview-username {
  color: #7C0A27;
  font-weight: 500;
  margin-right: 8px;
}

.preview-content {
  color: #606266;
}

.full-comments-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 8px rgba(0,0,0,0.15);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebeef5;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

/* 移除之前的display:none */
.comments-preview,
.hot-comments,
.full-comments-panel {
  display: block;
}

.view-all-btn {
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 8px;
  color: #409EFF;
  transition: all 0.3s ease;
}

.view-all-btn:hover {
  background-color: #ecf5ff;
}

.comment-section-title {
  font-weight: 600;
  color: #303133;
  margin: 16px 0 8px;
  padding-left: 8px;
  border-left: 3px solid #7C0A27;
}

.hot-comment {
  background: linear-gradient(135deg, #FFF5E6 0%, #FFEDD6 100%);
  border-left: 3px solid #B8860B;
}

.comment-likes {
  margin-top: 4px;
  color: #e6a23c;
  font-size: 12px;
}

.comment-likes i {
  margin-right: 4px;
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

.like-btn {
  padding: 4px 8px;
  font-size: 12px;
  color: #909399;
  transition: all 0.3s ease;
}

.like-btn:hover {
  color: #e6a23c;
}

.like-btn.is-liked {
  color: #e6a23c;
}

.like-btn.pop {
  animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.like-btn i {
  margin-right: 4px;
}
</style>