import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { FileIcon } from './FileIcon';
import { UploadIcon } from './UploadIcon';
import { Header } from '../../../shared/components/Header';
import { HeaderStatus } from '../../../shared/types/header.types';
import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE,
  SUPPORTED_FILE_EXTENSIONS,
} from '../constants/file-upload.constants';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload = ({ onFileSelect }: FileUploadProps): JSX.Element => {
  const onDrop = useCallback(
    (acceptedFiles: File[]): void => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (file.size > MAX_FILE_SIZE) {
        toast.error('File size exceeds 10MB limit');
        return;
      }

      onFileSelect(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
        <p className="text-gray-600">
          Upload your data file to get started with AI-powered analysis
        </p>
      </motion.div>

      <motion.div
        {...(getRootProps() as HTMLMotionProps<'div'>)}
        className={`relative p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all
          ${
            isDragActive
              ? 'border-blue-500 bg-blue-50 scale-105'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />

        <motion.div
          className="space-y-4"
          animate={{ y: isDragActive ? 10 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {isDragActive ? <UploadIcon /> : <FileIcon />}

          <div className="space-y-2">
            <div className="text-xl font-semibold text-gray-700">
              {isDragActive ? 'Drop your file here' : 'Drag & drop your file here'}
            </div>
            <div className="text-gray-500">or click to browse files</div>
          </div>
        </motion.div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Supported File Types</h3>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            {SUPPORTED_FILE_EXTENSIONS.map(extension => (
              <span key={extension} className="px-3 py-1 bg-white rounded-full shadow-sm">
                {extension}
              </span>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-400">Maximum file size: 10MB</p>
        </div>
      </motion.div>
    </div>
  );
};
