import { SUPPORTED_FILE_EXTENSIONS } from '../constants/file-upload.constants';

import { MAX_FILE_SIZE } from '../constants/file-upload.constants';

export const validateFile = (file: File): string | null => {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return 'File size exceeds 10MB limit';
  }

  // Check file type
  const fileExtension = `.${file.name.split('.').pop()?.toUpperCase()}`;
  if (!SUPPORTED_FILE_EXTENSIONS.includes(fileExtension)) {
    return 'Unsupported file type';
  }

  // Check for potentially malicious file names
  if (/[<>:"/\\|?*]/.test(file.name)) {
    return 'Invalid file name';
  }

  // Check for empty files
  if (file.size === 0) {
    return 'File is empty';
  }

  return null;
};
