import React from 'react';
import { smartFormatConversion } from '../utils/contentProcessor';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  const handleCleanContent = () => {
    if (!value.trim()) {
      alert('请先输入需要清理的内容！');
      return;
    }
    
    const cleanedContent = smartFormatConversion(value);
    onChange(cleanedContent);
    alert('内容清理完成！已自动转换格式。');
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
        📝 AI生成的文本内容
      </h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-80 border-2 border-gray-200 rounded-xl p-4 text-sm leading-relaxed resize-y font-mono transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-100"
        placeholder="粘贴AI生成的文本内容...&#10;✅ 自动清理混乱格式：fx*x*、缺失括号、HTML标签等&#10;✅ 智能格式转换：( 变量 ) → $变量$，[ 公式 ] → $$公式$$&#10;✅ 容错处理：即使有语法错误也不会影响其他内容&#10;&#10;示例：( f(x) ) 在点 [ x = a ] 处的展开..."
      />
      <button
        onClick={handleCleanContent}
        className="mt-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white border-none rounded-lg px-5 py-3 text-sm font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-200"
      >
        🧹 一键清理混乱格式
      </button>
    </div>
  );
};

export default TextInput;