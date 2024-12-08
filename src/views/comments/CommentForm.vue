<template>
  <el-dialog 
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    title="发表评论" 
    width="50%"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false">
    <el-form :model="form" ref="commentForm" :rules="rules">
      <el-form-item prop="content">
        <el-input
          type="textarea"
          v-model="form.content"
          :rows="4"
          placeholder="请输入您的评论内容..."
        ></el-input>
      </el-form-item>
      <el-form-item class="form-buttons">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="submitting">
          发表评论
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'CommentForm',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    itemId: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    isVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit('update:visible', value);
      }
    }
  },
  data() {
    return {
      form: {
        content: ''
      },
      rules: {
        content: [
          { required: true, message: '请输入评论内容', trigger: 'blur' },
          { min: 1, max: 500, message: '评论长度在1到500个字符之间', trigger: 'blur' }
        ]
      },
      submitting: false
    }
  },
  methods: {
    handleCancel() {
      this.$refs.commentForm.resetFields();
      this.$emit('update:visible', false);
    },
    handleSubmit() {
      this.$refs.commentForm.validate(valid => {
        if (!valid) return;
        
        this.submitting = true;
        // TODO: 这里添加提交评论的API调用
        setTimeout(() => {
          this.submitting = false;
          this.$message.success('评论发表成功！');
          this.handleCancel();
          this.$emit('comment-submitted');
        }, 1000);
      });
    }
  }
}
</script>

<style scoped>
.el-dialog__body {
  padding: 20px 30px;
}

:deep(.el-dialog) {
  border-radius: 8px;
  margin-top: 15vh !important;
}

:deep(.el-dialog__header) {
  padding: 20px;
  border-bottom: 1px solid #ebeef5;
}

:deep(.el-dialog__footer) {
  padding: 15px 20px;
  border-top: 1px solid #ebeef5;
}

.comment-form-container {
  margin: 20px 0;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ebeef5;
}

.form-buttons {
  margin-bottom: 0;
  text-align: right;
}
</style>