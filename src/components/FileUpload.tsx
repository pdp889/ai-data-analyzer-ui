import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { FileIcon } from './FileIcon';
import { Header, HeaderStatus } from './Header';

const ACCEPTED_FILE_TYPES = {
  'text/csv': ['.csv'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'application/vnd.ms-excel': ['.xls'],
} as const;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const UploadIcon = () => (
  <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

export const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size exceeds 5MB limit');
      return;
    }

    onFileSelect(file); //the prop is a function, and it gets called assuming all is good, when onDrop is called
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ //setting up the dropzone to call onDrop when a file is dropped
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Header status={HeaderStatus.UPLOAD} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <p className="text-gray-600">Upload your data file to get started with AI-powered analysis</p>
      </motion.div>

      <motion.div
        {...(getRootProps() as HTMLMotionProps<"div">)}
        className={`relative p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50 scale-105' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />
        
        <motion.div 
          className="space-y-4"
          animate={{ y: isDragActive ? 10 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {isDragActive ? <UploadIcon /> : <FileIcon />}
          
          <div className="space-y-2">
            <div className="text-xl font-semibold text-gray-700">
              {isDragActive ? 'Drop your file here' : 'Drag & drop your file here'}
            </div>
            <div className="text-gray-500">
              or click to browse files
            </div>
          </div>
        </motion.div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Supported File Types</h3>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <span className="px-3 py-1 bg-white rounded-full shadow-sm">.CSV</span>
            <span className="px-3 py-1 bg-white rounded-full shadow-sm">.XLSX</span>
            <span className="px-3 py-1 bg-white rounded-full shadow-sm">.XLS</span>
          </div>
          <p className="mt-2 text-xs text-gray-400">Maximum file size: 5MB</p>
        </div>
      </motion.div>
    </div>
  );
}; 