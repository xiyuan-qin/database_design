<template>
  <div class="chat-container">
    <div class="chat-main-header">
      <el-button class="back-button" icon="el-icon-back" circle @click="goBack"></el-button>
      <span class="page-title">私信列表</span>
    </div>
    <div class="chat-content">
      <div class="user-list">
        <div v-infinite-scroll="loadMoreUsers" infinite-scroll-distance="10">
          <div v-for="user in users" :key="user.id" 
               @click="selectUser(user)"
               :class="['user-item', currentUser?.id === user.id ? 'active' : '']">
            <el-avatar :src="user.avatar" />
            <div class="user-info">
              <span class="username">{{ user.username }}</span>
              <span v-if="user.unreadCount" class="unread-badge">
                {{ user.unreadCount > 99 ? '99+' : user.unreadCount }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chat-window" v-if="currentUser">
        <div class="chat-header">
          <el-button class="back-button" icon="el-icon-back" circle @click="goBack"></el-button>
          <span class="chat-title">{{ currentUser.username }}</span>
        </div>
        <div class="chat-messages" ref="messageContainer" v-infinite-scroll="loadMoreMessages" 
             infinite-scroll-direction="top" infinite-scroll-distance="10">
          <div v-for="msg in messages" :key="msg.id" 
               :class="['message', msg.senderId === 'self' ? 'sent' : 'received']">
            {{ msg.content }}
            <span class="message-time">{{ formatTimeStr(msg.time) }}</span>
          </div>
        </div>
        <div class="chat-input">
          <el-input v-model="messageText" placeholder="输入消息..." @keyup.enter="sendMessage">
            <template #append>
              <el-button @click="sendMessage">发送</el-button>
            </template>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import router from '@/router'  // 修改这里，直接导入 router 实例

// TODO: 后端API - 获取用户列表
// GET /api/chat/users?page=${page}
// Response: { id, username, avatar, unreadCount }[]
const mockUsers = [
  { id: 1, username: '张三', avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', unreadCount: 3 },
  { id: 2, username: '李四', avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', unreadCount: 0 },
  { id: 3, username: '王五', avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', unreadCount: 99 },
]

// TODO: 后端API - 获取聊天消息
// GET /api/chat/messages/${userId}?page=${page}
// Response: { id, content, senderId, time }[]
const mockMessages = [
  { id: 1, content: '你好，请问这个商品还在吗？', senderId: 'other', time: new Date(Date.now() - 3600000) },
  { id: 2, content: '在的，还有库存', senderId: 'self', time: new Date(Date.now() - 1800000) },
  { id: 3, content: '好的，我想购买一个', senderId: 'other', time: new Date(Date.now() - 900000) },
  { id: 4, content: '可以的，什么时候方便交易？', senderId: 'self', time: new Date() },
]

const users = ref(mockUsers)
const currentUser = ref(null)
const messages = ref([])
const messageText = ref('')
const messageContainer = ref(null)

const emit = defineEmits(['update-unread'])

const goBack = () => {
  router.go(-1)
}

// TODO: 后端API - 加载更多用户
const loadMoreUsers = () => {
  // GET /api/chat/users?page=${page}
  console.log('加载更多用户')
}

// TODO: 后端API - 加载聊天记录
const loadMessages = () => {
  // GET /api/chat/messages/${currentUser.value.id}?page=1
  if (!currentUser.value) return
  messages.value = mockMessages
}

// TODO: 后端API - 加载更多消息
const loadMoreMessages = () => {
  // GET /api/chat/messages/${currentUser.value.id}?page=${page}
  console.log('加载更多消息')
}

// TODO: 后端API - 检查未读消息
const checkUnreadMessages = () => {
  // GET /api/chat/unread
  // Response: { count: number }
  emit('update-unread', 5) // 静态演示未读消息数
}

const selectUser = (user) => {
  currentUser.value = user
  messages.value = []
  loadMessages()
  
  // TODO: 后端API - 标记消息为已读
  if (user.unreadCount > 0) {
    // POST /api/chat/markAsRead/${user.id}
    user.unreadCount = 0
    checkUnreadMessages()
  }
}

const sendMessage = () => {
  if (!messageText.value.trim() || !currentUser.value) return
  
  // TODO: 后端API - 发送消息
  // POST /api/chat/send
  // Body: { receiverId: currentUser.value.id, content: messageText.value }
  const newMessage = {
    id: Date.now(),
    content: messageText.value,
    senderId: 'self',
    time: new Date()
  }
  
  messages.value.push(newMessage)
  messageText.value = ''
  
  // 滚动到底部
  setTimeout(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  }, 0)
}

const formatTimeStr = (time) => {
  const date = new Date(time)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

onMounted(() => {
  // 初始化时检查未读消息
  checkUnreadMessages()
})
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f7fa;
}

.chat-main-header {
  padding: 15px 20px;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  gap: 15px;
  background: linear-gradient(to right, #7C0A27, #B8860B);
  color: white;
}

.page-title {
  font-size: 24px;
  font-weight: 500;
  color: #FFD700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.back-button {
  padding: 10px;
  font-size: 18px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #FFD700;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-3px);
}

.chat-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  background: #ffffff;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.user-list {
  width: 280px;
  border-right: 1px solid #dcdfe6;
  overflow-y: auto;
  background: linear-gradient(180deg, #F5E6E6 0%, #FFF5E6 100%);
}

.user-item {
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(220, 223, 230, 0.4);
  margin: 5px 10px;
  border-radius: 8px;
}

.user-item:hover {
  background: rgba(124, 10, 39, 0.05);
  transform: translateX(5px);
}

.user-item.active {
  background: rgba(124, 10, 39, 0.1);
  border-left: 3px solid #7C0A27;
}

.user-info {
  margin-left: 15px;
  position: relative;
}

.username {
  font-size: 16px;
  color: #303133;
  font-weight: 500;
}

.unread-badge {
  position: absolute;
  right: -25px;
  top: -5px;
  background-color: #7C0A27;
  color: white;
  border-radius: 10px;
  padding: 2px 8px;
  font-size: 12px;
  box-shadow: 0 2px 4px rgba(124, 10, 39, 0.2);
}

.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

.chat-header {
  padding: 15px 20px;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  gap: 15px;
  background: linear-gradient(to right, rgba(124, 10, 39, 0.05), rgba(184, 134, 11, 0.05));
}

.chat-title {
  font-size: 18px;
  font-weight: 500;
  color: #7C0A27;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: rgba(245, 247, 250, 0.5);
  display: flex;
  flex-direction: column;
}

.message {
  margin: 12px 0 24px; /* 增加底部margin为时间戳留出空间 */
  padding: 12px 15px;
  border-radius: 12px;
  max-width: 60%;  /* 减小最大宽度 */
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  word-break: break-word;
}

.sent {
  background: linear-gradient(to right, #7C0A27, #B8860B);
  color: white;
  align-self: flex-end;
  margin-left: auto;
  margin-right: 10px;
  border-bottom-right-radius: 4px;  /* 右下角尖角效果 */
}

.sent::after {
  content: '';
  position: absolute;
  right: -8px;
  bottom: 0;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-left: 8px solid #B8860B;
  border-bottom: 8px solid #B8860B;
  border-bottom-left-radius: 8px;
}

.received {
  background: #f4f4f5;
  color: #303133;
  align-self: flex-start;
  margin-right: auto;
  margin-left: 10px;
  border-bottom-left-radius: 4px;  /* 左下角尖角效果 */
}

.received::after {
  content: '';
  position: absolute;
  left: -8px;
  bottom: 0;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-right: 8px solid #f4f4f5;
  border-bottom: 8px solid #f4f4f5;
  border-bottom-right-radius: 8px;
}

.message-time {
  font-size: 11px;
  padding-top: 4px;
  color: rgba(144, 147, 153, 0.8);
  position: absolute;
  bottom: -20px;
  white-space: nowrap;
}

.sent .message-time {
  right: 0;
  color: #909399;
}

.received .message-time {
  left: 0;
  color: #909399;
}

.chat-input {
  padding: 15px;
  border-top: 1px solid #dcdfe6;
  background: white;
}

:deep(.el-input__wrapper) {
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

:deep(.el-input__inner) {
  height: 40px;
}

:deep(.el-input-group__append) {
  background: linear-gradient(to right, #7C0A27, #B8860B);
  border: none;
  color: white;
  border-radius: 0 20px 20px 0;
  padding: 0 20px;
}

:deep(.el-button) {
  border: none;
  color: white;
  font-weight: 500;
}

/* 滚动条美化 */
.chat-messages::-webkit-scrollbar,
.user-list::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-thumb,
.user-list::-webkit-scrollbar-thumb {
  background: rgba(124, 10, 39, 0.2);
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-track,
.user-list::-webkit-scrollbar-track {
  background: transparent;
}
</style>
