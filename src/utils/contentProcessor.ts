/**
 * 清理AI生成的混乱内容
 */
export function cleanAIContent(content: string): string {
  let cleaned = content;
  
  // 清理HTML标签和错误信息
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  cleaned = cleaned.replace(/ParseError.*?KaTeX.*?/g, '');
  cleaned = cleaned.replace(/\$#x27;.*?style="color:[^"]*"[^>]*>/g, '');
  
  // 清理转义字符
  cleaned = cleaned.replace(/&lt;/g, '<');
  cleaned = cleaned.replace(/&gt;/g, '>');
  cleaned = cleaned.replace(/&amp;/g, '&');
  
  // 修复AI生成的奇怪格式
  cleaned = cleaned.replace(/([a-zA-Z]+)\*([a-zA-Z]+)\*/g, '$1($2)');
  cleaned = cleaned.replace(/([a-zA-Z])([a-zA-Z])\*([a-zA-Z])\*/g, '$1($2)');
  
  // 清理重复字符和星号
  cleaned = cleaned.replace(/\*+/g, '');
  cleaned = cleaned.replace(/([a-zA-Z0-9])\1\*/g, '$1');
  
  // 修复缺失的括号
  cleaned = cleaned.replace(/f'([a-zA-Z])/g, "f'($1)");
  cleaned = cleaned.replace(/f''([a-zA-Z])/g, "f''($1)");
  
  // 修复指数格式问题
  cleaned = cleaned.replace(/([a-zA-Z])−([a-zA-Z])/g, '($1-$2)');
  cleaned = cleaned.replace(/([a-zA-Z])∗([a-zA-Z])∗([a-zA-Z])/g, '$1-$3');
  
  // 修复特殊格式问题
  cleaned = cleaned.replace(/([a-zA-Z])=\*([a-zA-Z])\*=\*([a-zA-Z])/g, '$1=$3');
  
  return cleaned;
}

/**
 * 智能格式转换
 */
export function smartFormatConversion(content: string): string {
  if (!content.trim()) return '';
  
  let processed = cleanAIContent(content);
  
  // 转换 [ 公式 ] -> $$公式$$
  processed = processed.replace(/\[\s*(.*?)\s*\]/g, (match, formula) => {
    if (formula.includes('=') || formula.includes('\\') || 
        formula.includes('^') || formula.includes('_')) {
      return `$$${formula.trim()}$$`;
    }
    return match;
  });
  
  // 转换简单的 ( 变量 ) -> $变量$
  processed = processed.replace(/\(\s*([a-zA-Z][a-zA-Z0-9]*)\s*\)/g, (match, variable) => {
    return `$${variable.trim()}$`;
  });
  
  // 转换 ( n ) 阶 -> $n$ 阶
  processed = processed.replace(/\(\s*([a-zA-Z0-9+\-]+)\s*\)\s*(阶|项|次|个|维|点)/g, (match, variable, unit) => {
    return `$${variable.trim()}$ ${unit}`;
  });
  
  // 处理简单的等式
  processed = processed.replace(/([a-zA-Z])\s*=\s*([a-zA-Z0-9]+)/g, '$$$1 = $2$$');
  
  return processed;
}

/**
 * 处理Markdown格式
 */
export function processForMarkdown(content: string): string {
  if (!content.trim()) return '';
  
  let processed = content;
  
  // 处理独立公式
  processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
    return `$$${formula.trim()}$$`;
  });
  
  // 处理行内公式
  processed = processed.replace(/\$([^$\n]+?)\$/g, (match, formula) => {
    return `$${formula.trim()}$`;
  });
  
  return processed;
}