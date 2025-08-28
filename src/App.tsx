import React, { useState } from 'react';
import TextInput from './components/TextInput';
import ImageUpload from './components/ImageUpload';
import ContentPreview from './components/ContentPreview';
import ExportButtons from './components/ExportButtons';
import UsageHelp from './components/UsageHelp';
import { ImageData } from './types';
import { smartFormatConversion, processForMarkdown } from './utils/contentProcessor';

function App() {
  const [textContent, setTextContent] = useState<string>('');
  const [images, setImages] = useState<ImageData[]>([]);

  const handleTextChange = (value: string) => {
    setTextContent(value);
  };

  const handleImagesChange = (newImages: ImageData[]) => {
    setImages(newImages);
  };

  // 处理文本内容用于预览
  const getProcessedTextContent = () => {
    if (!textContent.trim()) return '';
    const converted = smartFormatConversion(textContent);
    return processForMarkdown(converted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 p-5">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-95 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
        <h1 className="text-center text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🤖 AI内容转换器
        </h1>
        
        <div className="space-y-6">
          <TextInput value={textContent} onChange={handleTextChange} />
          
          <ImageUpload images={images} onImagesChange={handleImagesChange} />
          
          <ContentPreview textContent={getProcessedTextContent()} images={images} />
          
          <ExportButtons textContent={getProcessedTextContent()} images={images} />
          
          <UsageHelp />
        </div>
      </div>
    </div>
  );
}

export default App;