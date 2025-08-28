import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { ImageData } from '../types';

interface ContentPreviewProps {
  textContent: string;
  images: ImageData[];
}

const ContentPreview: React.FC<ContentPreviewProps> = ({ textContent, images }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const renderMathInElement = (element: HTMLElement) => {
    try {
      let content = element.innerHTML;
      
      // 清理可能存在的错误标记
      content = content.replace(/<span[^>]*katex-error[^>]*>.*?<\/span>/g, '');
      element.innerHTML = content;
      
      // 渲染独立公式
      const displayRegex = /\$\$([\s\S]*?)\$\$/g;
      let displayMatch;
      const originalContent = content;
      
      while ((displayMatch = displayRegex.exec(originalContent)) !== null) {
        const tex = displayMatch[1].trim();
        try {
          const rendered = katex.renderToString(tex, {
            displayMode: true,
            throwOnError: false,
            errorColor: '#ff6b6b',
            strict: false
          });
          element.innerHTML = element.innerHTML.replace(displayMatch[0], rendered);
        } catch (e) {
          console.warn('KaTeX rendering error for display math:', tex);
          element.innerHTML = element.innerHTML.replace(displayMatch[0], 
            `<div class="error-formula">LaTeX: ${tex}</div>`);
        }
      }
      
      // 渲染行内公式
      const inlineRegex = /\$([^$\n]+?)\$/g;
      let inlineMatch;
      const currentContent = element.innerHTML;
      
      while ((inlineMatch = inlineRegex.exec(currentContent)) !== null) {
        const tex = inlineMatch[1].trim();
        try {
          const rendered = katex.renderToString(tex, {
            displayMode: false,
            throwOnError: false,
            errorColor: '#ff6b6b',
            strict: false
          });
          element.innerHTML = element.innerHTML.replace(inlineMatch[0], rendered);
        } catch (e) {
          console.warn('KaTeX rendering error for inline math:', tex);
          element.innerHTML = element.innerHTML.replace(inlineMatch[0], 
            `<span class="error-formula-inline">${tex}</span>`);
        }
      }
    } catch (e) {
      console.error('Math rendering error:', e);
    }
  };

  useEffect(() => {
    if (!previewRef.current) return;

    if (!textContent.trim() && images.length === 0) {
      previewRef.current.innerHTML = '<p style="color: #999; text-align: center;">在上方输入内容或上传图片后，这里会显示预览效果</p>';
      return;
    }

    let content = '';

    // 处理文本内容
    if (textContent.trim()) {
      const processedText = textContent.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
        return `$$${formula.trim()}$$`;
      }).replace(/\$([^$\n]+?)\$/g, (match, formula) => {
        return `$${formula.trim()}$`;
      });
      
      content += marked.parse(processedText);
    }

    // 处理图片内容
    if (images.length > 0) {
      content += '<div style="margin-top: 20px;"><h4>图片内容:</h4>';
      images.forEach((image) => {
        content += `<div style="margin: 10px 0; text-align: center;">
          <img src="${image.src}" style="max-width: 100%; max-height: 200px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          <p style="color: #666; font-size: 12px; margin-top: 5px;">${image.name}</p>
        </div>`;
      });
      content += '</div>';
    }

    previewRef.current.innerHTML = content;
    
    // 渲染数学公式
    renderMathInElement(previewRef.current);
  }, [textContent, images]);

  return (
    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
        👀 内容预览
      </h3>
      <div
        ref={previewRef}
        className="max-h-96 overflow-y-auto leading-relaxed"
      />
      
      <style jsx>{`
        .error-formula {
          color: #666;
          font-family: 'Monaco', 'Menlo', monospace;
          background: #f5f5f5;
          padding: 8px;
          border-radius: 4px;
          margin: 10px 0;
          border-left: 3px solid #ff6b6b;
        }
        .error-formula-inline {
          color: #666;
          font-family: 'Monaco', 'Menlo', monospace;
          background: #f5f5f5;
          padding: 2px 4px;
          border-radius: 2px;
          border: 1px solid #ddd;
        }
      `}</style>
    </div>
  );
};

export default ContentPreview;