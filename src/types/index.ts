export interface ImageData {
  id: string;
  name: string;
  src: string;
  file: File;
}

export interface ConversionOptions {
  cleanHTML: boolean;
  convertFormulas: boolean;
  autoFormat: boolean;
}

export interface ExportOptions {
  includeImages: boolean;
  format: 'markdown' | 'word' | 'copy';
}