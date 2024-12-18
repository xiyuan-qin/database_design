<template>
  <el-dialog
    title="评论"
    :visible.sync="dialogVisible"
    :width="dialogWidth"
    :top="dialogTop"
    :append-to-body="true"
    :destroy-on-close="false"
    :close-on-click-modal="false"
    class="comment-dialog"
    @close="handleClose"
  >
    <div class="comment-dialog-content">
      <div class="comments-wrapper">
        <!-- 热门评论区 -->
        <div v-if="hotComments.length" class="hot-comments">
          <div class="section-title">热门评论</div>
          <div class="comment-list">
            <div v-for="comment in hotComments" 
                :key="'hot-'+comment.id" 
                class="comment-item hot-comment">
              <comment-item 
                :comment="comment"
                @like="handleCommentLike"
              />
            </div>
          </div>
        </div>

        <!-- 普通评论区 -->
        <div class="normal-comments">
          <div class="section-title">全部评论</div>
          <div class="comment-list-container">
            <div v-if="comments.length" class="comment-items">
              <div v-for="comment in comments" 
                  :key="comment.id" 
                  class="comment-item">
                <comment-item 
                  :comment="comment"
                  @like="handleCommentLike"
                />
              </div>
            </div>
            <div v-else class="no-comments">暂无评论</div>
            <div v-if="loading" class="loading">加载中...</div>
            <div v-if="noMore" class="no-more">没有更多评论了</div>
          </div>
        </div>
      </div>

      <!-- 评论输入区 -->
      <div class="comment-input-area">
        <el-input
          v-model="commentContent"
          type="textarea"
          :rows="3"
          placeholder="写下你的评论..."
          :maxlength="500"
          show-word-limit
        />
        <div class="comment-actions">
          <span class="hint">善良发言，收获点赞</span>
          <el-button 
            type="primary" 
            :disabled="!commentContent.trim()"
            @click="submitComment"
          >
            发表评论
          </el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import CommentItem from './CommentItem.vue'  // 添加导入语句

export default {
  name: 'CommentRegion',
  components: {
    CommentItem  // 注册组件
  },
  props: {
    visible: Boolean,
    postId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      comments: [],
      hotComments: [],
      commentContent: '',
      page: 1,
      pageSize: 20,
      loading: false,
      noMore: false,
      dialogWidth: '50%',
      dialogTop: '5vh',
      /*
      // 测试数据，替换为后端接口时删除     
      // mockComments: [
      //   {
      //     id: 1,
      //     userAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      //     userName: '测试用户1',
      //     content: '这是一条测试评论，看起来不错！',
      //     createTime: new Date().toISOString(),
      //     likes: 15,
      //     isLiked: false
      //   },
      //   {
      //     id: 2,
      //     userAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      //     userName: '测试用户2',
      //     content: '这是另一条测试评论，内容很棒！',
      //     createTime: new Date(Date.now() - 86400000).toISOString(), // 一天前
      //     likes: 8,
      //     isLiked: true
      //   },
      //   {
      //     id: 3,
      //     userAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      //     userName: '测试用户3',
      //     content: '这是第三条测试评论，写得真好！',
      //     createTime: new Date(Date.now() - 172800000).toISOString(), // 两天前
      //     likes: 23,
      //     isLiked: false
      //   }
      // ]*/
    }
  },
  created() {
    // 根据屏幕宽度调整弹窗大小
    this.adjustDialogSize()
    // 监听窗口大小变化
    window.addEventListener('resize', this.adjustDialogSize)
  },
  beforeDestroy() {
    // 移除事件监听
    window.removeEventListener('resize', this.adjustDialogSize)
  },
  watch: {
    visible(val) {
      this.dialogVisible = val
      if (val) {
        this.initComments()
      }
    }
  },
  methods: {
    async initComments() {
      await Promise.all([
        this.loadHotComments(),
        this.loadComments()
      ])
    },
    async loadHotComments() {
      try {
        // TODO: 后端接口 - 获取热门评论
        // 接口参数说明：
        // postId: 文章ID
        // 返回数据格式：
        // {
        //   code: 200,
        //   data: [{
        //     id: number,
        //     userAvatar: string,
        //     userName: string,
        //     content: string,
        //     createTime: string,
        //     likes: number,
        //     isLiked: boolean
        //   }]
        // }
        const payload = { postId: this.postId }
        const result = await this.$http.get('/api/comments/hot', { params: payload })
        this.hotComments = result.data
      } catch (error) {
        this.$message.error('加载热门评论失败')
      }
    },
    async loadComments() {
      if (this.loading || this.noMore) return
      
      this.loading = true
      try {
        // TODO: 后端接口 - 获取普通评论列表
        // 接口参数说明：
        // postId: 文章ID
        // page: 页码
        // pageSize: 每页条数
        // 返回数据格式：
        // {
        //   code: 200,
        //   data: {
        //     list: [{
        //       id: number,
        //       userAvatar: string,
        //       userName: string,
        //       content: string,
        //       createTime: string,
        //       likes: number,
        //       isLiked: boolean
        //     }],
        //     total: number
        //   }
        // }
        const payload = {
          postId: this.postId,
          page: this.page,
          pageSize: this.pageSize
        }
        const result = await this.$http.get('/api/comments', { params: payload })
        this.comments.push(...result.data.list)
        this.noMore = result.data.list.length < this.pageSize
        this.page++
      } catch (error) {
        this.$message.error('加载评论失败')
      } finally {
        this.loading = false
      }
    },
    async submitComment() {
      const content = this.commentContent.trim()
      if (!content) return

      try {
        // TODO: 后端接口 - 提交评论
        // 接口参数说明：
        // postId: 文章ID
        // content: 评论内容
        // 返回数据格式：
        // {
        //   code: 200,
        //   data: {
        //     id: number,
        //     userAvatar: string,
        //     userName: string,
        //     content: string,
        //     createTime: string,
        //     likes: 0,
        //     isLiked: false
        //   }
        // }
        const payload = {
          postId: this.postId,
          content: content
        }
        const result = await this.$http.post('/api/comments', payload)
        this.comments.unshift(result.data)
        this.commentContent = ''
        this.$emit('comment-added')
        this.$message.success('评论成功')
      } catch (error) {
        this.$message.error('评论失败，请重试')
      }
    },
    async handleCommentLike(comment) {
      try {
        // TODO: 后端接口 - 评论点赞/取消点赞
        // 接口参数说明：
        // commentId: 评论ID
        // action: 'like' | 'unlike'
        // 返回数据格式：
        // {
        //   code: 200,
        //   data: { success: true }
        // }
        const payload = {
          commentId: comment.id,
          action: comment.isLiked ? 'unlike' : 'like'
        }
        await this.$http.post('/api/comments/like', payload)
        comment.isLiked = !comment.isLiked
        comment.likes += comment.isLiked ? 1 : -1
      } catch (error) {
        this.$message.error('操作失败，请重试')
      }
    },
    handleScroll({ scrollTop, scrollHeight, clientHeight }) {
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        this.loadComments()
      }
    },
    handleClose() {
      this.$emit('update:visible', false)
    },
    adjustDialogSize() {
      const screenWidth = window.innerWidth
      if (screenWidth < 768) {
        this.dialogWidth = '95%'
        this.dialogTop = '2vh'
      } else if (screenWidth < 1200) {
        this.dialogWidth = '70%'
        this.dialogTop = '5vh'
      } else {
        this.dialogWidth = '50%'
        this.dialogTop = '5vh'
      }
    }
  }
}
</script>

