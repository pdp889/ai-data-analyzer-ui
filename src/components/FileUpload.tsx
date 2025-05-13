import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';

const ACCEPTED_FILE_TYPES = {
  'text/csv': ['.csv'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'application/vnd.ms-excel': ['.xls'],
} as const;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  //this creates a function, onDrop
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
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      <div className="space-y-2">
        <div className="text-2xl font-semibold text-gray-700">
          {isDragActive ? 'Drop the file here' : 'Drag & drop your file here'}
        </div>
        <div className="text-gray-500">
          or click to select a file
        </div>
        <div className="text-sm text-gray-400">
          Supported formats: CSV, XLSX, XLS (max 5MB)
        </div>
      </div>
    </div>
  );
}; 