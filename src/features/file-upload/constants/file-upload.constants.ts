export const ACCEPTED_FILE_TYPES = {
  'text/csv': ['.csv'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'application/vnd.ms-excel': ['.xls'],
} as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const SUPPORTED_FILE_EXTENSIONS = ['.CSV'];
