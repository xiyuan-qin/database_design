# Database

这是山东大学计算机学院24秋数据库课程的课程设计前端代码

## 目前实现

1. 市场界面
2. 管理员界面
3. 登录界面
4. 个人主页
5. 商品详细界面
6. 评论展示
7. 管理员界面重构，增加对应的点击界面，内容尚未增加
8. 实现发帖按钮，重构了市场界面
9. 新增发帖子界面
10. 帖子管理界面
11. 聊天界面和下拉菜单

后续内容继续更新

## 如何使用本项目？

本项目基于前端 **Vue2脚手架** 开发，引入了 **ElementUI** 组件。为了使用本项目，您需要安装以下依赖并进行配置，安装步骤根据操作系统有所不同。

### 安装前准备

#### 步骤 1: 安装 Node.js

1. **下载 Node.js**: 
    - 直接在浏览器中搜索 **Node.js**，选择 **LTS（长期支持版）** 下载并安装。
    - 安装过程中，请确保勾选 **"Add to PATH"** 选项，这样 Node.js 会自动添加到系统环境变量中。

2. **验证安装**:
    安装完成后，打开终端（macOS）或命令提示符（Windows），运行以下命令来验证安装是否成功：

    ```bash
    node -v
    npm -v
    ```

    如果看到类似如下的版本信息，说明 Node.js 安装成功：

    ```bash
    v16.x.x
    7.x.x
    ```

### 步骤 2: 安装 Vue CLI

Vue CLI 是用于创建和管理 Vue 项目的命令行工具。根据操作系统不同，安装方法如下：

#### macOS 和 Linux

在终端中运行以下命令安装 Vue CLI：

```bash
npm install -g @vue/cli
```

#### Windows

1. 打开 **命令提示符** 或 **PowerShell**。
2. 运行以下命令安装 Vue CLI：

```bash
npm install -g @vue/cli
```

**注意**: 如果遇到权限问题，请尝试以管理员身份运行命令提示符或 PowerShell。

### 步骤 3: 安装 ElementUI

ElementUI 是一个基于 Vue.js 的 UI 组件库，用于快速构建现代化的网页界面。

#### 安装 ElementUI

在项目根目录下打开终端（macOS/Linux）或命令提示符（Windows），运行以下命令安装 ElementUI：

```bash
npm install element-ui --save
```

### 步骤 4: 克隆项目并安装依赖

1. **克隆项目**:
   如果您尚未克隆项目，可以使用 `git` 命令将项目克隆到本地：

   ```bash
   git clone <your-repository-url>
   cd <project-directory>
   ```

2. **安装项目依赖**:
   在项目根目录下运行以下命令安装项目所需的依赖：

   ```bash
   npm install
   ```

   如果您遇到依赖冲突或其他问题，请根据错误信息调整或使用 `--legacy-peer-deps` 参数来强制安装：

   ```bash
   npm install --legacy-peer-deps
   ```

### 步骤 5: 运行项目

在项目根目录下运行以下命令启动开发服务器：

```bash
npm run serve
```

此命令会启动本地开发服务器，您可以在浏览器中访问 `http://localhost:8080` 查看项目。如果一切正常，您应该能看到项目的主页。

---

## 常见问题

### 1. 安装 ElementUI 时遇到版本冲突

如果在安装 ElementUI 时遇到版本冲突（例如 Vue 的版本不兼容），您可以考虑升级或降级相应的版本。常见的做法是使用 `--force` 或 `--legacy-peer-deps` 参数强制安装依赖：

```bash
npm install --legacy-peer-deps
```

### 2. `vue-cli-service` 未找到

如果运行 `npm run serve` 时遇到 `vue-cli-service: command not found` 错误，可能是因为 Vue CLI 没有正确安装。可以尝试重新安装 Vue CLI：

```bash
npm install -g @vue/cli
```

### 3. 权限问题

在 macOS 和 Linux 上，如果您遇到权限问题，可以尝试使用 `sudo` 来提升权限：

```bash
sudo npm install -g @vue/cli
```

在 Windows 上，确保以管理员身份运行命令提示符或 PowerShell。

---

## 更新日志

- **2024年12月**: 增加发帖功能和帖子管理界面
- **2024年11月**: 完成商品详情和评论展示页面
- **2024年10月**: 初步实现市场界面和管理员界面

---