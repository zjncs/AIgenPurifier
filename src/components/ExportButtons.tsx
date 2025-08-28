import React, { useState } from 'react';
import { Copy, FileText, Download } from 'lucide-react';
import { ImageData } from '../types';
import { exportMarkdown, exportWord, copyToClipboard } from '../utils/exportUtils';

interface ExportButtonsProps {
  textContent: string;
  images: ImageData[];
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ textContent, images }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'success'>('idle');

  const handleCopy = async () => {
    if (!textContent.trim() && images.length === 0) {
      alert('请先输入文本内容或上传图片！');
      return;
    }

    try {
      setCopyStatus('copying');
      await copyToClipboard(textContent, images);
      setCopyStatus('success');
      
      setTimeout(() => {
        setCopyStatus('idle');
      }, 2000);
    } catch (error) {
      setCopyStatus('idle');
      alert('复制失败，请重试。');
    }
  };

  const handleExportMarkdown = () => {
    if (!textContent.trim() && images.length === 0) {
      alert('请先输入文本内容或上传图片！');
      return;
    }
    
    exportMarkdown(textContent, images);
  };

  const handleExportWord = () => {
    if (!textContent.trim() && images.length === 0) {
      alert('请先输入文本内容或上传图片！');
      return;
    }
    
    exportWord(textContent, images);
  };

  const getCopyButtonClass = () => {
    const baseClass = "export-btn transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none";
    
    switch (copyStatus) {
      case 'copying':
        return `${baseClass} bg-gradient-to-r from-blue-400 to-blue-500 text-white`;
      case 'success':
        return `${baseClass} bg-gradient-to-r from-green-400 to-green-500 text-white`;
      default:
        return `${baseClass} bg-gradient-to-r from-teal-400 to-cyan-500 text-white`;
    }
  };

  return (
    <div className="flex justify-center gap-4 flex-wrap">
      <button
        onClick={handleCopy}
        disabled={copyStatus === 'copying'}
        className={getCopyButtonClass()}
      >
        <Copy size={18} />
        {copyStatus === 'copying' ? '复制中...' : copyStatus === 'success' ? '已复制!' : '复制Markdown'}
      </button>
      
      <button
        onClick={handleExportMarkdown}
        className="export-btn bg-gradient-to-r from-red-400 to-pink-500 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-200"
      >
        <FileText size={18} />
        导出Markdown
      </button>
      
      <button
        onClick={handleExportWord}
        className="export-btn bg-gradient-to-r from-indigo-500 to-purple-600 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-200"
      >
        <Download size={18} />
        导出Word文档
      </button>
      
      <style jsx>{`
        .export-btn {
          padding: 15px 25px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          min-width: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          position: relative;
        }
        
        @media (max-width: 768px) {
          .export-btn {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </div>
  );
};

export default ExportButtons;