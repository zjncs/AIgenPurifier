import React from 'react';

const UsageHelp: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-l-4 border-blue-500">
      <h4 className="text-lg font-semibold text-blue-700 mb-4">💡 使用说明</h4>
      <div className="space-y-3 text-sm">
        <p>
          <strong className="text-blue-600">🤖 AI内容清理:</strong> 
          <span className="text-gray-700"> 自动处理AI生成的混乱格式，如 fx*x*、缺失括号、HTML标签等</span>
        </p>
        <p>
          <strong className="text-blue-600">📝 格式转换:</strong> 
          <span className="text-gray-700"> 支持 ( 变量 ) → $变量$，[ 公式 ] → $$公式$$，自动修复LaTeX语法错误</span>
        </p>
        <p>
          <strong className="text-blue-600">🖼️ 图片处理:</strong> 
          <span className="text-gray-700"> 支持拖拽或点击上传，导出时自动嵌入文档</span>
        </p>
        <p>
          <strong className="text-blue-600">📋 复制功能:</strong> 
          <span className="text-gray-700"> 一键复制处理后的Markdown到剪贴板，方便粘贴到其他地方</span>
        </p>
        <p>
          <strong className="text-blue-600">📤 智能导出:</strong> 
          <span className="text-gray-700"> Markdown保持LaTeX格式，Word转为Unicode符号，即使渲染失败也会保留原始公式</span>
        </p>
        <p>
          <strong className="text-blue-600">🔧 错误处理:</strong> 
          <span className="text-gray-700"> 遇到无法解析的公式时，会以代码块形式显示，不会影响其他内容</span>
        </p>
      </div>
    </div>
  );
};

export default UsageHelp;