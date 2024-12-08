<template>
  <div class="comment-section">
    <div class="comment-header">
      <h3>商品评论</h3>
      <span class="comment-count">共 {{ comments.length }} 条评论</span>
    </div>
    
    <div class="comment-list" ref="commentList">
      <el-scrollbar height="400px">
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <el-avatar :size="40" :src="comment.userAvatar"></el-avatar>
          <div class="comment-content">
            <div class="comment-user">
              <span class="username">{{ comment.username }}</span>
              <span class="time">{{ comment.time }}</span>
            </div>
            <div class="comment-text">{{ comment.content }}</div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentList',
  props: {
    itemId: {
      type: [String, Number],  // 允许字符串或数字类型
      required: true
    }
  },
  data() {
    return {
      comments: [
        // 测试数据，之后会通过API获取
        {
          id: 1,
          username: '用户A',
          userAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          content: '商品质量不错',
          time: '2023-12-20 14:23'
        },
        {
          id: 2,
          username: '用户B',
          userAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          content: '我不要写数据库课设',
          time: '2023-12-20 15:30'
        }
      ]
    }
  },
  mounted() {
    console.log('评论组件已加载，商品ID:', this.itemId); // 添加调试信息
  }
}
</script>

<style scoped>
.comment-section {
  margin-top: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.comment-count {
  color: #909399;
  font-size: 14px;
}

.comment-item {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.comment-content {
  margin-left: 15px;
  flex: 1;
}

.comment-user {
  margin-bottom: 8px;
}

.username {
  font-weight: bold;
  margin-right: 10px;
}

.time {
  color: #909399;
  font-size: 12px;
}

.comment-text {
  color: #606266;
  line-height: 1.6;
}
</style>