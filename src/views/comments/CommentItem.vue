<template>
  <div class="comment-item-container">
    <div class="user-info">
      <el-avatar :size="40" :src="comment.userAvatar">
        {{ comment.userName?.charAt(0) }}
      </el-avatar>
      <div class="user-detail">
        <div class="user-name">{{ comment.userName }}</div>
        <div class="comment-time">{{ formatTime(comment.createTime) }}</div>
      </div>
    </div>
    
    <div class="comment-content">{{ comment.content }}</div>
    
    <div class="comment-actions">
      <el-button 
        type="text" 
        class="like-button"
        :class="{ 'is-liked': comment.isLiked }"
        @click="handleLike"
      >
        <i class="el-icon-thumb"></i>
        {{ comment.likes || 0 }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatTime(time) {
      if (!time) return ''
      const date = new Date(time)
      return date.toLocaleString()
    },
    handleLike() {
      this.$emit('like', this.comment)
    }
  }
}
</script>

<style scoped>
.comment-item-container {
  padding: 12px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.user-detail {
  margin-left: 12px;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.comment-time {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

.comment-content {
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
  margin: 8px 0;
  word-break: break-all;
}

.comment-actions {
  display: flex;
  justify-content: flex-end;
}

.like-button {
  padding: 0;
  height: 24px;
  color: #909399;
}

.like-button.is-liked {
  color: #7C0A27;
}

.like-button:hover {
  color: #7C0A27;
}
</style>
