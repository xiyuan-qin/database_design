<template>
  <el-dialog
    title="发布新商品"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
    :modal-append-to-body="false"
    :append-to-body="true"
    custom-class="create-post-dialog">
    
    <el-form :model="postForm" :rules="rules" ref="postForm" label-width="100px">
      <el-form-item label="发布区域" prop="region">
        <el-select v-model="postForm.region" placeholder="请选择发布区域">
          <el-option label="南区" value="south"></el-option>
          <el-option label="北区" value="north"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品名称" prop="productName">
        <el-input v-model="postForm.productName" placeholder="请输入商品名称"></el-input>
      </el-form-item>

      <el-form-item label="商品价格" prop="price">
        <el-input-number 
          v-model="postForm.price" 
          :precision="2" 
          :step="0.1" 
          :min="0"
          controls-position="right"
          placeholder="请输入价格">
        </el-input-number>
      </el-form-item>

      <el-form-item label="商品描述" prop="description">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入商品描述"
          v-model="postForm.description">
        </el-input>
      </el-form-item>

      <el-form-item label="商品图片" prop="image">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleImageChange">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm('postForm')">发 布</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'CreatePostForm',
  data() {
    return {
      dialogVisible: false,
      imageUrl: '',
      postForm: {
        region: '',
        productName: '',
        price: 0,
        description: '',
        image: null
      },
      rules: {
        region: [
          { required: true, message: '请选择发布区域', trigger: 'change' }
        ],
        productName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入商品描述', trigger: 'blur' },
          { min: 10, max: 500, message: '长度在 10 到 500 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.$confirm('确认关闭？未保存的数据将会丢失')
        .then(() => {
          this.dialogVisible = false;
          this.$refs.postForm.resetFields();
          this.imageUrl = '';
        })
        .catch(() => {});
    },
    handleImageChange(file) {
      const isImage = file.raw.type.startsWith('image/');
      if (!isImage) {
        this.$message.error('只能上传图片文件!');
        return;
      }
      this.imageUrl = URL.createObjectURL(file.raw);
      this.postForm.image = file.raw;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = {
            ...this.postForm,
            id: Date.now(),
            username: '当前用户',
            userAvatar: 'https://placeholder.com/avatar.jpg',
            createTime: new Date().toLocaleString(),
            likes: 0,
            isLiked: false,
            comments: []
          };
          this.$emit('submit', formData);
          this.dialogVisible = false;
          this.$refs[formName].resetFields();
          this.imageUrl = '';
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.create-post-dialog {
  border-radius: 12px;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-uploader:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover;
}

:deep(.el-dialog__body) {
  padding: 20px 40px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #606266;
}

:deep(.el-input__inner:focus) {
  border-color: #7C0A27;
}

.el-textarea__inner:focus {
  border-color: #7C0A27;
}

.el-select .el-input.is-focus .el-input__inner {
  border-color: #7C0A27;
}

.dialog-footer {
  text-align: right;
}

:deep(.el-button--primary) {
  background: linear-gradient(45deg, #7C0A27, #B8860B);
  border: none;
}

:deep(.el-button--primary:hover) {
  background: linear-gradient(45deg, #960C30, #DAA520);
}

/* 添加以下样式 */
:deep(.el-dialog__wrapper) {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

:deep(.el-dialog) {
  position: relative;
  margin: 15vh auto 50px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  width: 50%;
}

/* 增加过渡动画 */
:deep(.el-dialog) {
  transition: all 0.3s ease-in-out;
  transform-origin: center;
}

:deep(.el-dialog__wrapper) {
  transition: background-color 0.3s ease-in-out;
}

.el-dialog__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 修改遮罩层样式 */
:deep(.v-modal) {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  opacity: 1;
}
</style>