<style scoped>
.comment-dialog {
  border-radius: 12px;
  overflow: hidden;
}

/* 修改弹窗动画效果 */
:deep(.el-dialog) {
  margin: 0 auto !important;
  position: relative;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  background: #fff;
  transition: all 0.3s ease-out !important;
}

:deep(.el-dialog__header) {
  padding: 16px 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%);
  border-bottom: 1px solid #ebeef5;
  margin: 0;
}

:deep(.el-dialog__body) {
  padding: 0;
  background: #fff;
}

:deep(.el-dialog__headerbtn) {
  top: 16px;
}

/* 优化滚动区域 */
.comment-dialog-content {
  height: 70vh;
  max-height: 800px;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.comments-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 16px 16px 0;
}

/* 移除之前的 comment-list 相关样式 */
.hot-comments,
.normal-comments {
  background: #fff;
  margin-bottom: 16px;
}

.comment-list-container {
  max-height: none;
  overflow: visible;
}

.comment-items {
  margin-bottom: 16px;
}

.comment-item {
  padding: 12px;
  margin-bottom: 12px;
  background: #f9f9f9;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.comment-item:hover {
  transform: translateX(5px);
  background: #f0f7ff;
}

.hot-comment {
  background: linear-gradient(135deg, #FFF5E6 0%, #FFEDD6 100%);
  border-left: 3px solid #B8860B;
}

.no-comments,
.loading,
.no-more {
  text-align: center;
  color: #909399;
  padding: 20px 0;
  font-size: 14px;
}

.comment-input-area {
  padding: 16px;
  background: white;
  border-top: 1px solid #ebeef5;
  margin-top: auto;
  position: sticky;
  bottom: 0;
  z-index: 1;
}

.comment-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.hint {
  font-size: 12px;
  color: #909399;
}

.el-scrollbar {
  height: 100%;
}

:deep(.el-dialog__body) {
  padding: 0;
}

:deep(.el-dialog__header) {
  padding: 16px 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%);
  border-bottom: 1px solid #ebeef5;
}

:deep(.el-textarea__inner) {
  background-color: #f5f7fa;
  border: none;
  border-radius: 8px;
  padding: 12px;
  transition: all 0.3s;
}

:deep(.el-textarea__inner:focus) {
  background-color: white;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

:deep(.el-scrollbar__wrap) {
  overflow-x: hidden;
}

/* 评论加载动画 */
@keyframes loading-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.loading::after {
  content: '...';
  animation: loading-bounce 1s infinite;
  display: inline-block;
}

/* 滚动条美化 */
.comments-wrapper::-webkit-scrollbar {
  width: 6px;
}

.comments-wrapper::-webkit-scrollbar-thumb {
  background: rgba(124, 10, 39, 0.3);
  border-radius: 20px;
}

.comments-wrapper::-webkit-scrollbar-thumb:hover {
  background: rgba(124, 10, 39, 0.5);
}

.comments-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

/* 优化弹窗动画 */
@keyframes dialogFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.el-dialog) {
  animation: dialogFadeIn 0.3s ease-out;
}

/* 修复黑屏问题 */
:deep(.el-dialog__wrapper) {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}
</style>
