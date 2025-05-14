import { Toaster } from 'react-hot-toast';

const TOAST_CONFIG = {
  position: 'top-right' as const,
  duration: 4000,
  style: {
    background: '#363636',
    color: '#fff',
  },
  success: {
    duration: 4000,
    iconTheme: {
      primary: '#4ade80',
      secondary: '#fff',
    },
  },
  error: {
    duration: 4000,
    iconTheme: {
      primary: '#ef4444',
      secondary: '#fff',
    },
  },
} as const;

export const Toast = () => <Toaster {...TOAST_CONFIG} />; 