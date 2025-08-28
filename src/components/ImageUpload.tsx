import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { ImageData } from '../types';

interface ImageUploadProps {
  images: ImageData[];
  onImagesChange: (images: ImageData[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ images, onImagesChange }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newImages: ImageData[] = [];
    
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageData: ImageData = {
            id: generateId(),
            name: file.name,
            src: e.target?.result as string,
            file
          };
          newImages.push(imageData);
          
          if (newImages.length === files.length) {
            onImagesChange([...images, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeImage = (id: string) => {
    onImagesChange(images.filter(img => img.id !== id));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
        🖼️ AI生成的图片内容
      </h3>
      
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer mb-4 ${
          isDragOver 
            ? 'border-blue-500 bg-blue-50 transform scale-105' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
        onClick={handleUploadClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-gray-600 text-lg mb-2">点击或拖拽上传AI生成的图片</div>
        <div className="text-gray-400 text-sm">支持 JPG, PNG, GIF 格式</div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />
      
      {images.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {images.map((image) => (
            <div key={image.id} className="relative w-32 h-32 rounded-lg overflow-hidden shadow-md">
              <img
                src={image.src}
                alt={image.name}
                title={image.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeImage(image.id)}
                className="absolute top-1 right-1 bg-red-500 bg-opacity-80 text-white border-none rounded-full w-6 h-6 cursor-pointer text-xs flex items-center justify-center hover:bg-opacity-100 transition-all duration-200"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;