import { saveAs } from 'file-saver';
import { ImageData } from '../types';

/**
 * LaTeX到Unicode转换
 */
export function convertLatexToUnicode(text: string): string {
  const replacements: Record<string, string> = {
    '\\\\infty': '∞',
    '\\\\alpha': 'α',
    '\\\\beta': 'β',
    '\\\\gamma': 'γ',
    '\\\\delta': 'δ',
    '\\\\epsilon': 'ε',
    '\\\\theta': 'θ',
    '\\\\lambda': 'λ',
    '\\\\mu': 'μ',
    '\\\\pi': 'π',
    '\\\\sigma': 'σ',
    '\\\\phi': 'φ',
    '\\\\omega': 'ω',
    '\\\\le': '≤',
    '\\\\ge': '≥',
    '\\\\ne': '≠',
    '\\\\sum': 'Σ',
    '\\\\int': '∫',
    '\\\\partial': '∂',
    '\\\\nabla': '∇',
    '\\\\cdots': '⋯',
    '\\\\ldots': '…',
    '\\\\pm': '±',
    '\\\\times': '×',
    '\\\\div': '÷',
    '\\\\ln': 'ln',
    '\\\\log': 'log',
    '\\\\sin': 'sin',
    '\\\\cos': 'cos',
    '\\\\tan': 'tan',
    '\\\\lim': 'lim'
  };
  
  let result = text;
  for (const [latex, unicode] of Object.entries(replacements)) {
    const regex = new RegExp(latex, 'g');
    result = result.replace(regex, unicode);
  }
  
  return result;
}

/**
 * 导出Markdown文件
 */
export function exportMarkdown(textContent: string, images: ImageData[]): void {
  let markdownContent = '';
  
  // 添加文本内容
  if (textContent.trim()) {
    markdownContent += textContent + '\n\n';
  }
  
  // 添加图片
  if (images.length > 0) {
    markdownContent += '## 图片内容\n\n';
    images.forEach((image, index) => {
      markdownContent += `![${image.name}](image_${index + 1}_${image.name})\n\n`;
    });
  }
  
  const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
  saveAs(blob, 'ai_content.md');
}

/**
 * 处理Word导出内容
 */
function processForWord(content: string): string {
  let processed = content;
  
  // 处理独立公式
  processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
    const converted = convertLatexToUnicode(formula.trim());
    return `<div class="math-display">${converted}</div>`;
  });
  
  // 处理行内公式
  processed = processed.replace(/\$([^$\n]+?)\$/g, (match, formula) => {
    const converted = convertLatexToUnicode(formula.trim());
    return `<span class="math-inline">${converted}</span>`;
  });
  
  // 处理换行
  processed = processed.replace(/\n\n/g, '<br><br>');
  processed = processed.replace(/\n/g, '<br>');
  
  return processed;
}

/**
 * 导出Word文档
 */
export function exportWord(textContent: string, images: ImageData[]): void {
  let htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { 
            font-family: "Times New Roman", serif; 
            line-height: 1.6; 
            margin: 20px; 
        }
        .math-inline { 
            color: #0066CC; 
            font-style: italic; 
            background: #f0f8ff; 
            padding: 2px 4px; 
            border-radius: 3px; 
        }
        .math-display { 
            color: #0066CC; 
            font-style: italic; 
            text-align: center; 
            margin: 10px 0; 
            font-size: 1.1em; 
        }
        img { 
            max-width: 100%; 
            height: auto; 
            display: block; 
            margin: 10px auto; 
            border: 1px solid #ddd; 
            border-radius: 4px; 
        }
        .image-caption { 
            text-align: center; 
            color: #666; 
            font-size: 12px; 
            margin-top: 5px; 
        }
    </style>
</head>
<body>`;
  
  // 添加文本内容
  if (textContent.trim()) {
    htmlContent += processForWord(textContent) + '<br><br>';
  }
  
  // 添加图片
  if (images.length > 0) {
    htmlContent += '<h2>图片内容</h2>';
    images.forEach((image, index) => {
      htmlContent += `<div style="margin: 20px 0; text-align: center;">
        <img src="${image.src}" alt="${image.name}">
        <div class="image-caption">${image.name}</div>
        </div>`;
    });
  }
  
  htmlContent += '</body></html>';
  
  const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
  saveAs(blob, 'ai_content.doc');
}

/**
 * 复制到剪贴板
 */
export async function copyToClipboard(textContent: string, images: ImageData[]): Promise<void> {
  let markdownContent = '';
  
  // 添加文本内容
  if (textContent.trim()) {
    markdownContent += textContent + '\n\n';
  }
  
  // 添加图片
  if (images.length > 0) {
    markdownContent += '## 图片内容\n\n';
    images.forEach((image, index) => {
      markdownContent += `![${image.name}](image_${index + 1}_${image.name})\n\n`;
    });
  }
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(markdownContent);
  } else {
    // 备用复制方法
    const textArea = document.createElement('textarea');
    textArea.value = markdownContent;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('复制失败:', err);
      throw new Error('复制失败，请手动选择内容复制。');
    }
    
    document.body.removeChild(textArea);
  }
}