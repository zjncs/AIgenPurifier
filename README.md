# AI内容转换器

🤖 一个专为处理AI生成内容而设计的智能格式转换工具

## 🌟 功能特点

- **🧹 智能清理**: 自动清理AI生成内容中的混乱格式、HTML标签和错误字符
- **📐 格式转换**: 智能识别并转换数学公式格式（支持LaTeX）
- **🖼️ 图片处理**: 支持拖拽上传和图片管理
- **📊 实时预览**: 实时渲染LaTeX数学公式和Markdown内容
- **📤 多格式导出**: 支持复制、Markdown和Word文档导出
- **🔧 错误容错**: 遇到无法解析的公式时优雅降级，不影响其他内容

## 🚀 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **数学公式**: KaTeX
- **Markdown**: Marked
- **文件处理**: FileSaver.js
- **图标**: Lucide React

## 📦 安装

```bash
# 克隆项目
git clone https://github.com/yourusername/ai-content-converter.git

# 进入项目目录
cd ai-content-converter

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 🎯 使用场景

- 清理ChatGPT、Claude等AI生成的混乱文本格式
- 转换AI输出的数学公式为标准LaTeX格式
- 整理AI生成的文档内容并导出
- 处理包含图片的AI内容并统一管理

## 🛠️ 开发

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 代码检查
npm run lint
```

## 📋 主要功能

### 文本处理
- 清理HTML标签和转义字符
- 修复AI生成的格式错误（如fx*x*）
- 智能识别并转换数学表达式
- 自动修复缺失的括号和语法错误

### 格式转换
- `( 变量 )` → `$变量$`
- `[ 公式 ]` → `$$公式$$`
- 自动识别数学表达式并转换为LaTeX格式

### 导出功能
- **复制**: 一键复制处理后的Markdown到剪贴板
- **Markdown**: 保持LaTeX格式的.md文件
- **Word**: 转换LaTeX为Unicode符号的.doc文件

## 🤝 贡献

欢迎提交Pull Request！请确保：

1. 遵循现有的代码风格
2. 添加适当的类型定义
3. 保持组件的单一职责原则
4. 编写清晰的提交信息

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [KaTeX](https://katex.org/) - 数学公式渲染
- [Marked](https://marked.js.org/) - Markdown解析
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/) - 文件下载
- [Lucide](https://lucide.dev/) - 图标库